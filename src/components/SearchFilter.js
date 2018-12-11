import React  from 'react'
import PropTypes from 'prop-types'

class SearchFilter extends React.Component {
  static propTypes = {
     query: PropTypes.string.isRequired,
     filterLocations: PropTypes.func.isRequired
  }
  render(){
    return(
            <input type="text" role="search" aria-labelledby="Location filter" id="search" className="filter-input"
            placeholder="Enter value to filter" value={this.props.query}  onChange={event => this.props.filterLocations(event.target.value)} />
      )
  }
}

export default SearchFilter;
