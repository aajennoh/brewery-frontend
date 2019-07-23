import React from 'react'
import { Container, Card, Button, Icon } from 'semantic-ui-react'
import BreweryCard from '../components/BreweryCard'


class Favorites extends React.Component {




  render(){
    // console.log(this.props)
    return(
      <Container>
        <h1>Favorites</h1>
        <Card.Group itemsPerRow={2}>
          {this.props.currentUser.breweries.map(brewery => <BreweryCard 
            key={brewery.id} {...brewery} 
            handleFavoriteClick={this.props.handleFavoriteClick} 
            currentUser={this.props.currentUser}
            />) }
        </Card.Group>
      </Container>
    )
  }


}

export default Favorites