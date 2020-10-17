import React, { useState, useRef, useCallback, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import MapView, { Marker } from 'react-native-maps';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import { Animated, Dimensions } from 'react-native';

import {
  Container,
  BackButton,
  Header,
  HeaderTitle,
  ScrollView,
  Card,
  CardData,
  ProductName,
  ProductBrand,
  ProductValue,
} from './styles';

interface ILocation {
  id: string;
  date: Date;
  name: string;
  brand: string;
  longitude: number;
  latitude: number;
  value: number;
}

type ParamList = {
  coordenates: {
    locations: ILocation[];
    initialLatitude: number;
    initialLongitude: number;
  };
};

const Map: React.FC = () => {
  const route = useRoute<RouteProp<ParamList, 'coordenates'>>();

  const theme = useTheme();

  const map = useRef(null);

  const navigation = useNavigation();

  const [isLocations, setIsLocations] = useState(route.params.locations);

  const { width, height } = Dimensions.get('window');

  const [animation, setAnimation] = useState(new Animated.Value(0));

  const cardHeight = height / 4;
  const cardWidth = cardHeight - 50;

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
        <HeaderTitle>Localização</HeaderTitle>
      </Header>
      <MapView
        style={{ flex: 1 }}
        ref={map}
        initialRegion={{
          latitude: route.params.initialLatitude,
          longitude: route.params.initialLongitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {isLocations.map((location) => {
          return (
            <Marker
              key={
                location.id +
                location.latitude +
                location.longitude +
                location.value
              }
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
            />
          );
        })}
      </MapView>
      <ScrollView
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        snapToInterval={cardWidth}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: animation,
                },
              },
            },
          ],
          { useNativeDriver: true },
        )}
        contentContainerStyle={{ paddingRight: width - cardWidth }}
      >
        {isLocations.map((location) => (
          <Card key={location.id}>
            <CardData>
              <ProductName>{location.name}</ProductName>
              <ProductBrand>{location.brand}</ProductBrand>
              <ProductValue>R$ {location.value.toFixed(2)}</ProductValue>
            </CardData>
          </Card>
        ))}
      </ScrollView>
    </Container>
  );
};

export default Map;
