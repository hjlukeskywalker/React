import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";

import User from "./modules/user";

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  user: User,
  router: connectRouter(history),
});

  const middlewares = [thunk.withExtraArgument({history:history})];

  //환경 정보 : 개발환경, 프로덕션(배포)환경 ...)
  const env = process.env.NODE_ENV;
  
  //로거사용
  if (env === "development") {
    const { logger } = require("redux-logger");
    middlewares.push(logger);
  }

  const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

    const enhancer = composeEnhancers(
        applyMiddleware(...middlewares)
        //여러개의 미들웨어
      );

      let store = (initialStore) => createStore(rootReducer, enhancer);

export default store();