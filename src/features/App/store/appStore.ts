import { CaseReducer, createAsyncThunk, createSlice, PayloadAction, } from '@reduxjs/toolkit';
import { appApi } from '../api/appApi';
import { NormalizedLoan } from '../types';
import { getNormalizedLoans } from './selectors';

export interface AppState {
    isLoading: boolean;
    loans: NormalizedLoan[];
};

export const initialState: AppState = {
    loans: [],
    isLoading: false,
};

const SLICE_NAME = 'App';

const onAttemptFetchLoans: CaseReducer<AppState> = (state) => {
    state.isLoading = true;
};

const onFetchLoansSuccess: CaseReducer<AppState, PayloadAction<NormalizedLoan[]>> = (state, action) => {
    state.loans = action.payload;
    state.isLoading = false;
} 

const onFetchLoansFailure: CaseReducer<AppState> = (state) => {
    //@TODO: Handler error graciously
    state.isLoading = true;
};

const doFetchLoans = async () => {
    const result = await appApi.fetchLoans();
    return getNormalizedLoans(result.loans);
}
    
export const attemptFetchLoans = createAsyncThunk(`${SLICE_NAME}/attemptFetchLoans`, doFetchLoans);

export const AppStore = createSlice({
    name: SLICE_NAME,
    initialState,
    reducers: {
        
    },
    extraReducers: {
        [attemptFetchLoans.pending.toString()]: onAttemptFetchLoans,
        [attemptFetchLoans.fulfilled.toString()]: onFetchLoansSuccess,
        [attemptFetchLoans.rejected.toString()]: onFetchLoansFailure,
    }
});
