import React from 'react';
import { View, Text } from '@tarojs/components';
import { TestProps } from './typings/component-taro';

export default class Test extends React.Component<TestProps> {
  static options = {
    addGlobalClass: true,
  };

  render() {
    return (
      <View>
        <Text>Test</Text>
      </View>
    );
  }
}
