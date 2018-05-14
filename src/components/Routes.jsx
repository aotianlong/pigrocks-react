import React from "react"
import { Route } from "react-router"
import { Switch } from "react-router-dom"

import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import { routerActions } from 'react-router-redux'


// pages
import NewRecommendationPage from "./NewRecommendationPage"
import RecommendationsPage from "./RecommendationsPage"
import EditRecommendationPage from "./EditRecommendationPage"
import RecommendationPage from "./RecommendationPage"
      
import NewGroupPostPage from "./NewGroupPostPage"
import GroupPostsPage from "./GroupPostsPage"
import EditGroupPostPage from "./EditGroupPostPage"
import GroupPostPage from "./GroupPostPage"
      
import NewGroupTopicPage from "./NewGroupTopicPage"
import GroupTopicsPage from "./GroupTopicsPage"
import EditGroupTopicPage from "./EditGroupTopicPage"
import GroupTopicPage from "./GroupTopicPage"
      
import NewMessagePage from "./NewMessagePage"
import MessagesPage from "./MessagesPage"
import EditMessagePage from "./EditMessagePage"
import MessagePage from "./MessagePage"
      
import UsersPage from "./UsersPage"
import SettingsPage from "./SettingsPage"
import NotificationsPage from "./NotificationsPage"

import NewBookPage from "./NewBookPage"
import BooksPage from "./BooksPage"
import EditBookPage from "./EditBookPage"
import BookPage from "./BookPage"
      
import NewGroupPage from "./NewGroupPage"
import GroupsPage from "./GroupsPage"
import EditGroupPage from "./EditGroupPage"
import GroupPage from "./GroupPage"
      
import NewTweetPage from "./NewTweetPage"
import TweetsPage from "./TweetsPage"
import EditTweetPage from "./EditTweetPage"
import TweetPage from "./TweetPage"
      
import NewBlogPage from "./NewBlogPage"
import BlogsPage from "./BlogsPage"
import EditBlogPage from "./EditBlogPage"
import BlogPage from "./BlogPage"
      
import NewArticlePage from "./NewArticlePage"
import ArticlesPage from "./ArticlesPage"
import EditArticlePage from "./EditArticlePage"
import ArticlePage from "./ArticlePage"
      
import NewMoviePage from "./NewMoviePage"
import MoviesPage from "./MoviesPage"
import EditMoviePage from "./EditMoviePage"
import MoviePage from "./MoviePage"
      
import IndexPage from "./IndexPage"
import NewsPage from "./NewsPage"
import NotFoundPage from "./NotFoundPage"
import LoginPage from "./LoginPage"
import RegisterPage from "./RegisterPage"
import NewPasswordPage from "./NewPasswordPage"

import UserPage from "./UserPage"
import AttachmentPage from "./AttachmentPage"


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



let main = function(props){
  return (
    <Switch>
      <Route path="/" component={IndexPage} />
        <Route path="news" component={NewsPage} />
        <Route path="news/:id" component={ArticlePage} />
        <Route path="login" component={LoginPage} />
        <Route path="register" component={RegisterPage} />
        <Route path="password/new" component={NewPasswordPage} />
        <Route path="u/:username" component={UserPage} />

        /* attachments */
        <Route path="attachments/:id" component={AttachmentPage} />
        
        /* routes for Movie*/
        <Route path="movies" component={MoviesPage} />
        <Route path="movies/new" component={NewMoviePage} />
        <Route path="movies/:id" component={MoviePage} />
        <Route path="movies/:id/edit" component={EditMoviePage} />
        
        /* routes for Article*/
        <Route path="articles" component={ArticlesPage} />
        <Route path="articles/new" component={NewArticlePage} />
        <Route path="articles/:id" component={ArticlePage} />
        <Route path="articles/:id/edit" component={EditArticlePage} />
        
        /* routes for Blog*/
        <Route path="blogs" component={BlogsPage} />
        <Route path="blogs/new" component={requireAuthentication(NewBlogPage)} />
        <Route path="blogs/:id" component={BlogPage} />
        <Route path="blogs/:id/edit" component={EditBlogPage} />
        
        /* routes for Tweet*/
        <Route path="tweets" component={TweetsPage} />
        <Route path="tweets/new" component={NewTweetPage} />
        <Route path="tweets/:id" component={TweetPage} />
        <Route path="tweets/:id/edit" component={EditTweetPage} />
        
        
        /* routes for Book*/
        <Route path="books" component={BooksPage} />
        <Route path="books/new" component={NewBookPage} />
        <Route path="books/:id" component={BookPage} />
        <Route path="books/:id/edit" component={EditBookPage} />
        
        <Route path="users" component={UsersPage} />
        
        /* routes for Message*/
        <Route path="messages" component={MessagesPage} />
        <Route path="messages/new" component={NewMessagePage} />
        <Route path="messages/:id" component={MessagePage} />
        <Route path="messages/:id/edit" component={EditMessagePage} />

        /* notifications */
        <Route path="notifications" component={NotificationsPage} />

        /* settings */
        <Route path="settings" component={SettingsPage} />


        /* routes for Group*/
        <Route path="groups/" component={GroupsPage}>
          <Route path="new" component={NewGroupPage} />
          <Route path=":id" component={GroupPage} />
          <Route path=":id/edit" component={EditGroupPage} />

          /* routes for GroupTopic*/
          <Route path=":group_id/topics/" component={GroupTopicsPage} />
            <Route path="new" component={NewGroupTopicPage} />
            <Route path=":id" component={GroupTopicPage} />
            <Route path=":id/edit" component={EditGroupTopicPage} />
          </Route>
        </Route>

        
        /* routes for GroupPost*/
        <Route path="groups/:group_id/topics/:topic_id/posts" component={GroupPostsPage} />
        <Route path="groups/:group_id/topics/:topic_id/posts/new" component={NewGroupPostPage} />
        <Route path="groups/:group_id/topics/:topic_id/posts/:id" component={GroupPostPage} />
        <Route path="groups/:group_id/topics/:topic_id/posts/:id/edit" component={EditGroupPostPage} />


        <Route path="groups/:group_id/members" component={GroupMembersPage} />
        
        /* routes for Recommendation*/
        <Route path="recommendations" component={RecommendationsPage} />
        <Route path="recommendations/new" component={NewRecommendationPage} />
        <Route path="recommendations/:id" component={RecommendationPage} />
        <Route path="recommendations/:id/edit" component={EditRecommendationPage} />
        <Route component={NotFoundPage}/>
      </Route>
    </Switch>
  )
}

export default main;
