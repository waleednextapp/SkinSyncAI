// import React from 'react';
// import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import {Star} from '../icons';
// import {FontFamily} from '../utils/Fonts';
// import {Colors} from '../utils/Colors';

// const RewardCard = () => {
//   const currentPoints = 210;
//   const totalPoints = 250;
//   const progress = currentPoints / totalPoints;

//   const renderStars = () => {
//     const steps = [0.25, 0.5, 0.75, 1];
//     return steps.map((step, index) => (
//       <View
//         key={index}
//         style={[styles.starWrapper, {left: `${step * 100}%`, marginLeft: -10}]}>
//         <Star color={progress >= step ? '#FFD700' : '#ccc'} size={14} />
//       </View>
//     ));
//   };

//   return (
//     <LinearGradient colors={['#EEA1F0', '#88E3FB']} style={styles.card}>
//       <Text style={styles.title}>Reward Points</Text>
//       <Text style={styles.subtitle}>
//         Every $1 spent earns 10 points: $1 = 10 points, {'\n'}eg: $10 = 100
//         points.
//       </Text>

//       <View style={styles.progressContainer}>
//         <View style={styles.progressBackground}>
//           <View style={[styles.progressFill, {width: `${progress * 100}%`}]} />
//           {renderStars()}
//         </View>
//         <View style={styles.pointsRow}>
//           <Text style={styles.pointsText}>{currentPoints} Points</Text>
//           <Text style={styles.pointsText}>{totalPoints} Points</Text>
//         </View>
//       </View>

//       <TouchableOpacity style={styles.redeemButton}>
//         <Star color={'white'} size={14} />
//         <Text style={styles.redeemText}> Redeem Points</Text>
//       </TouchableOpacity>
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   card: {
//     borderRadius: 20,
//     height: 233,
//     paddingHorizontal: 20,
//     paddingVertical: 12,
//   },
//   title: {
//     fontFamily: FontFamily.semiBold,
//     fontSize: 22,
//     marginBottom: 3,
//   },
//   subtitle: {
//     fontSize: 14,
//     fontFamily: FontFamily.regular,
//     marginBottom: 19,
//   },
//   progressContainer: {
//     marginBottom: 15,
//   },
//   progressBackground: {
//     backgroundColor: '#eee',
//     height: 11,
//     borderRadius: 10,
//     position: 'relative',
//     overflow: 'hidden',
//     width: '90%',
//   },
//   progressFill: {
//     backgroundColor: Colors.pink,
//     height: '100%',
//     borderRadius: 10,
//   },
//   starWrapper: {
//     position: 'absolute',
//     top: -8,
//     backgroundColor: Colors.white,
//     height: 30,
//     width: 30,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 50,
//   },
//   pointsRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 6,
//     width: '90%',
//   },
//   pointsText: {
//     fontSize: 12,
//     fontFamily: FontFamily.medium,
//   },
//   redeemButton: {
//     height: 36,
//     width: 136,
//     backgroundColor: 'black',
//     alignItems: 'center',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     borderRadius: 5,
//   },
//   redeemText: {
//     color: 'white',
//     fontFamily: FontFamily.semiBold,
//     fontSize: 14,
//     marginLeft: 6,
//   },
// });

// export default RewardCard;

// import React from 'react';
// import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import {Star} from '../icons';
// import {FontFamily} from '../utils/Fonts';
// import {Colors} from '../utils/Colors';

// const RewardCard = () => {
//   const currentPoints = 210;
//   const totalPoints = 250;
//   const progress = currentPoints / totalPoints;

//   const renderStars = () => {
//     const steps = [0.25, 0.5, 0.75, 1];
//     return steps.map((step, index) => (
//       <View key={index} style={styles.starWrapper}>
//         <Star color={progress >= step ? '#FFD700' : '#ccc'} size={14} />
//       </View>
//     ));
//   };

//   return (
//     <LinearGradient colors={['#EEA1F0', '#88E3FB']} style={styles.card}>
//       <Text style={styles.title}>Reward Points</Text>
//       <Text style={styles.subtitle}>
//         Every $1 spent earns 10 points: $1 = 10 points, {'\n'}eg: $10 = 100
//         points.
//       </Text>

//       <View style={styles.progressContainer}>
//         <View style={styles.starsOverlay}>{renderStars()}</View>

//         <View style={styles.progressBackground}>
//           <View style={[styles.progressFill, {width: `${progress * 100}%`}]} />
//         </View>

//         <View style={styles.pointsRow}>
//           <Text style={styles.pointsText}>{currentPoints} Points</Text>
//           <Text style={[styles.pointsText, {marginRight: 40}]}>
//             {totalPoints} Points
//           </Text>
//         </View>
//       </View>

//       <TouchableOpacity style={styles.redeemButton}>
//         <Star color={'white'} size={14} />
//         <Text style={styles.redeemText}> Redeem Points</Text>
//       </TouchableOpacity>
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   card: {
//     borderRadius: 20,
//     height: 233,
//     paddingHorizontal: 20,
//     paddingVertical: 12,
//   },
//   title: {
//     fontFamily: FontFamily.semiBold,
//     fontSize: 22,
//     marginBottom: 3,
//   },
//   subtitle: {
//     fontSize: 14,
//     fontFamily: FontFamily.regular,
//     // marginBottom: 19,
//   },
//   progressContainer: {
//     marginBottom: 15,
//     position: 'relative',
//     height: 60, // enough to accommodate stars and bar
//     justifyContent: 'flex-end',
//     zIndex: 10,
//   },
//   starsOverlay: {
//     position: 'absolute',
//     top: 15,
//     left: '5%',
//     right: '10%',
//     zIndex: 50,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     height: 30,
//     alignItems: 'center',
//   },
//   progressBackground: {
//     backgroundColor: '#eee',
//     height: 11,
//     borderRadius: 10,
//     overflow: 'hidden',
//     width: '85%',
//   },
//   progressFill: {
//     backgroundColor: Colors.pink,
//     height: '100%',
//     borderRadius: 10,
//   },
//   starWrapper: {
//     backgroundColor: Colors.white,
//     height: 30,
//     width: 30,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 15,
//   },
//   pointsRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 6,
//     width: '100%',
//     alignSelf: 'center',
//   },
//   pointsText: {
//     fontSize: 12,
//     fontFamily: FontFamily.medium,
//   },
//   redeemButton: {
//     height: 36,
//     width: 136,
//     backgroundColor: 'black',
//     alignItems: 'center',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     borderRadius: 5,
//   },
//   redeemText: {
//     color: 'white',
//     fontFamily: FontFamily.semiBold,
//     fontSize: 14,
//     marginLeft: 6,
//   },
// });

// export default RewardCard;

import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Star} from '../icons';
import {FontFamily} from '../utils/Fonts';
import {Colors} from '../utils/Colors';

const RewardCard = () => {
  const currentPoints = 210;
  const totalPoints = 250;
  const progress = currentPoints / totalPoints;

  const renderStars = () => {
    const steps = [0, 0.33, 0.66, 1]; // Evenly spaced on the bar
    return steps.map((step, index) => (
      <View
        key={index}
        style={[
          styles.starWrapper,
          {
            left: `${step * 97}%`,
            transform: [{translateX: -15}], // center stars
            borderWidth: 5,
            borderColor: progress >= step ? Colors.pink : Colors.starWidth,
          },
        ]}>
        <Star
          color={progress >= step ? '#FFD700' : Colors.starWidth}
          size={14}
        />
      </View>
    ));
  };

  return (
    <LinearGradient colors={['#EEA1F0', '#88E3FB']} style={styles.card}>
      <View style={{flex: 1, marginLeft: 20}}>
        <Text style={styles.title}>Reward Points</Text>
        <Text style={styles.subtitle}>
          Every $1 spent earns 10 points: $1 = 10 points, {'\n'}eg: $10 = 100
          points.
        </Text>

        <View style={styles.progressContainer}>
          <View style={styles.progressWrapper}>
            <View style={styles.progressBarWithStars}>
              <View style={styles.progressBackground}>
                <View
                  style={[styles.progressFill, {width: `${progress * 100}%`}]}
                />
              </View>

              {/* Stars Positioned Relative to Progress Bar */}
              {renderStars()}
            </View>
          </View>

          <View style={styles.pointsRow}>
            <Text style={styles.pointsText}>{currentPoints} Points</Text>
            <Text style={[styles.pointsText, {marginRight: 40}]}>
              {totalPoints} Points
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.redeemButton}>
          <Star color={'white'} size={14} />
          <Text style={styles.redeemText}> Redeem Points</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    height: 233,
  },
  title: {
    fontFamily: FontFamily.semiBold,
    fontSize: 22,
    marginBottom: 3,
    marginTop: 17,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: FontFamily.regular,
  },
  progressContainer: {
    marginBottom: 15,
  },
  progressWrapper: {},
  progressBarWithStars: {
    position: 'relative',
    width: '85%',
    marginHorizontal: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressBackground: {
    backgroundColor: '#eee',
    height: 11,
    borderRadius: 10,
    overflow: 'hidden',
    width: '100%',
  },
  progressFill: {
    backgroundColor: Colors.pink,
    height: '100%',
    borderRadius: 10,
  },
  starWrapper: {
    position: 'absolute',
    top: 10,
    backgroundColor: Colors.white,
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    zIndex: 10,
  },
  pointsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignSelf: 'center',
  },
  pointsText: {
    fontSize: 12,
    fontFamily: FontFamily.medium,
  },
  redeemButton: {
    height: 36,
    width: 136,
    backgroundColor: 'black',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 5,
  },
  redeemText: {
    color: 'white',
    fontFamily: FontFamily.semiBold,
    fontSize: 14,
    marginLeft: 6,
  },
});

export default RewardCard;
