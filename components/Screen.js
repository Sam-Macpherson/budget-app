import React from 'react';
import {Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styles from '../styles/screen.less';
import typography from '../styles/typography.less';
import Button from './Button';

/**
 * Full-screen page with the drawer menu button and title. Bottom sheets rendered as children cover
 * the whole page, header included.
 */
const Screen = ({title, onMenu, children}) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.screen, {paddingTop: insets.top, paddingBottom: insets.bottom + 16}]}>
      <View style={styles.screenHeader}>
        <Button variant="ghost" icon="menu" onPress={onMenu} style={styles.menuButton} />
        <Text style={typography.title}>{title}</Text>
      </View>
      {children}
    </View>
  );
};

export default Screen;
