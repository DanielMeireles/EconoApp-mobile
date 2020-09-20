import React, { useRef, useState, useCallback } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import ImagePicker from 'react-native-image-picker';
import FormData from 'form-data';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';

import { useTheme } from 'styled-components';
import { Platform, TextInput, Alert } from 'react-native';
import {
  Container,
  Header,
  HeaderTitle,
  BackButton,
  Content,
  ShoppingListImageButton,
  ShoppingListImage,
} from './styles';

import api from '../../services/api';
import useKeyboardStatus from '../../hooks/keyboardStatus';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { ShoppingList } from '../Dashboard';
import getValidationErrors from '../../utils/getValidationErrors';

interface ShoppingListFormData {
  name: string;
  date: string;
  description: string;
}

const CreateShoppingList: React.FC = () => {
  const theme = useTheme();
  const formRef = useRef<FormHandles>(null);
  const nameInputRef = useRef<TextInput>(null);
  const dateInputRef = useRef<TextInput>(null);
  const descriptionInputRef = useRef<TextInput>(null);

  const [image, setImage] = useState(
    'https://api.adorable.io/avatars/186/abott@adorable.png',
  );
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const navigation = useNavigation();

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleToggleDatePicker = useCallback(() => {
    setShowDatePicker((state) => !state);
  }, []);

  const handleDateChanged = useCallback((_, date: Date | undefined) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }

    if (date) {
      setSelectedDate(date);
    }
  }, []);

  const handleUpdateShoppingListImage = useCallback(() => {
    ImagePicker.showImagePicker(
      {
        title: 'Selecione uma imagem',
        cancelButtonTitle: 'Cancelar',
        takePhotoButtonTitle: 'Usar câmera',
        chooseFromLibraryButtonTitle: 'Escolher da galeria',
      },
      (responseImage) => {
        if (responseImage.didCancel) {
          return;
        }

        if (responseImage.error) {
          Alert.alert('Erro ao atualizar a imagem.');
          return;
        }

        setImage(responseImage.uri);
      },
    );
  }, []);

  const handleSubmit = useCallback(
    async (data: ShoppingListFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório'),
          description: Yup.string().required('Descrição é obrigatória'),
        });

        await schema.validate(data, { abortEarly: false });

        const shoppingList: ShoppingList = await api.post('/shoppinglists', {
          name: data.name,
          description: data.description,
          date: selectedDate,
        });

        try {
          const dataImage: FormData = new FormData();

          dataImage.append('image', {
            type: 'image/jpeg',
            name: `${shoppingList.id}.jpg`,
            uri: image,
          });

          api.patch(`/shoppinglists/${shoppingList.id}/image`, dataImage);

          handleGoBack();
        } catch (err) {
          Alert.alert(
            'Erro ao atualizar a imagem da lista de compras',
            'Ocorreu um erro ao atualizar a imagem da lista de compras, tente novamente',
          );
        }
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
          return;
        }
        Alert.alert(
          'Erro ao criar a lista de compras',
          'Ocorreu um erro ao criar a lista de compras, tente novamente',
        );
      }
    },
    [handleGoBack, image, selectedDate],
  );

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
        <HeaderTitle>Nova Lista</HeaderTitle>
      </Header>

      <Content>
        {!useKeyboardStatus() && (
          <ShoppingListImageButton onPress={handleUpdateShoppingListImage}>
            <ShoppingListImage
              source={{
                uri: image,
              }}
            />
          </ShoppingListImageButton>
        )}
        <Form onSubmit={handleSubmit} ref={formRef}>
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
            onTouchStart={handleToggleDatePicker}
            onSubmitEditing={() => {
              dateInputRef.current?.focus();
            }}
          />
          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              onChange={handleDateChanged}
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

export default CreateShoppingList;
