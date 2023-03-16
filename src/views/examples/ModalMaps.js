import { editUser } from 'actions/settingUsers';
import React,{  useState,useEffect, useRef  } from 'react'
import { 
  
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";


import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax 

mapboxgl.accessToken = 'pk.eyJ1IjoiZGFuaWVsOTk5OTk5OTgiLCJhIjoiY2xkZ2RkbHhkMHdoZDN2cXpjNm9qZ2lwYSJ9._XCnO0KYU5LWM65VKEYp6w';



export const ModalMap = ({props,id}) =>{

   
    const mapContainer = useRef(null);   
    const [lng, setLng] = useState(-76.53361414565254);
    const [lat, setLat] = useState(3.3755647507382895)  
    
    const [maps,setMaps] = useState();
    const zoom = 14;

    
    
    
      
    useEffect(() => {
       // initialize map only once
    if(props !== undefined) {
        setLng(props[1])
        setLat(props[0])
    }     
       
      const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: 14
     })  
     let mark = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map)     
     map.addControl(new mapboxgl.NavigationControl(), "top-right");
     // Clean up on unmount
     return () => map.remove();
    })       
   
    

    
    return(
        <div className=''>
            <button type="button" class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target= {'#ex'+id} >
                Ubicación
            </button>
            <div class="modal fade" id={'ex'+id} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-sm modal-dialog modal-dialog-centered">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Ubicación Cliente</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>               
                        <div ref={mapContainer} className="modal-body map-container"/>                    
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>                    
                </div>
                </div>
            </div>
            </div>
        </div>
        
          
    )
}