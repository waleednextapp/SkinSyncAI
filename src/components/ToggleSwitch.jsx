// import React, {useState} from 'react';
// import {Switch} from 'react-native';
// import {Colors} from '../utils/Colors';

// const ToggleSwitch = ({initial = false, onToggle}) => {
//   const [isEnabled, setIsEnabled] = useState(initial);

//   const toggleSwitch = () => {
//     setIsEnabled(prev => !prev);
//     if (onToggle) onToggle(!isEnabled);
//   };

//   return (
//     <Switch
//       trackColor={{false: Colors.black, true: '#5A41FF'}}
//       thumbColor={isEnabled ? '#fff' : '#fff'}
//       ios_backgroundColor={Colors.black}
//       onValueChange={toggleSwitch}
//       value={isEnabled}
//     />
//   );
// };

// export default ToggleSwitch;

import React, {useState} from 'react';
import {Switch, View, StyleSheet} from 'react-native';
import {Colors} from '../utils/Colors';

const ToggleSwitch = ({initial = false, onToggle}) => {
  const [isEnabled, setIsEnabled] = useState(initial);

  const toggleSwitch = () => {
    setIsEnabled(prev => !prev);
    if (onToggle) onToggle(!isEnabled);
  };

  return (
    <View style={styles.switchWrapper}>
      <Switch
        trackColor={{false: Colors.black, true: '#74D8F2'}}
        thumbColor={'#fff'}
        ios_backgroundColor={Colors.black}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  switchWrapper: {
    transform: [{scaleX: 0.85}, {scaleY: 0.85}], // ~49x24 look
  },
});

export default ToggleSwitch;
