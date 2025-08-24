import { createAction, props } from '@ngrx/store';

export const increment = createAction('[Counter] Increment',
    props<{ value: number }>()
);
export const decrement = createAction('[Counter] Decrement',
    props<{ value: number }>());
export const reset = createAction('[Counter] Reset',
    props<{ value: number }>());
export const customIncrement = createAction(
    '[Counter] Custom Increment',
    props<{ value: number }>()
);