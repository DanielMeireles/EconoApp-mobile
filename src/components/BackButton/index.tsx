import React from 'react';
import { BorderlessButtonProperties } from 'react-native-gesture-handler';

import { Container, Image } from './styles';
import backIcon from '../../assets/images/icons/back.png';

const BackButton: React.FC<BorderlessButtonProperties> = ({ ...props }) => {
  return (
    <Container {...props}>
      <Image source={backIcon} resizeMode="contain" />
    </Container>
  );
};

export default BackButton;
