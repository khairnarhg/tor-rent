// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract RentalAgreement {
    
    enum Role { None, Landlord, Tenant }

    struct Agreement {
    address landlord;
    address tenant;
    string landlordName;
    string tenantName;
    string propertyAddress;
    uint256 rentAmount;
    uint256 securityDeposit;
    uint256 dueDate;
    uint256 startDate; // New: Agreement Start Date
    uint256 endDate;   // New: Agreement End Date
    bool isSigned;
    bool isActive;
}


    struct Payment {
        uint256 agreementId;
        string transactionId; // Store transaction ID
        uint256 amount;
        uint256 timestamp;
    }

    mapping(address => Role) public userRoles;
    mapping(uint256 => Agreement) public agreements;
    mapping(uint256 => Payment[]) public paymentHistory; // Mapping to store payment history for each agreement
    uint256 public agreementCounter;

    event AgreementCreated(uint256 indexed agreementId, address indexed landlord, uint256 rentAmount);
    event AgreementSigned(uint256 indexed agreementId, address indexed tenant);
    event RentPaid(uint256 indexed agreementId, address indexed tenant, uint256 amount, string transactionId);
    event ContractTerminated(uint256 indexed agreementId);
    event AgreementUpdated(uint256 indexed agreementId);

    modifier onlyLandlord(uint256 _agreementId) {
        require(msg.sender == agreements[_agreementId].landlord, "Only the landlord can perform this action");
        _;
    }

    modifier onlyTenant(uint256 _agreementId) {
        require(msg.sender == agreements[_agreementId].tenant, "Only the tenant can perform this action");
        _;
    }

    modifier agreementActive(uint256 _agreementId) {
        require(agreements[_agreementId].isActive, "Agreement is not active");
        _;
    }

    modifier onlyRole(Role _role) {
        require(userRoles[msg.sender] == _role, "User  not authorized");
        _;
    }

    constructor() {}

    function setUserRole(address _user, Role _role) external {
        // Ensure only an admin (or any other form of control mechanism) can assign roles
        userRoles[_user] = _role;
    }

        function createAgreement(
        string memory _landlordName,
        string memory _tenantName,
        string memory _propertyAddress,
        uint256 _rentAmount,
        uint256 _securityDeposit,
        uint256 _dueDate,
        uint256 _startDate, // New: Agreement Start Date
        uint256 _endDate    // New: Agreement End Date
    ) external onlyRole(Role.Landlord) {
        require(_endDate > _startDate, "End date must be after start date");

        agreementCounter++;
        agreements[agreementCounter] = Agreement(
            msg.sender,
            address(0),
            _landlordName,
            _tenantName,
            _propertyAddress,
            _rentAmount,
            _securityDeposit,
            _dueDate,
            _startDate, // Store start date
            _endDate,   // Store end date
            false,
            false
        );
        emit AgreementCreated(agreementCounter, msg.sender, _rentAmount);
    }


    function signAgreement(uint256 _agreementId) external onlyRole(Role.Tenant) {
        Agreement storage agreement = agreements[_agreementId];
        require(!agreement.isSigned, "Agreement already signed");
        agreement.tenant = msg.sender;
        agreement.isSigned = true;
        agreement.isActive = true;
        emit AgreementSigned(_agreementId, msg.sender);
    }

    function payRent(uint256 _agreementId, string memory _transactionId) external payable onlyTenant(_agreementId) agreementActive(_agreementId) {
        Agreement storage agreement = agreements[_agreementId];
        require(msg.value == agreement.rentAmount, "Incorrect rent amount");
        require(block.timestamp <= agreement.dueDate, "Rent is overdue");
        
        // Transfer the rent amount to the landlord
        payable(agreement.landlord).transfer(msg.value);
        
        // Record the payment details
        Payment memory newPayment = Payment({
            agreementId: _agreementId,
            transactionId: _transactionId,
            amount: msg.value,
            timestamp: block.timestamp
        });
        
        paymentHistory[_agreementId].push(newPayment);
        emit RentPaid(_agreementId, msg.sender, msg.value, _transactionId);
    }

    function terminateContract(uint256 _agreementId) external onlyLandlord(_agreementId) agreementActive(_agreementId) {
        agreements[_agreementId].isActive = false;
        emit ContractTerminated(_agreementId);
    }

    function refundDeposit(uint256 _agreementId) external onlyLandlord(_agreementId) {
        Agreement storage agreement = agreements[_agreementId];
        require(!agreement.isActive, "Contract is still active");
        payable(agreement.tenant).transfer(agreement.securityDeposit);
    }

    function updateAgreementDetails(
        uint256 _agreementId,
        string memory _landlordName,
        string memory _tenantName,
        string memory _propertyAddress
    ) external onlyLandlord(_agreementId) agreementActive(_agreementId) {
        Agreement storage agreement = agreements[_agreementId];
        agreement.landlordName = _landlordName;
        agreement.tenantName = _tenantName;
        agreement.propertyAddress = _propertyAddress;
        emit AgreementUpdated(_agreementId);
    }

    function getAgreementDetails(uint256 _agreementId) external view returns (
        address landlord,
        address tenant,
        string memory landlordName,
        string memory tenantName,
        string memory propertyAddress,
        uint256 rentAmount,
        uint256 securityDeposit,
        uint256 dueDate,
        bool isSigned,
        bool isActive
    ) {
        Agreement storage agreement = agreements[_agreementId];
        return (
            agreement.landlord,
            agreement.tenant,
            agreement.landlordName,
            agreement.tenantName,
            agreement.propertyAddress,
            agreement.rentAmount,
            agreement.securityDeposit,
            agreement.dueDate,
            agreement.isSigned,
            agreement.isActive
        );
    }

    function getPaymentHistory(uint256 _agreementId) external view returns (Payment[] memory) {
        return paymentHistory[_agreementId];
    }
}