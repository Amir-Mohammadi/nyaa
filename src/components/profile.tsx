import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/Colors';
import { FontFamily } from '../constants/Fonts';
import Layout from '../constants/Layout';

interface Props {
  name: string;
  family: string;
  avatarPlaceholder: string;
  idCode: string;
  phone: string;
  avatarUrl: string;
}

export type profileType = Props;

const Profile: React.FC<profileType> = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <View style={styles.imageBX}>
          <Text style={styles.imgTxt}>{props.avatarPlaceholder}</Text>
          <Image source={{ uri: props.avatarUrl }} style={styles.img} />
        </View>
      </View>

      <View style={styles.text}>
        <Text style={styles.nameTxt}>{props.name + ' ' + props.family}</Text>
      </View>

      <View style={{ marginBottom: Layout.scaleY(10) }}>
        <Text style={styles.IdTxtExp}>{'شماره ملی:  '}</Text>
        <Text style={styles.IdTxt}>{props.idCode}</Text>
      </View>

      <View>
        <Text style={styles.phoneTxtExp}>{'شماره تلفن: '}</Text>
        <Text style={styles.phoneTxt}>{props.phone}</Text>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    borderBottomColor: Colors.success,
    borderBottomWidth: 1,
    paddingHorizontal: Layout.scaleX(20),
  },
  avatar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingVertical: Layout.scaleX(15),
  },
  imageBX: {
    width: Layout.scaleX(150),
    height: Layout.scaleX(150),
    borderRadius: 55,
    backgroundColor: Colors.success,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    position: 'absolute',
    width: Layout.scaleX(150),
    height: Layout.scaleX(150),
  },
  imgTxt: {
    color: '#FFFFFF',
    fontSize: Layout.scaleX(70),
  },
  nameTxt: {
    fontSize: Layout.scaleX(40),
    color: '#707070',
    fontFamily: FontFamily.DiodrumArabic.Medium,
  },
  text: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  phoneTxt: {
    fontSize: Layout.scaleY(35),
    color: '#707070',
    fontFamily: FontFamily.DiodrumArabic.SemiBold,
  },
  phoneTxtExp: {
    marginBottom: Layout.scaleY(-10),
    fontSize: Layout.scaleY(30),
    color: '#707070',
    fontFamily: FontFamily.DiodrumArabic.Medium,
  },
  IdTxt: {
    fontSize: Layout.scaleY(30),
    color: '#707070',
    fontFamily: FontFamily.DiodrumArabic.SemiBold,
  },
  IdTxtExp: {
    marginBottom: Layout.scaleY(-10),
    fontSize: Layout.scaleY(30),
    color: '#707070',
    fontFamily: FontFamily.DiodrumArabic.Medium,
  },
});
