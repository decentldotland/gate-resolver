import axios from "axios";
import "./setEnv.js";

export async function getUserBalance(user_address, contract_address) {
  try {
    const res = (
      await axios.get(
        `https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${contract_address}&address=${user_address}&tag=latest&apikey=${process.env.ETHERSCAN_API_KEY}`
      )
    )?.data;
    if (res?.message === "OK") {
      return res?.result;
    }

    return "0";
  } catch (error) {
    console.log(error);
    return "0";
  }
}
