import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { TextInputProps, ViewStyle, StyleProp } from 'react-native';
import { useField } from '@unform/core';

import { useTheme } from 'styled-components';

import {
  Container,
  AutocompleteInput,
  Icon,
  OptionContainer,
  OptionText,
} from './styles';

interface InputProps extends TextInputProps {
  name: string;
  data: string[];
  defaultValue?: string;
  icon?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

const InputAutocomplete: React.RefForwardingComponent<InputRef, InputProps> = (
  { name, data, defaultValue, icon, containerStyle = {}, ...rest },
  ref,
) => {
  const theme = useTheme();

  const inputElementRef = useRef<any>(null);

  const { registerField, fieldName, error } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputValueRef.current.value);
  }, []);

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(value) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container
      style={containerStyle}
      data={data}
      isFocused={isFocused}
      isErrored={!!error}
    >
      {icon && (
        <Icon isFilled={isFilled} isFocused={isFocused} name={icon} size={20} />
      )}
      <AutocompleteInput
        inputContainerStyle={{ borderWidth: 0 }}
        ref={inputElementRef}
        data={data}
        containerStyle={{
          height: 50,
        }}
        listContainerStyle={{
          marginTop: 10,
          marginLeft: -7,
          height: data.length * 30,
        }}
        listStyle={{ borderWidth: 0 }}
        keyboardAppearance="dark"
        defaultValue={defaultValue}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onChangeText={(value) => {
          inputValueRef.current.value = value;
        }}
        {...rest}
        renderItem={({ item }) => (
          <OptionContainer>
            <OptionText>{String(item)}</OptionText>
          </OptionContainer>
        )}
      />
    </Container>
  );
};

export default forwardRef(InputAutocomplete);
