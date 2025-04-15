import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../utils/Colors';
import {FontFamily} from '../utils/Fonts';

const TransactionItem = ({title, subtitle, amount, index}) => {
  const backgroundColor = index % 2 === 0 ? Colors.lightblue : Colors.white; // Red / Green

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <View style={styles.iconContainer}>
        <Icon name="arrow-up" size={24} color="white" />
      </View>
      <View style={styles.details}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <Text style={styles.amount}>- ${amount}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginVertical: 6,
    justifyContent: 'space-between',
  },
  iconContainer: {
    backgroundColor: Colors.pink,
    borderRadius: 50,
    height: 48,
    width: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  title: {
    fontFamily: FontFamily.semiBold,
    fontSize: 16,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: FontFamily.regular,
    color: '#666',
    marginTop: 2,
  },
  amount: {
    color: Colors.darkerPink,
    fontFamily: FontFamily.semiBold,
    fontSize: 16,
  },
});

export default TransactionItem;
