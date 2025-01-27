import React from 'react';
import { View, Text } from '@tarojs/components';
import { ButtonsProps } from './typings/component-taro';

export default class Buttons extends React.Component<ButtonsProps> {
  static options = {
    addGlobalClass: true,
  };

  render() {
    return (
      <View>
        <Text>Buttons</Text>
      </View>
    );
  }
}
