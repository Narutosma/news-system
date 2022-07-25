import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'
import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'
import collapsedSlice from '../features/collapsed/collapsedSlice';
import loaddingSlice from '../features/loadding/loaddingSlice';

const reducers = combineReducers({
  collapsed: collapsedSlice,
  loadding: loaddingSlice
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['loadding']
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
})
