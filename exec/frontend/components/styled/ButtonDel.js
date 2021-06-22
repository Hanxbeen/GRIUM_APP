import React, {useState} from 'react';
import styled from 'styled-components/native';
import {postPropose} from '../../api/authHttp/proppose';

const Wrap = styled.TouchableOpacity`
  width: ${props => (props.width ? props.width : '32px')};
  height: ${props => (props.height ? props.height : '32px')};
  margin-top: ${props => (props.mt ? props.mt : '0px')}
  margin-bottom : ${props => (props.mb ? props.mb : '0px')}
  margin-left : ${props => (props.ml ? props.ml : '0px')}
  margin-right : ${props => (props.mr ? props.mr : '0px')}
  background-color: ${props => (props.bc ? props.bc : '#F75450')};
  justify-content: center;
  align-items: center;
  border-radius: ${props => (props.br ? props.br : '10px')};
`;
const Label = styled.Text`
  font-size: ${props => (props.fontSize ? props.fontSize : '12px')};
  font-weight: bold;
  color: white;
`;

export default function ButtonSub(props) {
  const [active, setActive] = useState(false);

  React.useEffect(() => {
    setActive(props.active);
  }, [props]);

  return (
    <Wrap
      style={props.style}
      onPress={props.onPress}
      width={props.width}
      height={props.height}
      bc={props.bc}
      mb={props.mb}
      mt={props.mt}
      ml={props.ml}
      mr={props.mr}
      br={props.br}>
      <Label fontSize={props.fontSize}>
        {props.children ? props.children : '✕'}
      </Label>
    </Wrap>
  );
}
