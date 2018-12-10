import React, { Component } from 'react';
import LocationItem from './LocationItem';
import SearchFilter from './LocationItem';
import PropTypes from 'prop-types'

class LocationList extends Component {

  static propTypes = {
     onClickLocations: PropTypes.func.isRequired
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


  filterLocations(value) {
   this.setState({query: value});
    if(value.length >0){
        const filteredLocations = this.props.locationList.filter(location =>
                  {
                      if(location.name.toLowerCase().indexOf(value.toLowerCase()) > -1 ){
                        location.marker.setVisible(true);
                       return true
                    }else{
                      location.marker.setVisible(false);
                      return false
                    }
                  }
         );
        this.setState({
          locations: filteredLocations
        });
    }else{
      this.clearQuery();
    }
  }

clearQuery() {
  this.props.locationList.forEach(location => location.marker.setVisible(true));
  this.setState({
    query: '',
    locations: this.props.locationList
  });
}


  toggleSuggestions(){
    this.setState({
              suggestions: !this.state.suggestions
            });
  }

  render() {
     return (
       <div className="search">

        <input type="text" role="search" aria-labelledby="filter" id="search" className="filter-input"
          placeholder="Enter value to filter" value={this.state.query}  onChange={event => this.filterLocations(event.target.value)} />
          <ul>
            {
              (this.state.suggestions && this.state.locations.length >0) ? this.state.locations.map((location,index) =>
                          (<LocationItem key={index} index={index} location={location}  onClickLocation={(marker) => this.props.onClickLocations(marker)} />)
                        ) :""
             }
          </ul>
           <button className="button" onClick={() => this.toggleSuggestions()}>Show/Hide Suggestions</button>
       </div>
     )
  }

}

export default LocationList
