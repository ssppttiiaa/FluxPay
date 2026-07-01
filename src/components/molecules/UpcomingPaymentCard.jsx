import React from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

import CustomText from '../atoms/CustomText';

import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';
import { radius } from '../../constants/radius';
import { shadows } from '../../constants/shadows';

export default function UpcomingPaymentCard({
    service = 'Netflix Premium',
    dueDate = '28 Oktober 2026',
    amount = 'Rp186.000',
    onPress,
}) {
    return (
        <View style={styles.card}>

            <View style={styles.left}>

                <View style={styles.icon}>
                    <CustomText variant="h3">
                        🎬
                    </CustomText>
                </View>

                <View style={styles.info}>

                    <CustomText
                        variant="body"
                        style={styles.service}
                    >
                        {service}
                    </CustomText>

                    <CustomText
                        variant="caption"
                        color={colors.textSecondary}
                    >
                        Jatuh Tempo
                    </CustomText>

                    <CustomText
                        variant="caption"
                        color={colors.error}
                    >
                        {dueDate}
                    </CustomText>

                </View>

            </View>

            <View style={styles.right}>

                <CustomText
                    variant="body"
                    style={styles.amount}
                >
                    {amount}
                </CustomText>

                <TouchableOpacity
                    style={styles.button}
                    onPress={onPress}
                >
                    <CustomText
                        variant="caption"
                        color={colors.surface}
                    >
                        Lihat Kalender
                    </CustomText>
                </TouchableOpacity>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({

    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        backgroundColor: colors.surface,

        borderRadius: radius.lg,

        padding: spacing.md,

        marginBottom: spacing.lg,

        ...shadows.card,
    },

    left: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },

    icon: {
        width: 54,
        height: 54,

        borderRadius: radius.md,

        backgroundColor: '#F5F3FF',

        justifyContent: 'center',
        alignItems: 'center',

        marginRight: spacing.md,
    },

    info: {
        flex: 1,
    },

    service: {
        fontWeight: '700',
        marginBottom: 4,
    },

    right: {
        alignItems: 'flex-end',
    },

    amount: {
        fontWeight: '700',
        marginBottom: 10,
    },

    button: {
        backgroundColor: colors.primary,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },

});