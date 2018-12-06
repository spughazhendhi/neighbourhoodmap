import React  from 'react'
import PropTypes from 'prop-types'

class LocationItem extends React.Component {
  static propTypes = {
     location: PropTypes.object.isRequired,
     index: PropTypes.number.isRequired
  }
  render(){
    const location = this.props.location;
    return(
       	<li key={this.props.index} role="button" className="box" tabIndex="0">{location.name}</li>
      )
  }
}

export default LocationItem;
