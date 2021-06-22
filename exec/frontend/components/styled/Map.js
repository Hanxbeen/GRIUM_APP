import React from 'react';
import NaverMapView, {Marker, Align} from './map';

const P0 = {latitude: 35.2251557749041, longitude: 126.921261225259};

const Map = ({position, placeName}) => {
  return (
    <>
      <NaverMapView
        style={{width: '90%', height: '90%'}}
        showsMyLocationButton={true}
        center={{...position, zoom: 16}}
        useTextureView>
        <Marker
          coordinate={position}
          caption={{text: placeName, align: Align.Left}}
        />
      </NaverMapView>
    </>
  );
};
export default Map;
