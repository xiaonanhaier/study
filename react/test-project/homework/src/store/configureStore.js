import { createStore, applyMiddleware,compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import { asyncMiddleware } from 'redux-amrc';

export default function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(thunk,asyncMiddleware),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )

    );

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers').default;
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
