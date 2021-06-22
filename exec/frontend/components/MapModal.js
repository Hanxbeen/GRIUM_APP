import React, {useState} from 'react';
import {Modal, StyleSheet, View, Alert} from 'react-native';
import Button from './styled/Button';
import {CalendarList} from 'react-native-calendars';
import Map from '../screens/regist/Map';
import {murmurDateState, isMurmurDateState, cemeteryDateState} from '../atoms';
import {useRecoilState, useRecoilValue} from 'recoil';
import moment from 'moment';
import FloatView from '../components/styled/FloatView';
import MapSearch from './styled/extended/MapSearch';

const MapModal = props => {
  const [modalVisible, setModalVisible] = useState(false);

  const [murmurDate, setMurMurDate] = useRecoilState(murmurDateState);
  const [isMurmurDate, setIsMurMurDate] = useRecoilState(isMurmurDateState);
  const [cemeteryDate, setCemetryDate] = useRecoilState(cemeteryDateState);

  React.useEffect(() => {
    setModalVisible(props.visible);
  }, [props]);

  const dateSetting = day => {
    // 날짜 비교 후 설정 불가 알림 추가
    if (isMurmurDate == true) {
      console.log(day.dateString, 'murmurDate');
      setMurMurDate(day.dateString);
    } else {
      console.log(day.dateString, 'cemetryDate');
      setCemetryDate(day.dateString);
    }
  };

  // 현재 날짜
  const currentDate = moment().add(9, 'hours').format('YYYY-MM-DD');

  console.log('props : ' + props.type);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        props.modalTogle();
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {props.type === 1 ? (
            <CalendarList
              style={{
                height: 200,
              }}
              // current={currentDate}
              minDate={
                isMurmurDate === false && murmurDate !== '' ? murmurDate : ''
              }
              maxDate={isMurmurDate === true ? currentDate : ''}
              pastScrollRange={1}
              futureScrollRange={1}
              showScrollIndicator={true}
              scrollEnabled={true}
              onDayPress={day => {
                dateSetting(day);
                props.modalTogle();
              }}
            />
          ) : (
            <Map
              style={{width: '100%', height: '100%'}}
              position={props.position}
              placeName={props.position.name}
            />
          )}
          <FloatView style={{width: '60%'}} bottom={'45px'}>
            <Button
              width={'100%'}
              style={{elevation: 10}}
              bc={'black'}
              active={true}
              mt={'5px'}
              onPress={() => props.modalTogle()}>
              닫기
            </Button>
          </FloatView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 0,
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 30,
  },
});

export default MapModal;
