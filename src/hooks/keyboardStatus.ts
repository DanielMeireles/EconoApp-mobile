import { useState, useEffect, useRef } from 'react';
import { Keyboard, EmitterSubscription } from 'react-native';

export default function useKeyboardStatus(): boolean {
  const [isOpen, setIsOpen] = useState(false);
  const keyboardShowListener = useRef({} as EmitterSubscription);
  const keyboardHideListener = useRef({} as EmitterSubscription);

  useEffect(() => {
    keyboardShowListener.current = Keyboard.addListener('keyboardDidShow', () =>
      setIsOpen(true),
    );
    keyboardHideListener.current = Keyboard.addListener('keyboardDidHide', () =>
      setIsOpen(false),
    );

    return () => {
      keyboardShowListener.current.remove();
      keyboardHideListener.current.remove();
    };
  });

  return isOpen;
}
