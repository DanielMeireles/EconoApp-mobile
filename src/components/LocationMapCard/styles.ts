import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Entypo';
import { Marker } from 'react-native-maps';

export const MarkerStyled = styled(Marker)``;

export const Card = styled.View`
  width: 300px;
  background: ${({ theme }) => theme.colors.cardBackground};
  flex-direction: column;
  border-radius: 8px;
  overflow: hidden;
  border-color: ${({ theme }) => theme.colors.cardElement};
  border-width: 1px;
  bottom: -10px;
`;

export const CardItem = styled.View`
  margin-top: -1px;
  width: 100%;
  padding: 5px;
  border-top-color: ${({ theme }) => theme.colors.cardElement};
  border-top-width: 1px;
`;

export const ProductName = styled.Text`
  color: ${({ theme }) => theme.colors.cardTitle};
  font-size: 18px;
  font-family: ${({ theme }) => theme.fonts.regular};
  line-height: 28px;
  align-self: center;
`;

export const ProductBrand = styled.Text`
  color: ${({ theme }) => theme.colors.cardText};
  font-size: 18px;
  font-family: ${({ theme }) => theme.fonts.regular};
  line-height: 28px;
  align-self: center;
`;

export const ProductValue = styled.Text`
  color: ${({ theme }) => theme.colors.cardElement};
  font-size: 18px;
  font-family: ${({ theme }) => theme.fonts.regular};
  line-height: 28px;
  align-self: center;
`;

export const PointIcon = styled(Icon)`
  color: ${({ theme }) => theme.colors.cardElement};
  align-self: center;
`;
