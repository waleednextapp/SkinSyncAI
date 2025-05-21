import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
  Modal,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../utils/Colors';
import {FontFamily, Fonts} from '../../utils/Fonts';

const ViewFaceScreen = ({route}) => {
  const {upper, mid, lower} = route.params;
  const [activeButton, setActiveButton] = useState('dermal');
  const [selectedArea, setSelectedArea] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState(null);
  const [dotPositions, setDotPositions] = useState({
    upper: [],
    mid: [],
    lower: [],
  });
  const [selectedBotoxAreas, setSelectedBotoxAreas] = useState([]);
  const [currentDotIndex, setCurrentDotIndex] = useState({
    upper: 0,
    mid: 0,
    lower: 0,
  });

  const dermalFillersInfo = {
    upper: {
      title: 'Upper Face',
      areas: [
        {
          name: 'Temples',
          description: 'Volume loss correction',
          coordinates: {x: 0.2, y: 0.3},
        },
      ],
    },
    mid: {
      title: 'Mid Face',
      areas: [
        {
          name: 'Tear Trough',
          description: 'Under eye hollows',
          coordinates: {x: 0.3, y: 0.4},
        },
        {
          name: 'Cheeks/Midface',
          description: 'Malar area for lifting and contour',
          coordinates: {x: 0.5, y: 0.4},
        },
        {
          name: 'Nasolabial Folds',
          description: 'Lines from the nose to the corners of the mouth',
          coordinates: {x: 0.4, y: 0.6},
        },
        {
          name: 'Prearicular Area',
          description: 'In front of the ears for support and contour',
          coordinates: {x: 0.7, y: 0.5},
        },
      ],
    },
    lower: {
      title: 'Lower Face',
      areas: [
        {
          name: 'Lips',
          description: 'For definition',
          coordinates: {x: 0.5, y: 0.7},
        },
        {
          name: 'Marionette Lines',
          description: 'Lines from the corners of the mouth downwards',
          coordinates: {x: 0.4, y: 0.8},
        },
        {
          name: 'Chin',
          description: 'Projection, contour, lengthening of the face',
          coordinates: {x: 0.5, y: 0.9},
        },
        {
          name: 'Chin Shadow Area',
          description: 'Filling the hollow underneath the chin for smoother contour',
          coordinates: {x: 0.5, y: 0.95},
        },
      ],
    },
  };

  const botoxInfo = {
    upper: {
      title: 'Upper Face',
      areas: [
        {
          name: 'Forehead Lines',
          description: 'Horizontal lines across the forehead',
          coordinates: {x: 0.5, y: 0.2},
        },
        {
          name: 'Glabella Lines',
          description: 'Frown lines, 11\'s between the eyebrows',
          coordinates: {x: 0.5, y: 0.3},
        },
        {
          name: 'Eyebrow Lift',
          description: 'Used to open the eyes and create a subtle brow lift',
          coordinates: {x: 0.5, y: 0.25},
        },
        {
          name: 'Crows Feet',
          description: 'Lines on the outer corners of the eyes',
          coordinates: {x: 0.3, y: 0.3},
        },
      ],
    },
    mid: {
      title: 'Mid Face',
      areas: [
        {
          name: 'Bunny Lines',
          description: 'Nose wrinkles when scrunching',
          coordinates: {x: 0.5, y: 0.4},
        },
        {
          name: 'Under-Eye Jelly Roll',
          description: 'Small bulge under eyes when smiling- softens puffiness',
          coordinates: {x: 0.5, y: 0.45},
        },
        {
          name: 'Nasal Tip Lift',
          description: 'Prevent nasal tip drooping when smiling',
          coordinates: {x: 0.5, y: 0.5},
        },
        {
          name: 'Nose Flare Reduction',
          description: 'Relaxes nostril muscles',
          coordinates: {x: 0.5, y: 0.55},
        },
      ],
    },
    lower: {
      title: 'Lower Face',
      areas: [
        {
          name: 'Gummy Smile',
          description: 'Upper lip lifts too high when smiling- treat muscle to lower the lip',
          coordinates: {x: 0.5, y: 0.6},
        },
        {
          name: 'Lip Flip',
          description: 'Used to roll the lip outward for a full look to the lips',
          coordinates: {x: 0.5, y: 0.65},
        },
        {
          name: 'Perioral Lines',
          description: 'Smokers lines around the mouth',
          coordinates: {x: 0.5, y: 0.7},
        },
        {
          name: 'Downturned Mouth Corners',
          description: 'DAO Muscle- lifts corners of the mouth',
          coordinates: {x: 0.4, y: 0.75},
        },
        {
          name: 'Chin Dimpling',
          description: 'Cobblestone appearance, relaxed with BOTOX -mentalis muscle',
          coordinates: {x: 0.5, y: 0.8},
        },
      ],
    },
  };

  const handleImagePress = (section, event) => {
    const { locationX, locationY } = event.nativeEvent;
    const currentIndex = currentDotIndex[section];
    const areas = activeButton === 'botox' ? botoxInfo[section].areas : dermalFillersInfo[section].areas;
    
    // Check if we've reached the maximum number of dots for this section
    if (currentIndex >= areas.length) return;

    setDotPositions(prev => ({
      ...prev,
      [section]: [...prev[section], { x: locationX, y: locationY }]
    }));

    setCurrentDotIndex(prev => ({
      ...prev,
      [section]: prev[section] + 1
    }));

    // If it's dermal fillers, show the modal with area info
    if (activeButton === 'dermal') {
      setSelectedArea(section);
      setSelectedInfo(areas[currentIndex]);
      setModalVisible(true);
    }
  };

  const handleDotPress = (section, area) => {
    if (activeButton === 'botox') {
      setSelectedBotoxAreas(prev => {
        const areaKey = `${section}-${area.name}`;
        if (prev.includes(areaKey)) {
          return prev.filter(key => key !== areaKey);
        } else {
          return [...prev, areaKey];
        }
      });
    } else {
      setSelectedArea(section);
      setSelectedInfo(area);
      setModalVisible(true);
    }
  };

  const renderDots = (section) => {
    const positions = dotPositions[section];
    if (!positions || positions.length === 0) return null;

    const areas = activeButton === 'botox' ? botoxInfo[section].areas : dermalFillersInfo[section].areas;
    
    return positions.map((position, index) => {
      const area = areas[index];
      const isSelected = activeButton === 'botox' && 
        selectedBotoxAreas.includes(`${section}-${area.name}`);

      return (
        <TouchableOpacity
          key={index}
          style={[
            styles.dot,
            {
              left: position.x - 9,
              top: position.y - 9,
            },
            isSelected && styles.selectedDot,
          ]}
          onPress={() => handleDotPress(section, area)}>
          <View style={[styles.dotInner, isSelected && styles.selectedDotInner]} />
        </TouchableOpacity>
      );
    });
  };

  const resetDots = (section) => {
    setDotPositions(prev => ({
      ...prev,
      [section]: []
    }));
    setCurrentDotIndex(prev => ({
      ...prev,
      [section]: 0
    }));
  };

  // Add reset buttons to each section
  const renderResetButton = (section) => {
    const positions = dotPositions[section];
    if (!positions || positions.length === 0) return null;

    return (
      <TouchableOpacity
        style={styles.resetButton}
        onPress={() => resetDots(section)}>
        <Text style={styles.resetButtonText}>Reset Dots</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.safeArea, {backgroundColor: Colors.white}]}>
      <ScrollView 
        style={[styles.container, {backgroundColor: Colors.white}]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          {/* <Text style={[styles.headerText, {color: Colors.headinglight}]}>
            Choose One
          </Text> */}
          
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: Colors.btnColor,
                borderColor: Colors.lightBorderColor,
              },
              activeButton === 'dermal' && {
                backgroundColor: Colors.pink,
                borderColor: Colors.pink,
                shadowColor: Colors.pink,
              },
            ]}
            onPress={() => {
              setActiveButton('dermal');
              setSelectedBotoxAreas([]);
            }}>
            <Text
              style={[
                styles.buttonText,
                {color: Colors.lightColor},
                activeButton === 'dermal' && {color: Colors.white},
              ]}>
              Dermal Fillers
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: Colors.btnColor,
                borderColor: Colors.lightBorderColor,
              },
              activeButton === 'botox' && {
                backgroundColor: Colors.pink,
                borderColor: Colors.pink,
                shadowColor: Colors.pink,
              },
            ]}
            onPress={() => {
              setActiveButton('botox');
              setSelectedBotoxAreas([]);
            }}>
            <Text
              style={[
                styles.buttonText,
                {color: Colors.lightColor},
                activeButton === 'botox' && {color: Colors.white},
              ]}>
              Botox
            </Text>
          </TouchableOpacity>

          
        </View>

        <View style={styles.imagesContainer}>
        <Text style={styles.subHeaderText}>
            {activeButton === 'dermal' 
              ? 'Tap on pictures below at spots you want to treat with Dermal Fillers'
              : 'Tap on pictures below at spots you want to treat with Botox'}
          </Text>
          <View style={styles.imageWrapper}>
            <View style={styles.imageLabelContainer}>
              <Text style={styles.imageLabel}>Upper Face Marking</Text>
              <Text style={styles.imageSubLabel}>
                {activeButton === 'dermal' ? 'Temples area' : 'Forehead and eye area'}
              </Text>
              {renderResetButton('upper')}
            </View>
            <View
              style={styles.imageContainer}
              onStartShouldSetResponder={() => true}
              onResponderRelease={(event) => handleImagePress('upper', event)}>
              <Image
                source={{uri: upper}}
                style={styles.image}
                resizeMode="cover"
              />
              {renderDots('upper')}
            </View>
          </View>

          <View style={styles.imageWrapper}>
            <View style={styles.imageLabelContainer}>
              <Text style={styles.imageLabel}>Mid Face Marking</Text>
              <Text style={styles.imageSubLabel}>
                {activeButton === 'dermal' ? 'Cheeks and surrounding areas' : 'Nose and mid-face area'}
              </Text>
              {renderResetButton('mid')}
            </View>
            <View
              style={styles.imageContainer}
              onStartShouldSetResponder={() => true}
              onResponderRelease={(event) => handleImagePress('mid', event)}>
              <Image
                source={{uri: mid}}
                style={styles.image}
                resizeMode="cover"
              />
              {renderDots('mid')}
            </View>
          </View>

          <View style={styles.imageWrapper}>
            <View style={styles.imageLabelContainer}>
              <Text style={styles.imageLabel}>Lower Face Marking</Text>
              <Text style={styles.imageSubLabel}>
                {activeButton === 'dermal' ? 'Jawline and chin area' : 'Mouth and chin area'}
              </Text>
              {renderResetButton('lower')}
            </View>
            <View
              style={styles.imageContainer}
              onStartShouldSetResponder={() => true}
              onResponderRelease={(event) => handleImagePress('lower', event)}>
              <Image
                source={{uri: lower}}
                style={styles.image}
                resizeMode="cover"
              />
              {renderDots('lower')}
            </View>
          </View>
        </View>

        {activeButton === 'botox' && selectedBotoxAreas.length > 0 && (
          <View style={styles.selectedAreasContainer}>
            <Text style={styles.selectedAreasTitle}>Selected Areas:</Text>
            {selectedBotoxAreas.map((areaKey, index) => {
              const [section, name] = areaKey.split('-');
              return (
                <Text key={index} style={styles.selectedAreaText}>
                  • {name}
                </Text>
              );
            })}
          </View>
        )}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{selectedInfo?.name}</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButtonText}>×</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.modalDescription}>
              {selectedInfo?.description}
            </Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ViewFaceScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  headerContainer: {
    marginBottom: 24,
  },
  headerText: {
    fontSize: 32,
    fontFamily: FontFamily.semiBold,
    marginBottom: 8,
  },
  subHeaderText: {
    fontSize: 16,
    fontFamily: FontFamily.regular,
    color: Colors.lightColor,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    gap: 12,
    marginBottom: 32,
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: FontFamily.semiBold,
  },
  imagesContainer: {
    gap: 40,
    paddingBottom: 40,
  },
  imageWrapper: {
    gap: 12,
  },
  imageLabelContainer: {
    gap: 4,
  },
  imageLabel: {
    fontSize: 22,
    fontFamily: FontFamily.semiBold,
    color: Colors.headinglight,
  },
  imageSubLabel: {
    fontSize: 14,
    fontFamily: FontFamily.regular,
    color: Colors.lightColor,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    aspectRatio: 1,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: Colors.lightestPink,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 8,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  dot: {
    position: 'absolute',
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{translateX: -9}, {translateY: -9}],
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  dotInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.pink,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: 24,
    width: '85%',
    maxWidth: 400,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 12,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: FontFamily.semiBold,
    color: Colors.headinglight,
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 28,
    color: Colors.lightColor,
  },
  modalDescription: {
    fontSize: 16,
    fontFamily: FontFamily.regular,
    color: Colors.lightColor,
    lineHeight: 24,
  },
  selectedDot: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderWidth: 2,
    borderColor: Colors.pink,
  },
  selectedDotInner: {
    backgroundColor: Colors.pink,
  },
  selectedAreasContainer: {
    marginTop: 24,
    padding: 20,
    backgroundColor: Colors.lightestPink,
    borderRadius: 16,
    marginHorizontal: 10,
  },
  selectedAreasTitle: {
    fontSize: 18,
    fontFamily: FontFamily.semiBold,
    color: Colors.headinglight,
    marginBottom: 12,
  },
  selectedAreaText: {
    fontSize: 16,
    fontFamily: FontFamily.regular,
    color: Colors.lightColor,
    marginBottom: 8,
  },
  resetButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: Colors.pink,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  resetButtonText: {
    color: Colors.white,
    fontSize: 12,
    fontFamily: FontFamily.medium,
  },
});
