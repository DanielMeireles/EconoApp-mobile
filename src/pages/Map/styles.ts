import styled from 'styled-components/native';

import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Animated } from 'react-native';

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

export const ScrollView = styled(Animated.ScrollView)`
  position: absolute;
  bottom: 30px;
  left: 0;
  right: 0;
`;

export const Card = styled.View`
  height: 110px;
  width: 150px;
  overflow: hidden;
  align-items: center;
  justify-content: center;
`;

export const CardData = styled.View`
  border-radius: 10px;
  padding: 10px;
  width: 140px;
  background: ${({ theme }) => theme.colors.cardBackground};
`;

export const ProductName = styled.Text`
  color: ${({ theme }) => theme.colors.cardTitle};
  font-size: 20px;
  font-family: ${({ theme }) => theme.fonts.regular};
  line-height: 28px;
  align-self: center;
`;

export const ProductBrand = styled.Text`
  color: ${({ theme }) => theme.colors.cardText};
  font-size: 20px;
  font-family: ${({ theme }) => theme.fonts.regular};
  line-height: 28px;
  align-self: center;
`;

export const ProductValue = styled.Text`
  color: ${({ theme }) => theme.colors.cardElement};
  font-size: 20px;
  font-family: ${({ theme }) => theme.fonts.regular};
  line-height: 28px;
  align-self: center;
`;
