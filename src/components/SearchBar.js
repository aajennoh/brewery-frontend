import React from 'react'
import { Card, Button, Icon } from 'semantic-ui-react'

class SearchBar extends React.Component {

  render(){
    return(
      <div class="ui fluid icon input">
        <input onChange={(e) => this.props.handleSearch(e)} type="text" placeholder="Search..." />
        <i aria-hidden="true" class="search icon"></i>
      </div>
    )
  }
}

export default SearchBar