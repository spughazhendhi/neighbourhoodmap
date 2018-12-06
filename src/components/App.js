import React, { Component } from 'react';
import '../App.css';
import {locations} from '../data/locations'
import {GOOGLE_MAP_API_KEY} from '../data/constant'
import {FS_CLIENT_ID} from '../data/constant'
import {FS_CLIENT_SECRET} from '../data/constant'
import {FOURSQUAREDATA} from '../data/foursquaredata'
import LocationList from './LocationList'



let map ={};

class App extends Component {

state = {
  locations: locations
}


  componentDidMount() {
     this.initMap = this.initMap.bind(this);
      window.initMap = this.initMap;
      this.loadScript();
  }


  getFourSquareData() {
    let places = [];
    locations.forEach((location,index) => {
      places.push(FOURSQUAREDATA.response.venue);
      if(locations.length === (index+1)){
        this.setState({
          markers: places
        });
      }

    });
    /*
    locations.map((location,index) => {
      fetch(`https://api.foursquare.com/v2/venues/${location.venueId}` +
        `?client_id=${FS_CLIENT_ID}` +
        `&client_secret=${FS_CLIENT_SECRET}` +
        `&v=20181205`)
        .then(response => response.json())
        .then( data => {
           if(data.meta.code === 200){
             places.push(data.response.venue);
             console.log("data"+data.response.venue.json())
             if(locations.length === (index+1)){
               this.setState({
                 markers: places
               });
             }
           }
        })
        .catch(error => {
          console.log("error in getting foursquare data"+error);
        });
    });
    */

    this.setState({
      markers: places
    });

  }

  initMap() {
     map = new window.google.maps.Map(document.getElementById('map'), {
          center: { lat: 40.7127753, lng: -74.0059728 },
          zoom: 14,
          mapTypeControl: false
    });

    let infoWindow = new window.google.maps.InfoWindow({});
    const bounds = new window.google.maps.LatLngBounds();

    let locationswithMapInfo = [];
    locations.forEach((location,index) => {

      var marker = new window.google.maps.Marker({
        position:  new window.google.maps.LatLng(location.lat, location.long),
        map: map,
        title: location.name,
        animation: window.google.maps.Animation.DROP,
        id :index
      });
      marker.addListener('click',() => {
        this.populateInfoWindow(marker,infoWindow);
      });
      location.marker = marker;
      location.display = true;
      locationswithMapInfo.push(location);
    //  bounds.extend(marker.position);
    });

     this.setState({
            locations: locationswithMapInfo
        });

  //  map.fitBounds(bounds);
  }

   populateInfoWindow(marker,infoWindow){
   if(marker!==infoWindow.marker){
       infoWindow.marker=marker;
       infoWindow.setContent('<div>'+marker.title+'</div>');
       infoWindow.open(map,marker);
       infoWindow.addListener('closeclick',function(){
       infoWindow.marker=null;
       });
     }

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
      <main>
        <LocationList locationList={locations}/>
        <div id="map" aria-label="Map" role="application"> Map </div>
      </main>
    );
  }

}



export default App;
