import styled from 'styled-components/native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import Button from '../../components/Button';

export const Container = styled.View`
  flex: 1;
`;

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
