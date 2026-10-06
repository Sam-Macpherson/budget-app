import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  Animated,
  BackHandler,
  Easing,
  Keyboard,
  PanResponder,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTheme} from '../theme/ThemeProvider';

const DURATION = 220;
const DISMISS_DISTANCE = 80;
const DISMISS_VELOCITY = 0.8;

/**
 * Bottom sheet with backdrop, swipe-down and back-button dismissal. Children are unmounted while
 * closed so their state resets on every open. Lifts itself above the keyboard, since edge-to-edge
 * Android no longer resizes the window for it.
 */
const BottomSheet = forwardRef(({height, onClosed, children}, ref) => {
  const insets = useSafeAreaInsets();
  const {colors} = useTheme();
  const [mounted, setMounted] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const progress = useRef(new Animated.Value(0)).current;
  const dragY = useRef(new Animated.Value(0)).current;
  const onClosedRef = useRef(onClosed);
  onClosedRef.current = onClosed;

  const close = useCallback(() => {
    Keyboard.dismiss();
    Animated.timing(progress, {
      toValue: 0,
      duration: DURATION,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: true,
    }).start(({finished}) => {
      if (finished) {
        dragY.setValue(0);
        setMounted(false);
        onClosedRef.current?.();
      }
    });
  }, [progress, dragY]);

  const closeRef = useRef(close);
  closeRef.current = close;

  useImperativeHandle(ref, () => ({open: () => setMounted(true), close}), [close]);

  useEffect(() => {
    if (!mounted) {
      return;
    }
    Animated.timing(progress, {
      toValue: 1,
      duration: DURATION,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
    const subscriptions = [
      BackHandler.addEventListener('hardwareBackPress', () => {
        close();
        return true;
      }),
      Keyboard.addListener('keyboardDidShow', e => setKeyboardHeight(e.endCoordinates.height)),
      Keyboard.addListener('keyboardDidHide', () => setKeyboardHeight(0)),
    ];
    return () => subscriptions.forEach(s => s.remove());
  }, [mounted, progress, close]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_e, g) => g.dy > 8 && Math.abs(g.dy) > Math.abs(g.dx),
      onPanResponderMove: (_e, g) => dragY.setValue(Math.max(0, g.dy)),
      onPanResponderRelease: (_e, g) => {
        if (g.dy > DISMISS_DISTANCE || g.vy > DISMISS_VELOCITY) {
          closeRef.current();
        } else {
          Animated.spring(dragY, {toValue: 0, useNativeDriver: true}).start();
        }
      },
    }),
  ).current;

  if (!mounted) {
    return null;
  }

  const bottomPadding = keyboardHeight > 0 ? 0 : insets.bottom;
  const sheetHeight = height + bottomPadding;
  const translateY = Animated.add(
    progress.interpolate({inputRange: [0, 1], outputRange: [sheetHeight, 0]}),
    dragY,
  );

  return (
    <View style={StyleSheet.absoluteFill}>
      <Animated.View
        style={[StyleSheet.absoluteFill, {backgroundColor: colors.BACKDROP, opacity: progress}]}>
        <Pressable style={StyleSheet.absoluteFill} onPress={close} />
      </Animated.View>
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.sheet,
          {
            backgroundColor: colors.SURFACE_RAISED,
            height: sheetHeight,
            bottom: keyboardHeight,
            paddingBottom: bottomPadding,
            transform: [{translateY}],
          },
        ]}>
        {children}
      </Animated.View>
    </View>
  );
});

const styles = StyleSheet.create({
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default BottomSheet;
