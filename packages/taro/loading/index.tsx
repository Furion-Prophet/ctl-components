import React from 'react';
import { View, Text } from '@tarojs/components';
import { CLoadingProps } from './typings/component-taro';
import './index.scss';

export default class CLoading extends React.Component<CLoadingProps> {
  render() {
    return (
      <View>
        <Text>CLoading</Text>
      </View>
    );
  }
}
