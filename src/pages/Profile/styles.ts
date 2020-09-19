import styled, { css } from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
`;

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  left: 10px;
  top: 40px;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.primaryText};
  font-family: ${({ theme }) => theme.fonts.medium};
  margin: 24px 0 24px;
`;

export const UserAvatarButton = styled.TouchableOpacity`
  margin-top: 70px;
`;

export const UserAvatar = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 98px;
  align-self: center;
`;
