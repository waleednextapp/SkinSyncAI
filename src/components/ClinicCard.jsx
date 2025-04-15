import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {FontFamily} from '../utils/Fonts';
import {Colors} from '../utils/Colors';

const ClinicCard = ({
  title = 'Glow Skin Clinic',
  date = 'Top Rated aesthetic Clinic',
  image = require('../assets/images/clinicImage1.png'),
  checkFire = false,
  check = false,
}) => {
  return (
    <View style={styles.card}>
      <View>
        <Image
          source={image} // Replace with actual image URL
          style={styles.image}
        />
        <View style={styles.heartMain}>
          <Image
            source={
              check
                ? require('../assets/images/heartFilled.png')
                : require('../assets/images/heart.png')
            }
            style={styles.heartStyle}
          />
        </View>
        <View style={styles.starMain}>
          <Image
            source={require('../assets/images/starRating.png')}
            style={styles.starStyle}
          />
          <Text style={styles.ratingStyle}>5.0</Text>
        </View>
      </View>
      <View>
        <View style={styles.firstLine}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.lastContainer}>
          {checkFire && (
            <Image
              source={require('../assets/images/fireImage.png')}
              style={styles.fireStyle}
            />
          )}
          <Text style={styles.date}>{date}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: 200,
  },
  image: {
    width: 200,
    height: 160,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontFamily: FontFamily.semiBold,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 14,
    color: Colors.glowSkin,
    fontFamily: FontFamily.regular,
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
  heartStyle: {
    height: 13,
    width: 13,
    resizeMode: 'contain',
  },
  heartMain: {
    position: 'absolute',
    top: 10,
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 50,
    height: 26,
    width: 26,
  },
  starMain: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 50,
    height: 21,
    width: 45,
    flexDirection: 'row',
  },
  ratingStyle: {
    marginLeft: 5,
    fontSize: 12,
    fontFamily: FontFamily.semiBold,
  },
  starStyle: {
    height: 11,
    width: 11,
    resizeMode: 'contain',
  },
  fireStyle: {
    height: 11,
    width: 9,
    marginRight: 7,
  },
  lastContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ClinicCard;
