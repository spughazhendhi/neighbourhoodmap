import React, { Component } from 'react';
import LocationItem from './LocationItem';
import SearchFilter from './SearchFilter';
import PropTypes from 'prop-types'

class LocationList extends Component {
  static propTypes = {
     onClickLocations: PropTypes.func.isRequired,
     closeInfoWindow: PropTypes.func.isRequired
  }

  state = {
    locations: {},
    query: '',
    suggestions: true
  }

  componentDidMount() {
    this.setState({
      locations: this.props.locationList
    });
  }

  /**
  * @description This function used to filter locations based on user entered value in textbox
  * @param {string} value - value to filter location from list of locations
  */
  filterLocations(value) {
    this.props.closeInfoWindow();
    this.setState({query: value});
    if(value.length >0) {
        const filteredLocations = this.props.locationList.filter(location =>
                                              {
                                                  if(location.name.toLowerCase().indexOf(value.toLowerCase()) > -1 ) {
                                                    location.marker.setVisible(true);
                                                   return true;
                                                }else {
                                                  location.marker.setVisible(false);
                                                  return false;
                                                }
                                              }
                                  );
        this.setState({
          locations: filteredLocations
        });
    }else {
      this.clearQuery();
    }
  }

  /**
  * @description This function used to clear the filtered locations and displays all locations
  */
  clearQuery() {
    this.props.locationList.forEach(location => location.marker.setVisible(true));
    this.setState({
        query: '',
        locations: this.props.locationList,
        suggestions: true
    });
  }

  /**
  * @description This function used to show/hide locations.
  */
  toggleSuggestions(){
    this.setState({
      suggestions: !this.state.suggestions
    });
  }

  render() {
     return (
              <div className="location-box" aria-label="List of Locations">
                <SearchFilter query={this.state.query} filterLocations={b => this.filterLocations(b)} />
                <ul>
                    {
                      (this.state.suggestions && this.state.locations.length >0) ? this.state.locations.map((location,index) =>
                                  (<LocationItem key={index} index={index} location={location}  onClickLocation={(marker) => this.props.onClickLocations(marker)} />)
                                ) :""
                     }
                </ul>
                <button className="toggle-button" onClick={() => this.toggleSuggestions()}>Show/Hide Suggestions</button>
              </div>
            )
  }

}

export default LocationList
