import React from 'react'
import { Container, Card, Icon } from 'semantic-ui-react'
import BreweryCard from './BreweryCard'
import SearchBar from './SearchBar'

class BreweryNearMe extends React.Component {

  scrollToTop = () => {
    window.scrollTo(0, 0);
  }

  renderBreweryNearMe = () => {
    return this.props.breweriesNearMe.map(brewery => <BreweryCard 
      key={brewery.id} 
      handleFavoriteClick={this.props.handleFavoriteClick} 
      currentUser={this.props.currentUser} 
      {...brewery}
      />)
  }

  filterBreweryNearMe = () => {
    let matched = this.props.breweriesNearMe.filter(brewery => {
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

  componentWillUnmount(){
    this.props.handleSearch('')
  }

  render(){
    return(
      <div>
        <Icon size="big" id="to-top" onClick={()=>this.scrollToTop()} name='angle double up' />
        <SearchBar handleSearch={this.props.handleSearch} showNoResults={false} />
        <br></br>
        <h1>Breweries Near You</h1>
        <Container className="pleasework">
          <Card.Group itemsPerRow={3}>
            {this.props.searchTerm ? this.filterBreweryNearMe() : this.renderBreweryNearMe()}
          </Card.Group>
        </Container>
      </div>

    )
  }
}

export default BreweryNearMe





  // state = {
  //   name: "",
  //   phone: "",
  //   website_url: "",
  //   street: "",
  //   city: "",
  //   state: "",
  //   postal_code: ""
  // }

  // handleNewFormSubmit = (event) => {
  //   event.preventDefault()
  //   // console.log(this.state)
  //   fetch('http://localhost:3000/breweries', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json'
  //     },
  //     body: JSON.stringify(this.state)
  //   })
  //   .then(response => response.json())
  //   .then(data => {
  //     // console.log(data)
  //     this.props.renderAdded(data)
  //     this.props.history.push(`/users/${data.user.id}`)
  //   })
  // }

  // handleInputChange = (event) => {
  //   this.setState({
  //     [event.target.className]: event.target.value
  //   })
  // }

  // render(){
  //   return(
  //     <div>
  //       <h1>New Brewery?</h1>
  //       <h5>Complete the form below to add a new brewery!</h5>
  //       <br></br>
  //       <br></br>
  //       <Form classname="form"onSubmit={this.handleNewFormSubmit}>
  //       <Form.Field>
  //         <label>Brewery Name</label>
  //         <input placeholder='Brewery Name'className="name" value={this.state.name} onChange={this.handleInputChange}/>
  //       </Form.Field>
  //       <Form.Field>
  //         <label>Brewery Telephone</label>
  //         <input placeholder='Brewery Telephone' className="phone" value={this.state.phone} onChange={this.handleInputChange}/>
  //       </Form.Field>
  //       <Form.Field>
  //         <label>Brewery Website</label>
  //         <input placeholder='Brewery Website' className='website_url' value={this.state.website_url} onChange={this.handleInputChange}/>
  //       </Form.Field>
  //       <Form.Field>
  //         <label>Brewery Street</label>
  //         <input placeholder='Brewery Street' className="street" value={this.state.street} onChange={this.handleInputChange}/>
  //       </Form.Field>
  //       <Form.Field>
  //         <label>Brewery City</label>
  //         <input placeholder='Brewery City' className='city' value={this.state.city} onChange={this.handleInputChange}/>
  //       </Form.Field>
  //       <Form.Field>
  //         <label>Brewery State</label>
  //         <input placeholder='Brewery State' className='state' value={this.state.state} onChange={this.handleInputChange}/>
  //       </Form.Field>
  //       <Form.Field>
  //         <label>Brewery Postal Code</label>
  //         <input placeholder='Brewery Postal Code' className='postal_code' value={this.state.postal_code} onChange={this.handleInputChange}/>
  //       </Form.Field>
        
  //       <Button type='submit'>Submit</Button>
  //   </Form>       
  // </div>
  //   )
  // }