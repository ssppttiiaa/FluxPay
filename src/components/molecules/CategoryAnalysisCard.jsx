import React from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';

import { PieChart } from 'react-native-gifted-charts';

import CustomText from '../atoms/CustomText';

import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';
import { radius } from '../../constants/radius';
import { shadows } from '../../constants/shadows';

const pieData = [
    {
        value: 56,
        color: '#4F46E5',
        text: '56%',
    },
    {
        value: 32,
        color: '#7C6CF6',
        text: '32%',
    },
    {
        value: 12,
        color: '#C4B5FD',
        text: '12%',
    },
];

export default function CategoryAnalysisCard() {
    return (
        <View style={styles.container}>

            <CustomText variant="h3" style={styles.title}>
                Analisis Kategori
            </CustomText>

            <View style={styles.chartContainer}>
                <PieChart
                    data={pieData}
                    donut
                    radius={90}
                    innerRadius={52}
                    showText
                    textColor="white"
                    textSize={12}
                    focusOnPress={false}
                    strokeWidth={0}
                />
            </View>

            <View style={styles.legendCard}>

                <View style={styles.row}>
                    <View style={[styles.dot, { backgroundColor: '#4F46E5' }]} />
                    <CustomText variant="body">
                        Hiburan
                    </CustomText>

                    <View style={{ flex: 1 }} />

                    <CustomText variant="body">
                        56%
                    </CustomText>
                </View>

                <View style={styles.row}>
                    <View style={[styles.dot, { backgroundColor: '#7C6CF6' }]} />
                    <CustomText variant="body">
                        Produktivitas
                    </CustomText>

                    <View style={{ flex: 1 }} />

                    <CustomText variant="body">
                        32%
                    </CustomText>
                </View>

                <View style={styles.row}>
                    <View style={[styles.dot, { backgroundColor: '#C4B5FD' }]} />
                    <CustomText variant="body">
                        Lainnya
                    </CustomText>

                    <View style={{ flex: 1 }} />

                    <CustomText variant="body">
                        12%
                    </CustomText>
                </View>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        marginBottom: spacing.lg,
    },

    title: {
        marginBottom: spacing.md,
        fontWeight: '700',
    },

    chartContainer: {
        alignItems: 'center',
        marginBottom: spacing.lg,
    },

    legendCard: {
        backgroundColor: colors.surface,
        borderRadius: radius.lg,
        padding: spacing.lg,
        ...shadows.card,
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.md,
    },

    dot: {
        width: 14,
        height: 14,
        borderRadius: 7,
        marginRight: spacing.md,
    },

});