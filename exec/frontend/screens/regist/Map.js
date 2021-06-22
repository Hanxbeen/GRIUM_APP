import React from 'react';
import NaverMapView, {Marker, Align} from './map';

const Map = ({position, placeName}) => {
  return (
    <>
      <NaverMapView
        style={{width: '100%', height: '100%'}}
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
