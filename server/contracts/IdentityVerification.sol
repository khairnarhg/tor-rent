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

    enum Role { Unverified, Landlord, Tenant, Mediator }

    struct User {
        bytes32 uniqueId;          // Unique user identifier (hashed address & timestamp)
        Role role;                 // User role
        bool isVerified;           // Verification status
        uint256[] rentalHistory;   // Rental history as an array of rental IDs
    }

    mapping(address => User) public users;
    mapping(bytes32 => address) public userByUniqueId;
    uint256 private _tokenIdCounter;

    event UserVerified(address indexed user, bytes32 uniqueId, Role role);
    event RentalHistoryUpdated(address indexed user, uint256 rentalId);
    event UserRevoked(address indexed user);

     constructor() ERC721("TorRent Identity", "TRID") Ownable(msg.sender) {}

    modifier onlyVerifiedUser () {
        require(users[msg.sender].isVerified, "User  is not verified");
        _;
    }

    function verifyUser (address _user, Role _role) external onlyOwner {
        require(users[_user].role == Role.Unverified, "User  is already verified");

        bytes32 uniqueId = keccak256(abi.encodePacked(_user, block.timestamp));

        users[_user] = User({
            uniqueId: uniqueId,
            role: _role,
            isVerified: true,
            rentalHistory: new uint256[](0)     
        });

        userByUniqueId[uniqueId] = _user;

        _tokenIdCounter++;
        uint256 tokenId = _tokenIdCounter;
        _mint(_user, tokenId);

        emit UserVerified(_user, uniqueId, _role);
    }

    function addRentalHistory(uint256 _rentalId) external onlyVerifiedUser  {
        users[msg.sender].rentalHistory.push(_rentalId);
        emit RentalHistoryUpdated(msg.sender, _rentalId);
    }

    function getRentalHistory(address _user) external view returns (uint256[] memory) {
        return users[_user].rentalHistory;
    }

    function getUserRole(address _user) external view returns (Role) {
        return users[_user].role;
    }

    function revokeUser (address _user) external onlyOwner {
        require(users[_user].isVerified, "User  is not verified");
        users[_user].isVerified = false;
        emit UserRevoked(_user);
    }

    function isUserVerified(address _user) external view returns (bool) {
        return users[_user].isVerified;
    }

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