import React, { useState, useRef, useEffect, useCallback } from 'react';
import { TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';

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
  product?: Product;
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
  const quantityInputRef = useRef<TextInput>(null);
  const valueInputRef = useRef<TextInput>(null);
  const [isChecked, setIsChecked] = useState(shoppingListItem.checked);

  const handleSaveShoppingListItem = useCallback(
    async (data: ShoppingListItemFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          brand: Yup.string().required(),
          quantity: Yup.number(),
          value: Yup.number(),
        });

        await schema.validate(data, { abortEarly: false });

        const productAux = {} as Product;

        Object.assign(productAux, {
          id: isItem.product?.id,
          name: isItem.product?.name,
          brand: isItem.product?.brand,
          description: isItem.product?.description,
        });

        Object.assign(productAux, {
          brand: data.brand,
        });

        await api.put('/products', productAux);

        const shoppingListItemAux = {} as ShoppingListItem;

        Object.assign(shoppingListItemAux, {
          id: isItem.id,
          product_id: isItem.product_id,
          shoppinglist_id: isItem.shoppinglist_id,
          checked: isChecked,
          date: isItem.date,
          quantity: isItem.quantity,
          value: isItem.value,
          longitude: isItem.longitude,
          latitude: isItem.latitude,
        });

        await Object.assign(shoppingListItemAux, {
          quantity: data.quantity,
          value: data.value,
        });

        await api.put('/shoppinglistitems', shoppingListItemAux);

        await Object.assign(shoppingListItemAux, {
          product: productAux,
        });

        setIsItem(shoppingListItemAux);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
          return;
        }

        Alert.alert(
          'Erro na cadastro',
          'Ocorreu um error ao fazer cadastro, tente novamente.',
        );
      }
    },
    [isItem, isChecked],
  );

  const handleCheck = useCallback(() => {
    setIsChecked(!isChecked);
    const shoppingListItemAux = {} as ShoppingListItem;

    Object.assign(shoppingListItemAux, {
      id: isItem.id,
      product_id: isItem.product_id,
      shoppinglist_id: isItem.shoppinglist_id,
      checked: !isChecked,
      date: isItem.date,
      quantity: isItem.quantity,
      value: isItem.value,
      longitude: isItem.longitude,
      latitude: isItem.latitude,
    });

    api.put('/shoppinglistitems', shoppingListItemAux);

    Object.assign(shoppingListItemAux, {
      product: isItem.product,
    });

    setIsItem(shoppingListItemAux);
  }, [isChecked, isItem]);

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
      </ShoppingListItemMain>
      {isOpened && (
        <>
          <Form ref={formRef} onSubmit={handleSaveShoppingListItem}>
            <ShoppingListItemDetail>
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
              <ShoppingListItemSecondaryDetail>
                <InputLeft>
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
          <ShoppingListQrCode>
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
