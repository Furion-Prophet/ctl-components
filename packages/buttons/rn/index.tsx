import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { ButtonsProps } from './typings/component-rn';

interface ButtonsState {}

export default class Buttons extends Component<ButtonsProps, ButtonsState> {
  render() {
    return (
      <View>
        <Text>Buttons</Text>
      </View>
    );
  }
}
