import React from 'react';
import { View, Text } from '@tarojs/components';
import { <%= PascalCaseComponentName %>Props } from './typings/component-taro';
import './index.scss'

export default class <%= PascalCaseComponentName %> extends React.Component<<%= PascalCaseComponentName %>Props> {

  render() {
    return (
      <View>
        <Text><%= PascalCaseComponentName %></Text>
      </View>
    );
  }
}
