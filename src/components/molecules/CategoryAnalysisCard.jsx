// CARD BULAT PADA HALAMAN DASBOARD


import React, { useEffect, useState } from "react";
import {
    View,
    StyleSheet,
} from "react-native";

import { PieChart } from "react-native-gifted-charts";

import CustomText from "../atoms/CustomText";

import DashboardApi from "../../api/DashboardApi";

import { colors } from "../../constants/colors";
import { spacing } from "../../constants/spacing";
import { radius } from "../../constants/radius";
import { shadows } from "../../constants/shadows";

const categoryColors = {
    HIBURAN: "#4F46E5",
    PRODUKTIVITAS: "#7C6CF6",
    TOOLS: "#8B5CF6",
    KERJA: "#F97316",
    LAINNYA: "#C4B5FD",
};

export default function CategoryAnalysisCard() {

    const [pieData, setPieData] = useState([]);
    const [summary, setSummary] = useState([]);

    useEffect(() => {

        loadCategory();

    }, []);

    const loadCategory = async () => {

        try {

            const result =
                await DashboardApi.getCategorySummary();

            setSummary(result);

            const chartData = result.map((item) => ({

                value: item.total,

                color:
                    categoryColors[item.category] ||
                    categoryColors.LAINNYA,

                text: `${item.percentage}%`,

            }));

            setPieData(chartData);

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <View style={styles.container}>

            <CustomText
                variant="h3"
                style={styles.title}
            >
                Analisis Kategori
            </CustomText>

            <View style={styles.chartContainer}>

                {
                    pieData.length > 0 && (

                        <PieChart
                            data={pieData}
                            donut
                            radius={90}
                            innerRadius={55}
                            showText
                            textColor="white"
                            textSize={12}
                            focusOnPress={false}
                            strokeWidth={0}
                        />

                    )
                }

            </View>

            <View style={styles.legendCard}>

                {
                    summary.map((item) => (

                        <View
                            key={item.category}
                            style={styles.row}
                        >

                            <View
                                style={[
                                    styles.dot,
                                    {
                                        backgroundColor:
                                            categoryColors[item.category] ||
                                            categoryColors.LAINNYA,
                                    },
                                ]}
                            />

                            <CustomText variant="body">
                                {item.category}
                            </CustomText>

                            <View style={{ flex: 1 }} />

                            <CustomText variant="body">
                                {item.percentage}%
                            </CustomText>

                        </View>

                    ))
                }

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
        fontWeight: "700",
    },

    chartContainer: {
        alignItems: "center",
        marginBottom: spacing.lg,
    },

    legendCard: {
        backgroundColor: colors.surface,
        borderRadius: radius.lg,
        padding: spacing.lg,
        ...shadows.card,
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: spacing.md,
    },

    dot: {
        width: 14,
        height: 14,
        borderRadius: 7,
        marginRight: spacing.md,
    },

});