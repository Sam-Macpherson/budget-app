import React, {useMemo} from 'react';
import {StatusBar} from 'react-native';
import {DarkTheme, DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerContent from './components/DrawerContent';
import Icon from './components/Icon';
import AnalyticsScreen from './screens/AnalyticsScreen';
import BudgetScreen from './screens/BudgetScreen';
import RecurringScreen from './screens/RecurringScreen';
import {useTheme} from './theme/ThemeProvider';

const Drawer = createDrawerNavigator();

const renderDrawerContent = props => <DrawerContent {...props} />;
const BudgetIcon = ({color}) => <Icon name="wallet" color={color} />;
const RecurringIcon = ({color}) => <Icon name="repeat" color={color} />;
const AnalyticsIcon = ({color}) => <Icon name="chart" color={color} />;

const App = () => {
  const {scheme, colors} = useTheme();

  const navigationTheme = useMemo(() => {
    const base = scheme === 'dark' ? DarkTheme : DefaultTheme;
    return {
      ...base,
      colors: {
        ...base.colors,
        primary: colors.TEXT,
        background: colors.BG,
        card: colors.SURFACE,
        text: colors.TEXT,
        border: colors.BORDER,
      },
    };
  }, [scheme, colors]);

  return (
    <NavigationContainer theme={navigationTheme}>
      <StatusBar barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'} />
      <Drawer.Navigator
        drawerContent={renderDrawerContent}
        screenOptions={{
          headerShown: false,
          drawerType: 'front',
          overlayColor: colors.BACKDROP,
          drawerStyle: {backgroundColor: colors.SURFACE, width: 280},
          drawerActiveBackgroundColor: colors.NEUTRAL_TINT,
          drawerActiveTintColor: colors.TEXT,
          drawerInactiveTintColor: colors.TEXT_MUTED,
          drawerLabelStyle: {fontSize: 15, fontWeight: '600'},
        }}>
        <Drawer.Screen name="Budget" component={BudgetScreen} options={{drawerIcon: BudgetIcon}} />
        <Drawer.Screen
          name="Recurring"
          component={RecurringScreen}
          options={{drawerIcon: RecurringIcon}}
        />
        <Drawer.Screen
          name="Analytics"
          component={AnalyticsScreen}
          options={{drawerIcon: AnalyticsIcon}}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
