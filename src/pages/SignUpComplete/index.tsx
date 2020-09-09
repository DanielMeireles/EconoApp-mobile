import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import { Container, Title, Description, OkButton } from './styles';

const SignUpComplete: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <Icon name="check" size={80} color="#04d461" />

      <Title>Cadastramento concluído</Title>
      <Description>Agora é só fazer seu login.</Description>

      <OkButton onPress={() => navigation.navigate('SignIn')}>OK</OkButton>
    </Container>
  );
};

export default SignUpComplete;
