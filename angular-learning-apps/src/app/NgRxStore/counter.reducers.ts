import { createReducer, on } from "@ngrx/store"
import { increment, decrement, reset, customIncrement } from "./counter.action"


const initialState = 0;

const _counterReducer = createReducer(
    initialState,
    on(increment, (state, action) => state + action.value),
    on(decrement, (state, action) => state - action.value),
    on(reset, (state) => initialState),
    on(customIncrement, (state, action) => state + (action.value + 1))
)

export const counterReducers = (state: any, action: any) => {
    return _counterReducer(state, action);
}