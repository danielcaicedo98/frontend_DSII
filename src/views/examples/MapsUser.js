import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax 
import { Button } from "reactstrap";
import { ModalMap } from "./ModalMaps";
mapboxgl.accessToken = 'pk.eyJ1IjoiZGFuaWVsOTk5OTk5OTgiLCJhIjoiY2xkZ2RkbHhkMHdoZDN2cXpjNm9qZ2lwYSJ9._XCnO0KYU5LWM65VKEYp6w';


const MapsUser = () => {
  

    
  //, 
    const mapContainer = useRef(null);
   
    
    
    const [lng, setLng] = useState(-76.5299658227888);
    const [lat, setLat] = useState(3.3843114874970674);
    const [maps,setMaps] = useState();
    const [values,setValues] = useState({
      lng: -76.5299658227888,
      lat:3.3843114874970674
    })
    const zoom = 14;
    let marker = new mapboxgl.Marker(); 
      
    useEffect(() => {
       // initialize map only once
      const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: 14
     })
     //, 
     setValues({
      lng: -76.53053876688861,
      lat:3.386727049774996
    })

     let mark = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map)
     
     map.addControl(new mapboxgl.NavigationControl(), "top-right");

     // Clean up on unmount
     return () => map.remove();
    },[]);
    
    
    

    // for (const feature of geojson.features) {
    //   // create a HTML element for each feature
    //   const el = document.createElement('div');
    //   el.className = 'marker';
    
    //   // make a marker for each feature and add to the map
    //   new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates).addTo(map);
    // }
  

    return (
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <ModalMap props={values}/>
      <div ref={mapContainer} className=" map-container">
       
      </div>
      
       
      </div>
      );
  };
  
  export default MapsUser;