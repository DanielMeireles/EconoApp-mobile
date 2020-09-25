import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import { ShoppingListItem } from './index';
import Button from '../../components/Button';

interface ShoppingListItemProps {
  isOpened: boolean;
}

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
  color: ${({ theme }) => theme.colors.headerSecondaryText};
  font-size: 20px;
  font-family: ${({ theme }) => theme.fonts.regular};
  line-height: 28px;
`;

export const BackButton = styled.TouchableOpacity``;

export const ShoppingListItems = styled(
  FlatList as new () => FlatList<ShoppingListItem>,
)`
  padding: 10px 24px;
`;

export const ShoppingListItemsTitle = styled.Text`
  font-size: 24px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.primaryText};
  font-family: ${({ theme }) => theme.fonts.medium};
`;

export const ShoppingListItemContainer = styled(RectButton)<
  ShoppingListItemProps
>`
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ShoppingListItemName = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.cardTitle};
  font-size: 18px;
`;

export const ContainerButton = styled.View`
  position: absolute;
  bottom: 15px;
  right: 15px;
`;

export const AddButton = styled(Button)`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  font-size: 50px;
`;
