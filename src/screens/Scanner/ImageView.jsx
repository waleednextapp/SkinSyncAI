import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';
import Button from '../../components/Button';
import {Colors} from '../../utils/Colors';
import Svg, {Path, Circle, G} from 'react-native-svg';
import Icon from 'react-native-vector-icons/Ionicons'; // Add this import for the back icon

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
  {key: 'lowerface', label: 'Lowerface'},
  {key: 'jawline_neck', label: 'Jawline and Neck'},
  {key: 'undereyes', label: 'Undereyes'},
  {key: 'lips', label: 'Lips'},
  {key: 'cheeks', label: 'Cheeks'},
  // {key: 'forehead', label: 'Forehead'},
  // {key: 'eyebrows', label: 'Eyebrows'},
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
  lowerface: 1,
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
      <Path d={pathData} stroke={color} strokeWidth="2" fill="none" />
      <ContourPoints points={points} color={color} />
    </>
  );
};

// const FaceOutline = ({faceData, selectedFaceParts}) => {
//   if (!faceData?.contours) return null;

//   const {
//     FACE,
//     LEFT_EYE,
//     RIGHT_EYE,
//     LEFT_EYEBROW_TOP,
//     LEFT_EYEBROW_BOTTOM,
//     RIGHT_EYEBROW_TOP,
//     RIGHT_EYEBROW_BOTTOM,
//     UPPER_LIP_TOP,
//     UPPER_LIP_BOTTOM,
//     LOWER_LIP_TOP,
//     LOWER_LIP_BOTTOM,
//     NOSE_BRIDGE,
//     NOSE_BOTTOM,
//   } = faceData.contours;

//   const facePoints = FACE;
//   const pathData =
//     facePoints.reduce((acc, point, index) => {
//       const command = index === 0 ? 'M' : 'L';
//       return `${acc} ${command} ${point.x} ${point.y}`;
//     }, '') + ' Z';

//   // Calculate center point for rotation
//   const centerX = faceData.bounds.x + faceData.bounds.width / 2;
//   const centerY = faceData.bounds.y + faceData.bounds.height / 2;

//   // const renderSelectedFeatures = () => {
//   //   return selectedFaceParts.map(part => {
//   //     switch (part) {
//   //       case 'undereyes':
//   //         return (
//   //           <React.Fragment key="undereyes">
//   //             <FacialFeature points={LEFT_EYE} color={Colors.blue} />
//   //             <FacialFeature points={RIGHT_EYE} color={Colors.blue} />
//   //           </React.Fragment>
//   //         );
//   //       case 'lips' || 'lowerface' || 'jawline_neck':
//   //         return (
//   //           <React.Fragment key="lips">
//   //             <FacialFeature points={UPPER_LIP_TOP} color={Colors.red} />
//   //             <FacialFeature points={UPPER_LIP_BOTTOM} color={Colors.red} />
//   //             <FacialFeature points={LOWER_LIP_TOP} color={Colors.red} />
//   //             <FacialFeature points={LOWER_LIP_BOTTOM} color={Colors.red} />
//   //           </React.Fragment>
//   //         );
//   //       case 'cheeks':
//   //         return (
//   //           <React.Fragment key="cheeks">
//   //             <FacialFeature points={LEFT_EYE} color={Colors.blue} />
//   //             <FacialFeature points={RIGHT_EYE} color={Colors.blue} />
//   //           </React.Fragment>
//   //         );
//   //       case 'forehead':
//   //         return (
//   //           <React.Fragment key="forehead">
//   //             <FacialFeature points={LEFT_EYEBROW_TOP} color={Colors.green} />
//   //             <FacialFeature
//   //               points={LEFT_EYEBROW_BOTTOM}
//   //               color={Colors.green}
//   //             />
//   //             <FacialFeature points={RIGHT_EYEBROW_TOP} color={Colors.green} />
//   //             <FacialFeature
//   //               points={RIGHT_EYEBROW_BOTTOM}
//   //               color={Colors.green}
//   //             />
//   //           </React.Fragment>
//   //         );
//   //       case 'eyebrows':
//   //         return (
//   //           <React.Fragment key="eyebrows">
//   //             <FacialFeature points={LEFT_EYEBROW_TOP} color={Colors.green} />
//   //             <FacialFeature
//   //               points={LEFT_EYEBROW_BOTTOM}
//   //               color={Colors.green}
//   //             />
//   //             <FacialFeature points={RIGHT_EYEBROW_TOP} color={Colors.green} />
//   //             <FacialFeature
//   //               points={RIGHT_EYEBROW_BOTTOM}
//   //               color={Colors.green}
//   //             />
//   //           </React.Fragment>
//   //         );
//   //       default:
//   //         return null;
//   //     }
//   //   });
//   // };

//   return (
//     <Svg
//       width="70%"
//       height="70%"
//       style={{
//         position: 'absolute',
//         top: '40%',
//         left: '50%',
//         transform: [
//           {translateX: -faceData.bounds.width / 4},
//           {translateY: -faceData.bounds.height / 4},
//         ],
//       }}
//       viewBox={`${faceData.bounds.x} ${faceData.bounds.y} ${faceData.bounds.width} ${faceData.bounds.height}`}>
//       <G transform={`rotate(90, ${centerX}, ${centerY})`}>
//         {/* Face outline */}
//         <Path d={pathData} stroke={Colors.pink} strokeWidth="2" fill="none" />
//         <ContourPoints points={facePoints} />
//         {/*{renderSelectedFeatures()}*/}
//       </G>
//     </Svg>
//   );
// };

const ImageView = ({route, navigation}) => {
  const {image, faceData} = route.params;
  const [treatmentType, setTreatmentType] = useState('fillers');
  const [selectedArea, setSelectedArea] = useState([]);
  const [fillerSyringes, setFillerSyringes] = useState(1);
  const [dropdownItems, setDropdownItems] = useState(fillerAreas);
  const [selectedFaceParts, setSelectedFaceParts] = useState([]);
  const [selectedSyringe, setSelectedSyringe] = useState(null);
  const [facePartSyringes, setFacePartSyringes] = useState({});
  const [currentFacePart, setCurrentFacePart] = useState(null);
  const [selectedMidfaceSubArea, setSelectedMidfaceSubArea] = useState([]);
  const [selectedLowerfaceSubArea, setSelectedLowerfaceSubArea] = useState([]);
  const [selectedNeckSubArea, setSelectedNeckSubArea] = useState([]);
  const midfaceSubAreas = [
    {label: 'Tear Trough', value: 'tear_trough'},
    {label: 'Cheeks', value: 'cheeks'},
    {label: 'Nasolabial Folds', value: 'nasolabial_folds'},
    {label: 'Prearicular Area', value: 'prearicular'},
  ];

  const lowerfaceSubAreas = [
    {label: 'Lips', value: 'lips'},
    {label: 'Marionette Lines', value: 'marionette_lines'},
    {label: 'Chin Shadow Area', value: 'chin_shadow_area'},
    {label: 'Neck', value: 'neck'},
  ];
  const neckSubAreas = [
    {label: 'Jawline', value: 'jawline'},
    {label: 'Pre-Jowl Sulcus', value: 'pre_jowl_sulcus'},
    {label: 'Neck Lines', value: 'neck_lines'},
  ];

  const totalSyringes = Object.values(facePartSyringes).reduce(
    (sum, count) => sum + count,
    0,
  );

  React.useEffect(() => {
    setDropdownItems(treatmentType === 'fillers' ? fillerAreas : botoxAreas);
    setSelectedArea([]);
  }, [treatmentType, image]);

  const getSyringeOptions = partKey => {
    const max = facePartSyringeLimits[partKey] || 1;
    return Array.from({length: max}, (_, i) => ({
      label: `${i + 1} Syringe`,
      value: i + 1,
    }));
  };

  const handleFacePartSelection = partKey => {
    setSelectedFaceParts(prev => {
      if (prev.includes(partKey)) {
        setFacePartSyringes(prev => {
          const newState = {...prev};
          delete newState[partKey];
          return newState;
        });
        if (currentFacePart === partKey) {
          setCurrentFacePart(null);
          setSelectedSyringe(null);
        }
        return prev.filter(p => p !== partKey);
      } else {
        setFacePartSyringes(prev => ({
          ...prev,
          [partKey]: 1,
        }));
        setCurrentFacePart(partKey);
        setSelectedSyringe(1);
        return [...prev, partKey];
      }
    });
  };

  const handleSyringeChange = value => {
    if (currentFacePart) {
      setFacePartSyringes(prev => ({
        ...prev,
        [currentFacePart]: value,
      }));
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{uri: image}}
        style={styles.imageBackground}
        resizeMode="cover">
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={Colors.white} />
        </TouchableOpacity>
        <View
          style={{
            position: 'absolute',
            top: 90,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1000,
          }}>
          {/* <FaceOutline
            faceData={faceData}
            selectedFaceParts={selectedFaceParts}
          /> */}
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
                      selectedFaceParts.includes(part.key) &&
                        styles.facePartItemSelected,
                    ]}
                    onPress={() => handleFacePartSelection(part.key)}
                    activeOpacity={0.8}>
                    <Image
                      source={require('../../assets/images/appLogo.png')}
                      style={[
                        styles.facePartIcon,
                        selectedFaceParts.includes(part.key) &&
                          styles.facePartIconSelected,
                      ]}
                    />
                    <Text
                      style={[
                        styles.facePartLabel,
                        selectedFaceParts.includes(part.key) &&
                          styles.facePartLabelSelected,
                      ]}>
                      {part.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              {selectedFaceParts.length > 0 && (
                <>
                  <View style={{width: '100%'}}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: Colors.black,
                        marginBottom: 5,
                        fontWeight: '600',
                      }}>
                      {currentFacePart
                        ? fillerFaceParts.find(p => p.key === currentFacePart)
                            ?.label
                        : 'Select Face Part'}
                    </Text>
                    {currentFacePart === 'midface' && (
                      <Dropdown
                        style={[styles.dropdown, {width: '100%'}]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={midfaceSubAreas}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="Select Midface Area"
                        searchPlaceholder="Search..."
                        value={selectedMidfaceSubArea}
                        dropdownPosition="top"
                        multiple={true}
                        onChange={item => {
                          setSelectedMidfaceSubArea(item);
                        }}
                      />
                    )}
                    {currentFacePart === 'lowerface' && (
                      <Dropdown
                        style={[styles.dropdown, {width: '100%'}]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={lowerfaceSubAreas}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="Select Lowerface Area"
                        searchPlaceholder="Search..."
                        value={selectedLowerfaceSubArea}
                        dropdownPosition="top"
                        multiple={true}
                        onChange={item => {
                          setSelectedLowerfaceSubArea(item);
                        }}
                      />
                    )}
                    {currentFacePart === 'jawline_neck' && (
                      <Dropdown
                        style={[styles.dropdown, {width: '100%'}]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={neckSubAreas}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="Select Neck Area"
                        searchPlaceholder="Search..."
                        value={selectedNeckSubArea}
                        dropdownPosition="top"
                        multiple={true}
                        onChange={item => {
                          setSelectedNeckSubArea(item);
                        }}
                      />
                    )}
                    <Dropdown
                      style={[styles.dropdown, {width: '100%'}]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      iconStyle={styles.iconStyle}
                      data={
                        currentFacePart
                          ? getSyringeOptions(currentFacePart)
                          : []
                      }
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder="Select Syringe Count"
                      searchPlaceholder="Search..."
                      value={selectedSyringe}
                      dropdownPosition="bottom"
                      onChange={item => {
                        setSelectedSyringe(item.value);
                        handleSyringeChange(item.value);
                      }}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Colors.black,
                      //marginBottom: 10,
                      fontWeight: 'bold',
                      alignSelf: 'center',
                    }}>
                    Total Syringes: {totalSyringes}
                  </Text>
                </>
              )}
            </>
          ) : (
            <>
              <MultiSelect
                style={[styles.dropdown, {width: '100%'}]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                activeColor={Colors.lightPink}
                iconStyle={styles.iconStyle}
                data={dropdownItems}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select Area"
                searchPlaceholder="Search..."
                value={selectedArea}
                dropdownPosition="top"
                onChange={item => {
                  setSelectedArea(item);
                }}
              />
            </>
          )}
          <Button
            title="PROCEED"
            style={styles.proceedBtn}
            onPress={() => {
              navigation.navigate('ARModalFace', {photoPath: image, contours:faceData.contours});
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
    backgroundColor: '#ffffff',
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '85%',
    justifyContent: 'flex-end',
    //
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
    backgroundColor: 'rgb(255,255,255)',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    alignItems: 'center',
    zIndex: 100,
    //height:370
  },
  dropdown: {
    height: 30,
    borderColor: Colors.bordeColor,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: Colors.white,
    marginBottom: 18,
    marginTop: 5,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    fontSize: 16,
    color: Colors.black,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: Colors.black,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
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
    //marginBottom: 10,
    paddingVertical: 8,
  },
  facePartItem: {
    alignItems: 'center',
    marginHorizontal: 6,
    padding: 4,
    borderRadius: 12,
  },
  facePartItemSelected: {
    backgroundColor: Colors.pink,
    borderWidth: 2,
    borderColor: Colors.black,
  },
  facePartIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginBottom: 2,
    borderWidth: 2,
    borderColor: Colors.bordeColor,
    backgroundColor: Colors.white,
  },
  facePartIconSelected: {
    borderColor: Colors.pink,
    backgroundColor: Colors.lightPink,
  },
  facePartLabel: {
    fontSize: 11,
    color: Colors.black,
    marginTop: 2,
  },
  facePartLabelSelected: {
    color: Colors.white,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'android' ? (StatusBar.currentHeight || 40) + 10 : 57,
    left: 20,
    zIndex: 50,
    backgroundColor: Colors.black,
    padding: 10,
    borderRadius: 20,
  },
});
