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
} from './styles';

import Input from '../Input';
import Button from '../Button';

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
  const [isChecked, setIsChecked] = useState(false);

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

        await Object.assign(productAux, {
          id: isItem.product?.id,
          name: isItem.product?.name,
          brand: isItem.product?.brand,
          description: isItem.product?.description,
        });

        await Object.assign(productAux, {
          brand: data.brand,
        });

        await api.put('/products', productAux);

        const shoppingListItemAux = {} as ShoppingListItem;

        await Object.assign(shoppingListItemAux, {
          id: isItem.id,
          product_id: isItem.product_id,
          shoppinglist_id: isItem.shoppinglist_id,
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

        setIsOpened(!isOpened);
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
    [isItem, isOpened],
  );

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
            onChange={() => {
              setIsChecked(!isChecked);
            }}
          />
          <ShoppingListItemName>{isItem.product?.name}</ShoppingListItemName>
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
                defaultValue={isItem.product?.brand}
                placeholder="Marca"
                returnKeyType="next"
                onSubmitEditing={() => {
                  brandInputRef.current?.focus();
                }}
              />
              <ShoppingListItemSecondaryDetail>
                <Input
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType="number-pad"
                  name="quantity"
                  defaultValue={String(isItem.quantity)}
                  placeholder="Quantidade"
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    quantityInputRef.current?.focus();
                  }}
                />
                <Input
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType="decimal-pad"
                  name="value"
                  defaultValue={String(isItem.value)}
                  placeholder="Valor Unitário"
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    valueInputRef.current?.focus();
                  }}
                />
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
          <Button onPress={() => formRef.current?.submitForm()}>Salvar</Button>
        </>
      )}
    </ShoppingListItemContainer>
  );
};

export default ShoppingListItemCard;
