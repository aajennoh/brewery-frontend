import React from 'react'
import BreweryCard from "./BreweryCard"
import { Card, Container } from 'semantic-ui-react';



class StatePage extends React.Component {

  state = {
    locations: []
  }

  componentDidMount(){
    fetch(`http://localhost:3000/breweries/get_state/${this.props.match.params.state}`)
    .then(response => response.json())
    .then(data => {
      this.setState({
        locations: data
      })
    })
  }

  renderLocations(){
    return this.state.locations.map(brewery => {
      return (
        <Container className="pleasework">
          <Card.Group itemsPerRow={3}>
            <BreweryCard 
            key={brewery.id} 
            handleFavoriteClick={this.props.handleFavoriteClick} 
            currentUser={this.props.currentUser} 
            {...brewery} />
          </Card.Group>
        </Container>
      )
    })
  }

  renderStateBrewery = () => {
    if (this.state.locations.length !== 0) {
      return (
        <div>
        <h1>{this.props.match.params.state}</h1>
          <div className="card-container">
            {this.renderLocations()}
          </div>
        </div>
      )
    }else {
      return <div> NO RESULTS FOUND </div>
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