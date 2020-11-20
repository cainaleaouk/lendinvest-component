import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { AppStore } from "./features/App/store/appStore";
import { ChallengeStore } from "./features/Challenge/store/challengeStore";

const reducer = combineReducers({
    [AppStore.name]: AppStore.reducer,
    [ChallengeStore.name]: ChallengeStore.reducer,
  });
  
  export const store = configureStore({
    reducer,
  });
  
  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;
  