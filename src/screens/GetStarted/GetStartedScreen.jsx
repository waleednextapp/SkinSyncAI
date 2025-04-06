import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  StatusBar,
  Modal,
  TouchableOpacity,
} from 'react-native';
import Button from '../../components/Button';
import {Colors} from '../../utils/Colors';
import {Apple, Close} from '../../icons';
import {useNavigation} from '@react-navigation/native';
import {FontFamily} from '../../utils/Fonts';
const GetStartedScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <ImageBackground
        source={require('../../assets/images/onBoardingImg.png')} // Replace with your image path
        style={styles.image}>
        <View style={styles.textContainer}></View>
        <View style={styles.titleNBrnMain}>
          <Text style={styles.title}>
            Your Journey to <Text style={styles.highlight}>Glowing Skin</Text>{' '}
            Starts Here!
          </Text>
          <Button
            title="Get Started!"
            loading={false}
            onPress={() => setModalVisible(true)}
            style={{marginBottom: 15}}
          />
        </View>
      </ImageBackground>

      {/* Modal Popup */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}>
              <Close size={16} color={Colors.crossColor} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Get Started</Text>
            <Text style={styles.modalSubtitle}>
              Lorem ipsum dolor sit amet consectetur Ut consectetur mauris
              tellus ultrices.
            </Text>

            <Button
              title="Continue With Phone"
              loading={false}
              onPress={() => setModalVisible(true)}
              style={styles.btnStyle}
              textStyle={styles.btnTextStyle}
            />

            <Button
              title="Continue With Email"
              loading={false}
              onPress={() => {
                navigation.navigate('Email');
                setModalVisible(false);
              }}
              style={[styles.btnStyle, {backgroundColor: Colors.btnColor}]}
              textStyle={[styles.btnTextStyle, {color: Colors.black}]}
            />
            <View style={styles.socialIcons}>
              <Button
                image={require('../../assets/images/google.png')}
                imageStyle={{width: 32, height: 32, resizeMode: 'contain'}}
                loading={false}
                onPress={() => setModalVisible(true)}
                style={[
                  styles.btnStyle,
                  {width: '49%', backgroundColor: Colors.btnColor},
                ]}
              />

              <Button
                icon={<Apple size={30} />}
                loading={false}
                onPress={() => setModalVisible(true)}
                style={[
                  styles.btnStyle,
                  {width: '49%', backgroundColor: Colors.btnColor},
                ]}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 100,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  title: {
    fontSize: 40,
    fontFamily: FontFamily.semiBold,
    textAlign: 'center',
    marginBottom: 30,
  },
  highlight: {
    color: '#6AB7FF',
  },
  button: {
    backgroundColor: '#000',

    paddingHorizontal: 40,
    borderRadius: 30,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    marginHorizontal: 10,
    paddingHorizontal: 26,
    paddingVertical: 38,
  },
  modalTitle: {
    fontSize: 30,
    fontFamily: FontFamily.semiBold,
  },
  modalSubtitle: {
    color: Colors.lightColor,
    marginTop: 4,
    marginBottom: 18,
    fontSize: 16,
    fontFamily: FontFamily.regular,
  },
  modalButton: {
    backgroundColor: '#000',
    paddingVertical: 12,
    width: '100%',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
  modalButtonText: {
    color: Colors.white,
    fontSize: 16,
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconSpacing: {
    marginLeft: 15,
  },
  titleNBrnMain: {
    marginHorizontal: 30,
  },
  btnStyle: {
    marginBottom: 10,
    height: 55,
    borderRadius: 10,
  },
  btnTextStyle: {
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.crossBackground,
    justifyContent: 'center',
    alignItems: 'center',
    height: 25,
    width: 25,
    borderRadius: 30,
  },
});

export default GetStartedScreen;
