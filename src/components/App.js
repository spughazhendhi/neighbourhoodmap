import React, { Component } from 'react';
import '../App.css';
import {locations} from '../data/locations'
import {GOOGLE_MAP_API_KEY} from '../data/constant'
import {FS_CLIENT_ID} from '../data/constant'
import {FS_CLIENT_SECRET} from '../data/constant'
import {FOURSQUAREDATA} from '../data/foursquaredata'
import LocationList from './LocationList'

class App extends Component {

state = {
  locations: locations ,
  map: {},
  infoWindow: {}
}


  componentDidMount() {
     this.initMap = this.initMap.bind(this);
      window.initMap = this.initMap;
      this.loadScript();
  }

  initMap() {
     let map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: 40.7127753, lng: -74.0059728 },
        zoom: 15,
        mapTypeControl: false
    });

    let infoWindow = new window.google.maps.InfoWindow({maxWidth: 320});
    this.setState({
      map: map,
      infoWindow: infoWindow
    });
  const bounds = new window.google.maps.LatLngBounds();

    let locationswithMapInfo = [];
    locations.forEach((location,index) => {
      var marker = new window.google.maps.Marker({
        position:  new window.google.maps.LatLng(location.latitude, location.longitude),
        map: map,
        title: location.name,
        animation: window.google.maps.Animation.DROP,
        id :index
      });

      marker.addListener('click',() => {
        this.populateInfoWindow(marker);
        marker.setAnimation(window.google.maps.Animation.BOUNCE);
        setTimeout(function(){ marker.setAnimation(null) }, 550)
      });


      location.marker = marker;
      location.display = true;
      locationswithMapInfo.push(location);
      bounds.extend(marker.position);
    });
    map.fitBounds(bounds);

     this.setState({
            locations: locationswithMapInfo
        });

  }



   populateInfoWindow(marker) {
   const infoWindow = this.state.infoWindow;
   if(marker !== infoWindow.marker){
       infoWindow.marker=marker;
       infoWindow.setContent('Loading Data..');
       infoWindow.open(this.state.map,marker);
       this.getMarkerInfo(marker);
       infoWindow.addListener('closeclick',function(){
       infoWindow.marker=null;
       });
     }
   }

   getMarkerInfo(marker) {
      const url = "https://api.foursquare.com/v2/venues/search?client_id=" + FS_CLIENT_ID + "&client_secret=" + FS_CLIENT_SECRET + "&v=20130815&ll=" + marker.getPosition().lat() + "," + marker.getPosition().lng() + "&limit=1";
      const data =  FOURSQUAREDATA;
      let location_data = data.response.venues[0];
      let content = `<b>Verified Location: </b> (${location_data.verified ? 'Yes' : 'No'}) <br>
                    <b>Number of CheckIn: </b> ${location_data.stats.checkinsCount} <br>
                    <b>Number of Users: </b> ${location_data.stats.usersCount} <br>
                    <b>Number of Tips: </b>${location_data.stats.tipCount}  <br>
                    <a href="https://foursquare.com/v/${location_data.id}" target="_blank">Read More on Foursquare Website</a>`;
      this.state.infoWindow.setContent(content);
      /*
      fetch(url)
      .then(response => response.json())
      .then( data => {
        let location_data = data.response.venues[0];
        let verified = '<b>Verified Location: </b>' + (location_data.verified ? 'Yes' : 'No') + '<br>';
        let checkinsCount = '<b>Number of CheckIn: </b>' + location_data.stats.checkinsCount + '<br>';
        let usersCount = '<b>Number of Users: </b>' + location_data.stats.usersCount + '<br>';
        let tipCount = '<b>Number of Tips: </b>' + location_data.stats.tipCount + '<br>';
        let readMore = '<a href="https://foursquare.com/v/'+ location_data.id +'" target="_blank">Read More on Foursquare Website</a>'
        this.state.infoWindow.setContent(checkinsCount + usersCount + tipCount + verified + readMore);
      })
      .catch(error => {
        this.state.infoWindow.setContent("Sorry foursqualre data can't be loaded");
      });
      */
   }



  loadScript() {
    var ref = window.document.getElementsByTagName("script")[0];
    let script = window.document.createElement("script");
    script.src = 'http://maps.googleapis.com/maps/api/js?key='+GOOGLE_MAP_API_KEY+'&callback=initMap';
    script.async = true;
    script.defer = true;
    script.onerror = function() {
      alert("Error loading map! Check the URL!");
    };
    ref.parentNode.insertBefore(script,ref);
  }


  render() {
    return (
      <main className='App'>
       <h1>New York, NY</h1>
       <div className="outerbox">
       <div className="box1" aria-label="List of Locations">
        <LocationList locationList={locations} onClickLocations={(marker) => this.populateInfoWindow(marker)}/>
      </div>
      <div className="box2">
        <div id="map" tabIndex="-1" role="application"> Map </div>
      </div>
        </div>
      </main>
    );
  }

}



export default App;
