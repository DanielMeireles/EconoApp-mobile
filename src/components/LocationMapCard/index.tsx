import React, { useState } from 'react';

import {
  MarkerStyled,
  Card,
  CardItem,
  ProductName,
  ProductBrand,
  ProductValue,
  PointIcon,
} from './styles';

interface IProduct {
  id: string;
  name: string;
  brand: string;
  value: number;
}

export interface ILocation {
  date: Date;
  latitude: number;
  longitude: number;
  products: IProduct[];
}

interface ILocationMapCardProps {
  location: ILocation;
}

const LocationMapCard: React.FC<ILocationMapCardProps> = ({ location }) => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <MarkerStyled
      onPress={() => setIsSelected(!isSelected)}
      coordinate={{
        latitude: location.latitude,
        longitude: location.longitude,
      }}
    >
      {isSelected && (
        <>
          <Card>
            {location.products.map((product) => (
              <CardItem key={product.id}>
                <ProductName>
                  {product.name}
                  <ProductBrand> ({product.brand})</ProductBrand>
                </ProductName>
                <ProductValue>R$ {product.value.toFixed(2)}</ProductValue>
              </CardItem>
            ))}
          </Card>
          <PointIcon name="triangle-down" size={30} />
        </>
      )}
    </MarkerStyled>
  );
};

export default LocationMapCard;
