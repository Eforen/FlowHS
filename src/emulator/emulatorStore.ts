import { Store, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';
import { EmulatorState } from './state/emulatorState';
import { EmulatorReducer } from './reducers/emultatorReducer';

export const emulatorStore: Store<EmulatorState> = 
  createStore(EmulatorReducer, applyMiddleware(thunk, logger))