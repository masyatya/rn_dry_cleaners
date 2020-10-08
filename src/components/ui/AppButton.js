import React from 'react';
import { 
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';
import { THEME } from '../../theme';
import { AppTextBold } from './AppTextBold';

export const AppButton = ({ 
  children, 
  onPress, 
  color = THEME.BLACK_COLOR, 
  style,
}) => {
  const Wrapper = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

  return (
    <Wrapper onPress={onPress}>
      <View style={{ ...styles.button, backgroundColor: color, ...style }}>
        <AppTextBold style={styles.text}>{children}</AppTextBold>
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 5,
  },
  text: {
    textAlign: 'center',
    color: THEME.WHITE_COLOR,
    fontSize: 20,
    textTransform: 'uppercase',
  }
});
