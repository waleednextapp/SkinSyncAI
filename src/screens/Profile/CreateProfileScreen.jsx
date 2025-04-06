import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import CustomTextInput from '../../components/CustomTextInput';
import {FontFamily} from '../../utils/Fonts';
import {Colors} from '../../utils/Colors';
import Button from '../../components/Button';
import {Camera} from '../../icons';

const CreateProfileScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.profileMain}>
          <Image
            source={require('../../assets/images/profile.png')}
            style={styles.profileImage}
          />
          <View style={styles.cameraBack}>
            <Camera />
          </View>
        </View>
        <Text style={styles.title}>Your Profile</Text>
        <Text style={styles.subtitle}>
          Introduce yourself to others in your events.
        </Text>

        <CustomTextInput
          placeholder="Your Name"
          mainStyle={styles.inputStyle}
        />
        <CustomTextInput
          placeholder="Phone Number"
          keyboardType="phone-pad"
          mainStyle={styles.inputStyle}
        />
        <CustomTextInput
          placeholder="Email Address"
          keyboardType="email-address"
          mainStyle={styles.inputStyle}
        />
        <CustomTextInput placeholder="Location" mainStyle={styles.inputStyle} />
        <CustomTextInput
          placeholder="Bio"
          multiline
          mainStyle={[styles.inputStyle, {height: 108}]}
          txtInputStyle={{height: 108, marginBottom: 0}}
        />
        <Button
          title={'Next'}
          loading={false}
          onPress={() => navigation.navigate('enableNotification')}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 0,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  title: {
    fontSize: 30,
    fontFamily: FontFamily.semiBold,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: FontFamily.regular,
    color: Colors.lightColor,
    marginBottom: 22,
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputStyle: {
    marginBottom: 20,
  },
  mainContainer: {
    paddingHorizontal: 30,
  },
  cameraBack: {
    position: 'absolute',
    bottom: 10,
    left: 60,
    backgroundColor: Colors.white,
    height: 25,
    width: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  profileMain: {
    position: 'relative',
    marginBottom: 27,
  },
});

export default CreateProfileScreen;
