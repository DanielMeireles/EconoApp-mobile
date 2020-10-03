import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';

import QRCodeScanner, { Event } from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

const QRCodeScreen: React.FC = () => {
  const onSuccess = (e: Event): void => {
    console.log(e.data);
  };

  return (
    <QRCodeScanner
      onRead={onSuccess}
      // flashMode={RNCamera.Constants.FlashMode.torch}
      topContent={<Text style={styles.centerText}>Teste</Text>}
      bottomContent={<TouchableOpacity style={styles.buttonTouchable} />}
    />
  );
};

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});

export default QRCodeScreen;
