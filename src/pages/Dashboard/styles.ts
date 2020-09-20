import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RectButton } from 'react-native-gesture-handler';

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
  padding: 32px 24px 16px;
`;

export const ShoppingListsTitle = styled.Text`
  font-size: 24px;
  margin-bottom: 24px;
  color: ${({ theme }) => theme.colors.primaryText};
  font-family: ${({ theme }) => theme.fonts.medium};
`;

export const ShoppingListContainer = styled(RectButton)`
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
  margin-top: 8px;
`;

export const ShoppingListMetaText = styled.Text`
  margin-left: 8px;
  color: ${({ theme }) => theme.colors.cardText};
  font-family: ${({ theme }) => theme.fonts.regular};
`;