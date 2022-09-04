import { NearContract, NearBindgen, near, call, view } from "near-sdk-js";

@NearBindgen
class GateResolver extends NearContract {
  constructor({ network = "ETH", requests = [], job_id = 0 }) {
    super();
    this.network = network;
    this.requests = requests;
    this.job_id = job_id;
  }

  @call
  create_new_job({ contract_address = "", user_address = "" }) {
    if (
      !/^0x[a-fA-F0-9]{40}$/.test(contract_address) ||
      !/^0x[a-fA-F0-9]{40}$/.test(user_address)
    ) {
      near.panic(`a non-valid EVM EOA/contract address has been passed`);
    }
    this.requests.push({
      contract_address: contract_address,
      user_address: user_address,
      job_id: this.job_id,
      resolved: false,
      response: null,
    });

    const request_job_id = this.job_id;
    // update job_id
    this.job_id += 1;
    return request_job_id;
  }

  @call
  resolve_job({ job_id = 0, response = {} }) {
    _onlyOwner();
    _validateJobId({ job_id });

    if (this.requests[job_id].resolved) {
      near.panic(`job already resolved`);
    }

    this.requests[job_id].response = response;
    this.requests[job_id].resolved = true;
    this.requests[job_id].resolved_by = near.signerAccountId();
    near.log(`job_id: ${job_id} has been resolved`);
  }

  @view
  fetch_job({ job_id }) {
    _validateJobId({ job_id });

    return this.requests[job_id];
  }

  @view
  getAllRequests() {
    near.log(this.requests);
    return this.requests;
  }

  @view
  getUnresolvedRequests() {
    near.log(this.requests.filter((job) => !job.resolved))
    return this.requests.filter((job) => !job.resolved);
  }

  @view
  getCurrentJobId() {
    near.log(this.job_id);
    return this.job_id;
  }

  @view
  _onlyOwner() {
    const owner = near.predecessorAccountId();
    const caller = near.signerAccountId();

    if (owner !== caller) {
      near.panic(`invalid caller: ${caller} should be ${owner}`);
    }
  }

  @view
  _validateJobId({ job_id }) {
    if (typeof job_id == undefined) {
      near.panic(`no job_id has been passed`);
    }

    if (
      !Number.isInteger(job_id) ||
      job_id < 0 ||
      job_id > this.requests.length
    ) {
      near.panic(`invalid job_id has been passed`);
    }
  }

  default() {
    return new GateResolver({ network: "ETH", requests: [], job_id: 0 });
  }
}
