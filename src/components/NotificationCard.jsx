import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {FontFamily} from '../utils/Fonts';
import {Colors} from '../utils/Colors';

const NotificationCard = ({HeaderTxt, subTxt, mainStyle}) => {
  return (
    <View style={[styles.mainContainer, mainStyle]}>
      <Image
        source={require('../assets/images/appLogo.png')}
        style={styles.imageStyle}
      />
      <View style={styles.txtMain}>
        <Text style={styles.headerTxt}>{HeaderTxt}</Text>
        <Text style={styles.subTxt}>{subTxt}</Text>
      </View>
    </View>
  );
};

export default NotificationCard;

const styles = StyleSheet.create({
  imageStyle: {
    height: 44,
    width: 44,
    resizeMode: 'contain',
  },
  mainContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 15,
    padding: 17,
  },
  headerTxt: {
    fontFamily: FontFamily.semiBold,
    fontSize: 18,
  },
  subTxt: {
    fontFamily: FontFamily.regular,
    fontSize: 16,
    marginTop: 8,
    color: Colors.subTxt,
  },
  txtMain: {
    marginLeft: 10,
    maxWidth: '80%',
  },
});
