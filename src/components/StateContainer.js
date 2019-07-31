import React from 'react'
import BreweryCard from "./BreweryCard"
import SearchBar from "./SearchBar"
import { Card, Container, Icon } from 'semantic-ui-react';



class StateContainer extends React.Component {

  scrollToTop = () => {
    window.scrollTo(0, 0);
  }

  componentDidMount(){
    fetch(`http://localhost:3000/breweries/get_state/${this.props.match.params.state}/${this.props.page}`)
    .then(response => response.json())
    .then(data => {
      this.props.setStateLocation(data)
    })
  }

  componentWillUnmount(){
    this.props.resetStateLocation()
  }

  // renderLocations = () => {

  // }

  renderStateBrewery = () => {
    if (this.props.locations.length !== 0) {
      return this.props.locations.map(brewery => {
        return (
              <BreweryCard 
              key={brewery.id} 
              handleFavoriteClick={this.props.handleFavoriteClick} 
              currentUser={this.props.currentUser} 
              {...brewery} />
        )
      })

    }else {
      
      return <h1> NO BREWERIES FOUND </h1>
    }
  }

  filterStateBrewery = () => {
    let matched = this.props.locations.filter(brewery => {
      return brewery.name.toLowerCase().includes(this.props.searchTerm)
      }
    )
    return matched.map(brewery => 
      <BreweryCard 
      key={brewery.id} 
      handleFavoriteClick={this.props.handleFavoriteClick} 
      currentUser={this.props.currentUser} 
      {...brewery} 
      />
    )
  }
  
  render(){
    // console.log(this.props)
    // console.log(this.state)
    // console.log("ROUTER PROPS", this.props)
    return (
      <div>
        <Icon size="big" id="to-top" onClick={()=>this.scrollToTop()} name='angle double up' />
        <SearchBar handleSearch={this.props.handleSearch} showNoResults={false} />
        <br></br>
        <br></br>
        <h1>{this.props.match.params.state}</h1>
      <Container className="pleasework">
        <Card.Group itemsPerRow={3}>
          {this.props.searchTerm ? this.filterStateBrewery() : this.renderStateBrewery()}
        </Card.Group>
      </Container>
      </div>
      )
  }
}

export default StateContainer