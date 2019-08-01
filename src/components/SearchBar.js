import React from 'react'
import '../css/SearchBar.css'

class SearchBar extends React.Component {

  render(){
    return(
      <div className="ui fluid icon input">
        <input onChange={(e) => this.props.handleSearch(e.target.value)} type="text" placeholder="SEARCH..." />
        <i aria-hidden="true" className="search icon"></i>
      </div>
    )
  }
}

export default SearchBar