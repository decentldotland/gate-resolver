import { getUnresolvedJobs, resolveJob } from "./utils/contract-methods.js";

async function pollAndResolve() {
  try {
    const unresolvedJobs = await getUnresolvedJobs();
    if (!unresolvedJobs.length) {
      console.log(`\n\nno new jobs have been found, sleeping for 100 sec`);
      await sleep(1e5);
    }

    for (const job of unresolvedJobs) {
      console.log(`\n\nNEW UNSOLVED HAS BEEN JOB FOUND`);
      await resolveJob(job.job_id, job.user_address, job.contract_address);
      console.log(`\nnew job has been resolved\n\n`);
    }
  } catch (error) {
    console.log(error);
  }
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

while (true) {
  try {
    await pollAndResolve();
  } catch (error) {
    console.log(error);
  }
}
