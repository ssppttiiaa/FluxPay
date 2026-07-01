import React from 'react';
import {
    View,
    TextInput,
    StyleSheet,
} from 'react-native';

import CustomText from '../atoms/CustomText';

import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';
import { radius } from '../../constants/radius';
import { Ionicons } from '@expo/vector-icons';

export default function SearchBar({
    value,
    onChangeText,
}) {
    return (
        <View style={styles.container}>

            <Ionicons
                name="search-outline"
                size={20}
                color={colors.textSecondary}
                style={styles.icon}
            />

            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder="Cari transaksi..."
                placeholderTextColor={colors.textSecondary}
                style={styles.input}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 56,

        backgroundColor: colors.surface,

        borderWidth: 1,
        borderColor: colors.border,

        borderRadius: radius.md,

        paddingHorizontal: spacing.md,
        marginBottom: spacing.md,
    },

    icon: {
        marginRight: spacing.sm,
    },

    input: {
        flex: 1,
        paddingVertical: 16,
        color: colors.textPrimary,
        fontSize: 16,
    },
});