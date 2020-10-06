import React, { useState, useCallback } from 'react';
import { Event } from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/Entypo';
import { useTheme } from 'styled-components';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';

import { Alert, Dimensions } from 'react-native';
import {
  Container,
  Scanner,
  ContainerButton,
  AddButton,
  Header,
  HeaderTitle,
  BackButton,
} from './styles';

import api from '../../services/api';

import { ShoppingListItem } from '../../components/ShoppingListItemCard';

type ParamList = {
  shoppingListItem: {
    shoppingListItem: ShoppingListItem;
  };
};

interface IQRCode {
  application: string;
  product_id: string;
  value: number;
  latitude: number;
  longitude: number;
}

const QRCode: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  const route = useRoute<RouteProp<ParamList, 'shoppingListItem'>>();

  const [isTorch, setIsTorch] = useState(RNCamera.Constants.FlashMode.off);

  const handleTorch = useCallback(() => {
    if (isTorch === RNCamera.Constants.FlashMode.off) {
      setIsTorch(RNCamera.Constants.FlashMode.torch);
    } else {
      setIsTorch(RNCamera.Constants.FlashMode.off);
    }
  }, [isTorch]);

  const onSuccess = async (e: Event): Promise<void> => {
    const qrcode: IQRCode = JSON.parse(e.data);

    if (qrcode.application !== 'EconoApp') {
      Alert.alert('QRCode inválido', 'O QRCode não é válido favor verificar');
    }

    await api
      .get('/products/findById', {
        params: {
          id: qrcode.product_id,
        },
      })
      .catch(() => {
        Alert.alert(
          'Produto inválido',
          'O produto não é válido favor verificar',
        );
      });

    const { shoppingListItem } = route.params;
    const shoppingListAux = {} as ShoppingListItem;

    Object.assign(shoppingListAux, {
      id: shoppingListItem.id,
      product_id: qrcode.product_id,
      shoppinglist_id: shoppingListItem.shoppinglist_id,
      checked: shoppingListItem.checked,
      quantity: shoppingListItem.quantity,
      value: qrcode.value,
      latitude: qrcode.latitude,
      longitude: qrcode.longitude,
    });

    await api.put('/shoppinglistitems', shoppingListAux);

    navigation.goBack();
  };

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <Container>
      <Header>
        <BackButton onPress={handleGoBack}>
          <Icon
            name="chevron-left"
            size={24}
            color={theme.colors.headerElement}
          />
        </BackButton>
        <HeaderTitle>QRCode</HeaderTitle>
      </Header>
      <Scanner
        onRead={onSuccess}
        cameraProps={{ flashMode: isTorch }}
        cameraStyle={{
          marginTop: -165,
          height: Dimensions.get('screen').height - 105,
          width: Dimensions.get('screen').width,
        }}
      />
      <ContainerButton>
        <AddButton onPress={handleTorch}>
          <Icon name="flash" size={24} color={theme.colors.buttonIcon} />
        </AddButton>
      </ContainerButton>
    </Container>
  );
};

export default QRCode;
