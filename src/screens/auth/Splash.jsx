import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';

import CustomText from '../../components/atoms/CustomText';

import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';

export default function SplashScreen({ navigation }) {

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
      // Jika nanti ada onboarding:
      // navigation.replace('Onboarding');
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.content}>

        {/* Logo */}
        <View style={styles.logo}>
          <CustomText variant="h1" style={styles.logoText}>
            💜
          </CustomText>
        </View>

        {/* Nama Aplikasi */}
        <CustomText
          variant="h1"
          style={styles.title}
        >
          FluxPay
        </CustomText>

        {/* Tagline */}
        <CustomText
          variant="body"
          style={styles.subtitle}
        >
          Kelola semua langgananmu
          {'\n'}
          dalam satu aplikasi.
        </CustomText>

      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <CustomText
          variant="caption"
          style={styles.footerText}
        >
          Version 1.0.0
        </CustomText>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.xxl,
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },

  logoText: {
    fontSize: 52,
  },

  title: {
    color: colors.surface,
    marginBottom: spacing.sm,
  },

  subtitle: {
    color: colors.surface,
    textAlign: 'center',
    opacity: 0.9,
  },

  footer: {
    marginBottom: spacing.md,
  },

  footerText: {
    color: colors.surface,
    opacity: 0.8,
  },

});