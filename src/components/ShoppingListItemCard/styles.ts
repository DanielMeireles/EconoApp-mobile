import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

interface ShoppingListItemProps {
  isOpened: boolean;
}

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
