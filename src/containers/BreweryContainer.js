import React from 'react'
import BreweryCard from '../components/BreweryCard'
import SearchBar from '../components/SearchBar'
import { Card, Container } from 'semantic-ui-react';


class BreweryContainer extends React.Component {

  renderBrewery = () => {
    return this.props.breweries.map(brewery => <BreweryCard 
      key={brewery.id} 
      handleFavoriteClick={this.props.handleFavoriteClick} 
      currentUser={this.props.currentUser} 
      {...brewery}
      />)
  }

  filterBrewery = () => {
    let matched = this.props.breweries.filter(brewery => {
      return brewery.name.toLowerCase().includes(this.props.searchTerm)
      }
    )
    return matched.map(brewery => <BreweryCard 
      key={brewery.id} 
      handleFavoriteClick={this.props.handleFavoriteClick} 
      currentUser={this.props.currentUser} 
      {...brewery} 
      />)
  }


  render () {
    return (
      <div>
        <SearchBar handleSearch={this.props.handleSearch} showNoResults={false} />
        <br></br>
        <Container>
          <Card.Group itemsPerRow={3}>
            {this.props.searchTerm ? this.filterBrewery() : this.renderBrewery()}
          </Card.Group>
        </Container>
      </div>


    )
  }

}

export default BreweryContainer