import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import CustomText from '../../components/atoms/CustomText';
import CustomInput from '../../components/atoms/CustomInput';
import CustomButton from '../../components/atoms/CustomButton';

import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');

  const handleRegister = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <CustomText variant="h1">
              Buat Akun
            </CustomText>

            <CustomText
              variant="body"
              style={styles.subtitle}
            >
              Daftar untuk mulai mengelola semua langgananmu
            </CustomText>
          </View>

          <View style={styles.formContainer}>
            <CustomInput
              label="Nama Lengkap"
              placeholder="Masukkan nama lengkap"
              value={name}
              onChangeText={setName}
            />

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

            <CustomInput
              label="Konfirmasi PIN"
              placeholder="Masukkan ulang PIN"
              value={confirmPin}
              onChangeText={setConfirmPin}
              isPassword
            />

            <CustomButton
              title="Daftar"
              onPress={handleRegister}
            />
          </View>

          <View style={styles.footer}>
            <CustomText variant="body">
              Sudah punya akun?
            </CustomText>

            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
            >
              <CustomText
                variant="body"
                style={styles.loginText}
              >
                Masuk
              </CustomText>
            </TouchableOpacity>
          </View>
        </ScrollView>
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

  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xxl,
  },

  header: {
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

  loginText: {
    color: colors.primary,
    marginLeft: spacing.xs,
  },
});