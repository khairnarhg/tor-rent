const express = require("express");
const { ethers } = require("ethers");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(require("cors")());

const provider = new ethers.JsonRpcProvider(process.env.INFURA_SEPOLIA_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const contractABI = require("./artifacts/contracts/RentalAgreement.sol/RentalAgreement.json").abi;
const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

// 🔹 Create Agreement API
app.post("/createAgreement", async (req, res) => {
    try {
        const { landlordName, tenantName, propertyAddress, rentAmount, securityDeposit, startDate, endDate, dueDate } = req.body;

        console.log('body:', req.body);

        if (!rentAmount || !securityDeposit) {
            return res.status(400).json({ error: "Rent amount and security deposit are required." });
        }

        // Convert ETH values to Wei using ethers.js
        const rentInWei = ethers.parseEther(rentAmount.toString()); 
        const depositInWei = ethers.parseEther(securityDeposit.toString()); 

        // Convert dates to UNIX timestamps
        const startDateUnix = Math.floor(new Date(startDate).getTime() / 1000);
        const endDateUnix = Math.floor(new Date(endDate).getTime() / 1000);
        const dueDateUnix = Math.floor(new Date(dueDate).getTime() / 1000);

        // Send transaction to the smart contract
        const tx = await contract.createAgreement(
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




// 🔹 API to sign agreement
app.post("/signAgreement", async (req, res) => {
    try {
        const { tenantAddress } = req.body;
        const tx = await contract.signAgreement(tenantAddress);
        await tx.wait();
        res.json({ message: "Agreement signed successfully", txHash: tx.hash });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 🔹 API to get landlord address
app.get("/landlord", async (req, res) => {
    try {
        const landlord = await contract.landlord();
        res.json({ landlord });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));
