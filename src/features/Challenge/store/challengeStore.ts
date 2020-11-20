import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InvestmentRecord } from '../../App/types';

interface ChallengeState {
    selectedLoanId?: string;
    showInvestmentModal: boolean;
    investmentRecords: InvestmentRecord;
};

export const initialState: ChallengeState = {
    showInvestmentModal: false,
    investmentRecords: {},
};

const SLICE_NAME = 'Challenge';

const investInLoanId: CaseReducer<ChallengeState, PayloadAction<string>> = (state, action) => {
    state.selectedLoanId = action.payload;
    state.showInvestmentModal = true;
}

const closeInvestmentModal: CaseReducer<ChallengeState> = (state) => {
    state.showInvestmentModal = false;
}

const addInvestment: CaseReducer<ChallengeState, PayloadAction<number>> = (state, action) => {
    state.showInvestmentModal = false;
    if (!state.selectedLoanId) {
        return;
    }
    // If it's the first time we are adding an investiment to this loan id, set it to 0 so we can just add afterwards
    if (!state.investmentRecords[state.selectedLoanId]) {
        state.investmentRecords[state.selectedLoanId] = 0;
    }
    state.investmentRecords[state.selectedLoanId] += action.payload;
}

export const ChallengeStore = createSlice({
    name: SLICE_NAME,
    initialState,
    reducers: {
        addInvestment,
        closeInvestmentModal,
        investInLoanId,
    },
});
