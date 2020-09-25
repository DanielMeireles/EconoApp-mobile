import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { FlatListProps } from 'react-native';

import { useTheme } from 'styled-components';
import { ShoppingListItemContainer, ShoppingListItemName } from './styles';

interface IFlatListProps extends FlatListProps<any> {}

const ShoppingListItemCard: React.FC<IFlatListProps> = ({
  children,
  ...rest
}) => {
  const theme = useTheme();

  return (
    <ShoppingListItemContainer isOpened={false} onPress={() => {}}>
      <ShoppingListItemName>{children}</ShoppingListItemName>
      <Icon name="chevron-down" size={24} color={theme.colors.headerElement} />
    </ShoppingListItemContainer>
  );
};

export default ShoppingListItemCard;
