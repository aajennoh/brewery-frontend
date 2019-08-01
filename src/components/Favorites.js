import React from 'react'
import { Container, Card, Icon } from 'semantic-ui-react'
import BreweryCard from './BreweryCard'
import SearchBar from './SearchBar'

class Favorites extends React.Component {

  scrollToTop = () => {
    window.scrollTo(0, 0);
  }

  renderFavoriteBreweries = () => {
    return this.props.currentUser.breweries.map(brewery => <BreweryCard 
      key={brewery.id} 
      {...brewery} 
      handleFavoriteClick={this.props.handleFavoriteClick} 
      currentUser={this.props.currentUser}
      />) 
    }

  filterFavoriteBreweries = () => {
    let matched = this.props.currentUser.breweries.filter(brewery => {
      return brewery.name.toLowerCase().includes(this.props.searchTerm)
      }
    )
    return matched.map(brewery => 
      <BreweryCard 
        key={brewery.id} 
        {...brewery} 
        handleFavoriteClick={this.props.handleFavoriteClick} 
        currentUser={this.props.currentUser}
      />
    )
  }

  componentWillUnmount(){
    this.props.handleSearch('')
  }

  render(){
    // console.log(this.props)
    return(
      <Container>
        <h1>Favorites</h1>
        <SearchBar handleSearch={this.props.handleSearch} showNoResults={false} />
        <br></br>
        <Card.Group itemsPerRow={3}>
          {this.props.searchTerm ? this.filterFavoriteBreweries() : this.renderFavoriteBreweries()}
        </Card.Group>
        <Icon size="big" id="to-top" onClick={()=>this.scrollToTop()} name='angle double up' />
      </Container>
      
    )
  }


}

export default Favorites