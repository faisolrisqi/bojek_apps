import React from 'react';
import { Text, View, Switch, StyleSheet, Dimensions, Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Pesanan from './PesananScreen';
import Akun from './AkunScreen';
import Beranda from './berandaScreen';
// import {Icon} from '@expo vector-icons';
import { Ionicons } from '@expo/vector-icons';
import ApiKeys from '../component/ApiKeys';
import Modal from './cobaModal';
const TabNavigator = createBottomTabNavigator({
  Beranda:{ screen: Beranda,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-home" size={25} color={tintColor} />
      ),
      tabBarLabel: 'Beranda',
    }  
  },
  Orderan: { screen: Pesanan,
    navigationOptions: {tabBarLabel: 'Orderan',
    tabBarIcon: ({tintColor}) => (
      <Ionicons name="ios-list" size={25} color={tintColor} />
    ),
  }
  },
  Akun:{screen: Akun,
  navigationOptions: {
    tabBarLabel:'Akun',
    tabBarIcon: ({tintColor}) => (
      <Ionicons name="ios-contact" size={25} color={tintColor} />
    ),
  }
  },
});

export default createAppContainer(TabNavigator);