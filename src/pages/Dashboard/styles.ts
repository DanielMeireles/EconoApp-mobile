import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

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
  color: ${({ theme }) => theme.colors.headerPrimaryText};
  font-size: 20px;
  font-family: ${({ theme }) => theme.fonts.regular};
  line-height: 28px;
`;

export const UserName = styled.Text`
  color: ${({ theme }) => theme.colors.headerSecondaryText};
  font-family: ${({ theme }) => theme.fonts.medium};
`;

export const ProfileButton = styled.TouchableOpacity``;

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
`;
