import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import Slider from 'react-native-sliders';
import {FontFamily} from '../../utils/Fonts';
import {Colors} from '../../utils/Colors';
import {Back} from '../../icons';
import DropDownPicker from 'react-native-dropdown-picker';
import Button from '../../components/Button';
import Svg, {Circle} from 'react-native-svg';

const ARModalFaceScreen = ({navigation, route}) => {
  const {
    photoPath,
    // landmarks,
    contours
  } = route?.params || {};
  const [syringes, setSyringes] = useState(1);
  const [openMedicationConcern, setOpenMedicationConcern] = useState(false);
  const [medicationConcern, setMedicationConcern] = useState(null);
  const [medicationConcernItems, setMedicationConcernItems] = useState([
    {label: `Merformin, Lisinopril, etc`, value: `Merformin, Lisinopril, etc`},
    {label: 'Aging', value: 'aging'},
    {label: 'Sensitivity', value: 'sensitivity'},
  ]);

  const [faceData, setFaceData] = useState(null);
  const [selectedTreatment, setSelectedTreatment] = useState('Botox');
  const [isLoading, setIsLoading] = useState(true);
  const [showAfter, setShowAfter] = useState(false);
  const [accuracy, setAccuracy] = useState(0);

  const screenWidth = Dimensions.get('window').width;
  const imageWidth = screenWidth * 0.9; // '90%' width of screen
  const imageHeight = 250;

  // Assuming contours are based on an original resolution
  const originalImageWidth = 1440; // or whatever the original image width is
  const originalImageHeight = 1080; // set it to actual original height

  const scaleX = imageWidth / originalImageWidth;
  const scaleY = imageHeight / originalImageHeight;

  // Remove landmarks console.log and replace with contours
  console.log('Contours data:', contours);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.headerMainContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backContainer}>
          <Back size={20} />
        </TouchableOpacity>
        <Text style={styles.headerTxt}>AR Face Model Preview</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: photoPath.startsWith('file://')
              ? photoPath
              : `file://${photoPath}`,
          }}
          style={[styles.image]}
        />
        <View style={[styles.svgContainer]}>
          <Svg
            style={[
              styles.svgOverlay,
              {
                transform: [{rotate: '90deg'}],
              },
            ]}>
            {contours && Object.keys(contours).map((feature) => (
              contours[feature].map((point, index) => (
                <Circle
                  key={`${feature}-${index}`}
                  cx={point.x * scaleX}
                  cy={point.y * scaleY}
                  r="1.5"
                  fill={showAfter ? Colors.pink : 'transparent'}
                />
              ))
            ))}
          </Svg>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            padding: 10,
            position: 'absolute',
            top: 0,
          }}>
          <Text style={styles.viewTxt}>{showAfter ? 'After' : 'Before'}</Text>
          <TouchableOpacity
            style={styles.maskBack}
            onPress={() => setShowAfter(!showAfter)}>
            <Image
              source={require('../../assets/images/maskIcon.png')}
              style={styles.maskImg}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.overlayText}>
          See How {syringes} Syringe{syringes > 1 ? 's' : ''} Will Look On Your
          Under Eyes
        </Text>
      </View>
      <View style={styles.accuracyContainer}>
        <View style={styles.progressContainer}>
          <Image
            source={require('../../assets/images/progressContainer.png')}
            style={styles.progressImage}
          />
          <View>
            <Text style={styles.accuracyText}>Accuracy Rate: {accuracy}%</Text>
            <Text style={styles.subTxt}>
              This score is based on your Face analysis
            </Text>
          </View>
        </View>
      </View>
      <Text style={styles.treatmentTxt}>Treatment Selection</Text>
      <View style={styles.scrollStyle}>
        <ScrollView
          contentContainerStyle={styles.btnMain}
          horizontal
          showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={[
              styles.btnStyle,
              {
                marginHorizontal: 5,
                backgroundColor:
                  selectedTreatment === 'Botox'
                    ? Colors.primary
                    : Colors.arrowBack,
              },
            ]}
            onPress={() => setSelectedTreatment('Botox')}>
            <Image
              source={require('../../assets/images/skinCare.png')}
              style={{width: 18, height: 18}}
            />
            <Text style={[styles.btnText]}>Botox</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.btnStyle,
              {
                marginHorizontal: 5,
                backgroundColor:
                  selectedTreatment === 'Dermal Filler'
                    ? Colors.primary
                    : Colors.arrowBack,
              },
            ]}
            onPress={() => setSelectedTreatment('Dermal Filler')}>
            <Image
              source={require('../../assets/images/injection.png')}
              style={{width: 18, height: 18}}
            />
            <Text style={styles.btnText}>Dermal Filler </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.btnStyle,
              {
                backgroundColor:
                  selectedTreatment === 'Laser Treatment'
                    ? Colors.primary
                    : Colors.arrowBack,
              },
            ]}
            onPress={() => setSelectedTreatment('Laser Treatment')}>
            <Image
              source={require('../../assets/images/laserImg.png')}
              style={{width: 18, height: 18}}
            />
            <Text style={styles.btnText}>Laser Treatment </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <View style={{paddingHorizontal: 20, marginBottom: 25}}>
        <Text style={styles.areaTxt}>Area Selection</Text>
        <DropDownPicker
          open={openMedicationConcern}
          value={medicationConcern}
          items={medicationConcernItems}
          setOpen={setOpenMedicationConcern}
          setValue={setMedicationConcern}
          setItems={setMedicationConcernItems}
          placeholder="Primary Concerns"
          style={[styles.dropdown]}
          containerStyle={{zIndex: 100}}
          dropDownContainerStyle={{zIndex: 100}}
        />
      </View>
      <View style={styles.sliderSection}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.label}>Adjustable Parameters: </Text>
          <Text style={styles.syringeTxt}>
            {syringes} Syringe {syringes > 1 ? 's' : ''}
          </Text>
        </View>
        <Slider
          value={syringes}
          minimumValue={1}
          maximumValue={5}
          step={1}
          onValueChange={value => setSyringes(value[0])}
          trackStyle={styles.track}
          thumbStyle={styles.thumb}
          minimumTrackTintColor="#00BFFF"
          maximumTrackTintColor="#ddd"
          containerStyle={styles.slider}
        />
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={() => setSyringes(1)}>
          <Text style={styles.resetText}>Reset Default</Text>
        </TouchableOpacity>
        <Button
          title={'Update'}
          style={{width: 150, height: 44}}
          onPress={() => {
            navigation.navigate('ReadyAppointment');
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default ARModalFaceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  imageContainer: {
    alignItems: 'center',
    backgroundColor: Colors.anotherPink,
    borderRadius: 10,
    // marginHorizontal: 20,
    height: 250,
    justifyContent: 'center',
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
  },
  imageWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    position: 'absolute',
    top: -190,
    left: 0,
    right: 0,
    bottom: 0,
  },
  imageContainerInner: {
    // position: 'relative',
    width: '100%',
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    resizeMode: 'center',
    alignSelf: 'center',
  },
  overlayText: {
    position: 'absolute',
    bottom: 10,
    backgroundColor: Colors.black,
    color: '#fff',
    padding: 6,
    borderRadius: 50,
    fontSize: 14,
    fontFamily: FontFamily.semiBold,
  },
  accuracyContainer: {
    marginVertical: 18,
    paddingHorizontal: 20,
  },
  accuracyText: {
    fontFamily: FontFamily.semiBold,
    fontSize: 20,
  },
  label: {
    fontSize: 18,
    fontFamily: FontFamily.semiBold,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  track: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#ddd',
  },
  thumb: {
    width: 20,
    height: 20,
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.lightBorderColor,
    // marginTop: 15,
  },
  resetText: {
    fontFamily: FontFamily.semiBold,
    fontSize: 22,
    textDecorationLine: 'underline',
  },
  updateButton: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  updateText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  safeContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    width: '100%',
  },
  headercontainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  backContainer: {
    height: 44,
    width: '12%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: Colors.arrowBack,
  },
  headerMainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    // paddingHorizontal: 30,
    // paddingBottom: 27,
    paddingHorizontal: 20,
  },
  headerTxt: {
    fontSize: 24,
    fontFamily: FontFamily.semiBold,
    // marginLeft: 20,
    width: '76%',
    textAlign: 'center',
  },
  mainContainer: {
    paddingHorizontal: 30,
  },
  maskImg: {
    height: 18,
    width: 18,
    resizeMode: 'contain',
  },
  viewTxt: {
    // position: 'absolute',
    // top: 22,
    // left: -40,
    fontSize: 20,
    fontFamily: FontFamily.semiBold,
  },
  maskBack: {
    // position: 'absolute',
    // top: 22,
    // right: -40,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    height: 36,
    width: 36,
    borderRadius: 36,
  },
  progressImage: {
    height: 48,
    width: 48,
  },
  subTxt: {
    fontSize: 16,
    fontFamily: FontFamily.regular,
    color: Colors.lightBlack,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 18,
    borderBottomColor: Colors.lightBorderColor,
    borderBottomWidth: 1,
  },
  btnStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    backgroundColor: Colors.arrowBack,
    height: 44,
    paddingHorizontal: 17,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnMain: {
    paddingHorizontal: 20,
    height: 44,
  },
  btnText: {
    fontSize: 18,
    fontFamily: FontFamily.medium,
  },
  treatmentTxt: {
    fontSize: 18,
    fontFamily: FontFamily.semiBold,
    marginBottom: 10,
    marginHorizontal: 30,
  },
  sliderSection: {
    paddingHorizontal: 20,
  },
  scrollStyle: {
    marginBottom: 18,
  },
  areaTxt: {
    fontSize: 18,
    fontFamily: FontFamily.semiBold,
    marginBottom: 10,
  },
  dropdown: {
    height: 44,
    borderColor: Colors.black,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: Colors.white,
  },
  syringeTxt: {
    fontSize: 14,
    fontFamily: FontFamily.medium,
  },
  treatmentOverlay: {
    position: 'absolute',
    zIndex: 1,
  },
  arModel: {
    transform: [{scale: 1.05}, {perspective: 1000}, {rotateY: '5deg'}],
    borderWidth: 2,
    borderColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  overlayContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    // top: 33,
    // left: 35,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  svgContainer: {
    position: 'absolute',
    top: -75,
    left: 10,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  svgOverlay: {
    width: '100%',
    height: '100%',
  },
});
