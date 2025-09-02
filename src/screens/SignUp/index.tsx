import {Button, Input, KeyboardContainerScroll, Spacer, Text} from '@components';
import React, {useState} from 'react';
import {Image, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import GradientBackground from 'src/components/GradientBackground';

import {registerThunk, resetRegisterThunk, useAppDispatch, useAppSelector} from 'src/store';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import AppIcon from '../../../assets/appIcon.png';
import {useStyles} from './styles';

export const SignUp = () => {
  const styles = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const {registerThunkErrors} = useAppSelector(state => state.auth);

  const handleRegister = () => {
    dispatch(resetRegisterThunk());
    dispatch(registerThunk({email, password}));
  };

  const validateEmail = (emailInput: string) => {
    if (emailInput === '') return true; // Email is optional

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(emailInput);
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (text && !validateEmail(text)) {
      setEmailError(['Invalid email']);
    } else {
      setEmailError([]);
    }
  };

  const disabled = !email || !password || emailError.length > 0 || !validateEmail(email) || password.length < 6;

  return (
    <GradientBackground locations={[0, 0.75]}>
      <SafeAreaView style={styles.container}>
        <KeyboardContainerScroll>
          <View style={styles.content}>
            <View style={styles.textContainer}>
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/* @ts-ignore */}
              <Image source={AppIcon} style={styles.appIcon} />
              <Text variant="header" size={28} style={styles.title} center>
                Sign Up
              </Text>

              <View style={styles.inputContainer}>
                <Text variant="body" size={18} style={styles.subtitle} center>
                  Please enter your email and password to sign up.
                </Text>
                <View>
                  <Input value={email} onChangeText={handleEmailChange} placeholder="Enter your email" />
                  {emailError.length > 0 && (
                    <Text variant="body" size={14} color="danger400" style={styles.errorText}>
                      {emailError.map(error => error).join(', ')}
                    </Text>
                  )}
                </View>
                <Input value={password} onChangeText={text => setPassword(text)} placeholder="Enter your password" />
              </View>
            </View>

            <View>
              {registerThunkErrors && registerThunkErrors.length > 0 && (
                <Text variant="body" size={14} color="danger400" style={{flex: 1}} center>
                  {registerThunkErrors.map(error => error).join(', ')}
                </Text>
              )}
              <Spacer size="l" />
              <View style={styles.btnContainer}>
                <Button text="Sign Up" type="primary" onPress={handleRegister} disabled={disabled} />
              </View>
            </View>
          </View>
        </KeyboardContainerScroll>
      </SafeAreaView>
    </GradientBackground>
  );
};
