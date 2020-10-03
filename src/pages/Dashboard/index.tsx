import React, { useCallback, useState, useEffect } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { format } from 'date-fns';

import { useTheme } from 'styled-components';
import { useAuth } from '../../hooks/auth';

import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ProfileButton,
  UserAvatar,
  ShoppingLists,
  ShoppingListsTitle,
  ShoppingListContainer,
  ShoppingListImage,
  ShoppingListInfo,
  ShoppingListName,
  ShoppingListMeta,
  ShoppingListMetaText,
  ContainerButton,
  AddButton,
} from './styles';
import api from '../../services/api';

export interface ShoppingList {
  id: string;
  name: string;
  description: string;
  date: Date;
  user_id: string;
  image_url: string;
}

const Dashboard: React.FC = () => {
  const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([]);

  const { user } = useAuth();
  const { navigate } = useNavigation();
  const theme = useTheme();

  const isFocused = useIsFocused();

  useEffect(() => {
    api.get('/shoppinglists').then((response) => {
      setShoppingLists(response.data);
    });
  }, []);

  useEffect(() => {
    api.get('/shoppinglists').then((response) => {
      const shoppingListsResponse: ShoppingList[] = response.data;
      setShoppingLists(
        shoppingListsResponse.sort((a, b) => {
          if (a.date > b.date) {
            return 1;
          }
          return -1;
        }),
      );
    });
  }, [isFocused]);

  const navigateToProfile = useCallback(() => {
    navigate('Profile');
  }, [navigate]);

  const navigateToCreateShoppingList = useCallback(() => {
    navigate('CreateShoppingList');
  }, [navigate]);

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo,{'\n'}
          <UserName>{user.name}</UserName>
        </HeaderTitle>
        <ProfileButton onPress={navigateToProfile}>
          <UserAvatar
            source={{
              uri: user.avatar_url,
            }}
          />
        </ProfileButton>
      </Header>

      <ShoppingLists
        data={shoppingLists}
        keyExtractor={(shoppingList) => shoppingList.id}
        ListHeaderComponent={
          <ShoppingListsTitle>Listas de Compras</ShoppingListsTitle>
        }
        renderItem={({ item: shoppingList }) => (
          <ShoppingListContainer
            onPress={() => {
              navigate('ViewShoppingList', { shoppingList });
            }}
          >
            <ShoppingListImage
              source={{
                uri: shoppingList.image_url,
              }}
            />

            <ShoppingListInfo>
              <ShoppingListName>{shoppingList.name}</ShoppingListName>

              <ShoppingListMeta>
                <Icon
                  name="calendar"
                  size={14}
                  color={theme.colors.cardElement}
                />
                <ShoppingListMetaText>
                  {format(new Date(shoppingList.date), 'dd/MM/yyyy')}
                </ShoppingListMetaText>
              </ShoppingListMeta>

              <ShoppingListMeta>
                <Icon name="info" size={14} color={theme.colors.cardElement} />
                <ShoppingListMetaText>
                  {shoppingList.description}
                </ShoppingListMetaText>
              </ShoppingListMeta>
            </ShoppingListInfo>
          </ShoppingListContainer>
        )}
      />
      <ContainerButton>
        <AddButton onPress={navigateToCreateShoppingList}>
          <Icon name="plus" size={24} color={theme.colors.buttonIcon} />
        </AddButton>
      </ContainerButton>
    </Container>
  );
};

export default Dashboard;
