import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  View,
  Image,
} from 'react-native';
import {Colors} from '../utils/Colors';
import {FontFamily} from '../utils/Fonts';

const Button = ({
  title,
  icon,
  loading,
  onPress,
  style,
  textStyle,
  loaderColor = '#fff',
  image,
  imageStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={loading ? null : onPress}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 50,
          height: 60,
          backgroundColor: Colors.black,
          opacity: loading ? 0.7 : 1,
        },
        style,
      ]}
      activeOpacity={0.7}>
      {loading ? (
        <ActivityIndicator size="small" color={loaderColor} />
      ) : (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {icon && icon}
          {image && <Image source={image} style={imageStyle} />}
          <Text
            style={[
              {
                color: Colors.white,
                fontSize: 22,
                fontFamily: FontFamily.semiBold,
              },
              textStyle,
            ]}>
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Button;
