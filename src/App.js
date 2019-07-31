import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import BreweryContainer from './containers/BreweryContainer';
import StateContainer from './components/StateContainer'
import Favorites from './components/Favorites';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import BreweryNearMe from './components/BreweryNearMe';
import { Switch, Route } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import 'react-svg-map/lib/index.css';
import { SVGMap, USA } from 'react-svg-map';

import InfiniteScroll from 'react-infinite-scroll-component';
import { Dimmer, Loader } from 'semantic-ui-react';

class App extends React.Component {
  // contextRef = createRef()
  state = {
    currentUser: null,
    searchTerm: '',
    breweries: [],
    loading: false,
    page: 1,
    locations: [],
    currentLatitude: '',
    currentLongitude: '',
    breweriesNearMe: []
  };

  setBreweriesNearMe = (data) => {
    this.setState({
      breweriesNearMe: data
    })
  }

  setStateLocation = (data) => {
    this.setState((prevState => {
      return {
        locations: data,
        page: prevState.page + 1
      }
    }))
  }

  resetStateLocation = () => {
    this.setState({
      locations: [],
      page: 1
    })
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
    localStorage.removeItem("token")
		this.props.history.push("/login")
  }


  fetchBreweries = () => {
    fetch (`http://localhost:3000/breweries/get_page/${this.state.page}`)
    .then(response => response.json())
    .then(data => {
      // console.log(data[0])
      this.setState((prevState) => {
        return {
          breweries: prevState.breweries.concat(data)
        }
      })
    })
  }

  fetchMoreBreweries = () => {
    this.setState((prevState => {
      return {
        page: prevState.page + 1
      }
    }), this.fetchBreweries)
  }

  fetchStateBreweries = (stateName) => {
    console.log(stateName)
    fetch (`http://localhost:3000/breweries/get_state${stateName}/${this.state.page}`)
    .then(response => response.json())
    .then(data => {
      // console.log(data[0])
      this.setState((prevState) => {
        return {
          locations: prevState.locations.concat(data)
        }
      })
    })
  }

  fetchMoreStateBreweries = (url) => {
    console.log(url)
    this.setState((prevState => {
      return {
        page: prevState.page + 1
      }
    }), this.fetchStateBreweries(url))
  }



  fetchMostLiked = () => {
    fetch('http://localhost:3000/breweries/most_liked')
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
            currentUser: data
          })
      })
    } else {
      alert ('You are not logged in')
    }
  }

  handleSearch = (value) => {
    this.setState({
      searchTerm: value.toLowerCase()
    })
  }

  renderAdded = (newBrewery) => {
    this.setState({
      allBreweries: [...this.state.breweries, newBrewery]
    })
  }

  clickState = (event) => {
    this.props.history.push(`/${event.target.attributes[1].value}`)
  }

  componentDidMount () {
    this.fetchBreweries();
    this.geolocation()
    // this.fetchMostLiked();

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

  geolocation = () => {
    // console.log('hi', API_KEY)
    fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=${YOUR_API_KEY}, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      this.setState({
        currentLatitude: data.location.lat,
        currentLongitude: data.location.lng
      })
    })
  }
    
  render(){
    // console.log(this.state)
    if (this.state.loading) {
      return (
        <Dimmer active>
          <Loader />
        </Dimmer>
      );
    } else {
      // console.log(this.state)

      return (
 
        <Grid>
          <NavBar 
            currentUser={this.state.currentUser} 
            logout={this.logout}
            fetchMostLiked={this.fetchMostLiked}
            currentLatitude={this.state.currentLatitude}
            currentLongitude={this.state.currentLongitude}
            setBreweriesNearMe={this.setBreweriesNearMe}
            />


          <Grid.Row centered>
            <Switch>
              <Route exact path="/users/:id" render={routerProps => <Favorites 
                currentUser={this.state.currentUser} 
                handleFavoriteClick={this.handleFavoriteClick}
                favorites={this.state.favorites}
                {...routerProps} /> } 
              />

              <Route 
                exact path="/map" 
                render={(routerProps) => <div onClick={this.clickState}><SVGMap map={USA} /></div>} 
              />
                
              <Route exact path='/find_brewery' render={routerProps => <BreweryNearMe 
                {...routerProps} 
                renderAdded={this.renderAdded}
                breweriesNearMe={this.state.breweriesNearMe}
                handleFavoriteClick={this.handleFavoriteClick}
                currentUser={this.state.currentUser}
                handleSearch={this.handleSearch} 
                searchTerm={this.state.searchTerm}
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
              
              <Route path="/:state" render={(routerProps) => 
                <InfiniteScroll 
                dataLength={this.state.locations.length}
                next={() => {
                  // console.log(this.props)
                  this.fetchMoreStateBreweries(this.props.location.pathname)}}
                hasMore={true}
                loader={<div className="loader">Loading ...</div>}
                >            
                <StateContainer 
                  {...routerProps} 
                  currentUser={this.state.currentUser} 
                  page={this.state.page} 
                  breweries={this.state.breweries} 
                  handleFavoriteClick={this.handleFavoriteClick} 
                  setStateLocation={this.setStateLocation}
                  locations={this.state.locations}
                  handleSearch={this.handleSearch}
                  searchTerm={this.state.searchTerm}
                  resetStateLocation={this.resetStateLocation}
                />
                </InfiniteScroll>
              } />
              
              <Route exact path='/' render={(routerProps) => 
                <InfiniteScroll 
                  dataLength={this.state.breweries.length}
                  next={this.fetchMoreBreweries}
                  hasMore={true}
                  loader={<div className="loader">Loading ...</div>}
                  >                  
                    <BreweryContainer 
                    currentUser={this.state.currentUser} 
                    breweries={this.state.breweries} 
                    {...routerProps} 
                    searchTerm={this.state.searchTerm} 
                    handleSearch={this.handleSearch} 
                    handleFavoriteClick={this.handleFavoriteClick}
                    page={this.state.page} />
                </InfiniteScroll>     
                
              }
              />
  
            </Switch>
          </Grid.Row>
        </Grid>

      );

      
    }
    }


}

export default App;
