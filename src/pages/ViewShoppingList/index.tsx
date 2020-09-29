import React, { useState, useEffect, useCallback } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {
  useRoute,
  RouteProp,
  useNavigation,
  useIsFocused,
} from '@react-navigation/native';

import { useTheme } from 'styled-components';
import {
  Container,
  Header,
  HeaderTitle,
  BackButton,
  ShoppingListItems,
  ShoppingListItemsTitle,
  ContainerButton,
  AddButton,
} from './styles';

import ShoppingListItemCard, {
  Product,
  ShoppingListItem,
} from '../../components/ShoppingListItemCard';

import { ShoppingList } from '../Dashboard';
import api from '../../services/api';

type ParamList = {
  shoppingList: {
    shoppingList: ShoppingList;
  };
};

const ViewShoppingList: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

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

      await shoppingListItemsData.map(async (shoppingListItem) => {
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

  const navigateToCreateShoppingListItem = useCallback(() => {
    navigation.navigate('CreateShoppingListItem', { shoppingList });
  }, [navigation, shoppingList]);

  const handleGoBack = useCallback(() => {
    navigation.navigate('Dashboard');
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
        <HeaderTitle>{shoppingList.name}</HeaderTitle>
      </Header>

      <ShoppingListItems
        data={shoppingListItems}
        keyExtractor={(shoppingListItem) => shoppingListItem.id}
        ListHeaderComponent={
          <ShoppingListItemsTitle>Lista</ShoppingListItemsTitle>
        }
        renderItem={({ item: shoppingListItem }) => (
          <ShoppingListItemCard shoppingListItem={shoppingListItem} />
        )}
      />
      <ContainerButton>
        <AddButton onPress={navigateToCreateShoppingListItem}>
          <Icon name="plus" size={24} color={theme.colors.buttonIcon} />
        </AddButton>
      </ContainerButton>
    </Container>
  );
};

export default ViewShoppingList;
