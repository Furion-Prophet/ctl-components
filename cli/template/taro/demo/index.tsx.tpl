import React, { Component } from 'react';
import { View } from '@tarojs/components';
import <%= PascalCaseComponentName %> from '@ctl/taro/<%= kebabCaseComponentName %>';

interface DemoPageState {
  [key: string]: any;
}

export default class DemoPage extends Component<any, DemoPageState> {
  stories = ['常规用法'];

  cases = {};

  renderCase(caseName: string, index: number): JSX.Element | null {
    let comp: JSX.Element | null = null;
    switch (caseName) {
      case '常规用法': {
        comp = <<%= PascalCaseComponentName %> />;
        break;
      }
      default: {
        comp = null;
        break;
      }
    }
    // 用this.cases储存jsx用于单测快照测试
    if (!this.cases[caseName]) {
      this.cases[caseName] = comp;
    }
    return comp;
  }

  render() {
    return (
      <View className='page'>
        <View className='doc-body'>
          {this.stories.map((item, index) => this.renderCase(item, index))}
        </View>
      </View>
    );
  }
}
