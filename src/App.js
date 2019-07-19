import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import BreweryContainer from './containers/BreweryContainer'
import Favorites from './components/Favorites'
import LoginForm from './components/LoginForm'
import SignUpForm from './components/SignUpForm'
import { Switch, Route } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'
class App extends React.Component {
  state = {
    currentUser: null,
    searchTerm: '',
    breweries: [],
    loading: true,
    likes: 0,
    dislikes: 0
  };

  setCurrentUser = (user) => {
		this.setState({
			currentUser: user
		})
  }

  handleSearch = (event) => {
    this.setState({
      searchTerm: event.target.value.toLowerCase()
    })
  }

  logout = () => {
		this.setState({
			currentUser: null
    })
    localStorage.removeItem("token")
		this.props.history.push("/login")
  }

  fetchBreweries = () => {
    fetch('http://localhost:3000/breweries')
    .then(response => response.json())
    .then(data => {
      this.setState({
        breweries: data
      })
    })
  }


  handleFavoriteClick = (breweryID) => {
    if (this.state.currentUser !== null) {
      fetch(`http://localhost:3000/favorite/${this.state.currentUser.id}/brewery/${breweryID}`)
      .then(response => response.json())
      .then((data) => {
          this.setState({
            currentUser: data,
          })
      })
      // fetch(`http://localhost:3000/favorite/${this.state.currentUser.id}/brewery/${breweryID}`, {
      //   method: 'PATCH',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Accept': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     favorites: !this.state.favorites
      //   })
      // }
      //   )
      //   .then(response => response.json())
      //   .then(data => {
      //     this.setState({
      //       currentUser: data
      //     })
      //   })
    } else {
      alert ('You are not logged in')
    }

  }

  componentDidMount () {
    this.fetchBreweries();

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
            currentUser: response,
            loading: false,
          })
          // console.log(response)
        }
      })
    }
  }

    
  render(){
    if (this.state.loading) {
      return (
        <img
          alt="loading..."
          className="loader"
          centered
          src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/source.gif"
        />
      );
    }
    return (
			<Grid>
        <NavBar 
          currentUser={this.state.currentUser} 
          logout={this.logout} />
				<Grid.Row centered>
					<Switch>
            <Route exact path="/users/:id" render={routerProps => <Favorites 
              currentUser={this.state.currentUser} 
              handleFavoriteClick={this.handleFavoriteClick}
              favorites={this.state.favorites}
              {...routerProps} 
            /> } />
            
            <Route exact path='/' render={routerProps => <BreweryContainer 
              currentUser={this.state.currentUser} 
              breweries={this.state.breweries} 
              {...routerProps} 
              searchTerm={this.state.searchTerm} 
              handleSearch={this.handleSearch} 
              handleFavoriteClick={this.handleFavoriteClick}
              />} 
              />
						
            <Route exact path="/login" render={(routerProps) => {
              return <LoginForm 
                setCurrentUser={this.setCurrentUser} 
                {...routerProps}/>
						}} />
						
            <Route exact path="/signup" render={(routerProps) => {
              return <SignUpForm 
                setCurrentUser={this.setCurrentUser}
                {...routerProps}/>
						}} />

					</Switch>
				</Grid.Row>  
			</Grid>
    );
  }

}

export default App;
