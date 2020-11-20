import { addSeconds, formatDuration, intervalToDuration } from "date-fns";
import { createSelector } from "reselect";
import { RootState } from "../../../store";
import { getNormalizedNumber } from "../../App/store/selectors";
import { InvestmentRecord, NormalizedLoan } from "../../App/types";

const currencyFormatter = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' });

export const getNumberFormattedToCurrency = (number: number): string => 
    currencyFormatter.format(number);

export const getInvestmentRecords = (state: RootState): InvestmentRecord => {
    return state.Challenge.investmentRecords;
}

const _getTotalStr = (investmentRecord: InvestmentRecord): string => {
    const result = Object.keys(investmentRecord).reduce((total, key) => total += investmentRecord[key], 0);
    return getNumberFormattedToCurrency(result).replace('.00', '');
}

export const getTotalStr = createSelector(
    getInvestmentRecords,
    _getTotalStr
);

export const getIsInvestmentModalOpen = (state: RootState): boolean =>
    state.Challenge.showInvestmentModal;

const getSelectedLoan = (state: RootState): NormalizedLoan | undefined => 
    state.App.loans.find(loan => loan.id === state.Challenge.selectedLoanId)!;

const _getSelectedLoanTitle = (loan?: NormalizedLoan): string => loan?.title || '';

export const getSelectedLoanTitle = createSelector(
    getSelectedLoan,
    _getSelectedLoanTitle,
);

//@TODO: We are assuming the number won't come with cents in it (check with BE team what's the actual expectation)
// Simple implementation based on fixture we have
const _getInitialAmountAvailable = (loan?: NormalizedLoan): number => {
    return loan?.available || 0;
}

const getInitialAmountAvailable = createSelector(
    getSelectedLoan,
    _getInitialAmountAvailable
);

const getSelectedLoanId = (state: RootState): string | undefined => 
        state.Challenge.selectedLoanId;

const _getInvestedAmount = (investmentRecord: InvestmentRecord, loanId?: string): number => {
    console.log(loanId, investmentRecord[loanId || ''])
    return investmentRecord[loanId ?? ''] || 0;
}

const getInvestedAmount = createSelector(
    getInvestmentRecords,
    getSelectedLoanId,
    _getInvestedAmount
);

const _getAmountAvailableStr = (initialAmount: number, investedAmount: number): string => {
    return getNumberFormattedToCurrency(initialAmount - investedAmount);
}

export const getAmountAvailableStr = createSelector(
    getInitialAmountAvailable,
    getInvestedAmount,
    _getAmountAvailableStr
);

const getDateFnsDurationFromSeconds = (seconds: number): Duration => {
    const timeRemainingInSeconds = Number(seconds);
    const normalizedStartTime = new Date(0);
    const normalizedEndTime = addSeconds(normalizedStartTime, timeRemainingInSeconds);
    return intervalToDuration({
        start: normalizedStartTime,
        end: normalizedEndTime,
    });
}

const getFormattedDuration = (seconds: number): string => {
    return formatDuration(getDateFnsDurationFromSeconds(seconds), { format: [ 'months', 'days' ] });
}

const _getWhenLoanEnds = (loan?: NormalizedLoan): string => {
    if (!loan) {
        return 'never';
    }
    return getFormattedDuration(loan.term_remaining);
}

export const getWhenLoanEnds = createSelector(
    getSelectedLoan,
    _getWhenLoanEnds
);

//@TODO: This is just silly - we need to store the values in challengeStore already normalised so there's no converting from and back to string all the time
const _getAmountAvailable = (amountStr: string): number => {
    const normalizedAmount = getNormalizedNumber(amountStr);
    return normalizedAmount;
}

export const getAmountAvailable = createSelector(
    getAmountAvailableStr,
    _getAmountAvailable
);