import React from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import { Container, Title, Description, OkButton } from './styles';

type ParamList = {
  paramList: {
    title: string;
    description: string;
    goToPage: string;
  };
};

const SuccessPage: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<ParamList, 'paramList'>>();

  return (
    <Container>
      <Icon name="check" size={80} color="#04d461" />

      <Title>{route.params.title}</Title>
      <Description>{route.params.description}</Description>

      <OkButton onPress={() => navigation.navigate(route.params.goToPage)}>
        OK
      </OkButton>
    </Container>
  );
};

export default SuccessPage;
