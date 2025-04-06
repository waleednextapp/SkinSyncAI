import React from 'react';
import {View, Text, Image, StyleSheet, SafeAreaView, Platform, StatusBar} from 'react-native';
import Button from '../../components/Button';
import {Colors} from '../../utils/Colors';
import {FontFamily} from '../../utils/Fonts';

const EnableNotification = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        {/* Bell Icon */}
        <View style={styles.bellMain}>
          <Image
            source={require('../../assets/images/bell.png')}
            style={styles.bellIcon}
          />
        </View>
        {/* Title and Subtitle */}
        <View style={{flex: 1}}>
          <Text style={styles.title}>Get Notified</Text>
          <Text style={styles.subtitle}>
            Get timely reminders, skincare tips, promotions, and last-minute
            updates—all in one place.
          </Text>
        </View>
        {/* Notification Image */}
        <View style={{flex: 2.5}}>
          <Image
            source={require('../../assets/images/notification.png')} // Use the exported image
            style={styles.notificationsImage}
            resizeMode="contain"
          />
        </View>
        {/* Buttons */}
        <View style={{flex: 0.8}}>
          <Button
            title="Turn On Notifications"
            onPress={() => console.log('Enable notifications')}
          />
          <Text
            style={styles.lastTxt}
            onPress={() => navigation.navigate('TabNavigator')}>
            Not Right Now
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightPink,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 0,
  },
  bellIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
    fontFamily: FontFamily.semiBold,
  },
  subtitle: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    color: Colors.lightColor,
  },
  notificationsImage: {
    width: '100%', // Adjust size if needed
    height: 250, // Adjust to match design
    marginBottom: 20,
  },
  mainContainer: {
    paddingHorizontal: 30,
    flex: 1,
  },
  bellMain: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    width: 80,
    borderRadius: 100,
    backgroundColor: Colors.white,
    marginBottom: 27,
  },
  lastTxt: {
    fontFamily: FontFamily.medium,
    fontSize: 22,
    color: Colors.dimTxt,
    textAlign: 'center',
    marginTop: 19,
  },
});

export default EnableNotification;
