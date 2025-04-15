import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {FontFamily} from '../utils/Fonts';
import {Colors} from '../utils/Colors';

const SmallTreatmentCard = ({
  title = 'Treatment Name',
  name = 'Glow Skin Clinic',
  discount = '$ 800',
  price = '$ 650',
  image = require('../assets/images/clinicImage1.png'),
  check = true,
  onPress,
  navigation
}) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('BookAppointment')}>
      <View>
        <Image
          source={image} // Replace with actual image URL
          style={styles.image}
        />
        {check && (
          <View style={styles.heartMain}>
            <Image
              source={require('../assets/images/fireImage.png')}
              style={styles.heartStyle}
            />
            <Text
              style={{
                fontSize: 12,
                fontFamily: FontFamily.semiBold,
                marginLeft: 5,
              }}>
              Top Choice
            </Text>
          </View>
        )}
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
          <Text style={styles.date}>{name}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.date, {textDecorationLine: 'line-through'}]}>
            {discount}
          </Text>
          <Text
            style={[
              styles.date,
              {
                marginLeft: 5,
                color: Colors.black,
                fontFamily: FontFamily.medium,
              },
            ]}>
            {price}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: 165,
  },
  image: {
    width: 165,
    height: 174,
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
    top: 7,
    left: 7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 50,
    height: 21,
    width: 86,
    flexDirection: 'row',
  },
  starMain: {
    position: 'absolute',
    bottom: 10,
    right: 7,
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

export default SmallTreatmentCard;
