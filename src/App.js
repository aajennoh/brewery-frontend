import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Profile from './components/Profile'
import LoginForm from './components/LoginForm'
import SignUpForm from './components/SignUpForm'

import { Switch, Route } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'
class App extends React.Component {
  state = {
    currentUser: null,
    searchTerm: '',
    breweries: []
  };

    componentDidMount () {
      const token = localStorage.getItem('token')
      if (token) {
        fetch('http://localhost:3000/auto_login', {
          headers: {
            "Authorization": token
          }
        })
        .then(res => res.json())
        .then(response => {
          if (response.errors){
            localStorage.removeItem("user_id")
            alert(response.errors)
          } else {
            this.setState({
              currentUser: response
            })
            console.log(response)
          }
        })
    }
  }

  setCurrentUser = (user) => {
		this.setState({
			currentUser: user
		})
  }
  
  logout = () => {
		this.setState({
			currentUser: null
		})

		this.props.history.push("/login")
	}
    
  render(){
    console.log('rendering?')
    return (
			<Grid>
				<NavBar currentUser={this.state.currentUser} logout={this.logout} />
				<Grid.Row centered>
					<Switch>
						<Route path="/users/:id" component={Profile} />
						<Route path="/login" render={(routerProps) => {
							return <LoginForm setCurrentUser={this.setCurrentUser} {...routerProps}/>
						}} />
						<Route path="/signup" render={(routerProps) => {
							return <SignUpForm setCurrentUser={this.setCurrentUser} {...routerProps}/>
						}} />
					</Switch>
				</Grid.Row>
			</Grid>
    );
  }

}

export default App;
