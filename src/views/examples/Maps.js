/*!

=========================================================
* Argon Dashboard React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import { Card, Container, Row } from "reactstrap";

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { ModalMap } from "./ModalMaps";
 
mapboxgl.accessToken = 'pk.eyJ1IjoiZGFuaWVsOTk5OTk5OTgiLCJhIjoiY2xkZ2RkbHhkMHdoZDN2cXpjNm9qZ2lwYSJ9._XCnO0KYU5LWM65VKEYp6w';

//3.3762136595106904, -76.53359646051538
const MapWrapper = () => {
  const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-76.53359646051538 );
    const [lat, setLat] = useState(3.3762136595106904);
    const [zoom, setZoom] = useState(15);
      
    useEffect(() => {
      if (map.current) return; // initialize map only once
      map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom
      });
    });
    
  return (
    <>
      <div
        style={{ height: `600px` }}
        className="map-canvas"
        id="map-canvas"
        ref={mapContainer}
      ></div>
    </>
  );
};

const Maps = () => {
  return (
    <>
      
      {/* Page content */}
      <Container className="mt--7" fluid>
        <ModalMap/>
        <Row>
          <div className="col">
            <Card className="shadow border-0">
              <MapWrapper />
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Maps;
