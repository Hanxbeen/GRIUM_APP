import React, {useState} from 'react';
import styled from 'styled-components/native';
import moment from 'moment';

const Container = styled.View`
width:${props => props.width || 'auto'}
height: ${props => props.height || '32px'}
marginTop: ${props => props.marginTop || '0px'}
marginBottom: ${props => props.marginBottom || '0px'}
justify-content: center;
background-color: #dddddd;
border-radius: 8px;
padding: 5px;
`;

const Input = styled.TextInput`
  align-items: center;
  padding: 0;
  font-size: ${props => props.fontSize || '16px'};
  font-weight: ${props => props.fontWeight || 'normal'};
  color: ${props => props.color || 'black'};
`;

function GInputBirth(props) {
  const [value, setValue] = useState(null);
  const submit = value => {
    props.onChangeText(value);
  };
  React.useEffect(() => {
    setValue(props.value);
  }, []);
  React.useEffect(() => {
    if (value === null) return;
    if (value.length >= 8) {
      setValue(
        value.replace(/-/g, '').replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'),
      );
    }
    if (value.length == 10) {
      const birthMoment = moment(value, 'YYYY-MM-DD');
      const today = moment();
      if (moment.duration(today.diff(birthMoment)).asDays() < 0) {
        alert(`오늘 이후는 입력이 불가합니다.`);
        setValue('');
        return;
      }
      if (
        Number(value.substring(5, 7)) > 12 ||
        value.substring(5, 7) === '00'
      ) {
        alert(`유효한 '월'을 입력하십시오.`);
        setValue(value.substring(0, 4));
        return;
      }
      if (
        Number(value.substring(8, 10)) > 31 ||
        value.substring(8, 10) === '00'
      ) {
        alert(`유효한 '일'를 입력하십시오.`);
        setValue(value.substring(0, 8));
        return;
      }
    }
  }, [value]);
  return (
    <Container
      marginTop={props.marginTop}
      marginBottom={props.marginBottom}
      width={props.width}
      height={props.height}>
      <Input
        maxLength={10}
        placeholder={props.placeholder}
        value={value}
        keyboardType={props.type}
        returnKeyType="done"
        onChangeText={value => {
          setValue(value);
          submit(value);
        }}
        fontSize={props.fontSize}
        fontWeight={props.fontWeight}
        color={props.color}
      />
    </Container>
  );
}

export default GInputBirth;
