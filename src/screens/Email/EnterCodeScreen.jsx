import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  StatusBar,
} from 'react-native';
import CustomTextInput from '../../components/CustomTextInput';
import {Back} from '../../icons';
import {Colors} from '../../utils/Colors';
import {FontFamily} from '../../utils/Fonts';
import Button from '../../components/Button';

const EnterCodeScreen = ({navigation, route}) => {
  const {email} = route.params;
  const [code, setCode] = useState('');
  const handleNext = () => {
    navigation.navigate('Onboarding');
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Moves button above keyboard
        style={styles.keyboardAvoidingContainer}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scrollViewContent}
            keyboardShouldPersistTaps="handled">
            <View style={styles.mainContainer}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.backContainer}>
                <Back size={20} />
              </TouchableOpacity>

              <View style={styles.content}>
                <View style={styles.letterImgMain}>
                  <Image
                    source={require('../../assets/images/mail.png')}
                    style={styles.imgStyle}
                  />
                </View>
                <Text style={styles.title}>Enter Your Code</Text>
                <Text style={styles.subtitle}>
                  We sent a verification code to your email
                  {'\n'}
                  {email}
                </Text>

                <CustomTextInput
                  placeholder="--  --  --  --  --  --"
                  value={code}
                  onChangeText={setCode}
                  keyboardType="numeric"
                />
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>

        {/* Button above the keyboard */}

        <Button
          title="Next"
          loading={false}
          onPress={handleNext}
          style={styles.button}
          textStyle={styles.buttonText}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 0,
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
  scrollViewContent: {
    justifyContent: 'center',
  },
  mainContainer: {
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  backContainer: {
    height: 44,
    width: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: Colors.arrowBack,
  },
  title: {
    fontSize: 24,
    fontFamily: FontFamily.semiBold,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.lightColor,
    marginBottom: 22,
    fontFamily: FontFamily.regular,
  },
  button: {
    borderRadius: 50,
    marginHorizontal: 30,
    marginBottom: 5, // Adds spacing so button stays above the keyboard
  },
  buttonText: {
    color: Colors.white,
    fontSize: 22,
    fontFamily: FontFamily.semiBold,
  },
  letterImgMain: {
    height: 79,
    width: 79,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.lightblue,
    marginTop: 43,
    marginBottom: 27,
  },
  imgStyle: {
    height: 45,
    width: 45,
    resizeMode: 'contain',
  },
});

export default EnterCodeScreen;
