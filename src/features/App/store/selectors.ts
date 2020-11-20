import { RootState } from "../../../store";
import { Loan, NormalizedLoan } from "../types";

export const getIsLoading = (state: RootState): boolean =>
    state.App.isLoading;

export const getLoans = (state: RootState): NormalizedLoan[] =>
    state.App.loans;

//@TODO: move this function to utils
//@TODO: We are assuming the number won't come with cents in it (check with BE team what's the actual expectation)
// Simple implementation based on fixture we have
export const getNormalizedNumber = (numberStr: string) => {
    return Number(numberStr.replace(',', '').replace('£', ''));
}

export const getNormalizedLoans = (items: Loan[]): NormalizedLoan[] => {
    return items.map((item) => {
        return {
            ...item,
            available: getNormalizedNumber(item.available),
            annualised_return: getNormalizedNumber(item.annualised_return),
            term_remaining: getNormalizedNumber(item.term_remaining),
            ltv: getNormalizedNumber(item.ltv),
            amount: getNormalizedNumber(item.amount),
        }
    })
}