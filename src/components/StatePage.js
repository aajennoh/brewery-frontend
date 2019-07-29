import React from 'react'
import BreweryCard from "./BreweryCard"
import { Card, Container } from 'semantic-ui-react';



class StatePage extends React.Component {


  componentDidMount(){
    fetch(`http://localhost:3000/breweries/get_state/${this.props.match.params.state}`)
    .then(response => response.json())
    .then(data => {
      this.props.setStateLocation(data)
    })
  }

  renderLocations(){
    return this.props.locations.map(brewery => {
      return (
            <BreweryCard 
            key={brewery.id} 
            handleFavoriteClick={this.props.handleFavoriteClick} 
            currentUser={this.props.currentUser} 
            {...brewery} />
      )
    })
  }

  renderStateBrewery = () => {
    if (this.props.locations.length !== 0) {
      return (
        <div>
          <h1>{this.props.match.params.state}</h1>
          <Container>
            <Card.Group itemsPerRow={3}>
              {this.renderLocations()}
            </Card.Group>
          </Container>
        </div>
      )
    }else {
      return <h1> NO BREWERIES FOUND </h1>
    }
  }
  


  render(){
    // console.log(this.props)
    // console.log(this.state)
    // console.log("ROUTER PROPS", this.props)
    return (
      <div>
        {this.renderStateBrewery()}
      </div>
      )
  }
}

export default StatePage