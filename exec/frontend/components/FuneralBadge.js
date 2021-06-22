import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Block} from './Block';
import {theme} from '../constants';

class Funeralbadge extends Component {
  render() {
    const {isFuneral} = this.props;
    if (isFuneral) {
      return (
        <Block
          // size={10}
          color={theme.colors.primary}
          style={styles.funeral_badge_style}
        />
      );
    } else {
      return null;
    }
  }
}

Funeralbadge.defaultProps = {
  isFuneral: true,
};

export default Funeralbadge;

const styles = StyleSheet.create({
  funeral_badge_style: {
    position: 'absolute',
    // borderRadius: 20,
  },
});
