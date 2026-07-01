import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';

import CustomText from '../../components/atoms/CustomText';
import CustomInput from '../../components/atoms/CustomInput';
import CustomButton from '../../components/atoms/CustomButton';

import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');

  const handleLogin = () => {
    navigation.navigate('MainTabs');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.content}>

          {/* Logo */}
          <View style={styles.logoContainer}>
            <CustomText variant="h1">
              FluxPay
            </CustomText>

            <CustomText
              variant="body"
              style={styles.subtitle}
            >
              Kelola semua langgananmu dalam satu tempat
            </CustomText>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            <CustomInput
              label="Email"
              placeholder="Masukkan email"
              value={email}
              onChangeText={setEmail}
            />

            <CustomInput
              label="PIN"
              placeholder="Masukkan PIN"
              value={pin}
              onChangeText={setPin}
              isPassword
            />

            <CustomButton
              title="Masuk"
              onPress={handleLogin}
            />
          </View>

          {/* Register */}
          <View style={styles.footer}>
            <CustomText variant="body">
              Belum punya akun?
            </CustomText>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Register')
              }
            >
              <CustomText
                variant="body"
                style={styles.registerText}
              >
                Daftar
              </CustomText>
            </TouchableOpacity>
          </View>

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  keyboardContainer: {
    flex: 1,
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },

  logoContainer: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },

  subtitle: {
    marginTop: spacing.sm,
    textAlign: 'center',
    color: colors.textSecondary,
  },

  formContainer: {
    gap: spacing.lg,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.xl,
  },

  registerText: {
    color: colors.primary,
    marginLeft: spacing.xs,
  },
});