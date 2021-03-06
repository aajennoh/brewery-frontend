import React from 'react'
import BreweryCard from '../components/BreweryCard'
import SearchBar from '../components/SearchBar'
import { Card, Container, Icon } from 'semantic-ui-react';
import '../css/BreweryContainer.css'

class BreweryContainer extends React.Component {

  scrollToTop = () => {
    window.scrollTo(0, 0);
  }

  // renderBackToTop = () => {
  //   if(this.state.page >= 2) {
  //     return (
  //       <ScrollToTop/>
  //     )
  //   }
  // }

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

  componentWillUnmount(){
    this.props.handleSearch('')
  }


  render () {
    return (
      <Container className="pleasework">
        <h1>BREWERIES</h1>
        <SearchBar handleSearch={this.props.handleSearch} showNoResults={false} />
        <br></br>
        <Card.Group itemsPerRow={3}>
          {this.props.searchTerm ? this.filterBrewery() : this.renderBrewery()}
        </Card.Group>
        <Icon size="big" id="to-top" onClick={()=>this.scrollToTop()} name='angle double up' />
      </Container>

    )
  }

}

export default BreweryContainer