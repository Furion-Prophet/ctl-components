import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { TestProps } from './typings/component-rn';

interface TestState {}

export default class Test extends Component<TestProps, TestState> {
  render() {
    return (
      <View>
        <Text>Test</Text>
      </View>
    );
  }
}
