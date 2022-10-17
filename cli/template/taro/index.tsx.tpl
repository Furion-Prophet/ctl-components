import React from 'react';
import { View, Text } from '@tarojs/components';
import { <%= PascalCaseComponentName %>Props } from './typings/component-taro';

export default class <%= PascalCaseComponentName %> extends React.Component<<%= PascalCaseComponentName %>Props> {
  static options = {
    addGlobalClass: true,
  };

  render() {
    return (
      <View>
        <Text><%= PascalCaseComponentName %></Text>
      </View>
    );
  }
}
