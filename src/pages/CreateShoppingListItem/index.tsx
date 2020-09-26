import React, { useRef, useState, useCallback, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import ImagePicker, { ImagePickerResponse } from 'react-native-image-picker';
import FormData from 'form-data';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';

import { useTheme } from 'styled-components';
import { TextInput, Alert } from 'react-native';
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

interface ShoppingListItemFormData {
  name: string;
  date: string;
  description: string;
}

interface IProduct {
  id: string;
  name: string;
  brand: string;
  description: string;
  image_url: string;
}

const CreateShoppingListItem: React.FC = () => {
  const theme = useTheme();
  const formRef = useRef<FormHandles>(null);
  const nameInputRef = useRef<TextInput>(null);
  const brandInputRef = useRef<TextInput>(null);
  const descriptionInputRef = useRef<TextInput>(null);

  const [image, setImage] = useState<ImagePickerResponse | null>(null);
  const [isProducts, setIsProducts] = useState<IProduct[]>([]);
  const [isProduct, setIsProduct] = useState<IProduct>({} as IProduct);

  const navigation = useNavigation();

  const handleSearchProduct = useCallback((product_name: string) => {
    api
      .get(`/products/findByName/${product_name}`)
      .then((response) => {
        if (response.data) {
          setIsProducts(response.data);
        }
      })
      .catch(() => {
        const productAux = {} as IProduct;
        Object.assign(productAux, {
          name: product_name,
          brand: '',
          description: '',
        });
        setIsProduct(productAux);
      });
  }, []);

  useEffect(() => {
    if (isProducts[0]) {
      const productAux = {} as IProduct;

      Object.assign(productAux, {
        name: isProducts[0].name,
        brand: isProducts[0].brand,
        description: isProducts[0].description,
      });

      setIsProduct(productAux);
    }
  }, [isProducts]);

  const handleNavigateSuccessPage = useCallback(() => {
    navigation.navigate('SuccessPage', {
      title: 'Item criado com sucesso',
      description: 'Seu novo item foi acrescentado a sua lista',
      goToPage: 'ViewShoppingList',
    });
  }, [navigation]);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleUpdateImage = useCallback(() => {
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

        setImage(responseImage);
      },
    );
  }, []);

  const handleSubmit = useCallback(
    async (data: ShoppingListItemFormData) => {
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
        });

        if (image) {
          const dataImage: FormData = new FormData();

          dataImage.append('image', {
            type: 'image/jpeg',
            name: `${shoppingList.id}.jpg`,
            uri: image.uri,
          });

          await api.patch(`/shoppinglists/${shoppingList.id}/image`, dataImage);
        }
        handleNavigateSuccessPage();
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
    [image, handleNavigateSuccessPage],
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
        <HeaderTitle>Novo Item</HeaderTitle>
      </Header>

      <Content>
        {!useKeyboardStatus() && (
          <ShoppingListImageButton onPress={handleUpdateImage}>
            <ShoppingListImage
              source={{
                uri: 'https://api.adorable.io/avatars/186/abott@adorable.png',
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
            onChangeText={(value) => {
              handleSearchProduct(String(value));
            }}
            defaultValue={isProduct.name}
            placeholder="Nome"
            returnKeyType="next"
            onSubmitEditing={() => {
              nameInputRef.current?.focus();
            }}
          />

          <Input
            ref={brandInputRef}
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="default"
            name="brand"
            defaultValue={isProduct.brand}
            placeholder="Marca"
            returnKeyType="next"
            onSubmitEditing={() => {
              brandInputRef.current?.focus();
            }}
          />

          <Input
            ref={descriptionInputRef}
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="default"
            name="description"
            defaultValue={isProduct.description}
            placeholder="Descrição"
            returnKeyType="next"
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

export default CreateShoppingListItem;
