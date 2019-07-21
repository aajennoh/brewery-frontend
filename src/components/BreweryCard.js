import React from 'react'
import { Card, Button, Icon } from 'semantic-ui-react'

class BreweryCard extends React.Component {

  state = {
    favorited: false
  }


  handleFavorited = (breweryID) => {
    if (this.props.currentUser && this.props.currentUser.breweries.find(brewery => brewery.id === breweryID)) {
      return true
    } else {
      return false
    }
  }

  render(){
    
    return(
      <Card centered>
        <Card.Content>
          <Card.Header>{this.props.name}</Card.Header>
          <Card.Meta>{this.props.phone}</Card.Meta>
          <Card.Meta onClick={() => window.open(this.props.website_url)}>{this.props.website_url}
          </Card.Meta>
          <br></br>
          <Card.Description > {this.props.street}</Card.Description>
          <Card.Description>{this.props.city}, {this.props.state} {this.props.postal_code}</Card.Description>

        </Card.Content>
        <Card.Content extra>
          <div className='ui three buttons'>
            <Button 
            onClick={() => {this.props.handleFavoriteClick(this.props.id)
            this.handleFavorited()}}>
              <Icon basic color='red' centered name={!this.handleFavorited(this.props.id) ? 'heart outline' : 'heart'} />
            </Button>
            <Button >
              <Icon basic color='green' centered name='thumbs up outline'/>
              0
            </Button>
            <Button >
              <Icon basic color='red' centered name='thumbs down outline'/>
              0
            </Button>
          </div>
        </Card.Content>
      </Card>
    )
  }
}

export default BreweryCard