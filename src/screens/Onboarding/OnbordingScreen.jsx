import React, {useState} from 'react';
import {
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  View,
  Platform,
  StatusBar,
} from 'react-native';
import {ProgressBar} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from '../../utils/Colors';
import Button from '../../components/Button';
import {FontFamily} from '../../utils/Fonts';
import {Back, Close, Forward} from '../../icons';
import {ScrollView} from 'react-native-gesture-handler';

const steps = [
  {
    question: 'Please Describe Your Skin Type?',
    options: [
      'Oily Skin',
      'Dry Skin',
      'Combination Skin',
      'Sensitive Skin',
      'Normal Skin',
    ],
  },
  {
    question: 'What Are Your Main Skin Concerns? (Select All That Apply)',
    options: [
      'Acne Or Breakouts',
      'Fine Lines Or Wrinkles',
      'Dark Spots Or Pigmentation',
      'Redness Or Irritation',
      'Dryness Or Dehydration',
      'Dullness Or Uneven Tone',
      'None Of Them',
    ],
  },
  {
    question: 'How Would You Describe Your Lifestyle And Habits?',
    options: [
      'Do You Spend A lot Of Time Outdoors?',
      'Do You Currently Follow A Skincare Regimen?',
      'Do You Eat A Balanced Diet With Plenty Of Water?',
      'Do You Get 7–8 Hours Of Sleep Regularly?',
      'Do You Experience High Levels Of Stress?',
    ],
  },
  {
    question: 'Have You Been Diagnosed With Any Skin Conditions Or Allergies?',
    options: ['Acne', 'Eczema', 'Psoriasis', 'Rosacea', 'None Of The Above'],
    images: [
      require('../../assets/images/acne.png'),
      require('../../assets/images/eczema.png'),
      require('../../assets/images/psoriasis.png'),
      require('../../assets/images/rosacea.png'),
    ],
  },
  {
    question: 'What Are Your Primary Skin Goals?',
    options: [
      'Clearer Skin (Reduce Acne Or Breakouts)',
      'Brighter Skin (Reduce Dullness Or Dark Spots)',
      'Firmer Skin (Reduce Fine Lines Or Wrinkles)',
      'Hydrated Skin (Reduce Dryness Or Flakiness)',
      'Even Skin Tone (Reduce Redness Or Pigmentation)',
    ],
  },
];

const OnbordingScreen = ({navigation}) => {
  const [step, setStep] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [choice, setSelectedChoice] = useState('no');

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
    if (step === 4) {
      navigation.navigate('createProfile');
    }
  };
  const handleSkip = () => {
    navigation.navigate('createProfile');
  };

  const handleSelect = option => {
    setSelectedOptions(prev => ({
      ...prev,
      [step]: prev[step]?.includes(option)
        ? prev[step].filter(item => item !== option)
        : [...(prev[step] || []), option],
    }));
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.progressStepMain}>
        <Text style={styles.stepsTxt}>
          {step + 1}/{steps.length}
        </Text>
        <View style={{width: '80%'}}>
          <ProgressBar
            progress={(step + 1) / steps.length}
            color={Colors.progressbarColor}
            style={styles.progressBarStyle}
          />
        </View>
        <TouchableOpacity style={styles.closeButton} onPress={() => setStep(0)}>
          <Close size={16} color={Colors.black} />
        </TouchableOpacity>
      </View>
      <View style={styles.btnsMain}>
        {step >= 1 ? (
          <TouchableOpacity
            style={styles.backMain}
            onPress={() => setStep(step - 1)}>
            <Back size={22} color={Colors.white} />
          </TouchableOpacity>
        ) : (
          <View></View>
        )}
        <View style={styles.skipMain}>
          <Text style={styles.skpTxt}>Skip This</Text>
          <TouchableOpacity style={styles.backMain} onPress={handleSkip}>
            <Forward size={22} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </View>
      <Text
        style={{
          fontSize: 22,
          fontFamily: FontFamily.semiBold,
          marginBottom: 15,
        }}>
        {steps[step].question}
      </Text>
      {step === 3 ? (
        <ScrollView
          contentContainerStyle={{width: '100%', alignItems: 'center'}}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            {steps[step].options.slice(0, 4).map((item, index) => (
              <TouchableOpacity
                key={item}
                style={{
                  width: '47%', // Adjusted to fit two items in one row
                  marginBottom: 15,
                  padding: 8,
                  alignItems: 'center',
                  borderRadius: 20,
                  backgroundColor: selectedOptions[step]?.includes(item)
                    ? Colors.progressbarColor
                    : Colors.white,
                  shadowColor: '#000',
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.1,
                  shadowRadius: 3,
                  elevation: 3,
                }}
                onPress={() => handleSelect(item)}>
                <Image
                  source={steps[step].images[index]}
                  style={{
                    width: '100%',
                    height: '90',
                    marginBottom: 7,
                    borderRadius: 15,
                  }}
                />
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: FontFamily.semiBold,
                    textAlign: 'center',
                  }}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Remaining text-only options (one per row) */}
          {steps[step].options.slice(4).map(item => (
            <TouchableOpacity
              key={item}
              style={{
                width: '100%',
                marginBottom: 10,
                padding: 15,
                alignItems: 'center',
                borderRadius: 10,
                backgroundColor: Colors.white,
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.1,
                shadowRadius: 3,
                elevation: 3,
                flexDirection: 'row',
                justifyContent: 'flex-start',
              }}
              onPress={() => handleSelect(item)}>
              <View
                style={[
                  styles.radioBtn,
                  {
                    borderWidth: selectedOptions[step]?.includes(item) ? 5 : 3,
                    borderColor: selectedOptions[step]?.includes(item)
                      ? Colors.progressbarColor
                      : Colors.radioBtnColor,
                  },
                ]}
              />
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: FontFamily.semiBold,
                  textAlign: 'left',
                }}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
          <View>
            <Text style={styles.lastQuestion}>
              Are you currently using any medications or treatments for your
              skin? 
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 16,
              }}>
              <TouchableOpacity
                onPress={() => setSelectedChoice('')}
                style={[
                  styles.radioBtn,
                  {
                    borderWidth: choice === 'yes' ? 5 : 3,
                    borderColor:
                      choice === 'yes'
                        ? Colors.progressbarColor
                        : Colors.radioBtnColor,
                  },
                ]}
              />
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: FontFamily.semiBold,
                  textAlign: 'left',
                }}>
                {`Yes ( Please Specify)`}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 20,
              }}>
              <TouchableOpacity
                onPress={() => setSelectedChoice('')}
                style={[
                  styles.radioBtn,
                  {
                    borderWidth: choice === 'no' ? 5 : 3,
                    borderColor:
                      choice === 'no'
                        ? Colors.progressbarColor
                        : Colors.radioBtnColor,
                  },
                ]}
              />
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: FontFamily.semiBold,
                  textAlign: 'left',
                }}>
                {`Yes ( Please Specify)`}
              </Text>
            </View>
          </View>
        </ScrollView>
      ) : (
        <FlatList
          data={steps[step].options}
          keyExtractor={item => item}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 15,
                borderRadius: 50,
                height: 55,
                backgroundColor: Colors.white,
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.13,
                shadowRadius: 2.84,
                elevation: 5,
                paddingHorizontal: 16,
              }}
              onPress={() => handleSelect(item)}>
              <View
                style={[
                  styles.radioBtn,
                  {
                    borderWidth: selectedOptions[step]?.includes(item) ? 5 : 3,
                    borderColor: selectedOptions[step]?.includes(item)
                      ? Colors.progressbarColor
                      : Colors.radioBtnColor,
                  },
                ]}
              />
              {steps[step].images && steps[step].images[index] && (
                <Image
                  source={steps[step].images[index]}
                  style={{
                    width: 40,
                    height: 40,
                    marginRight: 10,
                    borderRadius: 5,
                  }}
                />
              )}
              <Text style={styles.itemTxt}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      )}
      <Button
        title={step === steps.length - 1 ? 'Done' : 'Next'}
        loading={false}
        onPress={handleNext}
        style={styles.button}
        textStyle={styles.buttonText}
      />
    </SafeAreaView>
  );
};

export default OnbordingScreen;

const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 22,
    fontFamily: FontFamily.semiBold,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 30,
    backgroundColor: Colors.white,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 0,
  },
  progressBarStyle: {
    height: 8,
    borderRadius: 4,
  },
  closeButton: {
    backgroundColor: Colors.crossBackground,
    justifyContent: 'center',
    alignItems: 'center',
    height: 21,
    width: 21,
    borderRadius: 30,
  },
  progressStepMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  stepsTxt: {
    fontSize: 20,
    fontFamily: FontFamily.semiBold,
  },
  btnsMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 33,
  },
  backMain: {
    backgroundColor: Colors.pink,
    height: 44,
    width: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  skipMain: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  skpTxt: {
    fontSize: 16,
    fontFamily: FontFamily.regular,
    marginRight: 11,
  },
  itemTxt: {
    fontSize: 18,
    fontFamily: FontFamily.semiBold,
    marginRight: 15,
  },
  radioBtn: {
    height: 20,
    width: 20,
    borderRadius: 50,
    backgroundColor: Colors.white,
    marginRight: 13,
    borderWidth: 3,
    borderColor: Colors.radioBtnColor,
  },
  lastQuestion: {
    fontSize: 22,
    fontFamily: FontFamily.semiBold,
    marginTop: 20,
  },
});
