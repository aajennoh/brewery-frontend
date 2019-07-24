import React from 'react'
import { Card, Button, Icon } from 'semantic-ui-react'

class BreweryCard extends React.Component {

  state = {
    likes: this.props.likes,
    dislikes: this.props.dislikes
  }


  handleFavorited = (breweryID) => {
    if (this.props.currentUser && this.props.currentUser.breweries.find(brewery => brewery.id === breweryID)) {
      return true
    } else {
      return false
    }
  }

  handleLikes = () => {
    // debugger
    fetch(`http://localhost:3000/brewery/${this.props.id}/likes`)
    .then(response => response.json())
    .then(data => {
      this.setState({
        likes: this.state.likes + 1
      })
    })
  }

  handleDislikes = () => {
    fetch(`http://localhost:3000/brewery/${this.props.id}/dislikes`)
    .then(response => response.json())
    .then(data => {
      this.setState({
        dislikes: this.state.dislikes + 1
      })
    })
  }

  render(){
    
    return(
      <Card centered>
        <Card.Content>
          <Card.Header>{this.props.name}</Card.Header>
          <Card.Meta>{this.props.phone}</Card.Meta>
          <Card.Meta className="website" onClick={() => window.open(this.props.website_url)}>{this.props.website_url}
          </Card.Meta>
          <br></br>
          <Card.Description > {this.props.street}</Card.Description>
          <Card.Description>{this.props.city}, {this.props.state} {this.props.postal_code}</Card.Description>

        </Card.Content>
        <Card.Content extra>
          <div className='ui three buttons'>
            <Button 
            onClick={() => {this.props.handleFavoriteClick(this.props.id)}}>
              <Icon basic color='red' centered name={!this.handleFavorited(this.props.id) ? 'heart outline' : 'heart'} />
            </Button>
            <Button onClick={() => this.handleLikes()} >
              <Icon basic color='green' centered name='thumbs up outline' />
              {this.state.likes}
            </Button>
            <Button onClick={() => this.handleDislikes()} >
              <Icon basic color='red' centered name='thumbs down outline' />
              {this.state.dislikes}
            </Button>
          </div>
        </Card.Content>
      </Card>
    )
  }
}

export default BreweryCard