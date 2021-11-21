require('dotenv').config();
const IPFS = require( 'ipfs-core');



const API_URL = process.env.API_URL;
const METADATA_CID = process.env.METADATA_CID;

const {
    createAlchemyWeb3
} = require("@alch/alchemy-web3");
const alchemyWeb3 = createAlchemyWeb3(API_URL);
const contract = require("../artifacts/contracts/KileyMandalaNFT.sol/KmnNFT.json");
const contractAddress = "0x500dBCf4b79099EEa72F58A732DEB42bF735C559";
const nftContract = new alchemyWeb3.eth.Contract(contract.abi, contractAddress);

const METAMASK_PUBLIC_KEY = process.env.METAMASK_PUBLIC_KEY;
const METAMASK_PRIVATE_KEY = process.env.METAMASK_PRIVATE_KEY;

async function mintNFT(tokenURI) {
    // get the nonce - nonce is needed for security reasons. It keeps track of the number of
    // transactions sent from our address and prevents replay attacks.
    const nonce = await alchemyWeb3.eth.getTransactionCount(METAMASK_PUBLIC_KEY, 'latest');
    // I think the hardcoded argument to createNFT is an alchemy address
    const tx = {
        from: METAMASK_PUBLIC_KEY, // our MetaMask public key
        to: contractAddress, // the smart contract address we want to interact with
        nonce: nonce, // nonce with the no of transactions from our account
        gas: 1000000, // fee estimate to complete the transaction
        data: nftContract.methods
            .createNFT(METAMASK_PUBLIC_KEY, tokenURI)
            .encodeABI(), // call the createNFT function from our OsunRiverNFT.sol file and pass the account that should receive the minted NFT.
    };
    const signPromise = alchemyWeb3.eth.accounts.signTransaction(
        tx,
        METAMASK_PRIVATE_KEY
    );
    signPromise
        .then((signedTx) => {
            alchemyWeb3.eth.sendSignedTransaction(
                signedTx.rawTransaction,
                function (err, hash) {
                    if (!err) {
                        console.log(
                            "The hash of our transaction is: ",
                            hash,
                            "\nCheck Alchemy's Mempool to view the status of our transaction!"
                        );
                    } else {
                        console.log(
                            "Something went wrong when submitting our transaction:",
                            err
                        );
                    }
                }
            );
        })
        .catch((err) => {
            console.log(" Promise failed:", err);
        });
}

async function main() {
    const ipfs = await IPFS.create();
    for await (const file of ipfs.ls(METADATA_CID)) {
        console.log(file.name,' ',file.cid);
        await mintNFT(`https://ipfs.io/ipfs/${file.cid}`);
    }
    process.exit(0);
}
main();
//