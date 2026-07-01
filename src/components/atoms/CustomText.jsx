import React from 'react';
import { Text, StyleSheet } from 'react-native';

import { colors } from '../../constants/colors';
import { typography } from '../../constants/typography';
console.log('Typography =', typography);

// Variants: h1, h2, h3, body, caption, button
export default function CustomText({
  children,
  variant = 'body',
  color = colors.textPrimary,
  style,
  ...props
}) {
  return (
    <Text
      style={[styles[variant] || styles.body, { color }, style]}
      {...props}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  h1: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.sizes.h1,
    fontWeight: typography.weights.bold,
  },

  h2: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.sizes.h2,
    fontWeight: typography.weights.bold,
  },

  h3: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.sizes.h3,
    fontWeight: typography.weights.semiBold,
  },

  body: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.sizes.body,
    fontWeight: typography.weights.regular,
  },

  caption: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.sizes.caption,
    fontWeight: typography.weights.regular,
  },

  button: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.sizes.button,
    fontWeight: typography.weights.bold,
  },
});