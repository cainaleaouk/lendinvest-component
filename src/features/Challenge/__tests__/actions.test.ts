import { ChallengeStore, initialState } from "../store/challengeStore";
import faker from 'faker';

describe('Challenge feature ChallengeStore actions', () => {
    it('should return the right action when calling `addInvestment` WITHOUT loan selected', () => {
        const investment = faker.random.number();

        const action = ChallengeStore.actions.addInvestment(investment);

        const nextState = ChallengeStore.reducer(initialState, action);
        
        expect(action).toEqual({
            type: ChallengeStore.actions.addInvestment.type,
            payload: investment,
        });
        expect(nextState).toEqual(initialState);
    });

    it('should return the right action when calling `addInvestment` WITH loan selected', () => {
        const investment = faker.random.number();
        const id = faker.random.word();

        const action = ChallengeStore.actions.addInvestment(investment);

        const state = {
            ...initialState,
            selectedLoanId: id, 
        };

        const nextState = ChallengeStore.reducer(state, action);
        
        expect(action).toEqual({
            type: ChallengeStore.actions.addInvestment.type,
            payload: investment,
        });
        expect(nextState).toEqual({
            ...state,
            investmentRecords: {
                [id]: investment,
            }
        });
    });

    it('should return the right action when calling `addInvestment` on already invested loan', () => {
        const investment = faker.random.number();
        const id = faker.random.word();
        const initialInvestment = faker.random.number();

        const action = ChallengeStore.actions.addInvestment(investment);

        const state = {
            ...initialState,
            investmentRecords: {[id]: initialInvestment},
            selectedLoanId: id, 
        };

        const nextState = ChallengeStore.reducer(state, action);
        
        expect(action).toEqual({
            type: ChallengeStore.actions.addInvestment.type,
            payload: investment,
        });
        expect(nextState).toEqual({
            ...state,
            investmentRecords: {
                [id]: initialInvestment+investment,
            }
        });
    });

    it('should return the right action when calling `closeInvestmentModal`', () => {
        const action = ChallengeStore.actions.closeInvestmentModal();

        const nextState = ChallengeStore.reducer(initialState, action);

        expect(action).toEqual({
            type: ChallengeStore.actions.closeInvestmentModal.type,
        });
        expect(nextState).toEqual({
            ...initialState,
            showInvestmentModal: false,
        });
    });

    it('should return the right action when calling `investInLoanId`', () => {
        const loanId = faker.random.word();

        const action = ChallengeStore.actions.investInLoanId(loanId);

        const nextState = ChallengeStore.reducer(initialState, action);

        expect(action).toEqual({
            type: ChallengeStore.actions.investInLoanId.type,
            payload: loanId,
        });
        expect(nextState).toEqual({
            ...initialState,
            showInvestmentModal: true,
            selectedLoanId: loanId,
        });
    });
});

/*
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../../actions/TodoActions'
import * as types from '../../constants/ActionTypes'
import fetchMock from 'fetch-mock'
import expect from 'expect' // You can use any testing library

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  it('creates FETCH_TODOS_SUCCESS when fetching todos has been done', () => {
    fetchMock.getOnce('/todos', {
      body: { todos: ['do something'] },
      headers: { 'content-type': 'application/json' }
    })

    const expectedActions = [
      { type: types.FETCH_TODOS_REQUEST },
      { type: types.FETCH_TODOS_SUCCESS, body: { todos: ['do something'] } }
    ]
    const store = mockStore({ todos: [] })

    return store.dispatch(actions.fetchTodos()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
*/