import { RootState } from "../../../store";
import { ChallengeState, initialState } from "../store/challengeStore";
import { getAmountAvailableStr, getInvestmentRecords, getIsInvestmentModalOpen, getLoanDetails, getNumberFormattedToCurrency, getSelectedLoanTitle, getTotalStr, getWhenLoanEnds } from "../store/selectors";
import { createLoan, createRootState } from "../../../__tests__/fixture";

import faker from 'faker';

describe('Challenge feature selectors', () => {
    it('should return a currecy string (in  pounds £) when calling `getNumberFormattedToCurrency`', () => {
        // Given
        const tenThausand = 10000;
        const threeFifty = 3.5;
        const thousandAndFiftyAndThirtyPence = 1050.30;
        // When
        const tenThausandPounds = getNumberFormattedToCurrency(tenThausand);
        const threeFiftyPounds = getNumberFormattedToCurrency(threeFifty);
        const thousandAndFiftyAndThirtyPencePounds = getNumberFormattedToCurrency(thousandAndFiftyAndThirtyPence);
        // Then
        expect(tenThausandPounds).toEqual('£10,000.00');
        expect(threeFiftyPounds).toEqual('£3.50');
        expect(thousandAndFiftyAndThirtyPencePounds).toEqual('£1,050.30');
    });

    it('should get the right state from challengeStore when calling `getInvestmentRecords`', () => {
        const investmentRecords = {
            [faker.random.word()]: faker.random.number(),
            [faker.random.word()]: faker.random.number(),
            [faker.random.word()]: faker.random.number(),
        }

        const state: RootState = createRootState({
            Challenge: {
                investmentRecords,
            }
        });

        const investmentRecordsFromStore = getInvestmentRecords(state);

        expect(investmentRecordsFromStore).toEqual(investmentRecords);
    });

    it('should return the investment toatal as currency string (in pounds £) when calling `getTotalStr`', () => {    
            const investmentRecords = {
                [faker.random.word()]: 100,
                [faker.random.word()]: 2500.50,
                [faker.random.word()]: 777.77,
            }

            const state: RootState = createRootState({
                Challenge: {
                    investmentRecords,
                }
            });
    
            const investmentRecordsFromStore = getTotalStr(state);
    
            const totalInPounds = '£3,378.27';
    
            expect(investmentRecordsFromStore).toEqual(totalInPounds);
    });

    it('showuld return the display state of the modal (default=false) when calling `getIsInvestmentModalOpen`', () => {
        const state: RootState = createRootState({});

        const isModalOpen = getIsInvestmentModalOpen(state);

        expect(isModalOpen).toEqual(false);
    });

    it('should return the title of the selected load when calling `getSelectedLoanTitle`', () => {
        const title = faker.random.word();
        const id = faker.random.word();

        const state: RootState = createRootState({
            App: {
                loans: [ createLoan({id ,title,}), ],
            },
            Challenge: {
                selectedLoanId: id,
            }
        });

        const selectedLoadTitle = getSelectedLoanTitle(state);

        expect(selectedLoadTitle).toEqual(title);
    });

    it ('should return the amount available of the selected loan when calling `getAmountAvailableStr`', () => {        
        const id = faker.random.word();

        const state: RootState = createRootState({
            App: {
                loans: [ createLoan({id, available: 10000}), ],
            },
            Challenge: {
                selectedLoanId: id,
            }
        });

        const selectedLoadAmountAvailable = getAmountAvailableStr(state);

        expect(selectedLoadAmountAvailable).toEqual('£10,000.00');
    });

    it('should return when the loan ends in human format when calling `getWhenLoanEnds`', () => {
        const id = faker.random.word();

        const days = faker.random.number({min:1, max: 28});

        const dayInSeconds = days * 24 * 60 * 60;

        const state: RootState = createRootState({
            App: {
                loans: [ createLoan({id, term_remaining: dayInSeconds}), ],
            },
            Challenge: {
                selectedLoanId: id,
            }
        });

        const whenLoanEnds = getWhenLoanEnds(state);

        const expectation = `${days} day${days > 1 ? 's' : ''}`;

        expect(whenLoanEnds).toEqual(expectation);
    });

    it('should return `never` when calling `getWhenLoanEnds` without loan selected', () => {
        const id = faker.random.word();

        const days = faker.random.number({min:1, max: 28});

        const dayInSeconds = days * 24 * 60 * 60;

        const state: RootState = createRootState({
            App: {
                loans: [ createLoan({id, term_remaining: dayInSeconds}), ],
            },
        });

        const whenLoanEnds = getWhenLoanEnds(state);

        expect(whenLoanEnds).toEqual('never');
    });

    it('should return formatted loan details when calling `getLoanDetails`', () => {
        const loan = createLoan({
            tranche: 'Z',
            amount: 10000,
            annualised_return: 5.5,
            term_remaining: 86400,
        });

        const expectation = 'Tranche: Z | Amount: £10,000.00 | Annual return: 5.5% | Loan ends in: 1 day';

        const loanDetails = getLoanDetails(loan);

        expect(loanDetails).toEqual(expectation);
    });
});