import React from 'react'
import { Form, Button } from 'semantic-ui-react'


class NewForm extends React.Component {

  state = {
    name: "",
    phone: "",
    website_url: "",
    street: "",
    city: "",
    state: "",
    postal_code: ""
  }

  handleNewFormSubmit = (event) => {
    event.preventDefault()
    // console.log(this.state)
    fetch('http://localhost:3000/breweries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
    .then(response => response.json())
    .then(data => {
      // console.log(data)
      this.props.renderAdded(data)
      this.props.history.push(`/users/${data.user.id}`)
    })
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.className]: event.target.value
    })
  }

  render(){
    return(
      <Form onSubmit={this.handleNewFormSubmit}>
        <h1>New Brewery?</h1>
        <h5>Complete the form below to add a new brewery!</h5>
        <br></br>
        <br></br>
        <Form.Field>
          <label>Brewery Name</label>
          <input placeholder='Brewery Name'className="name" value={this.state.name} onChange={this.handleInputChange}/>
        </Form.Field>
        <Form.Field>
          <label>Brewery Telephone</label>
          <input placeholder='Brewery Telephone' className="phone" value={this.state.phone} onChange={this.handleInputChange}/>
        </Form.Field>
        <Form.Field>
          <label>Brewery Website</label>
          <input placeholder='Brewery Website' className='website_url' value={this.state.website_url} onChange={this.handleInputChange}/>
        </Form.Field>
        <Form.Field>
          <label>Brewery Street</label>
          <input placeholder='Brewery Street' className="street" value={this.state.street} onChange={this.handleInputChange}/>
        </Form.Field>
        <Form.Field>
          <label>Brewery City</label>
          <input placeholder='Brewery City' className='city' value={this.state.city} onChange={this.handleInputChange}/>
        </Form.Field>
        <Form.Field>
          <label>Brewery State</label>
          <input placeholder='Brewery State' className='state' value={this.state.state} onChange={this.handleInputChange}/>
        </Form.Field>
        <Form.Field>
          <label>Brewery Postal Code</label>
          <input placeholder='Brewery Postal Code' className='postal_code' value={this.state.postal_code} onChange={this.handleInputChange}/>
        </Form.Field>
        
        <Button type='submit'>Submit</Button>
    </Form>
    )
  }
}

export default NewForm