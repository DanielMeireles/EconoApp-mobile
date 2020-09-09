import styled, { css } from 'styled-components/native';

import FeatherIcon from 'react-native-vector-icons/Feather';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

interface IconProps {
  isFocused: boolean;
  isFilled: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: ${({ theme }) => theme.colors.inputBackground};
  border-radius: 10px;
  margin-bottom: 8px;

  border-width: 2px;
  border-color: ${({ theme }) => theme.colors.inputBackground};

  flex-direction: row;
  align-items: center;

  ${(props) =>
    props.isErrored &&
    css`
      border-color: ${props.theme.colors.inputError};
    `}

  ${(props) =>
    props.isFocused &&
    css`
      border-color: ${props.theme.colors.inputFocused};
    `}
`;

export const TextInput = styled.TextInput.attrs(({ theme }) => ({
  placeholderTextColor: theme.colors.inputPlaceholder,
}))`
  flex: 1;
  color: ${({ theme }) => theme.colors.inputText};
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const Icon = styled(FeatherIcon)<IconProps>`
  margin-right: 16px;
  color: ${({ theme }) => theme.colors.inputIcon};

  ${(props) =>
    (props.isFocused || props.isFilled) &&
    css`
      color: ${props.theme.colors.inputFocused};
    `}
`;
