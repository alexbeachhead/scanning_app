import {colors} from '@utils/constants';
import React, {useEffect, useRef, useState} from 'react';
import {Animated, Platform, Pressable, StyleProp, Text, TextInput, TextInputProps, View, ViewStyle} from 'react-native';
import {MaskType} from 'src/types/input';

import {Icon} from '../Icon';
import {useStyles} from './styles';

type IProps = {
  value: string | null;
  onChangeText: (text: string) => void;
  placeholder?: string;
  errorMessages?: string[];
  withClear?: boolean;
  type?: TextInputProps['keyboardType'];
  withMovingPlaceholder?: boolean;
  maskType?: MaskType; // Mask prop
  disabled?: boolean;
  maxLength?: number;
  textCase?: 'upper' | 'lower';
  isCardNumber?: boolean; // New prop
  multiline?: boolean; // New prop for multiline support
  style?: StyleProp<ViewStyle>;
  styleContainer?: StyleProp<ViewStyle>;
  iconRight?: IconName;
  iconLeft?: IconName;
  onLeftIconPress?: () => void;
  withIcon?: boolean;
  icon?: IconName;
  onIconPress?: () => void;
  secureTextEntry?: boolean;
  dark?: boolean;
  disabledIcon?: boolean;
};

export const Input = ({
  value,
  onChangeText,
  placeholder = '',
  errorMessages = [],
  withClear = false,
  type = 'default',
  withMovingPlaceholder = false,
  maskType,
  disabled = false,
  maxLength = 100,
  textCase,
  isCardNumber = false, // Default false
  multiline = false, // Default false
  style,
  styleContainer,
  iconRight,
  iconLeft,
  onLeftIconPress,
  withIcon = false,
  icon,
  onIconPress,
  secureTextEntry = false,
  dark = false,
  disabledIcon = false,
}: IProps) => {
  const styles = useStyles();
  const [isFocused, setIsFocused] = useState(false);
  const [animatedPlaceholder] = useState(new Animated.Value(value ? 1 : 0));
  const [previousValue, setPreviousValue] = useState<string>('');
  const [inputHeight, setInputHeight] = useState<number>(52);
  const lastHeightRef = useRef<number>(52);

  const hasError = errorMessages.length > 0;

  useEffect(() => {
    Animated.timing(animatedPlaceholder, {
      toValue: isFocused || value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  const placeholderStyle = {
    top: animatedPlaceholder.interpolate({
      inputRange: [0, 1],
      outputRange: [18, 4],
    }),
    fontSize: animatedPlaceholder.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
  };

  const inputRef = useRef<TextInput>(null);

  const handleCase = (value: string) => {
    switch (textCase) {
      case 'upper':
        return value.toUpperCase();
      case 'lower':
        return value.toLowerCase();
      default:
        return value;
    }
  };

  const formatCardNumber = (inputValue: string) => {
    const cleaned = inputValue.replace(/\D/g, '');
    const spacedValue = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');

    return spacedValue;
  };

  const formatDateInput = (inputValue: string) => {
    const cleaned = inputValue.replace(/\D/g, '');
    let formattedValue = cleaned;

    if (cleaned.length > 2) {
      formattedValue = `${cleaned.slice(0, 2)}.${cleaned.slice(2, 4)}`;
    }
    if (cleaned.length > 4) {
      formattedValue = `${formattedValue.slice(0, 5)}.${cleaned.slice(4, 8)}`;
    }

    // Validate days, months, and years
    const parts = formattedValue.split('.');

    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10);
      const year = parseInt(parts[2], 10);

      if (day < 1 || day > 31) {
        formattedValue = formattedValue.slice(0, 2);
      }
      if (month < 1 || month > 12) {
        formattedValue = formattedValue.slice(0, 5);
      }
      if (year < 1900 || year > 2100) {
        formattedValue = formattedValue.slice(0, 10);
      }
    }

    return formattedValue;
  };

  const handleTextChange = (inputValue: string) => {
    let formattedValue = inputValue;

    if (maskType === MaskType.Date) {
      formattedValue = inputValue.replace(/\D/g, '');

      if (formattedValue.length > 2) {
        formattedValue = `${formattedValue.slice(0, 2)} . ${formattedValue.slice(2, 4)}`;
      }

      if (previousValue.length > inputValue.length && previousValue[inputValue.length] === '.') {
        formattedValue = formattedValue.slice(0, formattedValue.length - 3);
      }
    }

    if (maskType === MaskType.DateInput) {
      formattedValue = formatDateInput(inputValue);
    }

    if (isCardNumber) {
      const cleanedValue = inputValue.replace(/\s/g, '');

      formattedValue = formatCardNumber(cleanedValue);
      // Limit input to 16 digits (no spaces)
      if (cleanedValue.length > 16) {
        formattedValue = formatCardNumber(cleanedValue.slice(0, 16));
      }
    }

    setPreviousValue(handleCase(inputValue));
    onChangeText(handleCase(isCardNumber ? formattedValue.replace(/\s/g, '') : formattedValue));
  };

  const handleContentSizeChange = (event: {nativeEvent: {contentSize: {height: number}}}) => {
    // Disable on web to prevent infinite loops
    if (multiline && Platform.OS !== 'web') {
      const newHeight = Math.max(52, event.nativeEvent.contentSize.height + 22);
      // Prevent infinite loops by checking if height actually changed and using ref
      if (newHeight !== lastHeightRef.current) {
        lastHeightRef.current = newHeight;
        setInputHeight(newHeight);
      }
    }
  };

  return (
    <View style={[styles.container, hasError && styles.containerError, style]}>
      <Pressable
        style={[
          styles.inputContainer,
          {paddingTop: multiline ? -22 : 0},
          hasError && styles.inputError,
          {height: multiline ? inputHeight : 52},
          styleContainer,
          dark && {backgroundColor: colors.background},
          disabled && {backgroundColor: colors.content3},
        ]}
        onPress={() => inputRef?.current?.focus()}
        disabled={disabled}>
        {withMovingPlaceholder && (
          <Animated.Text style={[styles.placeholder, placeholderStyle]}>{placeholder}</Animated.Text>
        )}
        {iconLeft && (
          <Pressable onPress={onLeftIconPress} style={{height: '100%', justifyContent: 'center'}}>
            <Icon name={iconLeft} style={{marginRight: 4}} />
          </Pressable>
        )}
        <TextInput
          style={[
            styles.input,
            hasError && styles.inputError,
            !value && (inputRef?.current?.isFocused() ? styles.inputFocused : styles.inputUnfocused),
            !withMovingPlaceholder && {height: Platform.OS === 'ios' ? '90%' : '100%'},
            iconLeft && Platform.OS === 'android'
              ? {paddingTop: 0}
              : iconLeft && Platform.OS !== 'android'
                ? {marginBottom: 2}
                : undefined,
            dark && {backgroundColor: colors.background},
            disabled && {backgroundColor: colors.content3},
          ]}
          value={isCardNumber ? formatCardNumber(value ?? '') : (value ?? '')}
          onChangeText={handleTextChange}
          placeholder={withMovingPlaceholder ? '' : placeholder}
          placeholderTextColor={colors.primaryBlack}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            if (maskType === MaskType.Money) {
              if (!value?.includes('.') && value !== '') {
                onChangeText(`${value}.00`);
              }
            }
          }}
          keyboardType={isCardNumber ? 'numeric' : type}
          ref={inputRef}
          readOnly={disabled}
          maxLength={isCardNumber ? 19 : maxLength} // 19 to account for spaces in card number
          multiline={multiline} // Enable multiline input
          onContentSizeChange={handleContentSizeChange} // Handle content size change
          autoCapitalize={textCase ? 'characters' : 'none'}
          secureTextEntry={secureTextEntry}
        />
        {hasError && (
          <View style={{height: '100%', justifyContent: 'center', marginRight: 4}}>
            <Icon name="error" />
          </View>
        )}
        {iconRight && (
          <Pressable
            onPress={onIconPress}
            style={{height: '100%', justifyContent: 'center', opacity: disabledIcon ? 0.2 : 1}}
            disabled={disabledIcon}>
            <Icon name={iconRight} width={24} height={24} />
          </Pressable>
        )}
        {withClear && (value ?? '').length > 0 && (
          <Pressable onPress={() => onChangeText('')} style={{alignSelf: 'center', marginBottom: -4}}>
            <Icon name="cross" />
          </Pressable>
        )}
        {withIcon && (
          <Pressable onPress={onIconPress} style={{alignSelf: 'center', marginBottom: -4}}>
            <Icon name={icon || 'map'} />
          </Pressable>
        )}
      </Pressable>
      {hasError &&
        errorMessages.map(el => (
          <View style={styles.errorContainer} key={el}>
            <Text style={styles.errorText}>{el}</Text>
          </View>
        ))}
    </View>
  );
};
