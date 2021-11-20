async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    console.log("Account balance:", (await deployer.getBalance()).toString());
    const KMN = await ethers.getContractFactory("KmnNFT");

    // Start deployment, returning a promise that resolves to a contract object
    const kmn = await KMN.deploy();
    console.log("Contract deployed to address:", kmn.address);
 }

 main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });