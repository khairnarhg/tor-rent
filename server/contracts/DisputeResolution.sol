// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DisputeResolution {
    enum DisputeType {
        PaymentDelay,
        ContractViolation,
        MaintenanceIssue,
        RentIncrease,
        PropertyDamage,
        Other
    }

    enum VoteType {
        PENDING,
        APPROVE,
        REJECT
    }

    struct Mediator {
        bool isActive;
        uint casesHandled;
        uint successfulResolutions;
    }

    struct Vote {
        VoteType vote;
        string justification;
        uint timestamp;
    }

    struct Resolution {
        string verdict;
        uint compensation;
        bool isImplemented;
        uint votingDeadline;
        uint approvalVotes;
        uint rejectionVotes;
        mapping(address => Vote) mediatorVotes;
        address[] assignedMediators;
        bool isFinalized;
    }

    struct Dispute {
        uint id;
        address tenant;
        address landlord;
        string description;
        uint timestamp;
        string status;
        DisputeType disputeType;
        uint resolutionIndex;
    }

    mapping(uint => Dispute) public disputes;
    mapping(uint => Resolution) public resolutions;
    mapping(address => Mediator) public mediators;
    mapping(address => address) public tenantToLandlord;
    address[] public mediatorPool;
    uint public disputeCount = 0;

    uint public constant MINIMUM_MEDIATORS = 3;
    uint public constant VOTING_PERIOD = 3 days;
    uint public constant REQUIRED_MAJORITY_PERCENTAGE = 66;

    event DisputeRaised(uint disputeId, address indexed tenant, address indexed landlord, string description, DisputeType disputeType);
    event MediatorAssigned(uint disputeId, address mediator);
    event MediatorVoted(uint disputeId, address mediator, VoteType vote);
    event DisputeResolved(uint disputeId, string verdict, uint compensation);
    event ResolutionImplemented(uint disputeId);
    event TenantAdded(address tenant, address landlord);

    modifier onlyAssignedMediator(uint _disputeId) {
        bool isAssigned = false;
        for (uint i = 0; i < resolutions[_disputeId].assignedMediators.length; i++) {
            if (resolutions[_disputeId].assignedMediators[i] == msg.sender) {
                isAssigned = true;
                break;
            }
        }
        require(isAssigned, "Not an assigned mediator");
        _;
    }

    modifier disputeExists(uint _disputeId) {
        require(_disputeId < disputeCount, "Dispute does not exist");
        _;
    }

    function addTenant(address _tenant, address _landlord) public {
        require(_tenant != address(0) && _landlord != address(0), "Invalid address");
        require(tenantToLandlord[_tenant] == address(0), "Tenant already registered");
        tenantToLandlord[_tenant] = _landlord;
        emit TenantAdded(_tenant, _landlord);
    }

    function getTenantLandlord(address _tenant) public view returns (address) {
        return tenantToLandlord[_tenant];
    }

    function addMediator(address _mediator) public {
        require(!mediators[_mediator].isActive, "Mediator already active");
        mediators[_mediator] = Mediator(true, 0, 0);
        mediatorPool.push(_mediator);
    }

    function selectMediators(uint _disputeId) internal {
        require(mediatorPool.length >= MINIMUM_MEDIATORS, "Not enough mediators available");
        address[] storage assignedMediators = resolutions[_disputeId].assignedMediators;
        uint assignedCount = 0;
        while (assignedCount < MINIMUM_MEDIATORS) {
            assignedMediators.push(mediatorPool[assignedCount]);
            emit MediatorAssigned(_disputeId, mediatorPool[assignedCount]);
            assignedCount++;
        }
    }

    function raiseDispute(string memory _description, DisputeType _disputeType) public {
        address _landlord = tenantToLandlord[msg.sender];
        bool isTenant = _landlord != address(0);
        bool isLandlord = !isTenant;

        if (isTenant) {
            require(_disputeType == DisputeType.PaymentDelay || _disputeType == DisputeType.MaintenanceIssue || _disputeType == DisputeType.Other, "Invalid dispute type for tenant");
        } else if (isLandlord) {
            require(_disputeType == DisputeType.ContractViolation || _disputeType == DisputeType.RentIncrease || _disputeType == DisputeType.PropertyDamage, "Invalid dispute type for landlord");
        }

        uint disputeId = disputeCount++;
        disputes[disputeId] = Dispute(disputeId, msg.sender, _landlord, _description, block.timestamp, "Pending", _disputeType, disputeId);
        resolutions[disputeId].votingDeadline = block.timestamp + VOTING_PERIOD;
        selectMediators(disputeId);
        emit DisputeRaised(disputeId, msg.sender, _landlord, _description, _disputeType);
    }

    function submitVote(uint _disputeId, VoteType _vote, string memory _justification) public onlyAssignedMediator(_disputeId) disputeExists(_disputeId) {
        Resolution storage resolution = resolutions[_disputeId];
        require(resolution.mediatorVotes[msg.sender].timestamp == 0, "Already voted");
        resolution.mediatorVotes[msg.sender] = Vote(_vote, _justification, block.timestamp);
        if (_vote == VoteType.APPROVE) {
            resolution.approvalVotes++;
        } else {
            resolution.rejectionVotes++;
        }
        emit MediatorVoted(_disputeId, msg.sender, _vote);

        if (resolution.approvalVotes + resolution.rejectionVotes >= MINIMUM_MEDIATORS) {
            resolution.votingDeadline = block.timestamp;
        }
    }

    function finalizeDispute(uint _disputeId) public disputeExists(_disputeId) {
        Resolution storage resolution = resolutions[_disputeId];
        require(block.timestamp >= resolution.votingDeadline, "Voting period still open");
        require(!resolution.isFinalized, "Dispute already finalized");
        if ((resolution.approvalVotes * 100) / (resolution.approvalVotes + resolution.rejectionVotes) >= REQUIRED_MAJORITY_PERCENTAGE) {
            resolution.verdict = "Dispute approved: Compensation granted.";
            disputes[_disputeId].status = "Resolved";
        } else {
            resolution.verdict = "Dispute denied: No action taken.";
            disputes[_disputeId].status = "Rejected";
        }
        resolution.isFinalized = true;
        emit DisputeResolved(_disputeId, resolution.verdict, resolution.compensation);
    }
}