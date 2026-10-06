import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {useColorScheme, View} from 'react-native';
import {vars} from 'nativewind';
import si from '../storage/storage';
import {PALETTES, cssVariables} from './palette';

const ThemeContext = createContext(null);

/**
 * Follows the phone's light/dark setting until the user picks one, then remembers that choice.
 */
const ThemeProvider = ({children}) => {
  const system = useColorScheme();
  // undefined while loading, so the app doesn't flash the wrong theme on launch.
  const [chosen, setChosen] = useState(undefined);

  useEffect(() => {
    si.getThemePreference().then(setChosen);
  }, []);

  const scheme = chosen || (system === 'light' ? 'light' : 'dark');
  const colors = PALETTES[scheme];

  const toggle = useCallback(() => {
    const next = scheme === 'dark' ? 'light' : 'dark';
    setChosen(next);
    si.setThemePreference(next);
  }, [scheme]);

  const value = useMemo(() => ({scheme, colors, toggle}), [scheme, colors, toggle]);
  const variables = useMemo(() => vars(cssVariables(colors)), [colors]);

  if (chosen === undefined) {
    return null;
  }

  return (
    <ThemeContext.Provider value={value}>
      <View className="flex-1" style={variables}>
        {children}
      </View>
    </ThemeContext.Provider>
  );
};

const useTheme = () => useContext(ThemeContext);

export {ThemeProvider, useTheme};
