const hre = require("hardhat");

async function main() {
  // Deploy IdentityVerification first
  const IdentityVerification = await hre.ethers.getContractFactory("IdentityVerification");
  const identityVerification = await IdentityVerification.deploy();
  await identityVerification.waitForDeployment(); 

  console.log(`IdentityVerification deployed at: ${identityVerification.target}`);

  // Deploy RentalAgreement with IdentityVerification's address
  const RentalAgreement = await hre.ethers.getContractFactory("RentalAgreement");
  const rentalAgreement = await RentalAgreement.deploy(identityVerification.target); // ✅ Pass address
  await rentalAgreement.waitForDeployment(); 

  console.log(`RentalAgreement deployed at: ${rentalAgreement.target}`);

  // Deploy DisputeResolution (if it has no constructor arguments)
  const DisputeResolution = await hre.ethers.getContractFactory("DisputeResolution");
  const disputeResolution = await DisputeResolution.deploy();
  await disputeResolution.waitForDeployment(); 

  console.log(`DisputeResolution deployed at: ${disputeResolution.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
