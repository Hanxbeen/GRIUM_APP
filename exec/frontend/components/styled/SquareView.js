import React from 'react';
import {StyleSheet} from 'react-native';
import styled from 'styled-components';

const Wrap = styled.View`
  background-color: white;
  border-radius: 10px;
  width: ${props => (props.width ? props.width : '100%')};
  ${props => (props.minHeight ? `min-height:${props.minHeight}` : null)}
  justify-content: flex-start;
  align-items: flex-start;
  padding: 15px 10px 10px;
  margin: 15px ${props => (props.mLR ? props.mLR : '0')};
`;
const Label = styled.Text`
  position: absolute;
  top: -11px;
  left: 10px;
  height: 22px;
  width: 74px;
  font-size: 12px;
  line-height: 21px;
  text-align: center;
  color: white;
  border-radius: 11px;
  overflow: hidden;
  background-color: black;
`;

export default function SquareItem(props) {
  return (
    <Wrap
      style={styles.shadow}
      minHeight={props.minHeight}
      mLR={props.mLR}
      width={props.width}>
      <Label>{props.label}</Label>
      {props.children}
    </Wrap>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
});
