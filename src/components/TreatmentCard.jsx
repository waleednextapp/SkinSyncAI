import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {FontFamily} from '../utils/Fonts';
import {Colors} from '../utils/Colors';

const TreatmentCard = ({
  title = 'Botox Treatment',
  date = 'October 20, 3:00 PM',
  location = 'Glow Skin Clinic',
  image = require('../assets/images/dummyImg.png'),
  check = false,
  onPress,
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
      </View>
      <View>
        <View style={styles.firstLine}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.locationContainer}>
            <Icon name="map-marker-alt" size={12} color="#D9534F" />
            <Text style={styles.location}>{location}</Text>
          </View>
        </View>
        <Text style={styles.date}>{date}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    width: 280,
  },
  image: {
    width: '100%',
    height: 150,
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
});

export default TreatmentCard;
