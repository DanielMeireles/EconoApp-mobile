import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import { Container, Title, Description, OkButton } from './styles';

const CreateShoppingListItemComplete: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <Icon name="check" size={80} color="#04d461" />

      <Title>Item criado com sucesso</Title>
      <Description>Seu novo item foi acrescentado a sua lista</Description>

      <OkButton onPress={() => navigation.navigate('Dashboard')}>OK</OkButton>
    </Container>
  );
};

export default CreateShoppingListItemComplete;
