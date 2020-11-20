import { LoanResponse } from "../types";

const fixtureData = require('../../../fixtures/data.json');

export const fetchLoans = (): Promise<LoanResponse> => new Promise((resolve) => resolve(fixtureData));

export const appApi = {
    fetchLoans,
};