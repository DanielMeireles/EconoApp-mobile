import React, { useRef, useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { useRoute, RouteProp } from '@react-navigation/native';

import { useTheme } from 'styled-components';
import { TextInput } from 'react-native';
import {
  Container,
  Header,
  HeaderTitle,
  BackButton,
  Content,
  ShoppingListImageButton,
  ShoppingListImage,
} from './styles';

import useKeyboardStatus from '../../hooks/keyboardStatus';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { ShoppingList } from '../Dashboard';

type ParamList = {
  shoppingList: {
    shoppingList: ShoppingList;
  };
};

const ViewShoppingList: React.FC = () => {
  const theme = useTheme();

  const route = useRoute<RouteProp<ParamList, 'shoppingList'>>();

  const [shoppingList, setShoppingList] = useState({} as ShoppingList);

  useEffect(() => {
    setShoppingList(route.params.shoppingList);
  }, [route.params.shoppingList]);

  const formRef = useRef<FormHandles>(null);
  const nameInputRef = useRef<TextInput>(null);
  const dateInputRef = useRef<TextInput>(null);
  const descriptionInputRef = useRef<TextInput>(null);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <Container>
      <Header>
        <BackButton onPress={() => {}}>
          <Icon
            name="chevron-left"
            size={24}
            color={theme.colors.headerElement}
          />
        </BackButton>
        <HeaderTitle>Nova Lista</HeaderTitle>
      </Header>

      <Content>
        {!useKeyboardStatus() && (
          <ShoppingListImageButton onPress={() => {}}>
            <ShoppingListImage
              source={{
                uri: 'https://api.adorable.io/avatars/186/abott@adorable.png',
              }}
            />
          </ShoppingListImageButton>
        )}
        <Form onSubmit={() => {}} ref={formRef}>
          <Input
            ref={nameInputRef}
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="default"
            name="name"
            placeholder="Nome"
            returnKeyType="next"
            onSubmitEditing={() => {
              nameInputRef.current?.focus();
            }}
          />

          <Input
            ref={dateInputRef}
            value={format(selectedDate, 'dd/MM/yyyy')}
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="default"
            name="date"
            placeholder="Data"
            returnKeyType="next"
            onTouchStart={() => {}}
            onSubmitEditing={() => {
              dateInputRef.current?.focus();
            }}
          />
          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              onChange={() => {}}
              mode="date"
              display="calendar"
            />
          )}
          <Input
            ref={descriptionInputRef}
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="default"
            name="description"
            placeholder="Descrição"
            returnKeyType="send"
            onSubmitEditing={() => {
              descriptionInputRef.current?.focus();
            }}
          />
        </Form>
        <Button onPress={() => formRef.current?.submitForm()}>Salvar</Button>
      </Content>
    </Container>
  );
};

export default ViewShoppingList;
