import React, { useState, useRef, useCallback } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import MapView, { Marker } from 'react-native-maps';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import { Container, BackButton, Header, HeaderTitle } from './styles';

interface ICoordenate {
  latitude: number;
  longitude: number;
}

type ParamList = {
  coordenate: {
    coordenate: ICoordenate;
  };
};

const Map: React.FC = () => {
  const route = useRoute<RouteProp<ParamList, 'coordenate'>>();

  const theme = useTheme();

  const map = useRef(null);

  const navigation = useNavigation();

  const [isCoordinate, setIsCoordinate] = useState<ICoordenate>(
    route.params.coordenate,
  );

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <Container>
      <Header>
        <BackButton onPress={handleGoBack}>
          <Icon
            name="chevron-left"
            size={24}
            color={theme.colors.headerElement}
          />
        </BackButton>
        <HeaderTitle />
      </Header>
      <MapView
        style={{ flex: 1 }}
        ref={map}
        initialRegion={{
          latitude: isCoordinate.latitude,
          longitude: isCoordinate.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{
            latitude: isCoordinate.latitude,
            longitude: isCoordinate.longitude,
          }}
        />
      </MapView>
    </Container>
  );
};

export default Map;
