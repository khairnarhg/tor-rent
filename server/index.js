const express = require("express");
const { ethers } = require("ethers");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(require("cors")());

const provider = new ethers.JsonRpcProvider(process.env.INFURA_SEPOLIA_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Rental Agreement Contract
const RAcontractABI = require("./artifacts/contracts/RentalAgreement.sol/RentalAgreement.json").abi;
const RAcontractAddress = process.env.CONTRACT_ADDRESS_RA;
const RAcontract = new ethers.Contract(RAcontractAddress, RAcontractABI, wallet);

// Identity Verification Contract
const IVcontractABI = require("./artifacts/contracts/IdentityVerification.sol/IdentityVerification.json").abi;
const IVcontractAddress = process.env.CONTRACT_ADDRESS_IV;
const walletIV = new ethers.Wallet(process.env.PRIVATE_KEY_IV, provider);
const IVcontract = new ethers.Contract(IVcontractAddress, IVcontractABI, walletIV);

app.post("/verifyUser", async (req, res) => {
    try {
        const { userAddress, role } = req.body;

        if (!userAddress || !role) {
            return res.status(400).json({ error: "User address and role are required." });
        }

        // Get the owner of the contract
        const owner = await IVcontract.owner();
        
        // // Check if the sender is the owner (you would replace 'senderAddress' with the actual sender's address)
        // const senderAddress = req.body.senderAddress; // Get the sender's address from the frontend request (if it's passed)

        // if (senderAddress.toLowerCase() !== owner.toLowerCase()) {
        //     return res.status(403).json({ error: "Only the owner can verify users." });
        // }

        // Send transaction to verify user and assign role
        const tx = await IVcontract.verifyUser(userAddress, role);
        await tx.wait();

        res.json({ message: "User verified successfully", txHash: tx.hash });
    } catch (err) {
        console.error("Error verifying user:", err);
        res.status(500).json({ error: err.message });
    }
});
// 🔹 Check if User is Verified API
app.get("/isUserVerified", async (req, res) => {
    try {
        const { userAddress } = req.query;

        if (!userAddress) {
            return res.status(400).json({ error: "User address is required." });
        }

        const isVerified = await IVcontract.isUserVerified(userAddress);
        res.json({ isVerified });
    } catch (err) {
        console.error("Error checking user verification:", err);
        res.status(500).json({ error: err.message });
    }
});

// 🔹 Create Rental Agreement
app.post("/createAgreement", async (req, res) => {
    try {
        const { landlordName, tenantName, propertyAddress, rentAmount, securityDeposit, startDate, endDate, dueDate } = req.body;
        console.log('body:', req.body);

        if (!rentAmount || !securityDeposit) {
            return res.status(400).json({ error: "Rent amount and security deposit are required." });
        }

        // Convert ETH values to Wei
        const rentInWei = ethers.parseEther(rentAmount.toString()); 
        const depositInWei = ethers.parseEther(securityDeposit.toString()); 

        // Convert dates to UNIX timestamps
        const startDateUnix = Math.floor(new Date(startDate).getTime() / 1000);
        const endDateUnix = Math.floor(new Date(endDate).getTime() / 1000);
        const dueDateUnix = Math.floor(new Date(dueDate).getTime() / 1000);

        // Send transaction
        const tx = await RAcontract.createAgreement(
            landlordName,
            tenantName,
            propertyAddress,
            rentInWei,
            depositInWei,
            startDateUnix,
            endDateUnix,
            dueDateUnix
        );

        await tx.wait();
        res.json({ message: "Agreement created successfully", txHash: tx.hash });

    } catch (err) {
        console.error("Error creating agreement:", err);
        res.status(500).json({ error: err.message });
    }
});

// 🔹 Sign Rental Agreement
app.post("/signAgreement", async (req, res) => {
    try {
        const { tenantAddress } = req.body;
        const tx = await RAcontract.signAgreement(tenantAddress);
        await tx.wait();
        res.json({ message: "Agreement signed successfully", txHash: tx.hash });
    } catch (err) {
        console.error("Error signing agreement:", err);
        res.status(500).json({ error: err.message });
    }
});

app.post("/payRent", async (req, res) => {
    try {
        const { tenantAddress } = req.body;

        if (!tenantAddress) {
            return res.status(400).json({ error: "Tenant address is required." });
        }

        // Fetch the rent amount from the contract 
        const rentAmount = await RAcontract.getRentAmount(); // Assuming `getRentAmount` is a function in the contract that 

        if (!rentAmount) {
            return res.status(400).json({ error: "Could not fetch rent amount from the contract." });
        }

        // Convert the rent amount to the appropriate units (Wei)
        const rentInWei = ethers.parseEther(rentAmount.toString());

        // Perform the payment transaction
        const tx = await RAcontract.payRent({ value: rentInWei, from: tenantAddress });
        await tx.wait();

        res.json({ message: "Rent paid successfully", txHash: tx.hash });
    } catch (err) {
        console.error("Error processing rent payment:", err);
        res.status(500).json({ error: err.message });
    }
});

// Start Express Server
app.listen(5000, () => console.log("Server running on port 5000"));
