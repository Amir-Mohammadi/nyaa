import React, { FC, useState } from 'react';
import {
  Image as RImage,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import GallerySwiper from 'react-native-gallery-swiper';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

interface Props {
  images: { uri: string; dimensions?: { width: number; height: number } }[];
}

export type ImageViewProps = Props;

const ImageView: FC<ImageViewProps> = (props) => {
  const [visible, setIsVisible] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-around',
        paddingHorizontal: Layout.scaleX(100),
      }}>
      <Modal visible={visible} onRequestClose={() => setIsVisible(false)}>
        <View style={{ flex: 1 }}>
          <View style={styles.root}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setIsVisible(false)}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          <GallerySwiper
            style={{ backgroundColor: '#fafafa' }}
            initialPage={index}
            images={props.images}
            initialNumToRender={props.images.length}
            flatListProps={{ showsHorizontalScrollIndicator: false }}
            sensitiveScroll={false}
            onPageSelected={(index) => setIndex(index)}
          />
          <View
            style={{
              alignItems: 'center',
              height: 100,
              justifyContent: 'center',
              backgroundColor: '#fafafa',
            }}>
            <Text style={{ color: Colors.primary }}>
              {1 + index}/{props.images.length}
            </Text>
          </View>
        </View>
      </Modal>

      {props.images.map((image, index) => (
        <View
          key={image.uri + index}
          style={{
            flex: 1,
            justifyContent: 'flex-start',
          }}>
          <TouchableWithoutFeedback
            onPress={() => {
              setIndex(index);
              setIsVisible(true);
            }}>
            <RImage
              style={{ width: '100%', height: '95%', borderRadius: 15 }}
              source={{
                uri: image.uri,
              }}
              resizeMode={'cover'}
            />
          </TouchableWithoutFeedback>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'flex-end',
    backgroundColor: '#fafafa',
  },
  closeButton: {
    margin: 8,
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22.5,
    backgroundColor: '#00000012',
  },
  closeText: {
    lineHeight: 22,
    fontSize: 20,
    paddingTop: 2,
    textAlign: 'center',
    color: Colors.danger,
    includeFontPadding: false,
  },
});
export default ImageView;
