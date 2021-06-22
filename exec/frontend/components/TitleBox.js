import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Block} from './Block'
import {theme} from '../constants';

class TitleBox extends Component {
  render() {
    const {
      style,
      opacity,
      color,
      shadow,
      children,
      ...props
    } = this.props;

    const titleBoxStyles = [
      styles.titleBox,
      shadow && styles.shadow,
      color && styles[color], // predefined styles colors for backgroundColor
      color && !styles[color] && {backgroundColor: color}, // custom backgroundColor
      style,
    ];

    return (
      <View
        style={titleBoxStyles}
        activeOpacity={opacity || 0.8}
        {...props}>
        {children}
      </View>
    );
  }
}

TitleBox.defaultProps = {
  opacity: 0.8,
  color: theme.colors.black,
};

export default TitleBox;

const styles = StyleSheet.create({
  titleBox: {
    borderRadius: theme.sizes.radius,
    height: theme.sizes.base * 2,
    justifyContent: 'center',
    marginVertical: theme.sizes.padding / 3,
  },
  shadow: {
    shadowColor: theme.colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  accent: {backgroundColor: theme.colors.accent},
  primary: {backgroundColor: theme.colors.primary},
  secondary: {backgroundColor: theme.colors.secondary},
  tertiary: {backgroundColor: theme.colors.tertiary},
  black: {backgroundColor: theme.colors.black},
  white: {backgroundColor: theme.colors.white},
  gray: {backgroundColor: theme.colors.gray},
  gray2: {backgroundColor: theme.colors.gray2},
  gray3: {backgroundColor: theme.colors.gray3},
  gray4: {backgroundColor: theme.colors.gray4},
});
