import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Back, Star} from '../../icons';
import {FontFamily} from '../../utils/Fonts';
import {Colors} from '../../utils/Colors';
import Button from '../../components/Button';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function BookAppointmentScreen({navigation}) {
  return (
    <>
      <ScrollView style={styles.container}>
        <View>
          <Image
            source={require('../../assets/images/detailImage.png')} // replace with actual image URL or local asset
            style={styles.banner}
          />
          <TouchableOpacity
            style={styles.back}
            onPress={() => {
              navigation.goBack();
            }}>
            <Back size={25} color={Colors.white} />
          </TouchableOpacity>
          <View style={styles.heart}>
            <Image
              source={require('../../assets/images/heart.png')}
              style={styles.heartStyle}
            />
          </View>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>Derma Fillers - Cheeks</Text>
          <View style={styles.ratingRow}>
            <Star color={Colors.yellow} size={17} />
            <Text style={styles.ratingText}>5.0</Text>
            <Text style={styles.reviewText}>(30k Reviews)</Text>
          </View>

          <TouchableOpacity
            style={styles.clinicInfo}
            onPress={() => {
              navigation.navigate('ClinicDetails');
            }}>
            <Image
              source={require('../../assets/images/clinicImage.png')} // replace with actual clinic image
              style={styles.clinicImage}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '80%',
                alignItems: 'center',
              }}>
              <View>
                <Text style={styles.clinicName}>Glow Skin Clinic</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={require('../../assets/images/fireImage.png')}
                    style={styles.fireImage}
                  />
                  <Text style={styles.clinicType}>
                    Top Rated Aesthetic Clinic
                  </Text>
                </View>
              </View>
              <Image
                source={require('../../assets/images/threeDots.png')}
                style={{height: 16, width: 4}}
              />
            </View>
          </TouchableOpacity>

          <Text style={styles.description}>
            Achieve a youthful appearance with our aesthetic treatments to
            highlight your features. Whether adding volume, smoothing lines, or
            redefining contours, our solutions help you look and feel your best.
          </Text>

          <Text style={styles.sectionTitle}>
            Add Volume:
            <Text style={styles.sectionText}>
              {''} {''} {''}Restore lost fullness to areas like cheeks and lips
              for a plump, vibrant look.
            </Text>
          </Text>

          <Text style={styles.sectionTitle}>
            Smooth Wrinkles:
            <Text style={styles.sectionText}>
              {''} {''} {''} Restore lost fullness to areas like cheeks and lips
              for a plump, vibrant look.
            </Text>
          </Text>

          <Text style={styles.sectionTitle}>
            Contour & Define:
            <Text style={styles.sectionText}>
              {''} {''} {''} Sculpt and enhance key areas such as your jawline,
              under-eyes, and lips for balanced, natural-looking results.
            </Text>
          </Text>
        </View>
        <View style={expertiseStyles.container}>
          <Text style={expertiseStyles.heading}>Proof Of Expertise</Text>
          <Text style={expertiseStyles.description}>
            See real transformations from our clients. Experience the difference
            our expert treatments can make. your journey to glowing skin starts
            here!
          </Text>
        </View>
        <View style={feedbackStyles.wrapper}>
          <Text style={feedbackStyles.title}>Our Clients Feedback</Text>

          <View style={feedbackStyles.card}>
            {/* Star rating and time */}
            <View style={feedbackStyles.topRow}>
              <View style={feedbackStyles.starContainer}>
                {[...Array(5)].map((_, index) => (
                  <Icon key={index} name="star" size={14} color="#f5b50a" />
                ))}
              </View>
              <Text style={feedbackStyles.time}>2 week ago</Text>
            </View>

            {/* Review text */}
            <Text style={feedbackStyles.review}>
              “I got lip fillers here, and I’m obsessed! They look so natural
              and plump— exactly what I wanted. The injector was so skilled and
              made sure I was comfortable. I’ll definitely be back for more
              treatments!”
            </Text>

            {/* User details */}
            <View style={feedbackStyles.userRow}>
              <Image
                source={{uri: 'https://via.placeholder.com/40'}}
                style={feedbackStyles.userImage}
              />
              <Text style={feedbackStyles.userName}>Sarah Jhonson</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <View
          style={{
            backgroundColor: Colors.pink,
            height: 44,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={styles.footerNote}>
            Complete The Appointment Timing Slot To View Full Price
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 30,
            marginVertical: 15,
          }}>
          <View>
            <Text style={styles.price}>$ 650</Text>
            <Text style={styles.viewPolicy}>View Pricing Policy</Text>
          </View>
          <Button
            title="Book Now"
            style={{width: 187}}
            onPress={() => navigation.navigate('BookingDate')}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  banner: {
    width: '100%',
    height: 293,
  },
  content: {
    // padding: 16,
    paddingHorizontal: 30,
    paddingVertical: 14,
  },
  title: {
    fontSize: 30,
    fontFamily: FontFamily.semiBold,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightBorderColor,
  },
  star: {
    fontSize: 18,
  },
  ratingText: {
    fontFamily: FontFamily.semiBold,
    fontSize: 18,
    marginLeft: 4,
  },
  reviewText: {
    color: '#666',
    fontFamily: FontFamily.regular,
    fontSize: 16,
    marginLeft: 6,
  },
  clinicInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 14,
  },
  clinicImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 10,
  },
  clinicName: {
    fontFamily: FontFamily.semiBold,
    fontSize: 18,
  },
  clinicType: {
    fontSize: 13,
    color: '#888',
  },
  description: {
    fontSize: 14,
    fontFamily: FontFamily.regular,
    color: Colors.lightBlack,
  },
  sectionTitle: {
    fontFamily: FontFamily.semiBold,
    fontSize: 18,
    marginTop: 10,
  },
  sectionText: {
    fontSize: 16,
    fontFamily: FontFamily.regular,
    color: Colors.lightBlack,
  },
  footer: {
    backgroundColor: Colors.lightestPink,
  },
  footerNote: {
    fontSize: 14,
    fontFamily: FontFamily.semiBold,
    color: Colors.black,
    textAlign: 'center',
  },
  price: {
    fontSize: 28,
    fontFamily: FontFamily.semiBold,
  },
  bookNowButton: {
    backgroundColor: '#000',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 30,
    marginTop: 10,
  },
  bookNowText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  viewPolicy: {
    textDecorationLine: 'underline',
    fontSize: 14,
    fontFamily: FontFamily.medium,
  },
  fireImage: {
    height: 11,
    width: 11,
    resizeMode: 'contain',
  },
  back: {
    position: 'absolute',
    zIndex: 100,
    top: 60,
    left: 30,
    height: 44,
    width: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: 'rgba(242, 242, 242, 0.2)',
  },
  heart: {
    position: 'absolute',
    zIndex: 100,
    top: 60,
    right: 30,
    height: 44,
    width: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: 'rgba(242, 242, 242, 0.2)',
  },
});
const expertiseStyles = StyleSheet.create({
  container: {
    backgroundColor: '#ffe6ff',
    borderRadius: 12,
    padding: 16,
    margin: 16,
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
});

const feedbackStyles = StyleSheet.create({
  wrapper: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderColor: '#eee',
    borderWidth: 1,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  starContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  time: {
    fontSize: 12,
    color: '#888',
  },
  review: {
    fontSize: 14,
    color: '#333',
    marginBottom: 12,
    lineHeight: 20,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 8,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 14,
  },
});
