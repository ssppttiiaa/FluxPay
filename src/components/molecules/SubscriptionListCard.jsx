// Halaman Langganan

import React from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

import CustomText from '../atoms/CustomText';

import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';
import { radius } from '../../constants/radius';
import { shadows } from '../../constants/shadows';

export default function SubscriptionListCard({
    logo,
    name,
    category,
    dueDate,
    price,
    onPress,
}) {

    const getBadgeColor = () => {
        switch (category) {
            case 'HIBURAN':
                return '#EF4444';

            case 'PRODUKTIVITAS':
                return '#06B6D4';

            case 'TOOLS':
                return '#8B5CF6';

            case 'KERJA':
                return '#F97316';

            default:
                return colors.primary;
        }
    };

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={styles.card}
            onPress={onPress}
        >
            <View style={styles.topRow}>

                <View style={styles.logo}>
                    <CustomText variant="h3">
                        {logo}
                    </CustomText>
                </View>

                <View
                    style={[
                        styles.badge,
                        {
                            backgroundColor: `${getBadgeColor()}20`,
                        },
                    ]}
                >
                    <CustomText
                        variant="caption"
                        color={getBadgeColor()}
                    >
                        {category}
                    </CustomText>
                </View>

            </View>

            <CustomText
                variant="body"
                style={styles.title}
            >
                {name}
            </CustomText>

            <CustomText
                variant="caption"
                color={colors.textSecondary}
            >
                Jatuh tempo: {dueDate}
            </CustomText>

            <View style={styles.bottomRow}>

                <CustomText
                    variant="h3"
                    color={colors.primary}
                >
                    {price}
                </CustomText>

                <TouchableOpacity style={styles.manageButton}>
                    <CustomText
                        variant="caption"
                        color={colors.primary}
                    >
                        Kelola
                    </CustomText>
                </TouchableOpacity>

            </View>

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.surface,
        borderRadius: radius.lg,
        padding: spacing.md,
        marginBottom: spacing.md,

        borderWidth: 1,
        borderColor: '#F2F2F2',

        ...shadows.card,
    },

    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    logo: {
        width: 48,
        height: 48,
        borderRadius: radius.md,
        backgroundColor: '#F8F8F8',

        justifyContent: 'center',
        alignItems: 'center',
    },

    badge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
    },

    title: {
        marginTop: spacing.md,
        marginBottom: spacing.xs,
    },

    bottomRow: {
        marginTop: spacing.md,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    manageButton: {
        backgroundColor: '#EFEAFF',
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: radius.md,
    },
});