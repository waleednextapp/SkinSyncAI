import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {FontFamily} from '../utils/Fonts';
import {Colors} from '../utils/Colors';

const TreatmentCard = ({
  title = 'Botox Treatment',
  date = 'October 20, 3:00 PM',
  location = 'Glow Skin Clinic',
  image = require('../assets/images/dummyImg.png'),
}) => {
  return (
    <View style={styles.card}>
      <Image
        source={image} // Replace with actual image URL
        style={styles.image}
      />
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
    backgroundColor: '#fff',
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
});

export default TreatmentCard;
