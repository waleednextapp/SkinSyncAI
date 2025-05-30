import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import Button from '../../components/Button';
import {Colors} from '../../utils/Colors';
import Slider from 'react-native-sliders';
import Svg, {Path, Circle, G} from 'react-native-svg';

const fillerAreas = [
  {label: 'Temples', value: 'temples'},
  {label: 'Cheeks', value: 'cheeks'},
  {label: 'Preauricular Area', value: 'preauricular'},
  {label: 'Under Eye Tear Trough', value: 'tear_trough'},
  {label: 'Nasolabial Folds', value: 'nasolabial_folds'},
  {label: 'Marionette Lines', value: 'marionette_lines'},
  {label: 'Chin', value: 'chin'},
  {label: 'Jawline', value: 'jawline'},
  {label: 'Lips', value: 'lips'},
];
const botoxAreas = [
  {label: 'Forehead', value: 'forehead'},
  {label: 'Glabella', value: 'glabella'},
  {label: "Crow's Feet", value: 'crows_feet'},
  {label: 'Bunny Lines', value: 'bunny_lines'},
  {label: 'Masseter', value: 'masseter'},
  {label: 'Chin', value: 'chin'},
  {label: 'Neck', value: 'neck'},
  {label: 'Other', value: 'other'},
];

const fillerFaceParts = [
  {key: 'midface', label: 'Midface'},
  {key: 'undereyes', label: 'Undereyes'},
  {key: 'lips', label: 'Lips'},
  {key: 'cheeks', label: 'Cheeks'},
  {key: 'forehead', label: 'Forehead'},
  {key: 'eyebrows', label: 'Eyebrows'},
];

const syringeOptions = [
  {label: 'Syringe 1', value: 1},
  {label: 'Syringe 2', value: 2},
  {label: 'Syringe 3', value: 3},
];

const facePartSyringeLimits = {
  midface: 1,
  undereyes: 1, // Tear area
  lips: 3,
  cheeks: 2,
  forehead: 1,
  eyebrows: 1,
  jawline: 3,
};

const ContourPoints = ({points, color = Colors.pink}) => {
  return points.map((point, index) => (
    <Circle
      key={index}
      cx={point.x}
      cy={point.y}
      r="3"
      fill={color}
      stroke={Colors.white}
      strokeWidth="1"
    />
  ));
};

const FacialFeature = ({points, color = Colors.pink}) => {
  if (!points || points.length === 0) return null;

  const pathData =
    points.reduce((acc, point, index) => {
      const command = index === 0 ? 'M' : 'L';
      return `${acc} ${command} ${point.x} ${point.y}`;
    }, '') + ' Z';

  return (
    <>
      <Path
        d={pathData}
        stroke={color}
        strokeWidth="2"
        fill="none"
        opacity={0.8}
      />
      <ContourPoints points={points} color={color} />
    </>
  );
};

const FaceOutline = ({faceData}) => {
  if (!faceData?.contours) return null;

  const {
    FACE,
    LEFT_EYE,
    RIGHT_EYE,
    LEFT_EYEBROW_TOP,
    LEFT_EYEBROW_BOTTOM,
    RIGHT_EYEBROW_TOP,
    RIGHT_EYEBROW_BOTTOM,
    UPPER_LIP_TOP,
    UPPER_LIP_BOTTOM,
    LOWER_LIP_TOP,
    LOWER_LIP_BOTTOM,
    NOSE_BRIDGE,
    NOSE_BOTTOM,
  } = faceData.contours;

  const facePoints = FACE;
  const pathData =
    facePoints.reduce((acc, point, index) => {
      const command = index === 0 ? 'M' : 'L';
      return `${acc} ${command} ${point.x} ${point.y}`;
    }, '') + ' Z';

  // Calculate center point for rotation
  const centerX = faceData.bounds.x + faceData.bounds.width / 2;
  const centerY = faceData.bounds.y + faceData.bounds.height / 2;

  // Calculate the center of the face bounds
  const faceCenterX = faceData.bounds.x + faceData.bounds.width / 2;
  const faceCenterY = faceData.bounds.y + faceData.bounds.height / 2;

  // Calculate the offset to center the face
  const offsetX =
    -faceData.bounds.x +
    (Dimensions.get('window').width - faceData.bounds.width) / 2;
  const offsetY =
    -faceData.bounds.y +
    (Dimensions.get('window').height - faceData.bounds.height) / 2;

  return (
    <Svg
      // style={StyleSheet.absoluteFill}
      width="70%"
      height="70%"
      style={{
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: [
          {translateX: -faceData.bounds.width / 4},
          {translateY: -faceData.bounds.height / 4},
        ],
      }}
      viewBox={`${faceData.bounds.x} ${faceData.bounds.y} ${faceData.bounds.width} ${faceData.bounds.height}`}>
      <G transform={`rotate(90, ${centerX}, ${centerY})`}>
        {/* Face outline */}
        <Path
          d={pathData}
          stroke={Colors.pink}
          strokeWidth="2"
          fill="none"
          // opacity={0.8}
        />
        <ContourPoints points={facePoints} />

        {/* Left Eye */}
        <FacialFeature points={LEFT_EYE} color={Colors.blue} />

        {/* Right Eye */}
        <FacialFeature points={RIGHT_EYE} color={Colors.blue} />

        {/* Left Eyebrow */}
        <FacialFeature points={LEFT_EYEBROW_TOP} color={Colors.green} />
        <FacialFeature points={LEFT_EYEBROW_BOTTOM} color={Colors.green} />

        {/* Right Eyebrow */}
        <FacialFeature points={RIGHT_EYEBROW_TOP} color={Colors.green} />
        <FacialFeature points={RIGHT_EYEBROW_BOTTOM} color={Colors.green} />

        {/* Lips */}
        <FacialFeature points={UPPER_LIP_TOP} color={Colors.red} />
        <FacialFeature points={UPPER_LIP_BOTTOM} color={Colors.red} />
        <FacialFeature points={LOWER_LIP_TOP} color={Colors.red} />
        <FacialFeature points={LOWER_LIP_BOTTOM} color={Colors.red} />

        {/* Nose */}
        <FacialFeature points={NOSE_BRIDGE} color={Colors.purple} />
        <FacialFeature points={NOSE_BOTTOM} color={Colors.purple} />
      </G>
    </Svg>
  );
};

const ImageView = ({route, navigation}) => {
  const {image, faceData} = route.params;
  const [treatmentType, setTreatmentType] = useState('fillers');
  const [open, setOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState(null);
  const [fillerSyringes, setFillerSyringes] = useState(1);
  const [dropdownItems, setDropdownItems] = useState(fillerAreas);
  const [selectedFacePart, setSelectedFacePart] = useState('');
  const [openSyringe, setOpenSyringe] = useState(false);
  const [selectedSyringe, setSelectedSyringe] = useState(null);

  React.useEffect(() => {
    setDropdownItems(treatmentType === 'fillers' ? fillerAreas : botoxAreas);
    setSelectedArea(null);
  }, [treatmentType, image]);

  const getSyringeOptions = partKey => {
    const max = facePartSyringeLimits[partKey] || 1;
    return Array.from({length: max}, (_, i) => ({
      label: `${i + 1} Syringe`,
      value: i + 1,
    }));
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{uri: image}}
        style={styles.imageBackground}
        resizeMode="cover">
        <View
          style={{
            position: 'absolute',
            top: 100,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1000,
          }}>
          <FaceOutline faceData={faceData} />
        </View>
        <View style={styles.topButtonsAbsolute}>
          <Button
            title="FILLERS"
            style={[
              styles.topButton,
              treatmentType === 'fillers' && styles.topButtonActive,
            ]}
            textStyle={[
              styles.topButtonText,
              treatmentType === 'fillers' && styles.topButtonTextActive,
            ]}
            onPress={() => setTreatmentType('fillers')}
          />
          <Button
            title="BOTOX"
            style={[
              styles.topButton,
              treatmentType === 'botox' && styles.topButtonActive,
            ]}
            textStyle={[
              styles.topButtonText,
              treatmentType === 'botox' && styles.topButtonTextActive,
            ]}
            onPress={() => setTreatmentType('botox')}
          />
        </View>
        <View style={[styles.bottomSheet, {overflow: 'visible', zIndex: 3000}]}>
          {treatmentType === 'fillers' ? (
            <>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.facePartScroll}
                style={{width: '100%'}}>
                {fillerFaceParts.map(part => (
                  <TouchableOpacity
                    key={part.key}
                    style={[
                      styles.facePartItem,
                      selectedFacePart === part.key &&
                        styles.facePartItemSelected,
                    ]}
                    onPress={() => {
                      setSelectedFacePart(part.key);
                      setSelectedSyringe(null); // Reset syringe selection on new part
                    }}
                    activeOpacity={0.8}>
                    <Image
                      source={require('../../assets/images/appLogo.png')}
                      style={[
                        styles.facePartIcon,
                        selectedFacePart === part.key &&
                          styles.facePartIconSelected,
                      ]}
                    />
                    <Text
                      style={[
                        styles.facePartLabel,
                        selectedFacePart === part.key &&
                          styles.facePartLabelSelected,
                      ]}>
                      {part.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              {selectedFacePart ? (
                <>
                  <DropDownPicker
                    open={openSyringe}
                    value={selectedSyringe}
                    items={getSyringeOptions(selectedFacePart)}
                    setOpen={setOpenSyringe}
                    setValue={setSelectedSyringe}
                    setItems={() => {}}
                    placeholder="Select Syringe Count"
                    style={[styles.dropdown, {zIndex: 3000}]}
                    containerStyle={{zIndex: 3000, marginBottom: 10}}
                    dropDownContainerStyle={{zIndex: 3000}}
                    listMode="SCROLLVIEW"
                    dropDownDirection="TOP"
                  />
                  {selectedSyringe && (
                    <Text
                      style={{
                        fontSize: 16,
                        color: Colors.black,
                        marginBottom: 10,
                        fontWeight: '600',
                        alignSelf: 'center',
                      }}>
                      Selected: {selectedSyringe} syringe
                      {selectedSyringe > 1 ? 's' : ''}
                    </Text>
                  )}
                </>
              ) : null}
            </>
          ) : (
            <>
              <DropDownPicker
                open={open}
                value={selectedArea}
                items={dropdownItems}
                setOpen={setOpen}
                setValue={setSelectedArea}
                setItems={setDropdownItems}
                placeholder="Select Area"
                style={styles.dropdown}
                containerStyle={{zIndex: 1000}}
                dropDownContainerStyle={{zIndex: 1000}}
                multiple={true}
                min={0}
                max={5}
              />
              {/* <View style={styles.infoBox}>
                <Text style={styles.infoText}>
                  Toggle disappears for this as we are using a general number of
                  units. Area: Patient clicks on an area under a drop down menu
                  of problem areas with the ability to select many areas at
                  once.
                </Text>
              </View> */}
            </>
          )}
          <Button
            title="PROCEED"
            style={styles.proceedBtn}
            onPress={() => {
              // Handle proceed action
            }}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default ImageView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  overlay: {
    position: 'absolute',
    top: Platform.OS === 'android' ? (StatusBar.currentHeight || 40) + 20 : 60,
    width: '100%',
    alignItems: 'center',
    zIndex: 10,
  },
  instructionText: {
    color: Colors.pink,
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    textAlign: 'center',
  },
  topButtonsAbsolute: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 30,
    gap: 16,
    paddingVertical: 8,
  },
  topButton: {
    backgroundColor: Colors.arrowBack,
    borderRadius: 20,
    paddingHorizontal: 28,
    paddingVertical: 10,
    marginHorizontal: 8,
    height: 44,
    minWidth: 110,
    borderWidth: 1,
    borderColor: Colors.bordeColor,
  },
  topButtonActive: {
    backgroundColor: Colors.pink,
    borderColor: Colors.pink,
  },
  topButtonText: {
    color: Colors.black,
    fontSize: 18,
    fontWeight: 'bold',
  },
  topButtonTextActive: {
    color: Colors.white,
  },
  bottomSheet: {
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'android' ? 30 : 40,
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    alignItems: 'center',
    zIndex: 100,
  },
  dropdown: {
    width: '100%',
    height: 55,
    borderColor: Colors.bordeColor,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: Colors.white,
    marginBottom: 18,
    marginTop: 10,
  },
  sliderSection: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  slider: {
    width: '100%',
    height: 40,
    marginBottom: 6,
  },
  track: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ddd',
  },
  thumb: {
    width: 28,
    height: 28,
    backgroundColor: Colors.pink,
    borderColor: Colors.white,
    borderWidth: 2,
    borderRadius: 14,
  },
  syringeLabel: {
    fontSize: 16,
    color: Colors.black,
    fontWeight: '600',
    marginTop: 2,
    marginBottom: 4,
  },
  infoBox: {
    width: '100%',
    backgroundColor: Colors.lightPink,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  infoText: {
    color: Colors.black,
    fontSize: 15,
    fontWeight: '500',
  },
  proceedBtn: {
    width: '100%',
    marginTop: 10,
    borderRadius: 12,
    height: 55,
  },
  facePartScroll: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 8,
  },
  facePartItem: {
    alignItems: 'center',
    marginHorizontal: 8,
    padding: 6,
    borderRadius: 12,
  },
  facePartItemSelected: {
    backgroundColor: Colors.pink,
    borderWidth: 2,
    borderColor: Colors.black,
  },
  facePartIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginBottom: 4,
    borderWidth: 2,
    borderColor: Colors.bordeColor,
    backgroundColor: Colors.white,
  },
  facePartIconSelected: {
    borderColor: Colors.pink,
    backgroundColor: Colors.lightPink,
  },
  facePartLabel: {
    fontSize: 13,
    color: Colors.black,
    marginTop: 2,
  },
  facePartLabelSelected: {
    color: Colors.white,
    fontWeight: 'bold',
  },
});
