import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import { Container, Title, Description, OkButton } from './styles';

const CreateShoppingListComplete: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <Icon name="check" size={80} color="#04d461" />

      <Title>Lista criada com sucesso</Title>
      <Description>
        Agora você pode adicionar os itens que deseja nela
      </Description>

      <OkButton onPress={() => navigation.navigate('Dashboard')}>OK</OkButton>
    </Container>
  );
};

export default CreateShoppingListComplete;
