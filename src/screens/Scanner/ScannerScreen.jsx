import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  PermissionsAndroid,
  Platform,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useFrameProcessor,
  VisionCameraProxy,
} from 'react-native-vision-camera';
import {
  Face,
  runAsync,
  useFaceDetector,
  FaceDetectionOptions,
} from 'react-native-vision-camera-face-detector';
import {runOnJS} from 'react-native-reanimated';
import * as Animatable from 'react-native-animatable';
import {Worklets} from 'react-native-worklets-core';
import {Colors} from '../../utils/Colors';
import {useNavigation} from '@react-navigation/native';

export default function FaceAngleCapture() {
  const navigation = useNavigation();
  const cameraRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [captured, setCaptured] = useState({
    upper: null,
    mid: null,
    lower: null,
  });
  const [countdown, setCountdown] = useState(null);
  const [currentStep, setCurrentStep] = useState(null);
  const [landmarks, setLandmarks] = useState(null);
  const [contour, setContour] = useState(null);
  const [isCounting, setIsCounting] = useState(false);
  const [frameProcessingEnabled, setFrameProcessingEnabled] = useState(true);
  const device = useCameraDevice('front');
  const [facePosition, setFacePosition] = useState(null);

  const detectFaces = useFaceDetector({
    landmarkMode: 'all',
    classificationMode: 'all',
    contourMode: 'all',
  });

  useEffect(() => {
    const requestPermission = async () => {
      try {
        const status = await Camera.requestCameraPermission();
        if (status === 'granted') {
          setHasPermission(status);
        } else {
          console.warn('Camera permission denied:', status);
          Alert.alert(
            'Permission Required',
            'Camera permission is required to use this feature',
          );
        }
      } catch (error) {
        console.error('Permission request error:', error);
        Alert.alert('Error', 'Failed to request camera permission');
      }
    };
    requestPermission();

    return () => {
      setIsActive(false);
    };
  }, []);

  const runStartCountdown = Worklets.createRunOnJS((step) => startCountdown(step));

  const startCountdown = (step) => {
    if (isCounting || captured[step]) return;

    setIsCounting(true);
    setCurrentStep(step);
    let seconds = 3;

    const countdownInterval = setInterval(() => {
      setCountdown(seconds.toString());
      seconds--;

      if (seconds < 0) {
        clearInterval(countdownInterval);
        setCountdown(null);
        capturePhoto(step);
        setIsCounting(false);
      }
    }, 800);
  };

  const runDisableFrameProcessing = Worklets.createRunOnJS(() =>
    setFrameProcessingEnabled(false),
  );
  const setLandmarksWorklet = Worklets.createRunOnJS(setLandmarks);
  const setContourWorklet = Worklets.createRunOnJS(setContour);
  const setFrameProcessingEnabledWorklet = Worklets.createRunOnJS(
    setFrameProcessingEnabled,
  );
  const setFacePositionWorklet = Worklets.createRunOnJS(setFacePosition);

  const frameProcessor = useFrameProcessor(
    frame => {
      'worklet';

      const faces = detectFaces.detectFaces(frame);
      if (!frameProcessingEnabled || faces.length === 0 || isCounting) return;

      const face = faces[0];
      if (!face) return;

      const yaw = face.yawAngle;

      // Get face bounds from landmarks
      let faceCenterX, faceCenterY, faceHeight;
      if (face.landmarks && face.landmarks.length > 0) {
        const leftmost = Math.min(...face.landmarks.map(l => l.x));
        const rightmost = Math.max(...face.landmarks.map(l => l.x));
        const topmost = Math.min(...face.landmarks.map(l => l.y));
        const bottommost = Math.max(...face.landmarks.map(l => l.y));

        faceCenterX = (leftmost + rightmost) / 2;
        faceCenterY = (topmost + bottommost) / 2;
        faceHeight = bottommost - topmost;
      } else {
        faceCenterX = frame.width / 2;
        faceCenterY = frame.height / 2;
        faceHeight = frame.height * 0.5;
      }

      // Calculate if face is within the oval
      const ovalCenterX = frame.width / 2;
      const ovalCenterY = frame.height / 2;
      const ovalWidth = frame.width * 0.7;
      const ovalHeight = frame.height * 0.5;

      const normalizedX = (faceCenterX - ovalCenterX) / (ovalWidth / 2);
      const normalizedY = (faceCenterY - ovalCenterY) / (ovalHeight / 2);
      const isInOval = normalizedX * normalizedX + normalizedY * normalizedY <= 1;

      setFacePositionWorklet({
        x: faceCenterX,
        y: faceCenterY,
        isInOval,
      });

      // Determine which part of the face to capture based on face position
      if (isInOval && yaw > -10 && yaw < 10) {
        const faceTop = faceCenterY - faceHeight / 2;
        const faceBottom = faceCenterY + faceHeight / 2;
        const frameHeight = frame.height;

        if (!captured.upper && faceTop > frameHeight * 0.2 && faceTop < frameHeight * 0.4) {
          setLandmarksWorklet(face.landmarks);
          setContourWorklet(face.contours);
          setFrameProcessingEnabledWorklet(false);
          runStartCountdown('upper');
        } else if (!captured.mid && faceCenterY > frameHeight * 0.4 && faceCenterY < frameHeight * 0.6) {
          setLandmarksWorklet(face.landmarks);
          setContourWorklet(face.contours);
          setFrameProcessingEnabledWorklet(false);
          runStartCountdown('mid');
        } else if (!captured.lower && faceBottom > frameHeight * 0.6 && faceBottom < frameHeight * 0.8) {
          setLandmarksWorklet(face.landmarks);
          setContourWorklet(face.contours);
          setFrameProcessingEnabledWorklet(false);
          runStartCountdown('lower');
        }
      }
    },
    [captured, isCounting, frameProcessingEnabled],
  );

  const capturePhoto = async (step) => {
    if (!cameraRef.current || captured[step]) return;
    try {
      const photo = await cameraRef.current.takePhoto({
        qualityPrioritization: 'balanced',
        skipMetadata: false,
      });
      setCaptured(prev => ({...prev, [step]: photo.path}));
      setFrameProcessingEnabled(true);
    } catch (err) {
      console.warn('Capture error:', err);
    }
  };

  const resetCapture = () => {
    setFrameProcessingEnabled(true);
    setCaptured({upper: null, mid: null, lower: null});
    setCountdown(null);
    setIsCounting(false);
    setCurrentStep(null);
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
        <Image
          source={require('../../assets/gif/face-scan-pink.gif')}
          style={styles.scanGif}
          resizeMode="contain"
        />
      </View>

      <Animatable.View
        animation="fadeInDown"
        delay={1000}
        style={[
          styles.instructions,
          currentStep && styles.activeInstructions,
        ]}>
        <Text style={[styles.instructionText, styles.instructionTitle]}>
          {currentStep === 'upper' && 'Step 1: Capture Forehead'}
          {currentStep === 'mid' && 'Step 2: Capture Mid-Face'}
          {currentStep === 'lower' && 'Step 3: Capture Lower Face'}
          {!currentStep && 'Position your face within the oval'}
        </Text>
        <Text style={styles.instructionText}>
          {currentStep === 'upper' && 'Position your forehead in the highlighted area'}
          {currentStep === 'mid' && 'Position your mid-face in the highlighted area'}
          {currentStep === 'lower' && 'Position your lower face in the highlighted area'}
          {!currentStep && 'Detected face will auto-capture after countdown.'}
        </Text>
      </Animatable.View>

      <View style={styles.progressContainer}>
        {['upper', 'mid', 'lower'].map(step => (
          <Animatable.View
            key={step}
            animation={captured[step] ? 'pulse' : undefined}
            iterationCount="infinite"
            duration={captured[step] ? 700 : 0}
            style={[
              styles.progressDot,
              {backgroundColor: captured[step] ? '#4CAF50' : '#999'},
              currentStep === step && styles.activeProgressDot,
            ]}>
            <Text style={[
              styles.progressLabel,
              currentStep === step && styles.activeProgressLabel
            ]}>
              {captured[step] ? `${step} Captured` : `Capture ${step}`}
            </Text>
          </Animatable.View>
        ))}
      </View>

      <View style={styles.thumbnails}>
        {['upper', 'mid', 'lower'].map(step =>
          captured[step] ? (
            <View key={step} style={styles.thumbnailContainer}>
              <Animatable.Image
                animation="fadeIn"
                duration={600}
                source={{uri: `file://${captured[step]}`}}
                style={styles.thumbnail}
              />
              {contour && (
                <View style={styles.contourOverlay}>
                  {/* Face outline dots */}
                  {contour.FACE?.map((point, index) => (
                    <View
                      key={`face-${index}`}
                      style={[
                        styles.contourDot,
                        {
                          left: `${(point.x / 1500) * 100}%`,
                          top: `${(point.y / 800) * 100}%`,
                        },
                      ]}
                    />
                  ))}
                  
                  {/* Eyebrows */}
                  {contour.LEFT_EYEBROW_TOP?.map((point, index) => (
                    <View
                      key={`left-eyebrow-${index}`}
                      style={[
                        styles.contourDot,
                        styles.eyebrowDot,
                        {
                          left: `${(point.x / 1500) * 100}%`,
                          top: `${(point.y / 800) * 100}%`,
                        },
                      ]}
                    />
                  ))}
                  {contour.RIGHT_EYEBROW_TOP?.map((point, index) => (
                    <View
                      key={`right-eyebrow-${index}`}
                      style={[
                        styles.contourDot,
                        styles.eyebrowDot,
                        {
                          left: `${(point.x / 1500) * 100}%`,
                          top: `${(point.y / 800) * 100}%`,
                        },
                      ]}
                    />
                  ))}

                  {/* Eyes */}
                  {contour.LEFT_EYE?.map((point, index) => (
                    <View
                      key={`left-eye-${index}`}
                      style={[
                        styles.contourDot,
                        styles.eyeDot,
                        {
                          left: `${(point.x / 1500) * 100}%`,
                          top: `${(point.y / 800) * 100}%`,
                        },
                      ]}
                    />
                  ))}
                  {contour.RIGHT_EYE?.map((point, index) => (
                    <View
                      key={`right-eye-${index}`}
                      style={[
                        styles.contourDot,
                        styles.eyeDot,
                        {
                          left: `${(point.x / 1500) * 100}%`,
                          top: `${(point.y / 800) * 100}%`,
                        },
                      ]}
                    />
                  ))}

                  {/* Nose */}
                  {contour.NOSE_BRIDGE?.map((point, index) => (
                    <View
                      key={`nose-${index}`}
                      style={[
                        styles.contourDot,
                        styles.noseDot,
                        {
                          left: `${(point.x / 1500) * 100}%`,
                          top: `${(point.y / 800) * 100}%`,
                        },
                      ]}
                    />
                  ))}

                  {/* Lips */}
                  {contour.UPPER_LIP_TOP?.map((point, index) => (
                    <View
                      key={`upper-lip-${index}`}
                      style={[
                        styles.contourDot,
                        styles.lipDot,
                        {
                          left: `${(point.x / 1500) * 100}%`,
                          top: `${(point.y / 800) * 100}%`,
                        },
                      ]}
                    />
                  ))}
                  {contour.LOWER_LIP_BOTTOM?.map((point, index) => (
                    <View
                      key={`lower-lip-${index}`}
                      style={[
                        styles.contourDot,
                        styles.lipDot,
                        {
                          left: `${(point.x / 1500) * 100}%`,
                          top: `${(point.y / 800) * 100}%`,
                        },
                      ]}
                    />
                  ))}
                </View>
              )}
              <TouchableOpacity 
                style={styles.recaptureButton}
                onPress={() => {
                  setCaptured(prev => ({...prev, [step]: null}));
                  setFrameProcessingEnabled(true);
                }}
              >
                <Text style={styles.recaptureText}>Re-capture</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View key={step} style={[styles.thumbnail, styles.placeholder]}>
              <Text style={styles.placeholderText}>{step} Image</Text>
            </View>
          ),
        )}
      </View>

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
          style={styles.resetButton}
          onPress={() => {
            console.log('Back button pressed');
            navigation.goBack();
          }}>
          <Text style={styles.resetText}>Exit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resetButton} onPress={resetCapture}>
          <Text style={styles.resetText}>🔄 Re-Capture</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.resetButton]}
          onPress={() => {
            console.log('Next button pressed', contour);
            // if (captured.upper && captured.mid && captured.lower) {
            //   navigation.navigate('ARModalFace', {
            //     photos: captured,
            //     landmarks: landmarks,
            //     contours: contour,
            //   });
            // } else {
            //   Alert.alert('Incomplete', 'Please capture all face parts first');
            // }
          }}>
          <Text style={styles.resetText}>Next</Text>
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
  progressContainer: {
    position: 'absolute',
    top: 130,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    gap: 10,
  },
  progressDot: {
    width: 120,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  progressLabel: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  thumbnails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: '#111',
    height: 220,
    resizeMode: 'contain',
  },
  thumbnail: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
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
  },
  resetButton: {
    backgroundColor: '#333',
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 10,
  },
  resetText: {
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
    width: 350,
    height: 450,
    borderRadius: 100,
    bottom: 320,
  },
  highlightOverlay: {
    position: 'absolute',
    width: 350,
    height: 150,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: '#FF69B4',
    backgroundColor: 'rgba(255, 105, 180, 0.2)',
    shadowColor: '#FF69B4',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  upperHighlight: {
    top: 50,
  },
  midHighlight: {
    top: 150,
  },
  lowerHighlight: {
    top: 250,
  },
  activeInstructions: {
    backgroundColor: '#000000cc',
    borderWidth: 2,
    borderColor: '#FF69B4',
  },
  instructionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#FF69B4',
  },
  activeProgressDot: {
    borderWidth: 2,
    borderColor: '#FF69B4',
    transform: [{scale: 1.1}],
  },
  activeProgressLabel: {
    color: '#FF69B4',
    fontWeight: 'bold',
  },
  thumbnailContainer: {
    flex: 1,
    position: 'relative',
    marginHorizontal: 5,
  },
  captureHighlight: {
    position: 'absolute',
    width: '100%',
    height: '33%',
    borderWidth: 2,
    borderColor: '#FF69B4',
    backgroundColor: 'rgba(255, 105, 180, 0.2)',
  },
  upperCaptureHighlight: {
    top: 0,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  midCaptureHighlight: {
    top: '33%',
  },
  lowerCaptureHighlight: {
    bottom: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  recaptureButton: {
    position: 'absolute',
    bottom: 5,
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#FF69B4',
  },
  recaptureText: {
    color: '#FF69B4',
    fontSize: 12,
    fontWeight: 'bold',
  },
  contourOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  contourDot: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#FF69B4',
    transform: [{translateX: -2}, {translateY: -2}],
  },
  eyebrowDot: {
    backgroundColor: '#FFD700',
    width: 3,
    height: 3,
  },
  eyeDot: {
    backgroundColor: '#00FF00',
    width: 3,
    height: 3,
  },
  noseDot: {
    backgroundColor: '#FF4500',
    width: 3,
    height: 3,
  },
  lipDot: {
    backgroundColor: '#FF1493',
    width: 3,
    height: 3,
  },
});
