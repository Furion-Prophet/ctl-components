import React from 'react';
import { View, Text } from '@tarojs/components';
import { ToastProps } from './typings/component-taro';

export default class Toast extends React.Component<ToastProps> {
  static options = {
    addGlobalClass: true,
  };

  render() {
    return (
      <View>
        <Text>Toast</Text>
      </View>
    );
  }
}
