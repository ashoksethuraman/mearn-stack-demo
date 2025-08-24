import { createAction, props } from "@ngrx/store";
import { user } from "./user.reducer";

export const loadUser = createAction('[user] load',
    props<{ value: user[] }>()
);

export const addUser = createAction('[user] add',
    props<{ value: user }>()
);
export const deleteUser = createAction('[user] delete',
    props<{ value: user }>()
);
export const resetUser = createAction('[user] reset');