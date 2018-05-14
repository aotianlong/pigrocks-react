import dva from 'dva';
import createHistory from 'history/createBrowserHistory'
import createLoading from 'dva-loading'
import { message } from "antd"
import "antd/dist/antd.min.css"
import "./index.scss"
import "nprogress/nprogress.css"
import { createLogger } from "redux-logger"

import { routerReducer, routerMiddleware } from 'react-router-redux'
import { reducer as formReducer } from "redux-form"

let extraEnhancers = []
let extraReducers = {form: formReducer,router: routerReducer}

// 1. Initialize
let app;
if(process.env.NODE_ENV == "production"){
  app = dva({
    history: createHistory(),
    onError(e){
      //message.error(e.message);
    },
    extraEnhancers,
    extraReducers,
  });

} else {
  app = dva({
    history: createHistory(),
    onError(e){
      //message.error(e.message);
    },
    onAction: createLogger(),
    extraEnhancers,
    extraReducers,
  });
}

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

// home
app.model(require("./models/home/groups"));

// 2. Plugins
// app.use({});
app.use(createLoading());

// 3. Model
// app.model(require('./models/example'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
