require('dotenv').config();
const IPFS = require('ipfs-core');
const MongoClient = require('mongodb').MongoClient;

METADATA_CID = process.env.METADATA_CID;
MONGODB_URI = process.env.MONGO_NFT;

async function main() {
    try {
        const ipfs = await IPFS.create();
        console.log(MONGODB_URI);
        mongoclient = await MongoClient.connect(
            MONGODB_URI, {});
        mongodb = mongoclient.db();
        for await (const file of ipfs.ls(METADATA_CID)) {
            console.log(file.name, ' ', file.cid.toString());
            await mongodb.collection('nftCatalog').insertOne(
                {name:file.name,
                 cid:file.cid.toString(),
                 uploaded:false
                }
            );
        }
    } catch (error) {
        console.log(error.stack);
    }
    process.exit(0);
}
main();