// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/**
 * @title IdentityVerification
 * @dev A soulbound token (SBT)-based identity verification system for landlords, tenants, and mediators.
 */
contract IdentityVerification is ERC721, Ownable {
    using Strings for uint256;

    /// @notice Enum representing different user roles.
    enum Role { Unverified, Landlord, Tenant, Mediator }

    /// @notice Structure to store user details.
    struct User {
        bytes32 uniqueId;          // Unique user identifier (hashed address & timestamp)
        Role role;                 // User role
        bool isVerified;           // Verification status
        uint256[] rentalHistory;   // Rental history as an array of rental IDs
    }

    /// @notice Mapping from user addresses to their respective details.
    mapping(address => User) public users;

    /// @notice Mapping from unique user IDs to their addresses.
    mapping(bytes32 => address) public userByUniqueId;

    /// @notice Counter for token IDs.
    uint256 private _tokenIdCounter;

    /// @notice Emitted when a user is successfully verified.
    event UserVerified(address indexed user, bytes32 uniqueId, Role role);

    /// @notice Emitted when a user's rental history is updated.
    event RentalHistoryUpdated(address indexed user, uint256 rentalId);

    /// @notice Emitted when a user is revoked.
    event UserRevoked(address indexed user);

    /**
     * @dev Contract constructor setting the ERC721 name and symbol.
     */
    constructor() ERC721("TorRent Identity", "TRID") Ownable(msg.sender) {}

    /// @dev Ensures that only verified users can call a function.
    modifier onlyVerifiedUser() {
        require(users[msg.sender].isVerified, "User is not verified");
        _;
    }

    /**
     * @notice Verifies a user and assigns a soulbound token.
     * @dev Only the contract owner can verify users.
     * @param _user The address of the user to verify.
     * @param _role The role assigned to the user.
     */
    function verifyUser(address _user, Role _role) external onlyOwner {
        require(users[_user].role == Role.Unverified, "User is already verified");

        // Generate a unique ID using address and timestamp
        bytes32 uniqueId = keccak256(abi.encodePacked(_user, block.timestamp));

        // Store user details
        users[_user] = User({
            uniqueId: uniqueId,
            role: _role,
            isVerified: true,
            rentalHistory: new uint256[](0)     
            });

        // Map unique ID to user address
        userByUniqueId[uniqueId] = _user;

        // Mint a Soulbound Token (SBT) as proof of identity
        _tokenIdCounter++; // Increment counter
        uint256 tokenId = _tokenIdCounter;
        _mint(_user, tokenId);

        emit UserVerified(_user, uniqueId, _role);
    }

    /**
     * @notice Adds a rental history record for the sender.
     * @dev Only verified users can add rental history.
     * @param _rentalId The rental ID to be added to history.
     */
    function addRentalHistory(uint256 _rentalId) external onlyVerifiedUser {
        users[msg.sender].rentalHistory.push(_rentalId);
        emit RentalHistoryUpdated(msg.sender, _rentalId);
    }

    /**
     * @notice Returns the rental history of a user.
     * @param _user The address of the user.
     * @return An array of rental IDs associated with the user.
     */
    function getRentalHistory(address _user) external view returns (uint256[] memory) {
        return users[_user].rentalHistory;
    }

    /**
     * @notice Retrieves the role of a user.
     * @param _user The address of the user.
     * @return The role assigned to the user.
     */
    function getUserRole(address _user) external view returns (Role) {
        return users[_user].role;
    }

    /**
     * @notice Revokes a user's verification status.
     * @dev Only the contract owner can revoke users.
     * @param _user The address of the user to revoke.
     */
    function revokeUser(address _user) external onlyOwner {
        require(users[_user].isVerified, "User is not verified");
        users[_user].isVerified = false;
        emit UserRevoked(_user);
    }

    /**
     * @notice Prevents soulbound token transfers by overriding OpenZeppelin's function.
     * @dev Ensures that tokens can only be minted or burned, not transferred.
     */
    /**
 * @dev Prevents soulbound token transfers by overriding OpenZeppelin's `_update` function.
 */
function _update(
    address to,
    uint256 tokenId,
    address auth
) internal override returns (address) {
    address from = _ownerOf(tokenId);
    require(from == address(0) || to == address(0), "Soulbound tokens are non-transferable");
    return super._update(to, tokenId, auth);
}

}
