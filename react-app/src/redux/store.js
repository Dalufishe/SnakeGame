
import { combineReducers, createStore, compose } from "redux"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import gameReducer from "./reducer/gameReducer";
import historyGameReducer from "./reducer/historyGameReducer";


const reducer = combineReducers({
    historyGameReducer,
    gameReducer,

})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ["historyGameReducer"]
}

const persistedReducer = persistReducer(persistConfig, reducer)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(persistedReducer, composeEnhancers());
const persistor = persistStore(store)

export { store, persistor }