import faker from 'faker';
import { RootState } from '../../../store';
import { getNumberFormattedToCurrency } from '../../Challenge/store/selectors';
import { createRootState } from '../../../__tests__/fixture';
import { getIsLoading, getLoans, getNormalizedLoans, getNormalizedNumber } from "../store/selectors";
import { LoanResponse } from '../types';

const dataFixture: LoanResponse = require('../../../fixtures/data.json');

describe('App feature selectors', () => {
    it('should return app loading state (default=false) when calling `getNormagetIsLoadinglizedNumber`', () => {
        const state: RootState = createRootState({});

        const isLoading = getIsLoading(state);

        expect(isLoading).toBeFalsy();
    });

    it('should return loans when calling `getLoans`', () => {
        const state: RootState = createRootState({});

        const loans = getLoans(state);

        expect(loans).toEqual([]);
    });

    //@TODO: this is not an actual selector, move it to a utils test file
    it('should return normalised number when calling `getNormalizedNumber`', () => {

        const numberStr = "85,754"; // number collected from `data.json` fixture
        
        const normalisedNumber = getNormalizedNumber(numberStr);

        const number = faker.random.number(1000);

        const currency = getNumberFormattedToCurrency(number);

        const normalisedCurrency = getNormalizedNumber(currency);

        expect(normalisedNumber).toEqual(85754);
        expect(normalisedCurrency).toEqual(number);
    });

    it('should return loans in the app normal format when calling `getNormalizedLoans`', () => {
        const normalisedLoan = getNormalizedLoans(dataFixture.loans);

        const expectation = [
            {
              "id": "1",
              "title": "Voluptate et sed tempora qui quisquam.",
              "tranche": "A",
              "available": 11959,
              "annualised_return": 8.60,
              "term_remaining": 864000,
              "ltv": 48.80,
              "amount": 85754,
            },
            {
              "id": "5",
              "title": "Consectetur ipsam qui magnam minus dolore ut fugit.",
              "tranche": "B",
              "available": 31405,
              "annualised_return": 7.10,
              "term_remaining": 1620000,
              "ltv": 48.80,
              "amount": 85754,
            },
            {
              "id": "12",
              "title": "Dolores repudiandae ut voluptas unde laborum quaerat et sapiente.",
              "tranche": "C",
              "available": 12359,
              "annualised_return": 4.80,
              "term_remaining": 879000,
              "ltv": 48.80,
              "amount": 85754,
            }
        ];

        expect(normalisedLoan).toEqual(expectation);
    });
});
