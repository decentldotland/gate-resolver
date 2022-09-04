import nearAPI from "near-api-js";
import { GATE_RESOLVER_1 } from "./constants.js";
const { connect, Contract, KeyPair, keyStores } = nearAPI;
import "./setEnv.js";

async function tesnetNetConfig() {
  const keyStore = new keyStores.InMemoryKeyStore();
  const keyPair = KeyPair.fromString(process.env.NEAR_TESTNET_PK);
  await keyStore.setKey("testnet", "decentland.testnet", keyPair);

  return {
    networkId: "testnet",
    keyStore,
    nodeUrl: "https://rpc.testnet.near.org",
    walletUrl: "https://wallet.testnet.near.org",
    helperUrl: "https://helper.testnet.near.org",
    explorerUrl: "https://explorer.testnet.near.org",
  };
}

export async function createContractInstance() {
  try {
    const connectionConfig = await tesnetNetConfig();
    const near = await connect(connectionConfig);
    const account = await near.account("decentland.testnet");
    const methodOptions = {
      changeMethods: ["resolve_job"],
      viewMethods: ["getUnresolvedRequests"],
    };
    const contract = new Contract(
      account,
      GATE_RESOLVER_1,
      methodOptions
    );
    return contract;
  } catch (error) {
    console.log(error);
    return false;
  }
}
