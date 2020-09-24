import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useRoute, RouteProp } from '@react-navigation/native';

import { useTheme } from 'styled-components';
import {
  Container,
  Header,
  HeaderTitle,
  BackButton,
  ShoppingListItems,
  ShoppingListItemsTitle,
  ShoppingListItemContainer,
  ShoppingListItemName,
} from './styles';

import { ShoppingList } from '../Dashboard';
import api from '../../services/api';

type ParamList = {
  shoppingList: {
    shoppingList: ShoppingList;
  };
};

export interface Product {
  id: string;
  name: string;
  brand: string;
  description: string;
  image_url: string;
}

export interface ShoppingListItem {
  id: string;
  product_id: string;
  product?: Product;
  shoppinglist_id: string;
  date: Date;
  quantity: number;
  value: number;
  longitude: number;
  latitude: number;
}

const ViewShoppingList: React.FC = () => {
  const theme = useTheme();

  const route = useRoute<RouteProp<ParamList, 'shoppingList'>>();

  const [shoppingList, setShoppingList] = useState({} as ShoppingList);
  const [shoppingListItems, setShoppingListItems] = useState<
    ShoppingListItem[]
  >([]);
  const [
    shoppingListItemsWithProduct,
    setShoppingListItemsWithProduct,
  ] = useState<ShoppingListItem[]>([]);

  useEffect(() => {
    setShoppingList(route.params.shoppingList);
    api
      .get(`/shoppinglistitems/findByShoppingListId/${shoppingList.id}`)
      .then((response) => {
        setShoppingListItems(response.data);
      });
  }, [route.params.shoppingList, shoppingList.id]);

  useEffect(() => {
    shoppingListItems.map(async (shoppingListItem) => {
      const product = await api.get(
        `/products/findById/${shoppingListItem.product_id}`,
      );

      Object.assign(shoppingListItem, {
        product: product.data,
      });

      setShoppingListItemsWithProduct([
        ...shoppingListItemsWithProduct,
        shoppingListItem,
      ]);
    });
  }, [shoppingListItems, shoppingListItemsWithProduct]);

  return (
    <Container>
      <Header>
        <BackButton onPress={() => {}}>
          <Icon
            name="chevron-left"
            size={24}
            color={theme.colors.headerElement}
          />
        </BackButton>
        <HeaderTitle>{shoppingList.name}</HeaderTitle>
      </Header>

      <ShoppingListItems
        data={shoppingListItemsWithProduct}
        keyExtractor={(shoppingListItem) => shoppingListItem.id}
        ListHeaderComponent={
          <ShoppingListItemsTitle>Lista</ShoppingListItemsTitle>
        }
        renderItem={({ item: shoppingListItem }) => (
          <ShoppingListItemContainer onPress={() => {}}>
            <ShoppingListItemName>
              {shoppingListItem.product?.name}
            </ShoppingListItemName>
          </ShoppingListItemContainer>
        )}
      />
    </Container>
  );
};

export default ViewShoppingList;
