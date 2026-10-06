import React from 'react';
import {Text, View} from 'react-native';
import ColorPalette from '../ColorPalette';
import Icon from '../components/Icon';
import Screen from '../components/Screen';
import styles from '../styles/recurring.less';
import typography from '../styles/typography.less';

const RecurringScreen = ({navigation}) => (
  <Screen title="Recurring" onMenu={navigation.openDrawer}>
    <View style={styles.emptyCard}>
      <Icon name="repeat" size={28} color={ColorPalette.TEXT_MUTED} />
      <Text style={[typography.bodyStrong, styles.emptyTitle]}>No recurring items yet</Text>
      <Text style={[typography.caption, styles.emptyText]}>
        Rent, subscriptions and salary set up here get added to each month automatically.
      </Text>
    </View>
  </Screen>
);

export default RecurringScreen;
