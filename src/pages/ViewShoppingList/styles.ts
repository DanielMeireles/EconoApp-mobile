import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import { ShoppingListItem } from '../../components/ShoppingListItemCard';

import Button from '../../components/Button';

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

export const ContainerButton = styled.View`
  position: absolute;
  width: 100%;
  bottom: 10px;
  padding: 0 10px 0 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const AddButton = styled(Button)`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

export const BestPlaceButton = styled(Button)`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

export const TextTotalValueContainer = styled.View`
  align-items: center;
  justify-content: center;
  height: 70px;
  background: ${({ theme }) => theme.colors.headerBackground};
  border-radius: 70px;
`;

export const TextTotalValue = styled.Text`
  color: ${({ theme }) => theme.colors.headerSecondaryText};
  font-size: 25px;
  font-family: ${({ theme }) => theme.fonts.regular};
  margin-top: 5px;
`;
