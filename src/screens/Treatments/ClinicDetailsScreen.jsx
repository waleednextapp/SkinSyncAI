import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Back, Location, Star} from '../../icons';
import {FontFamily} from '../../utils/Fonts';
import {Colors} from '../../utils/Colors';
import Button from '../../components/Button';
import Icon from 'react-native-vector-icons/AntDesign';

export default function ClinicDetailsScreen({navigation}) {
  const spaServices = [
    {
      id: '1',
      title: 'Botox Injections',
      desc: 'Lorem ipsum dolor sit amet consectetur. Amet augue.',
      image: require('../../assets/images/recommendimage1.png'),
    },
    {
      id: '2',
      title: 'Dermal Fillers',
      desc: 'Lorem ipsum dolor sit amet consectetur. Amet augue.',
      image: require('../../assets/images/recommendimage1.png'),
    },
    {
      id: '3',
      title: 'Chemical Peels',
      desc: 'Lorem ipsum dolor sit amet consectetur. Amet augue.',
      image: require('../../assets/images/recommendimage1.png'),
    },
  ];

  return (
    <>
      <ScrollView style={styles.container}>
        <View>
          <Image
            source={require('../../assets/images/clinicImage.png')} // replace with actual image URL or local asset
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
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={styles.title}>Glow Skin Clinic</Text>
            <View style={styles.topChoiceContainer}>
              <Image
                source={require('../../assets/images/fireImage.png')}
                style={styles.fireImage}
              />
              <Text style={styles.topChoice}>Top Choice</Text>
            </View>
          </View>
          <View style={styles.ratingRow}>
            <Star color={Colors.yellow} size={17} />
            <Text style={styles.ratingText}>5.0</Text>
            <Text style={styles.reviewText}>( 30k Reviews ) 1M+ Booked</Text>
          </View>

          <Text style={styles.description}>
            Achieve a youthful appearance with our aesthetic treatments to
            highlight your features. Whether adding volume, smoothing lines, or
            redefining contours, our solutions help you look and feel your best.
          </Text>
          <View style={styles.borderStyle}>
            <View style={styles.offPeak}>
              <Text style={styles.offHourTxt}>What Are Off-Peak Hours?</Text>
              <Text style={styles.bookAppointTxt}>
                Book your appointment during quieter times and enjoy exclusive
                discounts.
              </Text>
            </View>
          </View>
          <View style={styles.mapMain}>
            <View style={styles.txtMain}>
              <Text style={styles.dayTxt}>Monday - Sunday</Text>
              <Text style={styles.timeTxt}>7 : 00 AM - 12 : 00 PM</Text>
            </View>
            <View style={styles.locationMain}>
              <Location size={20} color={Colors.black} />
              <Text style={styles.locationTxt}>
                Bedford-Stuyvesant, Brooklyn, NY 11221
              </Text>
            </View>
            <View>
              <Image
                source={require('../../assets/images/mapImage.png')}
                style={styles.mapImage}
              />
            </View>
          </View>
        </View>
        <ScrollView style={styles.belowContainer}>
          {/* Header */}
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.heading}>Glow Med Spa Services</Text>
              <Text style={styles.subHeading}>
                Beloved Services for Everyone
              </Text>
            </View>
            <TouchableOpacity>
              <Icon name="right" size={18} color="black" />
            </TouchableOpacity>
          </View>

          {/* Services List */}
          {spaServices.map(service => (
            <View key={service.id} style={styles.cardRow}>
              <Image source={service.image} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.title}>{service.title}</Text>
                <Text style={styles.desc}>{service.desc}</Text>
              </View>
              <TouchableOpacity style={styles.plusButton}>
                <Icon name="plus" size={18} color="#fff" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View style={styles.wrapper}>
          <Text style={styles.title}>Our Clients Feedback</Text>

          <View style={styles.card}>
            {/* Star rating and time */}
            <View style={styles.topRow}>
              <View style={styles.starContainer}>
                {[...Array(5)].map((_, index) => (
                  <Icon key={index} name="star" size={14} color="#f5b50a" />
                ))}
              </View>
              <Text style={styles.time}>2 week ago</Text>
            </View>

            {/* Review text */}
            <Text style={styles.review}>
              “I got lip fillers here, and I’m obsessed! They look so natural
              and plump— exactly what I wanted. The injector was so skilled and
              made sure I was comfortable. I’ll definitely be back for more
              treatments!”
            </Text>

            {/* User details */}
            <View style={styles.userRow}>
              <Image
                source={{uri: 'https://via.placeholder.com/40'}}
                style={styles.userImage}
              />
              <Text style={styles.userName}>Sarah Jhonson</Text>
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
            marginVertical: 9,
            marginBottom: 15,
          }}>
          <Button
            title="Book Now"
            style={{width: '100%'}}
            onPress={() => {
              navigation.navigate('BookingDate');
            }}
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
    marginBottom: 20,
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
  topChoice: {
    fontFamily: FontFamily.semiBold,
    fontSize: 12,
  },
  topChoiceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 80,
    height: 23,
    borderRadius: 100,
    paddingHorizontal: 6,
    paddingVertical: 4,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(136, 227, 251, 0.2)',
  },
  offPeak: {
    backgroundColor: Colors.lighterPink,
    height: 118,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 22,
  },
  offHourTxt: {
    fontSize: 22,
    fontFamily: FontFamily.semiBold,
    marginBottom: 6,
  },
  bookAppointTxt: {
    fontSize: 16,
    fontFamily: FontFamily.regular,
    color: Colors.lightBlack,
  },
  borderStyle: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightBorderColor,
    paddingBottom: 20,
    marginBottom: 20,
  },
  mapMain: {
    backgroundColor: Colors.lightestBlue,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 21,
  },
  txtMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 23,
    borderBottomColor: Colors.lightBorderColor,
    borderBottomWidth: 1,
    marginBottom: 18,
  },
  dayTxt: {
    fontSize: 20,
    fontFamily: FontFamily.semiBold,
  },
  timeTxt: {
    fontSize: 16,
    fontFamily: FontFamily.regular,
    color: Colors.lightBlack,
  },
  locationTxt: {
    fontSize: 20,
    fontFamily: FontFamily.semiBold,
    marginLeft: 14,
    width: '90%',
  },
  locationMain: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  mapImage: {
    height: 203,
    resizeMode: 'contain',
    width: '100%',
    borderRadius: 10,
  },
  belowContainer: {
    padding: 16,
    backgroundColor: '#fff',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subHeading: {
    fontSize: 12,
    color: '#666',
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  desc: {
    fontSize: 12,
    color: '#666',
  },
  plusButton: {
    width: 28,
    height: 28,
    backgroundColor: Colors.pink,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
    shadowOffset: {width: 0, height: 1},
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
