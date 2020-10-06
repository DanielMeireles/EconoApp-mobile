import React, { useState, useRef, useEffect } from 'react';
import { View, Text } from 'react-native';

import MapView, { Marker } from 'react-native-maps';

const Map: React.FC = () => {
  const map = useRef(null);

  useEffect(() => {
    // ...
  }, []);

  return (
    <>
      <MapView
        style={{ flex: 1 }}
        ref={map}
        initialRegion={{
          latitude: 52.5200066,
          longitude: 13.404954,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        <Marker coordinate={{ latitude: 52.5200066, longitude: 13.404954 }} />
      </MapView>
    </>
  );
};

export default Map;
