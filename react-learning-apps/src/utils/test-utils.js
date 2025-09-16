import React from "react";
import { render } from '@testing-library/react';

import { Provider } from 'react-redux';
// import configureStore from 'redux-mock-store';
import { setupStore } from "../store/store";



export const renderWithProviders = (children) => {
    const initialState = {};
    const mockStore = setupStore(initialState);
    return { ...render(<Provider store={mockStore}> {children} </Provider>) };
}

export default renderWithProviders;