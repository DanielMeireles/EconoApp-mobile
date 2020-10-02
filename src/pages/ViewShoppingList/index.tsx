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
  TextTotalValueContainer,
  TextTotalValue,
} from './styles';

import ShoppingListItemCard, {
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

  const [isValue, setIsValue] = useState(0.0);

  const handleTotalValue = useCallback(() => {
    let totalValue = 0;

    shoppingListItems.map(async (shoppingListItem) => {
      if (shoppingListItem.quantity > 0 && shoppingListItem.value > 0) {
        totalValue += shoppingListItem.quantity * shoppingListItem.value;
      }
    });

    setIsValue(totalValue);
  }, [shoppingListItems]);

  async function getShoppingListItems(): Promise<void> {
    const response = await api.get(`/shoppinglistitems/findByShoppingListId`, {
      params: { shoppinglist_id: route.params.shoppingList.id },
    });

    const shoppingListItemsResponse: ShoppingListItem[] = response.data;

    setShoppingListItems(
      shoppingListItemsResponse.sort((a, b) => {
        if (a.product.name > b.product.name) {
          return 1;
        }
        return -1;
      }),
    );
  }

  useEffect(() => {
    setShoppingList(route.params.shoppingList);
    getShoppingListItems();
  }, [isFocused]);

  useEffect(() => {
    handleTotalValue();
  }, [shoppingListItems]);

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
        onTouchEnd={getShoppingListItems}
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
      <TextTotalValueContainer>
        <TextTotalValue>R$ {isValue.toFixed(2)}</TextTotalValue>
      </TextTotalValueContainer>
    </Container>
  );
};

export default ViewShoppingList;
