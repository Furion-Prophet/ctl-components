import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { ToastProps } from './typings/component-rn';

interface ToastState {}

export default class Toast extends Component<ToastProps, ToastState> {
  render() {
    return (
      <View>
        <Text>Toast</Text>
      </View>
    );
  }
}
