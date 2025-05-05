import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StyleSheet, Platform, StatusBar, View} from 'react-native';
import Navigation from './src/navigation/Navigation';
import { Colors } from './src/utils/Colors';
//deployed to git
const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.container}>{<Navigation />}</View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingBottom: Platform.OS === 'android' ? StatusBar.currentHeight - 30 : 0,
  },
});

export default App;
