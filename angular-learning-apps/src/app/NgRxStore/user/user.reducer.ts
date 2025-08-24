import { createReducer, on } from "@ngrx/store";
import { addUser, deleteUser, resetUser } from "./user.action";
export interface user {
    name: string,
    age: number
}

const initialState: user[] = [{
    name: "Ashok",
    age: 32
}]

console.log('initial state::', initialState);

const _userReducer = createReducer(
    initialState,
    on(addUser, (state, action) => ([
        ...state, action.value
    ])),
    on(deleteUser, (state, action) => state.filter(user => user.name !== action.value.name)),
    on(resetUser, (state) => initialState)
)

export const userReducers = (state: any, action: any) => {
    return _userReducer(state, action);
}