import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import Button from '../../components/Button';
import { ShoppingList } from './index';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  padding: 24px;
  padding-top: ${getStatusBarHeight() + 24}px;
  background: ${({ theme }) => theme.colors.headerBackground};

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderTitle = styled.Text`
  color: ${({ theme }) => theme.colors.headerPrimaryText};
  font-size: 20px;
  font-family: ${({ theme }) => theme.fonts.regular};
  line-height: 28px;
`;

export const UserName = styled.Text`
  color: ${({ theme }) => theme.colors.headerSecondaryText};
  font-family: ${({ theme }) => theme.fonts.medium};
`;

export const ProfileButton = styled.TouchableOpacity``;

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
`;

export const ShoppingLists = styled(
  FlatList as new () => FlatList<ShoppingList>,
)`
  padding: 10px 24px;
`;

export const ShoppingListsTitle = styled.Text`
  font-size: 24px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.primaryText};
  font-family: ${({ theme }) => theme.fonts.medium};
`;

export const ShoppingListContainer = styled.TouchableOpacity`
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 16px;
  flex-direction: row;
  align-items: center;
`;

export const ShoppingListImage = styled.Image`
  width: 72px;
  height: 72px;
  border-radius: 36px;
`;

export const ShoppingListInfo = styled.View`
  flex: 1;
  margin-left: 24px;
`;

export const ShoppingListName = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.cardTitle};
  font-size: 18px;
`;

export const ShoppingListMeta = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ShoppingListMetaText = styled.Text`
  margin-left: 8px;
  margin-top: 4px;
  color: ${({ theme }) => theme.colors.cardText};
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const ContainerButton = styled.View`
  position: absolute;
  bottom: 10px;
  right: 10px;
`;

export const AddButton = styled(Button)`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  font-size: 50px;
`;
