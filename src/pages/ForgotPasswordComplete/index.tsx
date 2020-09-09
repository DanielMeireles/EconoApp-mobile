import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import { Container, Title, Description, OkButton } from './styles';

const ForgotPasswordComplete: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <Icon name="check" size={80} color="#04d461" />

      <Title>Redefinição enviada</Title>
      <Description>
        Agora é só checar o e-mail que foi enviado para você redefinir sua
        senha.
      </Description>

      <OkButton onPress={() => navigation.navigate('SignIn')}>OK</OkButton>
    </Container>
  );
};

export default ForgotPasswordComplete;
