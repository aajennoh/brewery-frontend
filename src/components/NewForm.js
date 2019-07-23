import React from 'react'
import { Form, Button } from 'semantic-ui-react'


class NewForm extends React.Component {

  state = {
    name: ""
  }

  render(){
    return(
      <Form>
      <h1>New Brewery?</h1>
      <h5>Complete the form below to add a new brewery!</h5>
      <br></br>
      <br></br>
      <Form.Field>
        <label>Brewery Name</label>
        <input placeholder='Brewery Name' />
      </Form.Field>
      <Form.Field>
        <label>Brewery Telephone</label>
        <input placeholder='Brewery Telephone' />
      </Form.Field>
      <Form.Field>
        <label>Brewery Website</label>
        <input placeholder='Brewery Website' />
      </Form.Field>
      <Form.Field>
        <label>Brewery Address</label>
        <input placeholder='Brewery Address' />
      </Form.Field>
      <Button type='submit'>Submit</Button>
    </Form>
    )
  }
}

export default NewForm