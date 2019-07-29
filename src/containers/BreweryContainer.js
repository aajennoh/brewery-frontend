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


  render () {
    return (
      <div>
        <img className="image-header" src="https://www.austinchronicle.com/binary/58fd/beer-ja.jpg" alt="splash"/>

        <Icon size="big" id="to-top" onClick={()=>this.scrollToTop()} name='angle double up' />

        <SearchBar handleSearch={this.props.handleSearch} showNoResults={false} />
        <br></br>
        <br></br>
        <Container className="pleasework">
          <Card.Group itemsPerRow={3}>
            {this.props.searchTerm ? this.filterBrewery() : this.renderBrewery()}
          </Card.Group>
        </Container>

      </div>
    )
  }

}

export default BreweryContainer