import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 40px 30px ${Platform.OS === 'android' ? 40 : 40}px;
`;

export const Header = styled.View`
  position: absolute;
  left: 30px;
  top: 30px;
`;

export const TitleContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 40px 0 10px;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: ${({ theme }) => theme.colors.primaryText};
  font-family: ${({ theme }) => theme.fonts.medium};
`;
