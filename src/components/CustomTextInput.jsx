// import React from 'react';
// import {TextInput, View, StyleSheet} from 'react-native';
// import {Colors} from '../utils/Colors';
// import {FontFamily} from '../utils/Fonts';

// const CustomTextInput = ({
//   placeholder,
//   value,
//   onChangeText,
//   keyboardType,
//   mainStyle,
//   multiline,
//   txtInputStyle,
// }) => {
//   return (
//     <View style={mainStyle}>
//       <TextInput
//         style={[styles.input, txtInputStyle]}
//         placeholder={placeholder}
//         placeholderTextColor={Colors.placeHolderColor}
//         value={value}
//         onChangeText={onChangeText}
//         keyboardType={keyboardType}
//         autoCapitalize="none"
//         multiline={multiline}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   input: {
//     borderWidth: 1,
//     borderColor: Colors.bordeColor,
//     borderRadius: 10,
//     padding: 16,
//     fontSize: 16,
//     height: 55,
//     fontFamily: FontFamily.regular,
//   },
// });

// export default CustomTextInput;

import React from 'react';
import {TextInput, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Or any icon lib you use
import {Colors} from '../utils/Colors';
import {FontFamily} from '../utils/Fonts';

const CustomTextInput = ({
  placeholder,
  value,
  onChangeText,
  keyboardType,
  mainStyle,
  multiline,
  txtInputStyle,
  showSearchIcon = false,
}) => {
  return (
    <View style={[styles.inputWrapper, mainStyle]}>
      {showSearchIcon && (
        <Icon
          name="search"
          size={20}
          color={Colors.placeHolderColor}
          style={styles.icon}
        />
      )}
      <TextInput
        style={[styles.input, txtInputStyle]}
        placeholder={placeholder}
        placeholderTextColor={Colors.placeHolderColor}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        autoCapitalize="none"
        multiline={multiline}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.bordeColor,
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 55,
    backgroundColor: '#fff',
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: FontFamily.regular,
    color: '#000',
    textAlignVertical: 'top',
    
  },
});

export default CustomTextInput;
