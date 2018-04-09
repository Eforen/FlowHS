import { Store, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';
import { EmulatorState } from './state/emulatorState';

export const emulatorStore: Store<EmulatorState> = 
  createStore(emulatorReducer, applyMiddleware(thunk, logger))