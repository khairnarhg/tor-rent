const hre = require("hardhat");

async function main() {
  const RentalAgreement = await hre.ethers.getContractFactory("RentalAgreement");
  const rentalAgreement = await RentalAgreement.deploy();
  await rentalAgreement.waitForDeployment(); 
  

  const DisputeResolution = await hre.ethers.getContractFactory("DisputeResolution");
  const disputeResolution = await DisputeResolution.deploy();
  await disputeResolution.waitForDeployment(); 


  const IdentityVerification = await hre.ethers.getContractFactory("IdentityVerification");
  const identityVerification = await IdentityVerification.deploy();
  await identityVerification.waitForDeployment(); 
 

  console.log(`RentalAgreement deployed at: ${rentalAgreement.target}`);
  console.log(`DisputeResolution deployed at: ${disputeResolution.target}`);
  console.log(`IdentityVerification deployed at: ${identityVerification.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
