import React from 'react';
import {StatusBar} from 'react-native';
import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ColorPalette from './ColorPalette';
import DrawerContent from './components/DrawerContent';
import Icon from './components/Icon';
import BudgetScreen from './screens/BudgetScreen';
import RecurringScreen from './screens/RecurringScreen';

const Drawer = createDrawerNavigator();

const theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: ColorPalette.TEXT,
    background: ColorPalette.BG,
    card: ColorPalette.SURFACE,
    text: ColorPalette.TEXT,
    border: ColorPalette.BORDER,
  },
};

const renderDrawerContent = props => <DrawerContent {...props} />;
const BudgetIcon = ({color}) => <Icon name="wallet" color={color} />;
const RecurringIcon = ({color}) => <Icon name="repeat" color={color} />;

const App = () => (
  <NavigationContainer theme={theme}>
    <StatusBar barStyle="light-content" />
    <Drawer.Navigator
      drawerContent={renderDrawerContent}
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        overlayColor: 'rgba(0, 0, 0, 0.6)',
        drawerStyle: {backgroundColor: ColorPalette.SURFACE, width: 280},
        drawerActiveBackgroundColor: ColorPalette.NEUTRAL_TINT,
        drawerActiveTintColor: ColorPalette.TEXT,
        drawerInactiveTintColor: ColorPalette.TEXT_MUTED,
        drawerLabelStyle: {fontSize: 15, fontWeight: '600'},
      }}>
      <Drawer.Screen name="Budget" component={BudgetScreen} options={{drawerIcon: BudgetIcon}} />
      <Drawer.Screen
        name="Recurring"
        component={RecurringScreen}
        options={{drawerIcon: RecurringIcon}}
      />
    </Drawer.Navigator>
  </NavigationContainer>
);

export default App;
