import React, { useRef, useState, useCallback, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import ImagePicker, { ImagePickerResponse } from 'react-native-image-picker';
import FormData from 'form-data';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import { useRoute, RouteProp } from '@react-navigation/native';

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

type ParamList = {
  shoppingList: {
    shoppingList: ShoppingList;
  };
};

interface ProductFormData {
  name: string;
  brand: string;
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
  const [isShoppingList, setIsShoppingList] = useState({} as ShoppingList);

  const route = useRoute<RouteProp<ParamList, 'shoppingList'>>();

  const navigation = useNavigation();

  useEffect(() => {
    setIsShoppingList(route.params.shoppingList);
  }, [route.params.shoppingList]);

  const handleSearchProductBrand = useCallback(
    (value: string) => {
      const findProduct = isProducts.find((product) => product.brand === value);

      if (findProduct) {
        setIsProduct(findProduct);
      }
    },
    [isProducts],
  );

  const handleSearchProduct = useCallback((product_name: string) => {
    api
      .get('/products/findByName', { params: { name: product_name } })
      .then((response) => {
        if (response.data) {
          setIsProducts(response.data);
        }
      })
      .catch((err) => {
        const productAux = {} as IProduct;
        Object.assign(productAux, {
          id: '',
          name: product_name,
          brand: '',
          description: '',
        });
        setIsProduct(productAux);
      });
  }, []);

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
    async (data: ProductFormData) => {
      try {
        let product: IProduct = {} as IProduct;
        if (isProduct) {
          product = isProduct;
        } else {
          formRef.current?.setErrors({});

          const schema = Yup.object().shape({
            name: Yup.string().required('Nome é obrigatório'),
            brand: Yup.string(),
            description: Yup.string(),
          });

          await schema.validate(data, { abortEarly: false });

          const response = await api.post('/products', {
            name: data.name,
            brand: data.brand,
            description: data.description,
          });

          product = response.data;

          if (image) {
            const dataImage: FormData = new FormData();

            dataImage.append('image', {
              type: 'image/jpeg',
              name: `${product.id}.jpg`,
              uri: image.uri,
            });

            await api.patch(`/products/${product.id}/image`, dataImage);
          }
        }

        await api.post('/shoppinglistitems', {
          product_id: product.id,
          shoppinglist_id: isShoppingList.id,
        });

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
    [isProduct, isShoppingList.id, handleNavigateSuccessPage, image],
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
            onEndEditing={(value) => {
              handleSearchProduct(value.nativeEvent.text);
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
            onEndEditing={(value) => {
              handleSearchProductBrand(value.nativeEvent.text);
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
