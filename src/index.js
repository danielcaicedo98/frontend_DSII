import { Provider } from 'react-redux'
import store from 'Store';
import ReactDOM from 'react-dom/client'
import App from 'App';
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');" 
mapboxgl.accessToken = 'pk.eyJ1IjoiZGFuaWVsOTk5OTk5OTgiLCJhIjoiY2xkZ2RkbHhkMHdoZDN2cXpjNm9qZ2lwYSJ9._XCnO0KYU5LWM65VKEYp6w';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
