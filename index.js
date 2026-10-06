/**
 * @format
 */

import './global.css';
import React from 'react';
import {AppRegistry, StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import App from './App';
import {ThemeProvider} from './theme/ThemeProvider';
import {name as appName} from './app.json';

const Root = () => (
  <GestureHandlerRootView style={styles.root}>
    <SafeAreaProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </SafeAreaProvider>
  </GestureHandlerRootView>
);

const styles = StyleSheet.create({root: {flex: 1}});

AppRegistry.registerComponent(appName, () => Root);
