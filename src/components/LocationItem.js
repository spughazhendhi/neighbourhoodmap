import React  from 'react'
import PropTypes from 'prop-types'

class LocationItem extends React.Component {
  static propTypes = {
     location: PropTypes.object.isRequired,
     index: PropTypes.number.isRequired,
     onClickLocation: PropTypes.func.isRequired
  }
  render(){
    const location = this.props.location;
    return(
       	<li key={this.props.index}  onClick={ () => this.props.onClickLocation(location.marker)} role="button" className="box" tabIndex="0">{location.name}</li>
      )
  }
}

export default LocationItem;
