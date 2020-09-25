import React, { useState, useRef } from 'react';
import { TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';

import { useTheme } from 'styled-components';
import {
  ShoppingListItemContainer,
  ShoppingListItemMain,
  ShoppingListItemName,
  ShoppingListItemDetail,
  ShoppingListItemSecondaryDetail,
  ShoppingListQrCode,
  Image,
  Text,
} from './styles';

import Input from '../Input';

import qrcodeImg from '../../assets/images/qr-code.png';

interface IShoppingListItemProps {
  children: string | undefined;
}

const ShoppingListItemCard: React.FC<IShoppingListItemProps> = ({
  children,
}) => {
  const theme = useTheme();

  const [isOpened, setIsOpened] = useState(false);
  const formRef = useRef<FormHandles>(null);
  const brandInputRef = useRef<TextInput>(null);
  const quantityInputRef = useRef<TextInput>(null);
  const valueInputRef = useRef<TextInput>(null);

  return (
    <ShoppingListItemContainer
      isOpened={isOpened}
      onPress={() => {
        setIsOpened(!isOpened);
      }}
    >
      <ShoppingListItemMain>
        <ShoppingListItemName>{children}</ShoppingListItemName>
        {!isOpened && (
          <Icon
            name="chevron-down"
            size={24}
            color={theme.colors.headerElement}
          />
        )}
        {isOpened && (
          <Icon
            name="chevron-up"
            size={24}
            color={theme.colors.headerElement}
          />
        )}
      </ShoppingListItemMain>
      {isOpened && (
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
        </Form>
      )}
    </ShoppingListItemContainer>
  );
};

export default ShoppingListItemCard;
