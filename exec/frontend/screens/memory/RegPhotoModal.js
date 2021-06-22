import {Image, ScrollView, TouchableOpacity, Modal} from 'react-native';
import {Block, Card, Text, Button, Input} from '../../components';

const RegPhotoModal = () => {
  <Modal
    animationType="fade"
    visible={ModalOpen}
    modalStyle={{
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FFFFFF',
    }}>
    <TouchableOpacity onPress={() => Xbtn()}>
      <Image
        source={require('../../assets/essential/cancel.png')}
        style={{
          resizeMode: 'contain',
          width: 15,
          height: 15,
          marginTop: 10,
          marginLeft: 10,
        }}
      />
    </TouchableOpacity>
    <Text h3 dark center bold style={{marginTop: 30}}>
      추억을 공유해주세요
    </Text>
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{paddingVertical: theme.sizes.base * 1}}>
      <Block flex={false} row style={styles.skyalbum}>
        {OpenPicture.map(pictures => (
          <TouchableOpacity>
            <Card key={pictures.id} center shadow middle style={styles.open}>
              <Image
                source={{uri: pictures.uri}}
                style={styles.memoryPicture}
              />
            </Card>
          </TouchableOpacity>
        ))}
        <TouchableOpacity onPress={() => openImagePicker()}>
          <Card center middle style={styles.open}>
            <Image
              source={require('../../assets/essential/regPhoto.png')}
              style={styles.memoryPlus}
            />
          </Card>
        </TouchableOpacity>
      </Block>
    </ScrollView>
    <Block style={styles.container}>
      <Input
        center
        style={styles.input}
        placeholder="추억의 언어를 공유하세요. 많은 위로가 됩니다"
        onChangeText={text => setText(text)}
        defaultValue={text}
      />
    </Block>

    <Button
      style={{width: '100%', height: 50, borderRadius: 0, marginBottom: 0}}
      onPress={() => sendImage()}
      color="rgba(0,0,0,1)">
      <Text h3 center white>
        추억 공유
      </Text>
    </Button>
  </Modal>;
};
export default RegPhotoModal;
