import { createContractInstance } from "./near-connect.js";
import { getUserBalance } from "./user-balance.js";

export async function getUnresolvedJobs() {
  try {
    const contract = await createContractInstance();
    const jobs = await contract.getUnresolvedRequests();
    return jobs;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function resolveJob(job_id, user_address, contract_address) {
  try {
    const contract = await createContractInstance();
    const balance = await getUserBalance(user_address, contract_address);
    const res = await contract.resolve_job({
      job_id: job_id,
      response: { balance },
    });
    return res;
  } catch (error) {
    console.log(error);
    return false;
  }
}
