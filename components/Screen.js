import React from 'react';
import {Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import typography from '../theme/typography';
import Button from './Button';

/**
 * Full-screen page with the drawer menu button and title. Bottom sheets rendered as children cover
 * the whole page, header included.
 */
const Screen = ({title, onMenu, children}) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      className="flex-1 px-4 bg-canvas"
      style={{paddingTop: insets.top, paddingBottom: insets.bottom + 16}}>
      <View className="flex-row items-center h-14">
        <Button
          variant="ghost"
          icon="menu"
          accessibilityLabel="Open menu"
          onPress={onMenu}
          className="-ml-2.5 mr-1.5"
        />
        <Text className={typography.title}>{title}</Text>
      </View>
      {children}
    </View>
  );
};

export default Screen;
