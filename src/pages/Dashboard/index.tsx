import React, { useCallback, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import Moment from 'moment';

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

  useEffect(() => {
    api.get('/shoppinglists').then((response) => {
      setShoppingLists(response.data);
    });
  }, []);

  const navigateToProfile = useCallback(() => {
    navigate('Profile');
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
          <ShoppingListContainer onPress={() => {}}>
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
                  {Moment(shoppingList.date).format('DD/MM/YYYY')}
                </ShoppingListMetaText>
              </ShoppingListMeta>
            </ShoppingListInfo>
          </ShoppingListContainer>
        )}
      />
      <ContainerButton>
        <AddButton>+</AddButton>
      </ContainerButton>
    </Container>
  );
};

export default Dashboard;
