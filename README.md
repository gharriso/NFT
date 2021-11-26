# NFT project

1. In .env specify :

* METAMASK_PRIVATE_KEY (no leading 0x)
* API_URL - as provided by alchemy
* METADATA_CID - IPFS directory containing json metadata
* METAMASK_PUBLIC_KEY (leading 0x)
* CONTRACT_ADDRESS (once we have run deploy at least once)


2. `hardhat.config.js` has the network details, change from "rinkeby" to mainnet when ready, then `npx hardhat compile`

You can ignore "Visibility for constructor is ignored". 

`npx hardhat run scripts/deploy.js --network rinkeby`

3. Update the .env file with the CONTRACT_ADDRESS from that last execution


4. Run `node scripts/mint-nft.js`