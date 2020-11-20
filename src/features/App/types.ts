export interface Loan {
    id: string;
    title: string;
    tranche: string;
    available: string;
    annualised_return: string;
    term_remaining: string;
    ltv: string;
    amount: string;
}

export interface LoanResponse {
    loans: Loan[];
}

export interface NormalizedLoan extends Pick<Loan, 'id' | 'title' | 'tranche'> {
    available: number;
    annualised_return: number;
    term_remaining: number;
    ltv: number;
    amount: number;
}

// Record<loadId, investmentAmount>;
export type InvestmentRecord = Record<string, number>;