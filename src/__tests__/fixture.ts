import { RootState } from "../store";
import { AppState, initialState as appStoreInitialState } from "../features/App/store/appStore";
import { NormalizedLoan } from "../features/App/types";
import { ChallengeState, initialState as challengeStoreInitialState } from "../features/Challenge/store/challengeStore";
import faker from 'faker';

export const createAppState = (partialAppState?: Partial<AppState>): AppState => ({
    ...appStoreInitialState,
    ...partialAppState,
});

export const createChallengeState = (partialChallengeState?: Partial<ChallengeState>): ChallengeState => ({
    ...challengeStoreInitialState,
    ...partialChallengeState,
});

interface PartialStates {
    App?: Partial<AppState>,
    Challenge?: Partial<ChallengeState>
}

export const createRootState = ({
    App,
    Challenge,
}: PartialStates): RootState => ({
    App: createAppState(App),
    Challenge: createChallengeState(Challenge),
});

export const createLoan = (partialLoan: Partial<NormalizedLoan>): NormalizedLoan => ({
    id: faker.random.word(),
    title: faker.random.word(),
    tranche: faker.random.word(),
    available: faker.random.number(),
    annualised_return: faker.random.number(),
    term_remaining: faker.random.number(),
    ltv: faker.random.number(),
    amount: faker.random.number(),
    ...partialLoan,
});