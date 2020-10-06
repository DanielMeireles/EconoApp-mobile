import styled from 'styled-components/native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
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

export const Scanner = styled(QRCodeScanner)``;

export const ContainerButton = styled.View`
  position: absolute;
  bottom: 15px;
  right: 40%;
`;

export const AddButton = styled(Button)`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  font-size: 50px;
`;
