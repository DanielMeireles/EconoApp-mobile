import React, { useState, useEffect, useCallback } from 'react';
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

  useEffect(() => {
    setShoppingList(route.params.shoppingList);

    async function getShoppingListItems(): Promise<void> {
      const shoppingListItemsResponse = await api.get(
        `/shoppinglistitems/findByShoppingListId/${shoppingList.id}`,
      );

      const shoppingListItemsData: ShoppingListItem[] =
        shoppingListItemsResponse.data;

      shoppingListItemsData.map(async (shoppingListItem) => {
        const productResponse = await api.get(
          `/products/findById/${shoppingListItem.product_id}`,
        );

        const product: Product = productResponse.data;

        await Object.assign(shoppingListItem, {
          product,
        });

        setShoppingListItems([...shoppingListItems, shoppingListItem]);
      });
    }

    getShoppingListItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params.shoppingList, shoppingList.id]);

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
        data={shoppingListItems}
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
