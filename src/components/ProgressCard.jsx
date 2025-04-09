import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {FontFamily} from '../utils/Fonts';
import {Colors} from '../utils/Colors';

const ProgressCard = ({
  image = require('../assets/images/dummyImg.png'),
  title = 'Dermal Fillers - Cheeks',
  location = 'Glow Skin Clinic',
  percent = '28',
  percentImage = require('../assets/images/blueProgress.png'),
  sessions = '8',
  time = '4hrs',
  mainStyle,
}) => {
  return (
    <View style={[styles.card, mainStyle]}>
      <View>
        <Image
          source={image} // Replace with actual image URL
          style={styles.image}
        />
        <View style={styles.txtMain}>
          <Text style={styles.txtStyle}>Next Appointment In {time}</Text>
        </View>
      </View>
      <View>
        <View style={styles.firstLine}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.locationContainer}>
            <Image source={percentImage} style={{width: 18, height: 18}} />
            <Text style={styles.location}> {percent}%</Text>
          </View>
        </View>
        <Text style={styles.date}>{location}</Text>
        <Text style={styles.date}>0{sessions} Sessions</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: 248,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontFamily: FontFamily.semiBold,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 18,
    fontFamily: FontFamily.medium,
    marginLeft: 4,
  },
  date: {
    fontSize: 14,
    fontFamily: FontFamily.regular,
    color: Colors.glowSkin,
  },
  firstLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
    marginTop: 8,
  },
  txtMain: {
    position: 'absolute',
    right: 12,
    top: 20,
    backgroundColor: Colors.lightTxtBackground,
    height: 28,
    width: 180,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  txtStyle: {
    color: Colors.white,
    fontSize: 14,
    fontFamily: FontFamily.semiBold,
  },
});

export default ProgressCard;
