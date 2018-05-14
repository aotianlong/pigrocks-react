import React from 'react';
import { Router, Route, Switch, IndexRedirect } from 'dva/router';
import IndexPage from './routes/IndexPage.jsx';

import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import { routerActions } from 'react-router-redux'

// pages
import NewRecommendationPage from "./routes/NewRecommendationPage"
import RecommendationsPage from "./routes/RecommendationsPage"
import EditRecommendationPage from "./routes/EditRecommendationPage"
import RecommendationPage from "./routes/RecommendationPage"
      
import NewGroupPostPage from "./routes/NewGroupPostPage"
import GroupPostsPage from "./routes/GroupPostsPage"
import EditGroupPostPage from "./routes/EditGroupPostPage"
import GroupPostPage from "./routes/GroupPostPage"
      
import NewGroupTopicPage from "./routes/NewGroupTopicPage"
import GroupTopicsPage from "./routes/GroupTopicsPage"
import EditGroupTopicPage from "./routes/EditGroupTopicPage"
import GroupTopicPage from "./routes/GroupTopicPage"

import GroupMembersPage from "./routes/GroupMembersPage"
      
import NewMessagePage from "./routes/NewMessagePage"
import MessageSessionPage from "./routes/MessageSessionPage"
import MessagesPage from "./routes/MessagesPage"
import MessagePage from "./routes/MessagePage"
      
import UsersPage from "./routes/UsersPage"
import SettingsPage from "./routes/SettingsPage"
import NotificationsPage from "./routes/NotificationsPage"

import NewBookPage from "./routes/NewBookPage"
import BooksPage from "./routes/BooksPage"
import EditBookPage from "./routes/EditBookPage"
import BookPage from "./routes/BookPage"
      
import BrowseGroupsPage from "./routes/BrowseGroupsPage"
import NewGroupPage from "./routes/NewGroupPage"
import GroupsPage from "./routes/GroupsPage"
import EditGroupPage from "./routes/EditGroupPage"
import GroupPage from "./routes/GroupPage"
      
import NewTweetPage from "./routes/NewTweetPage"
import TweetsPage from "./routes/TweetsPage"
import EditTweetPage from "./routes/EditTweetPage"
import TweetPage from "./routes/TweetPage"
      
import NewBlogPage from "./routes/NewBlogPage"
import BlogsPage from "./routes/BlogsPage"
import EditBlogPage from "./routes/EditBlogPage"
import BlogPage from "./routes/BlogPage"
      
import NewArticlePage from "./routes/NewArticlePage"
import ArticlesPage from "./routes/ArticlesPage"
import EditArticlePage from "./routes/EditArticlePage"
import ArticlePage from "./routes/ArticlePage"
      
import NewMoviePage from "./routes/NewMoviePage"
import MoviesPage from "./routes/MoviesPage"
import EditMoviePage from "./routes/EditMoviePage"
import MoviePage from "./routes/MoviePage"
      
import NewsPage from "./routes/NewsPage"
import NotFoundPage from "./routes/NotFoundPage"
import LoginPage from "./routes/LoginPage"
import RegisterPage from "./routes/RegisterPage"
import NewPasswordPage from "./routes/NewPasswordPage"
import EditPasswordPage from "./routes/EditPasswordPage"

import UserPage from "./routes/UserPage"
import AttachmentPage from "./routes/AttachmentPage"

// home
import HomeGroupsPage from "./routes/home/GroupsPage"

import EditAvatarPage from "./routes/EditAvatarPage"
import LikesPage from "./routes/LikesPage"

import UnlockUserPage from "./routes/UnlockUserPage"

const requireAuthentication = connectedRouterRedirect({
   // The url to redirect user to if they fail
  redirectPath: '/login',
   // Determine if the user is authenticated or not
  authenticatedSelector: state => {
    return !!state.global.currentUser;
  },
  // A nice display name for this check
  wrapperDisplayName: 'UserIsAuthenticated',
  redirectAction: routerActions.replace
})

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={IndexPage} />
        <Route exact path="/news" component={NewsPage} />
        <Route exact path="/news/:id" component={ArticlePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/password/new" component={NewPasswordPage} />
        <Route exact path="/password/edit" component={EditPasswordPage} />

        <Route exact path="/u/:username" component={UserPage} />
        <Route exact path="/u/:username/friends" component={UserPage} />
        <Route exact path="/u/:username/likes" component={UserPage} />
        <Route exact path="/u/:username/groups" component={UserPage} />

        /* attachments */
        <Route exact path="/attachments/:id" component={AttachmentPage} />
        
        /* routes for Movie*/
        <Route exact path="/movies" component={MoviesPage} />
        <Route exact path="/movies/new" component={NewMoviePage} />
        <Route exact path="/movies/:id" component={MoviePage} />
        <Route exact path="/movies/:id/edit" component={EditMoviePage} />
        
        /* routes for Article*/
        <Route exact path="/articles" component={ArticlesPage} />
        <Route exact path="/articles/new" component={requireAuthentication(NewArticlePage)} />
        <Route exact path="/articles/:id" component={ArticlePage} />
        <Route exact path="/articles/:id/edit" component={requireAuthentication(EditArticlePage)} />
        
        /* routes for Blog*/
        <Route exact path="/blogs" component={BlogsPage} />
        <Route exact path="/blogs/new" component={requireAuthentication(NewBlogPage)} />
        <Route exact path="/blogs/:id" component={BlogPage} />
        <Route exact path="/blogs/:id/edit" component={requireAuthentication(EditBlogPage)} />
        
        /* routes for Tweet*/
        <Route exact path="/tweets" component={TweetsPage} />
        <Route exact path="/tweets/new" component={requireAuthentication(NewTweetPage)} />
        <Route exact path="/tweets/:id" component={TweetPage} />
        <Route exact path="/tweets/:id/edit" component={requireAuthentication(EditTweetPage)} />
        
        /* routes for Group*/
        <Route exact path="/groups" component={GroupsPage} />
        <Route exact path="/groups/new" component={requireAuthentication(NewGroupPage)} />
        <Route exact path="/groups/browse" component={BrowseGroupsPage} />
        <Route exact path="/groups/:id" component={GroupPage} />
        <Route exact path="/groups/:id/edit" component={requireAuthentication(EditGroupPage)} />
        
        /* routes for Book*/
        <Route exact path="/books" component={BooksPage} />
        <Route exact path="/books/new" component={requireAuthentication(NewBookPage)} />
        <Route exact path="/books/:id" component={BookPage} />
        <Route exact path="/books/:id/edit" component={requireAuthentication(EditBookPage)} />
        
        <Route exact path="/users" component={UsersPage} />
        <Route exact path="/users/unlock" component={UnlockUserPage} />
        
        /* routes for Message*/
        <Route exact path="/messages" component={requireAuthentication(MessagesPage)} />
        <Route exact path="/messages/new" component={requireAuthentication(NewMessagePage)} />
        <Route exact path="/messages/:id" component={requireAuthentication(MessagePage)} />
        <Route exact path="/messages/session/:user" component={requireAuthentication(MessageSessionPage)} />

        /* notifications */
        <Route exact path="/notifications" component={requireAuthentication(NotificationsPage)} />

        /* settings */
        <Route exact path="/settings" component={requireAuthentication(SettingsPage)} />


        
        /* routes for GroupTopic*/
        <Route exact path="/groups/:group_id/topics" component={GroupTopicsPage} />
        <Route exact path="/groups/:group_id/topics/new" component={requireAuthentication(NewGroupTopicPage)} />
        <Route exact path="/groups/:group_id/topics/:id" component={GroupTopicPage} />
        <Route exact path="/groups/:group_id/topics/:id/likes" component={GroupTopicPage} />
        <Route exact path="/groups/:group_id/topics/:id/recommends" component={GroupTopicPage} />
        <Route exact path="/groups/:group_id/topics/:id/edit" component={requireAuthentication(EditGroupTopicPage)} />
        <Route exact path="/groups/:group_id/members" component={GroupMembersPage} />
        <Route exact path="/groups/:group_id/members/blocked" component={GroupMembersPage} />
        <Route exact path="/groups/:group_id/members/admin" component={GroupMembersPage} />
        <Route exact path="/groups/:group_id/members/pending" component={GroupMembersPage} />
        <Route exact path="/groups/:group_id/members/normal" component={GroupMembersPage} />
        
        /* routes for GroupPost*/
        <Route exact path="/groups/:group_id/topics/:topic_id/posts" component={GroupPostsPage} />
        <Route exact path="/groups/:group_id/topics/:topic_id/posts/new" component={requireAuthentication(NewGroupPostPage)} />
        <Route exact path="/groups/:group_id/topics/:topic_id/posts/:id" component={GroupPostPage} />
        <Route exact path="/groups/:group_id/topics/:topic_id/posts/:id/edit" component={requireAuthentication(EditGroupPostPage)} />
        
        /* routes for Recommendation*/
        <Route exact path="/recommendations" component={RecommendationsPage} />
        <Route exact path="/recommendations/new" component={requireAuthentication(NewRecommendationPage)} />
        <Route exact path="/recommendations/:id" component={RecommendationPage} />
        <Route exact path="/recommendations/:id/edit" component={requireAuthentication(EditRecommendationPage)} />

        /* home */
        <Route exact path="/home/groups" component={requireAuthentication(HomeGroupsPage)} />

        <Route exact path="/avatar/edit" component={requireAuthentication(EditAvatarPage)} />
        <Route exact path="/likes" component={requireAuthentication(LikesPage)} />

        <Route component={NotFoundPage}/>
      </Switch>
    </Router>
  );
}

export default RouterConfig;
