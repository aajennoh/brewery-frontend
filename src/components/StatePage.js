import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'
import BreweryCard from "./BreweryCard"

const token = "-zNSAt8wyTrXDitGNVaiMyAziOLnQ3DVKXardVFp6Bjeog8Rha_oRjbX19vJZait6EviIMvWicunPIVZvVTwF-Xadcvl8rr8zQ3uh9-Ue8LZ9UTKEcFVBh_8KyqvXHYx"

const headers = {
  "Authorization": "Bearer " + token
}

class StatePage extends React.Component {

  state = {
    loading: true,
    locations: []
  }

  componentDidMount(){
    fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=${this.props.match.params.area}&term=barbecue`, { headers })
    .then(res => res.json())
    .then((data) => {
      this.setState({
        loading: false,
        locations: data.businesses
      })
    })
  }

  renderLocations(){
    return this.state.locations.map(location => {
      return <BreweryCard key={location.id} location={location} />
    })
  }

  loadingBay() {
    if (this.state.loading) {
      return (
        <Dimmer active>
          <Loader />
        </Dimmer>
      )
    } else if(this.state.locations.length === 0) {
      return <div> NO RESULTS FOUND </div>
    } else {
     return (
      <div>
        <h1>{this.props.match.params.area}</h1>
        <div className="card-container">
          {this.renderLocations()}
        </div>
      </div>
    )
    }
  }

  render(){
    console.log("ROUTER PROPS", this.props)
    return (
      <div>
        {this.loadingBay()}
      </div>)
  }
}

export default StatePage