import styled, { css } from 'styled-components/native';
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
  padding: 20px 10px 20px 10px;
  margin-bottom: 16px;
  flex-direction: column;
  align-items: center;

  ${(props) => props.isOpened && css``}
`;

export const ShoppingListItemName = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.cardTitle};
  font-size: 18px;
`;

export const ShoppingListItemMain = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

export const ShoppingListItemDetail = styled.View`
  width: 100%;
  margin-top: 10px;
  flex-direction: column;
  justify-content: space-between;
`;

export const ShoppingListItemSecondaryDetail = styled.View`
  width: 48.8%;
  flex-direction: row;
  justify-content: space-between;
`;

export const ShoppingListQrCode = styled(RectButton)`
  width: 100%;
  margin-top: 5px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Image = styled.Image`
  margin-left: 10px;
  width: 70px;
  height: 70px;
`;

export const Text = styled.Text`
  color: ${({ theme }) => theme.colors.tertiaryText};
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.regular};
  width: 70%;
  margin-left: 20px;
`;
