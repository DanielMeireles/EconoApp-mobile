import React, { useState, useRef, useCallback, useEffect } from 'react';
import { TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';
import Geolocation from '@react-native-community/geolocation';

import { useNavigation } from '@react-navigation/native';

import { useTheme } from 'styled-components';
import {
  ShoppingListItemContainer,
  ShoppingListItemMain,
  ShoppingListItemTitle,
  ShoppingListItemName,
  ShoppingListItemDetail,
  ShoppingListItemSecondaryDetail,
  ShoppingListQrCode,
  Image,
  Text,
  CheckBoxButton,
  InputLeft,
  InputRight,
  ShoppingListItemsValue,
  ShoppingListIconValueContainer,
  Label,
} from './styles';

import Input from '../Input';

import qrcodeImg from '../../assets/images/qr-code.png';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

export interface Product {
  id: string;
  name: string;
  brand: string;
  description: string;
  image_url: string;
}

export interface ShoppingListItem {
  id: string;
  product_id: string;
  product: Product;
  shoppinglist_id: string;
  checked: boolean;
  date: Date;
  quantity: number;
  value: number;
  longitude: number;
  latitude: number;
}

interface IShoppingListItemProps {
  shoppingListItem: ShoppingListItem;
}

interface ShoppingListItemFormData {
  brand: string;
  description: string;
  quantity: string;
  value: string;
}

const ShoppingListItemCard: React.FC<IShoppingListItemProps> = ({
  shoppingListItem,
}) => {
  const theme = useTheme();

  const [isItem, setIsItem] = useState(shoppingListItem);

  const [isOpened, setIsOpened] = useState(false);
  const formRef = useRef<FormHandles>(null);
  const brandInputRef = useRef<TextInput>(null);
  const descriptionInputRef = useRef<TextInput>(null);
  const quantityInputRef = useRef<TextInput>(null);
  const valueInputRef = useRef<TextInput>(null);
  const [isChecked, setIsChecked] = useState(shoppingListItem.checked);
  const [isValue, setIsValue] = useState(0.0);
  const [isPosition, setIsPosition] = useState({
    latitude: 0,
    longitude: 0,
  });
  const navigation = useNavigation();

  useEffect(() => {
    if (isItem.quantity > 0 && isItem.value > 0) {
      setIsValue(isItem.quantity * isItem.value);
    } else {
      setIsValue(0.0);
    }
  }, [isItem]);

  const getPosition = useCallback(() => {
    Geolocation.getCurrentPosition((pos) => {
      setIsPosition({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      });
    });
  }, []);

  const handleSaveShoppingListItem = useCallback(
    async (data: ShoppingListItemFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          brand: Yup.string(),
          description: Yup.string(),
          quantity: Yup.number().nullable(),
          value: Yup.number().nullable(),
        });

        await schema.validate(data, { abortEarly: false });

        let productAux = {} as Product;

        await api
          .get('/products/findByNameAndBrand', {
            params: {
              name: shoppingListItem.product?.name,
              brand: data.brand,
            },
          })
          .then((response) => {
            productAux = response.data;
          })
          .catch(() => {});

        if (!productAux.id) {
          Object.assign(productAux, {
            name: isItem.product?.name,
            brand: data.brand,
            description: data.description,
          });

          const response = await api.post('/products', productAux);

          productAux = response.data;
        }

        const shoppingListItemAux = {} as ShoppingListItem;

        getPosition();

        Object.assign(shoppingListItemAux, {
          id: isItem.id,
          date: new Date(),
          product_id: productAux.id,
          shoppinglist_id: isItem.shoppinglist_id,
          checked: isChecked,
          quantity: isItem.quantity,
          value: isItem.value,
          latitude: isPosition.latitude,
          longitude: isPosition.longitude,
        });

        if (data.quantity) {
          Object.assign(shoppingListItemAux, {
            quantity: data.quantity,
          });
        }

        if (data.value) {
          Object.assign(shoppingListItemAux, {
            value: data.value,
          });
        }

        await api.put('/shoppinglistitems', shoppingListItemAux);

        Object.assign(shoppingListItemAux, {
          product: productAux,
        });

        setIsItem(shoppingListItemAux);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }
      }
    },
    [shoppingListItem.product.name, getPosition, isItem, isChecked, isPosition],
  );

  const handleCheck = useCallback(() => {
    setIsChecked(!isChecked);
    const shoppingListItemAux = {} as ShoppingListItem;

    getPosition();

    Object.assign(shoppingListItemAux, {
      id: isItem.id,
      date: new Date(),
      product_id: isItem.product_id,
      shoppinglist_id: isItem.shoppinglist_id,
      checked: !isChecked,
      latitude: isPosition.latitude,
      longitude: isPosition.longitude,
    });

    api.put('/shoppinglistitems', shoppingListItemAux);

    Object.assign(shoppingListItemAux, {
      product: isItem.product,
      quantity: isItem.quantity,
      value: isItem.value,
    });

    setIsItem(shoppingListItemAux);
  }, [getPosition, isChecked, isItem, isPosition]);

  return (
    <ShoppingListItemContainer>
      <ShoppingListItemMain>
        <ShoppingListItemTitle>
          <CheckBoxButton
            tintColors={{
              true: theme.colors.cardElement,
              false: theme.colors.cardElement,
            }}
            value={isChecked}
            onChange={handleCheck}
          />
          <ShoppingListItemName isChecked={isItem.checked}>
            {isItem.product?.name}
          </ShoppingListItemName>
        </ShoppingListItemTitle>
        <ShoppingListIconValueContainer>
          <ShoppingListItemsValue>{isValue.toFixed(2)}</ShoppingListItemsValue>
          {!isOpened && (
            <Icon
              onPress={() => {
                setIsOpened(!isOpened);
              }}
              name="chevron-down"
              size={24}
              color={theme.colors.headerElement}
            />
          )}
          {isOpened && (
            <Icon
              onPress={() => {
                setIsOpened(!isOpened);
              }}
              name="chevron-up"
              size={24}
              color={theme.colors.headerElement}
            />
          )}
        </ShoppingListIconValueContainer>
      </ShoppingListItemMain>
      {isOpened && (
        <>
          <Form ref={formRef} onSubmit={handleSaveShoppingListItem}>
            <ShoppingListItemDetail>
              <Label>Marca</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="default"
                name="brand"
                onEndEditing={() => formRef.current?.submitForm()}
                ref={brandInputRef}
                defaultValue={isItem.product?.brand}
                placeholder="Marca"
                returnKeyType="next"
                onSubmitEditing={() => {
                  brandInputRef.current?.focus();
                }}
              />
              <Label>Descrição</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="default"
                name="description"
                onEndEditing={() => formRef.current?.submitForm()}
                ref={descriptionInputRef}
                defaultValue={isItem.product?.description}
                placeholder="Descrição"
                returnKeyType="next"
                onSubmitEditing={() => {
                  descriptionInputRef.current?.focus();
                }}
              />
              <ShoppingListItemSecondaryDetail>
                <InputLeft>
                  <Label>Quantidade</Label>
                  <Input
                    autoCorrect={false}
                    autoCapitalize="none"
                    keyboardType="number-pad"
                    name="quantity"
                    onEndEditing={() => formRef.current?.submitForm()}
                    ref={quantityInputRef}
                    defaultValue={String(isItem.quantity)}
                    placeholder="Quantidade"
                    returnKeyType="next"
                    onSubmitEditing={() => {
                      quantityInputRef.current?.focus();
                    }}
                  />
                </InputLeft>
                <InputRight>
                  <Label>Valor</Label>
                  <Input
                    autoCorrect={false}
                    autoCapitalize="none"
                    keyboardType="decimal-pad"
                    name="value"
                    onEndEditing={() => formRef.current?.submitForm()}
                    ref={valueInputRef}
                    defaultValue={String(isItem.value)}
                    placeholder="Valor Unitário"
                    returnKeyType="next"
                    onSubmitEditing={() => {
                      valueInputRef.current?.focus();
                    }}
                  />
                </InputRight>
              </ShoppingListItemSecondaryDetail>
            </ShoppingListItemDetail>
          </Form>
          <ShoppingListQrCode
            onPress={() => {
              navigation.navigate('QRCode', { shoppingListItem });
            }}
          >
            <Image
              source={qrcodeImg}
              style={{
                resizeMode: 'contain',
              }}
            />
            <Text>
              Você pode efetuar a leitura do QR Code para o preenchimento das
              infomações
            </Text>
          </ShoppingListQrCode>
        </>
      )}
    </ShoppingListItemContainer>
  );
};

export default ShoppingListItemCard;
