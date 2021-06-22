import React from 'react';
import {StyleSheet} from 'react-native';
import styled from 'styled-components';

const Wrap = styled.View`
  background-color: white;
  border-radius: 20px;
  width: ${props => (props.width ? props.width : '100%')};
  ${props => (props.minHeight ? `min-height:${props.minHeight}` : `flex:1`)}
  justify-content: flex-start;
  align-items: center;
  padding: 0px 10px 30px;
  margin: 15px ${props => (props.mLR ? props.mLR : '0')};
  border-left-width: 1px;
  border-left-color: #eeeeee;
  border-right-width: 1px;
  border-right-color: #eeeeee;
`;
const Label = styled.Text`
  z-index: 10;
  elevation: 10;
  position: absolute;
  top: -11px;
  height: 22px;
  width: 74px;
  font-size: 12px;
  line-height: 21px;
  text-align: center;
  color: white;
  border-radius: 11px;
  background-color: black;
`;

export default function SquareLayer(props) {
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
      height: -3,
    },
    shadowOpacity: 1,
    shadowRadius: 4.65,
    elevation: 30,
  },
});
