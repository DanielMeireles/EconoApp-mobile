import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import FeatherIcon from 'react-native-vector-icons/Feather';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 40px 30px ${Platform.OS === 'android' ? 100 : 40}px;
`;

export const TitleContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 40px 0 10px;
`;

export const Title = styled.Text`
  flex: 1;
  font-size: 24px;
  color: ${({ theme }) => theme.colors.primaryText};
  font-family: ${({ theme }) => theme.fonts.medium};
`;

export const CreateAccountButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

export const CreateAccountButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.secondaryText};
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const ForgotPassword = styled.TouchableOpacity`
  margin-top: 24px;
`;

export const ForgotPasswordText = styled.Text`
  color: ${({ theme }) => theme.colors.primaryText};
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;
