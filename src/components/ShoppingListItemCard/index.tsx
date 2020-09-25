import React, { useState, useRef } from 'react';
import { TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';

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

import qrcodeImg from '../../assets/images/qr-code.png';

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

const ShoppingListItemCard: React.FC<IShoppingListItemProps> = ({
  shoppingListItem,
}) => {
  const theme = useTheme();

  const [isOpened, setIsOpened] = useState(false);
  const formRef = useRef<FormHandles>(null);
  const brandInputRef = useRef<TextInput>(null);
  const quantityInputRef = useRef<TextInput>(null);
  const valueInputRef = useRef<TextInput>(null);
  const [isChecked, setIsChecked] = useState(false);

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
          <ShoppingListItemName>
            {shoppingListItem.product?.name}
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
          <Form ref={formRef} onSubmit={() => {}}>
            <ShoppingListItemDetail>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="default"
                name="brand"
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
        </>
      )}
    </ShoppingListItemContainer>
  );
};

export default ShoppingListItemCard;
