import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import CheckBox from '@react-native-community/checkbox';

export interface ICheckedProps {
  isChecked: boolean;
}

export const ShoppingListItemsTitle = styled.Text`
  font-size: 24px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.primaryText};
  font-family: ${({ theme }) => theme.fonts.medium};
`;

export const ShoppingListItemContainer = styled.View`
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 10px;
  padding: 20px 10px 20px 10px;
  margin-bottom: 12px;
  flex-direction: column;
  align-items: center;
`;

export const ShoppingListItemMain = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ShoppingListIconValueContainer = styled.View`
  flex-direction: row;
`;

export const ShoppingListItemsValue = styled.Text`
  margin-top: 3px;
  margin-right: 10px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.cardElement};
  font-size: 15px;
`;

export const CheckBoxButton = styled(CheckBox)`
  margin-right: 5px;
`;

export const ShoppingListItemTitle = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ShoppingListItemName = styled.Text<ICheckedProps>`
  margin-top: 3px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.cardTitle};
  font-size: 18px;
  ${(props) =>
    props.isChecked &&
    css`
      text-decoration: line-through;
      color: ${({ theme }) => theme.colors.cardText};
    `}
`;

export const ShoppingListItemDetail = styled.View`
  width: 100%;
  margin-top: 10px;
  flex-direction: column;
  justify-content: space-between;
`;

export const ShoppingListItemSecondaryDetail = styled.View`
  width: 50%;
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

export const InputLeft = styled.View`
  width: 97.5%;
  margin-right: 4px;
`;

export const InputRight = styled.View`
  width: 97.5%;
  margin-left: 4px;
`;

export const Label = styled.Text`
  color: ${({ theme }) => theme.colors.secondaryText};
  font-size: 15px;
  font-family: ${({ theme }) => theme.fonts.regular};
  margin-left: 5px;
`;
