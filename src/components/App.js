import React, { Component } from 'react';
import '../App.css';
import {locations} from '../data/locations'
import {GOOGLE_MAP_API_KEY} from '../data/constant'
import {FS_CLIENT_ID} from '../data/constant'
import {FS_CLIENT_SECRET} from '../data/constant'
import {FOURSQUAREDATA} from '../data/foursquaredata'
import LocationList from './LocationList'
import Header from './Header'
import ErrorBoundary from './ErrorBoundary'
import Map from './Map'

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
      const url = `https://api.foursquare.com/v2/venues/search?client_id=${FS_CLIENT_ID}
                  &client_secret=${FS_CLIENT_SECRET} &v=20181212&ll=${marker.getPosition().lat()},${marker.getPosition().lng()} &limit=1`;
      const data =  FOURSQUAREDATA;
      let venue = data.response.venues[0];
      let content = `<b>Name : </b> ${venue.name}<br>
                    <b>Address : </b> ${venue.location.formattedAddress} <br>
                    (Details from Foursquare) <br>
                    <a href="https://foursquare.com/v/${venue.id}" target="_blank">Read More on Foursquare Website</a>`;
      this.state.infoWindow.setContent(content);
/*
      fetch(url)
      .then(response => response.json())
      .then( data => {
        let venue = data.response.venues[0];
        let content = `<b>Address provided by Foursquare : </b> ${venue.location.formattedAddress} <br>
                      <a href="https://foursquare.com/v/${venue.id}" target="_blank">Read More on Foursquare Website</a>`;
          this.state.infoWindow.setContent(content);
      })
      .catch(error => {
        this.state.infoWindow.setContent("<div class='error-message'>Sorry foursquare data can't be loaded</div>");
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
      <ErrorBoundary>
      <main>
      <Header/>
       <div className="outerbox">
          <LocationList locationList={locations} onClickLocations={(marker) => this.populateInfoWindow(marker)}/>
        <div className="mapbox">
          <Map/>
        </div>
        </div>
      </main>
      </ErrorBoundary>
    );
  }

}



export default App;
