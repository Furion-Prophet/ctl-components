import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { <%= PascalCaseComponentName %>Props } from '../typings/component-rn';

interface <%= PascalCaseComponentName %>State {}

export default class <%= PascalCaseComponentName %> extends Component<<%= PascalCaseComponentName %>Props, <%= PascalCaseComponentName %>State> {
  render() {
    return <Text><%= PascalCaseComponentName %></Text>
  }
}

