import dva from 'dva';
import createHistory from 'history/createMemoryHistory'
import { message } from "antd"
import { createLogger } from "redux-logger"

import { routerReducer, routerMiddleware } from 'react-router-redux'
import { reducer as formReducer } from "redux-form"

let extraEnhancers = []
let extraReducers = {form: formReducer,router: routerReducer}

// 1. Initialize
const app = dva({
  history: createHistory(),
  onError(e){
    message.error(e.message);
  },
  onAction: createLogger(),
  extraEnhancers,
  extraReducers,
});

/*
app.model(require("./models/index"));
app.model(require("./models/breadcrumbs"));
app.model(require("./models/movies"));
app.model(require("./models/users"));
app.model(require("./models/recommendations"));
app.model(require("./models/group_posts"));
app.model(require("./models/group_topics"));
app.model(require("./models/groups"));
app.model(require("./models/group_members"));
app.model(require("./models/messages"));
app.model(require("./models/message_sessions"));
app.model(require("./models/notifications"));
app.model(require("./models/books"));
app.model(require("./models/blogs"));
app.model(require("./models/tweets"));
app.model(require("./models/global"));
app.model(require("./models/articles"));
app.model(require("./models/newsPanel"));
app.model(require("./models/friendships"));
app.model(require("./models/profiles"));
app.model(require("./models/likes"));
app.model(require("./models/home/groups"));
*/

// 4. Router
app.router(require('./router'));

// 5. Start
export default app
