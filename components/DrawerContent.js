import React from 'react';
import {Text} from 'react-native';
import {DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styles from '../styles/drawer.less';
import typography from '../styles/typography.less';

const DrawerContent = props => {
  const insets = useSafeAreaInsets();
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={[styles.drawerContent, {paddingTop: insets.top}]}>
      <Text style={[typography.title, styles.drawerTitle]}>50/30/20</Text>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

export default DrawerContent;
