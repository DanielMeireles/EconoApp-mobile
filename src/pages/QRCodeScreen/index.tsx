import React, { useState, useCallback } from 'react';
import { Event } from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/Entypo';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';

import { Container, Scanner, ContainerButton, AddButton } from './styles';

const QRCodeScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  const [isTorch, setIsTorch] = useState(RNCamera.Constants.FlashMode.off);

  const handleTorch = useCallback(() => {
    if (isTorch === RNCamera.Constants.FlashMode.off) {
      setIsTorch(RNCamera.Constants.FlashMode.torch);
    } else {
      setIsTorch(RNCamera.Constants.FlashMode.off);
    }
  }, [isTorch]);

  const onSuccess = (e: Event): void => {
    console.log(e.data);
    navigation.goBack();
  };

  return (
    <Container>
      <Scanner onRead={onSuccess} cameraProps={{ flashMode: isTorch }} />
      <ContainerButton>
        <AddButton onPress={handleTorch}>
          <Icon name="flash" size={24} color={theme.colors.buttonIcon} />
        </AddButton>
      </ContainerButton>
    </Container>
  );
};

export default QRCodeScreen;
