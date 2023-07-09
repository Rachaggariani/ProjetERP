import React from 'react';
import GoogleMapReact from 'google-map-react';



const CamionLocation = ({ text }) => <div>{text}</div>;

const MapComponent = ({ lat, lng }) => {
    const center = {
      lat: lat,
      lng: lng
    };
  
    return (
      <div style={{ height: '400px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyD6PNdj8dioyQBHEU80_-HS-vRCCmakTbc' }}
          defaultCenter={center}
          defaultZoom={10}
        />
        {/* <CamionLocation 
        lat={lat}
        lng={lng}
        text="Camion 28"
        /> */}
      </div>
    );
  };

  export default MapComponent;
  