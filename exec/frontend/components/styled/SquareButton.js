import React from 'react';
import {StyleSheet} from 'react-native';
import styled from 'styled-components';

const Wrap = styled.TouchableOpacity`
  aspect-ratio: 1;
  background-color: white;
  border-radius: 10px;
  width: ${props => props.width}%;
  justify-content: center;
  align-items: center;
`;
const Icon = styled.Image`
  aspect-ratio: 1;
  height: 30%;
  margin: 10%;
  margin-top: 0;
`;
const Label = styled.Text`
  height: 32px;
  width: 100px;
  font-size: 16px;
  line-height: 31px;
  text-align: center;
  color: white;
  border-radius: 16px;
  overflow: hidden;
  background-color: black;
`;

export default function SquareButton(props) {
  return (
    <Wrap style={styles.shadow} width={props.width} onPress={props.onPress}>
      <Icon source={props.source} style={{resizeMode: 'cover'}}></Icon>
      <Label>{props.children}</Label>
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
