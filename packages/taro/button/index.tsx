import React from 'react';
import { View, Text } from '@tarojs/components';
import { CButtonProps } from './typings/component-taro';
import './index.scss';

export default class CButton extends React.Component<CButtonProps> {
  render() {
    return (
      <View>
        <Text>CButton</Text>
      </View>
    );
  }
}
