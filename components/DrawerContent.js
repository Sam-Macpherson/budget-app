import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTheme} from '../theme/ThemeProvider';
import typography from '../theme/typography';
import {exportBackup, importBackup} from '../utils/backup';
import Button from './Button';

const DrawerContent = props => {
  const insets = useSafeAreaInsets();
  const {scheme, toggle} = useTheme();
  return (
    <View className="flex-1">
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={[styles.content, {paddingTop: insets.top}]}>
        <Text className={`${typography.title} m-4`}>50/30/20</Text>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View
        className="flex-row px-4 pt-3 border-t border-line"
        style={{paddingBottom: insets.bottom + 12}}>
        <Button
          icon={scheme === 'dark' ? 'sun' : 'moon'}
          accessibilityLabel={scheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          onPress={toggle}
        />
        <Button
          className="ml-3"
          icon="upload"
          accessibilityLabel="Export backup"
          onPress={exportBackup}
        />
        <Button
          className="ml-3"
          icon="download"
          accessibilityLabel="Import backup"
          onPress={importBackup}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {paddingHorizontal: 4, paddingBottom: 8},
});

export default DrawerContent;
