import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import CustomText from './CustomText';
import { colors } from '../../constants/colors';
import { radius } from '../../constants/radius';
import { spacing } from '../../constants/spacing';
import { typography } from '../../constants/typography';

export default function CustomInput({
  label,
  error,
  isPassword,
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(!isPassword);

  return (
    <View style={styles.container}>
      {label && (
        <CustomText variant="body" color={colors.textPrimary} style={styles.label}>
          {label}
        </CustomText>
      )}
      
      <View style={[
        styles.inputContainer,
        isFocused && styles.inputFocused,
        error && styles.inputError
      ]}>
        <TextInput
          style={styles.input}
          placeholderTextColor={colors.textSecondary}
          secureTextEntry={isPassword && !showPassword}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        
        {isPassword && (
          <TouchableOpacity 
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeButton}
          >
            <CustomText variant="caption" color={colors.textSecondary}>
              {showPassword ? 'Hide' : 'Show'}
            </CustomText>
          </TouchableOpacity>
        )}
      </View>

      {error && (
        <CustomText variant="caption" color={colors.error} style={styles.errorText}>
          {error}
        </CustomText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
    width: '100%',
  },
  label: {
    marginBottom: spacing.xs,
    fontFamily: typography.fontFamily.medium,
    fontWeight: typography.weights.medium,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
  },
  inputFocused: {
    borderColor: colors.primary,
  },
  inputError: {
    borderColor: colors.error,
  },
  input: {
    flex: 1,
    paddingVertical: spacing.md,
    color: colors.textPrimary,
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.sizes.body,
  },
  eyeButton: {
    padding: spacing.xs,
  },
  errorText: {
    marginTop: spacing.xs,
  }
});
