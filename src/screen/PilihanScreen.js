import React from 'react';
import {StyleSheet, View, Text, Button, Switch, Dimensions} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';
import MapScreen from './tabGojek/MapScreen';
import GojekScreen from './tabGojek/GojekScreen';
import ChatScreen from './tabGojek/ChatScreen';
import CancelScreen from './tabGojek/CancelScreen';

  const TabNavigator = createBottomTabNavigator({
    Map:{ screen: MapScreen,
        navigationOptions: {
          tabBarIcon: ({ tintColor }) => (
            <Ionicons name="md-map" size={25} color={tintColor} />
          ),
          tabBarLabel: 'Map',
        }  
      },
    Chat:{ screen: ChatScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-chatbubbles" size={25} color={tintColor} />
        ),
        tabBarLabel: 'Chat',
      }  
    },
    Gojek: { screen: GojekScreen,
      navigationOptions: {tabBarLabel: 'Gojek',
      tabBarIcon: ({tintColor}) => (
        <Ionicons name="md-contact" size={25} color={tintColor} />
      ),
    }
    },
    Cencel:{screen: CancelScreen,
    navigationOptions: {
      tabBarLabel:'Cencel',
      tabBarIcon: ({tintColor}) => (
        <Ionicons name="ios-close-circle-outline" size={25} color={tintColor} />
      ),
    }
    },
  });
  
  export default createAppContainer(TabNavigator);