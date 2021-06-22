import React, {useState} from 'react';
import {Dimensions, StyleSheet, Image} from 'react-native';
import styled from 'styled-components';
import ImagePicker from 'react-native-image-crop-picker';
import {useSpring, animated} from '@react-spring/native';
// custom component
import BlankView from '../BlankView';
import OptionalImageModal from '../extended/OptionalImageModal';
import OptionalModal from '../extended/OptionalModal';
import FloatView from '../FloatView';
import ButtonDel from '../ButtonDel';
// http api
import * as userApi from '../../../api/authHttp/user';
// recoil
import {useRecoilValue, useRecoilState} from 'recoil';
import {userIdState} from '../../../atoms';
import {set} from 'immer/dist/internal';
import GText from '../GText';

const imageSize = Dimensions.get('window').width * 0.22;
const HorizontalScroll = styled.ScrollView`
  flex-direction: row;
  width: 100%;
  margin-bottom: ${props => (props.mb ? props.mb : 0)};
`;
const UploadButton = styled.TouchableOpacity`
  width: ${imageSize + 12}px;
  height: ${imageSize + 25}px;
  justify-content: center;
  align-items: center;
  margin: 10px 5px 20px;
  border: 1px solid #fdfdfd;
  background-color: white;
  border-radius: 5px;
  elevation: 8;
`;
const ImageWrap = styled.View`
  width: ${imageSize + 12}px;
  height: ${imageSize + 25}px;
  padding: 5px 20px
  margin: 10px 5px 20px;
  align-items: center;
  border: 1px solid #fdfdfd;
  background-color:white;
  border-radius: 5px;
  elevation: 8;
  `;
const GImage = styled.Image`
  height: ${imageSize}px;
  aspect-ratio: 1;
  border-radius: 3px;
  background-color: #cccccc;
`;
const Label = styled.Text`
  margin-top: 4px;
  width: 50px;
  text-align: center;
  overflow: hidden;
  font-size: 7px;
`;
const MoreImageWrap = styled.View`
  width: ${imageSize + 12}px;
  height: ${imageSize + 25}px;
  justify-content: flex-end;
  align-items: center;
  margin: 10px 5px 20px;
  background-color: white;
`;
const MoreImage = styled.Image`
  height: ${imageSize / 2}px;

  aspect-ratio: 1;
  border-radius: 3px;
  tint-color: #333333;
`;

export default function EtcSetting(props) {
  // 연속 req 방지(사진 중복 업로드)
  let isRequestDiable = false;
  // hook
  const [userImage, setUserImage] = useState([]);
  const [message, setMessage] = useState('');
  const [moreState, setMoreState] = useState(false);
  const [delTarget, setDelTarget] = useState(null);
  // flat List
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  // image uplaod state , modal
  const [getImages, setGetImages] = useState([]);
  const [optianlModalVisibled, setOptianlModalVisibled] = useState(false);
  const [optianlModalVisibled2, setOptianlModalVisibled2] = useState(false);
  const modalTogle = () => {
    setOptianlModalVisibled(!optianlModalVisibled);
  };
  const submitMessage = msg => {
    setMessage(msg);
  };

  const modalTogle2 = () => {
    setOptianlModalVisibled2(!optianlModalVisibled2);
  };
  // recoil state
  const uid = useRecoilValue(userIdState);

  // 이미지 formData 변환
  const transFormData = () => {
    const formData = new FormData();
    formData.append(`uid`, uid);
    formData.append(`contents`, message);
    formData.append(`imageUrl`, null);
    getImages.forEach(element => {
      formData.append(`file`, element);
    });
    return formData;
  };
  // 이미지 업로드
  const reqUploadImages = async () => {
    try {
      if (isRequestDiable) return;
      const formData = transFormData();
      const resUploadImage = await userApi.postUserImage(formData);
      if (resUploadImage.status === 200) {
        // const uploadedImageUrl = resUploadImage.data.split(',');
        // console.log(uploadedImageUrl);
        // setGetImages({uploadedImageUrl}, getImages);
        init();
        setMessage('');
        modalTogle();
        isRequestDiable = false;
      }
    } catch (error) {
      alert(`이미지를 불러오는 도중 문제가 발생했습니다 error: ${error}`);
    }
  };
  // 이미지 삭제
  const reqDelete = async () => {
    try {
      const resDeleteImage = await userApi.deleteUserImage(uid, delTarget);
      if (resDeleteImage.status === 200) {
        init();
        modalTogle2();
      }
    } catch (error) {
      alert(`이미지를 삭제하는 도중 문제가 발생했습니다. ${error}`);
    }
  };

  // 이미지 가져와서 적용
  const init = async () => {
    try {
      const resUserImage = await userApi.getUserImage(uid);
      console.log('uid ' + uid);
      if (resUserImage.status === 200) {
        // 썸내일 활용, 최신 cont개만 보여주고 그 이상 남아있을 땐 더보기 버튼 출력
        const resLength = resUserImage.data.length - 1;
        const splitList = [];
        // let count = 8;
        for (let i = resLength; i >= 0; i--) {
          // count--;
          // if (count == 0) break;
          splitList.push(resUserImage.data[i]);
        }
        setUserImage(splitList);
        // if (resLength >= count) setMoreState(true);
      }
    } catch (error) {
      console.log('유저의 이미지를 가져오는 도중 문제 발생', error);
    }
  };

  React.useEffect(() => {
    init();
  }, []);
  React.useEffect(() => {
    console.log(userImage);
  }, [userImage]);

  return (
    <HorizontalScroll mb={props.mb} horizontal={true}>
      <BlankView width={'15px'} />
      <UploadButton onPress={() => openImagePicker(setGetImages, modalTogle)}>
        <Image
          style={{width: '50%', height: '50%', tintColor: 'gray'}}
          source={require('../../../assets/essential/plus.png')}
        />
      </UploadButton>
      {userImage.length !== 0
        ? userImage.map((item, index) => {
            if (item.imageUrl.length < 2) {
              return (
                <ImageWrap key={index}>
                  <GImage source={{uri: item.imageUrl[0]}} />
                  <Label numberOfLines={1}>{item.contents}</Label>
                  <FloatView top={'0px'} right={'0px'}>
                    <ButtonDel
                      width={'18px'}
                      height={'18px'}
                      fontSize={'8px'}
                      onPress={() => {
                        modalTogle2();
                        setDelTarget(item.imageId);
                      }}
                    />
                  </FloatView>
                </ImageWrap>
              );
            } else {
              return (
                <ImageWrap key={index}>
                  <FloatView top={'-7px'} left={'-1px'} style={{elevation: 10}}>
                    <ImageWrap key={index}>
                      <GImage source={{uri: item.imageUrl[0]}} />
                      <Label numberOfLines={1}>{item.contents}</Label>
                    </ImageWrap>
                  </FloatView>
                  <FloatView top={'4px'} right={'-5px'} style={{elevation: 11}}>
                    <ButtonDel
                      width={'18px'}
                      height={'18px'}
                      fontSize={'8px'}
                      onPress={() => {
                        modalTogle2();
                        setDelTarget(item.imageId);
                      }}
                    />
                  </FloatView>
                </ImageWrap>
              );
            }
          })
        : null}
      {moreState ? (
        <MoreImageWrap>
          <GText fontWeight={'bold'} color={'#333333'}>
            더보기
          </GText>
          <animated.Image
            style={styles.arrow}
            source={require('../../../assets/essential/bottomarrow.png')}
          />
        </MoreImageWrap>
      ) : null}
      <BlankView width={'15px'} />
      <OptionalImageModal
        visible={optianlModalVisibled}
        modalTogle={modalTogle}
        submit={reqUploadImages}
        submit2={submitMessage}
        images={getImages}>
        {`업로드하시겠습니까?`}
      </OptionalImageModal>
      <OptionalModal
        visible={optianlModalVisibled2}
        modalTogle={modalTogle2}
        submit={reqDelete}>
        {`삭제하시겠습니까?`}
      </OptionalModal>
    </HorizontalScroll>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
  },
  arrow: {
    height: imageSize / 2,
    aspectRatio: 1,
    marginRight: 15,
    tintColor: '#333333',
    transform: [{rotate: '30deg'}],
  },
});

// 이미지 선택
const openImagePicker = async (setUseState, modalTogle) => {
  try {
    let images = [];
    const getImages = await ImagePicker.openPicker({
      multiple: true,
      waitAnimationEnd: false,
      includeExif: true,
      forceJpg: true,
      mediaType: 'any',
      includeBase64: true,
    });
    getImages.map(image => {
      let imageArray = image.path.split('/');
      images.push({
        uri: image.path,
        type: image.mime,
        name: imageArray[imageArray.length - 1],
      });
    });
    if (images.length > 5) {
      alert('5개만 선택해주세요.');
    } else {
      setUseState(images);
      modalTogle();
    }
  } catch (error) {
    console.log(`image load error: ${error}`);
  }
};
