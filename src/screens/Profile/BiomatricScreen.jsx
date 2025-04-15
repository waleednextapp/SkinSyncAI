import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Colors} from '../../utils/Colors';
import {FontFamily} from '../../utils/Fonts';
import Button from '../../components/Button';

export default function BiomatricScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/bioImage.png')}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.title}>Biometric Authentication</Text>
      <Text style={styles.subtitle}>
        We'll scan your face and create a cool model just for you to enhance
        your experience!
      </Text>

      <Button
        title={'Enable'}
        style={{width: '100%'}}
        onPress={() => navigation.navigate('BioMatricScanner')}
      />

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Back to Settings</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  image: {
    width: '100%',
    height: 400,
    marginBottom: 70,
  },
  title: {
    fontSize: 30,
    fontFamily: FontFamily.semiBold,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: FontFamily.medium,
    color: Colors.lightBlack,
    textAlign: 'center',
    marginBottom: 40,
  },
  backText: {
    fontSize: 22,
    fontFamily: FontFamily.semiBold,
    marginTop: 24,
  },
});
