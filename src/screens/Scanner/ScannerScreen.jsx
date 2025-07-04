import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useFrameProcessor,
} from 'react-native-vision-camera';
import {
  useFaceDetector,
} from 'react-native-vision-camera-face-detector';
import * as Animatable from 'react-native-animatable';
import {Worklets} from 'react-native-worklets-core';
import {Colors} from '../../utils/Colors';
import {useNavigation} from '@react-navigation/native';
import { VectorIcon } from '../../icons';

export default function FaceAngleCapture() {
  const navigation = useNavigation();
  const cameraRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [captured, setCaptured] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [isCounting, setIsCounting] = useState(false);
  const [frameProcessingEnabled, setFrameProcessingEnabled] = useState(true);
  const [faceData, setFaceData] = useState(false);
  const device = useCameraDevice('front');

  const detectFaces = useFaceDetector({
    landmarkMode: 'all',
    classificationMode: 'all',
    contourMode: 'all',
  });

  const runSetFaceData = Worklets.createRunOnJS((data) => {
    setFaceData(data);
  });


  useEffect(() => {
    const requestPermission = async () => {
      try {
        const status = await Camera.requestCameraPermission();
        if (status === 'granted') {
          setHasPermission(status);
        } else {
          Alert.alert(
            'Permission Required',
            'Camera permission is required to use this feature',
          );
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to request camera permission');
      }
    };
    requestPermission();

    return () => {
      setIsActive(false);
    };
  }, []);

  const runStartCountdown = Worklets.createRunOnJS(() => startCountdown());

  const startCountdown = () => {
    if (isCounting || captured) return;

    setIsCounting(true);
    let seconds = 3;

    const countdownInterval = setInterval(() => {
      setCountdown(seconds.toString());
      seconds--;

      if (seconds < 0) {
        clearInterval(countdownInterval);
        setCountdown(null);
        capturePhoto();
        setIsCounting(false);
      }
    }, 800);
  };

  const runDisableFrameProcessing = Worklets.createRunOnJS(() =>
    setFrameProcessingEnabled(false),
  );
  const setFrameProcessingEnabledWorklet = Worklets.createRunOnJS(
    setFrameProcessingEnabled,
  );

  const frameProcessor = useFrameProcessor(
    frame => {
      'worklet';

      const faces = detectFaces.detectFaces(frame);
      if (!frameProcessingEnabled || faces.length === 0 || isCounting) return;

      const face = faces[0];
      if (!face) return;

      const yaw = face.yawAngle;
      const contour = face.contours;
      runSetFaceData(face);
      //console.log('contour', contour);

      // Get face bounds from landmarks
      let faceCenterX, faceCenterY;
      if (face.landmarks && face.landmarks.length > 0) {
        const leftmost = Math.min(...face.landmarks.map(l => l.x));
        const rightmost = Math.max(...face.landmarks.map(l => l.x));
        const topmost = Math.min(...face.landmarks.map(l => l.y));
        const bottommost = Math.max(...face.landmarks.map(l => l.y));

        faceCenterX = (leftmost + rightmost) / 2;
        faceCenterY = (topmost + bottommost) / 2;
      } else {
        faceCenterX = frame.width / 2;
        faceCenterY = frame.height / 2;
      }

      // Calculate if face is within the oval
      const ovalCenterX = frame.width / 2;
      const ovalCenterY = frame.height / 2;
      const ovalWidth = frame.width * 0.7;
      const ovalHeight = frame.height * 0.5;

      const normalizedX = (faceCenterX - ovalCenterX) / (ovalWidth / 2);
      const normalizedY = (faceCenterY - ovalCenterY) / (ovalHeight / 2);
      const isInOval =
        normalizedX * normalizedX + normalizedY * normalizedY <= 1;

      // Take picture when face is centered and straight
      if (isInOval && yaw > -10 && yaw < 10) {
        setFrameProcessingEnabledWorklet(false);
        runStartCountdown();
      }
    },
    [captured, isCounting, frameProcessingEnabled],
  );

  const capturePhoto = async () => {
    if (!cameraRef.current || captured) return;
    try {
      const photo = await cameraRef.current.takePhoto({
        qualityPrioritization: 'balanced',
        skipMetadata: false,
      });
      setCaptured(photo.path);
      setFrameProcessingEnabled(true);
    } catch (err) {
      console.warn('Capture error:', err);
    }
  };

  const resetCapture = () => {
    setIsActive(true);
    setFrameProcessingEnabled(true);
    setCaptured(null);
    setCountdown(null);
    setIsCounting(false);
  };

  if (!device || !hasPermission) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading Camera...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        device={device}
        isActive={isActive}
        photo={true}
        frameProcessor={frameProcessor}
      />

      <View style={styles.ovalOverlay}>
        {!captured? (
        <Image
          source={require('../../assets/gif/face-scan-pink.gif')}
          style={styles.scanGif}
          resizeMode="contain"
        />
        ) : (<View></View>)}
      </View>

      <Animatable.View
        animation="fadeInDown"
        delay={1000}
        style={[styles.instructions, captured && styles.activeInstructions]}>
        <Text style={[styles.instructionText, styles.instructionTitle]}>
          {captured ? 'Photo Captured' : 'Position your face within the oval'}
        </Text>
        <Text style={styles.instructionText}>
          {captured
            ? 'You can proceed or take another photo'
            : 'Keep your face straight and centered'}
        </Text>
      </Animatable.View>

     
        {captured ? (
           <View style={styles.thumbnailContainer}>
          <Animatable.Image
            animation="fadeIn"
            duration={600}
            source={{uri: `file://${captured}`}}
            style={styles.thumbnail}
          />
           </View>
        ) : (
          <></>
          // <View style={[styles.thumbnail, styles.placeholder]}>
          //   <Text style={styles.placeholderText}>No Image Captured</Text>
          // </View>
        )}
     

      {countdown && (
        <Animatable.Text
          key={countdown}
          animation="zoomIn"
          duration={600}
          style={styles.countdownText}>
          {countdown}
        </Animatable.Text>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Exit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={resetCapture}>
          <VectorIcon name="refresh" size={20} color="white" type="Ionicons" />
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (captured) {
              setIsActive(false);
              navigation.navigate('ImageView', {image: captured, faceData: faceData});
            } else {
              Alert.alert('No Photo', 'Please capture a photo first');
            }
          }}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'black'},
  camera: {flex: 1},
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  loadingText: {color: 'white', fontSize: 18},
  instructions: {
    position: 'absolute',
    top: 50,
    alignSelf: 'center',
    backgroundColor: '#00000088',
    padding: 10,
    borderRadius: 8,
  },
  instructionText: {color: 'white', fontSize: 16, textAlign: 'center'},
  instructionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#FF69B4',
  },
  thumbnailContainer: {
    position: 'absolute',
    bottom: 70,
    left: '33%',
    right: 0,
    height: 150,
    //padding: 15,
    width:150,
    backgroundColor: '#111',
    borderRadius:20
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    //borderRadius: 8,
    resizeMode: 'contain',
  },
  placeholder: {
    backgroundColor: Colors.glowSkin,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {color: '#fff', fontWeight: 'bold'},
  countdownText: {
    position: 'absolute',
    top: '40%',
    alignSelf: 'center',
    fontSize: 80,
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: '#000000aa',
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  button: {
    backgroundColor: Colors.headinglight,
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  ovalOverlay: {
    position: 'absolute',
    top: -250,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanGif: {
    position: 'absolute',
    width: 320,
    bottom: 280,
  },
  activeInstructions: {
    backgroundColor: '#000000cc',
    borderWidth: 2,
    borderColor: '#FF69B4',
  },
});
