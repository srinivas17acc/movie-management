import React, { Component } from 'react';
import './App.css';
import {
  Route,
  withRouter,
  Switch
} from 'react-router-dom';

import { getCurrentUser } from '../util/APIUtils';
import { ACCESS_TOKEN } from '../constants';
import CreateMovie from '../movies/CreateMovies'
import Login from '../user/login/Login';
import Signup from '../user/signup/Signup';
import Profile from '../user/profile/Profile';
import AppHeader from '../common/AppHeader';
import NotFound from '../common/NotFound';
import LoadingIndicator from '../common/LoadingIndicator';
import MovieList from '../movies/MovieList';

import { Layout, notification } from 'antd';
const { Content } = Layout;



class App extends Component {
   

  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: false,
      isWSOpen:false
    }
    this.handleLogout = this.handleLogout.bind(this);
    this.loadCurrentUser = this.loadCurrentUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

    notification.config({
      placement: 'topRight',
      top: 70,
      duration: 3,
    });    
  }

  loadCurrentUser() {
    this.setState({
      isLoading: true
    });
    getCurrentUser()
    .then(response => {
      this.setState({
        currentUser: response,
        isAuthenticated: true,
        isLoading: false
      });
    }).then(res => {
          
             this.ws.onopen = () => {
                   console.log('connected')
              }
      
              this.ws.onclose = () => {
              console.log('disconnected')
      
              }
         
    })
    
    
    .catch(error => {
      this.setState({
        isLoading: false
      });  
    });
  }

  componentDidMount() {
    this.loadCurrentUser();
    this.ws = new WebSocket('ws://localhost:8000/movie');
    this.ws.onopen = () => {
      console.log("websocket openned...");
      if (this.ws.readyState === WebSocket.OPEN) {
        this.setState({ isWSOpen: true });
      }
    };
    
  }
  
  handleLogout(redirectTo="/", notificationType="success", description="You're successfully logged out.") {
    localStorage.removeItem(ACCESS_TOKEN);

    this.setState({
      currentUser: null,
      isAuthenticated: false
    });

    this.props.history.push(redirectTo);
    
    notification[notificationType]({
      message: 'Movie App',
      description: description,
    });
  }

  handleLogin() {
    notification.success({
      message: 'Movie App',
      description: "You're successfully logged in.",
    });
    this.loadCurrentUser();
    this.props.history.push("/");
  }

  render() {
    if(this.state.isLoading || !this.state.isWSOpen ) {
      return <LoadingIndicator />
    }
    const socket = this.ws;
    if (this.ws != null) {
      console.log('ws present')
    }
    debugger;
    return (
        <Layout className="app-container">
          <AppHeader isAuthenticated={this.state.isAuthenticated} 
            currentUser={this.state.currentUser} 
            onLogout={this.handleLogout} />

          <Content className="app-content">
            <div className="container">
              <Switch>      
                <Route exact path={["/", "/films"]}
                  render={(props) => <MovieList movies={[]} socket={this.ws} {...props} />}>
                </Route>
                <Route path="/login" 
                  render={(props) => <Login onLogin={this.handleLogin} {...props} />}></Route>
                <Route path="/signup" component={Signup}></Route>
                <Route path="/users/:username" 
                  render={(props) => <Profile isAuthenticated={this.state.isAuthenticated} currentUser={this.state.currentUser} {...props}  />}>
                </Route>
                <Route path="/create" 
                  render={(props) => <CreateMovie socketObj={this.ws} {...props} />}></Route>
                <Route component={NotFound}></Route>

                
              </Switch>
            </div>
          </Content>
        </Layout>
    );
  }
}

export default withRouter(App);
