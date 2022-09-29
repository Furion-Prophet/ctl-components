import Taro,{ Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { <%= PascalCaseComponentName %>Props } from '../typings/taro/index';

export default class <%= PascalCaseComponentName %> extends Component<<%= PascalCaseComponentName %>Props> {
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