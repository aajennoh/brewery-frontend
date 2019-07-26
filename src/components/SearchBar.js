import React from 'react'

class SearchBar extends React.Component {

  render(){
    return(
      <div className="ui fluid icon input">
        <input onChange={(e) => this.props.handleSearch(e)} type="text" placeholder="Search..." />
        <i aria-hidden="true" className="search icon"></i>
      </div>
    )
  }
}

export default SearchBar