import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
// import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducers';

export type AppState = ReturnType<typeof reducer>;

const initialState = {};

export const store = createStore(reducer, initialState, applyMiddleware(thunk));
