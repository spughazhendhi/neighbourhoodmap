import React, { Component } from 'react';
import LocationItem from './LocationItem'

class LocationList extends Component {
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
        const filteredLocations = this.props.locationList.filter(location => location.name.toLowerCase().indexOf(value.toLowerCase()) > -1 );
        this.setState({
          locations: filteredLocations
        });
    }else{
      this.clearQuery();
    }
  }

clearQuery() {
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
        <input type="text" role="search" aria-labelledby="filter" id="search" className="search"
          placeholder="Enter value to filter" value={this.state.query}  onChange={event => this.filterLocations(event.target.value)} />
          <ul>
            {
              (this.state.suggestions && this.state.locations.length >0) ? this.state.locations.map((location,index) =>
                          (<LocationItem key={index} index={index} location={location}  />)
                        ) :""
             }
          </ul>
           <button className="button" onClick={() => this.toggleSuggestions()}>Show/Hide Suggestions</button>
       </div>
     )
  }

}

export default LocationList
