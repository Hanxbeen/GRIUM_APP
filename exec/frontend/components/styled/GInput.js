import React, {useState} from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
width:${props => props.width || 'auto'}
height: ${props => props.height || '32px'}
marginTop: ${props => props.marginTop || '0px'}
marginBottom: ${props => props.marginBottom || '0px'}
justify-content: center;
background-color: #dddddd;
border-radius: ${props => props.borderRadius || '8px'};
padding: 5px;
`;

const Input = styled.TextInput`
  align-items: center;
  padding: 0;
  margin-right: ${props => props.marginRight || 0};
  margin-left: ${props => props.marginLeft || 0};
  font-size: ${props => props.fontSize || '16px'};
  font-weight: ${props => props.fontWeight || 'normal'};
  color: ${props => props.color || 'black'};
`;

function GInput(props) {
  const [value, setValue] = useState(null);
  const onChangeTextHandler = value => {
    props.onChangeText(value);
  };
  const onSubmit = () => {
    if (props.onSubmit) {
      props.onSubmit(value);
    }
  };
  React.useEffect(() => {
    setValue(props.value);
  }, [props]);
  return (
    <Container
      marginTop={props.marginTop}
      marginBottom={props.marginBottom}
      width={props.width}
      height={props.height}
      borderRadius={props.br}
      style={props.style}>
      <Input
        marginLeft={props.ml}
        marginRight={props.mr}
        maxLength={props.maxLength}
        placeholder={props.placeholder}
        value={value}
        returnKeyType={props.returnKeyType}
        onSubmitEditing={onSubmit}
        keyboardType={props.type}
        onChangeText={value => {
          setValue(value);
          onChangeTextHandler(value);
        }}
        fontSize={props.fontSize}
        fontWeight={props.fontWeight}
        color={props.color}
      />
    </Container>
  );
}

export default GInput;
