// Header halaman langganan saya


import React from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';


import CustomText from '../atoms/CustomText';

import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';

export default function SubscriptionHeader() {
    return (
        <View style={styles.container}>

            <TouchableOpacity style={styles.iconButton}>
                <Ionicons
                    name="menu-outline"
                    size={28}
                    color={colors.primary}
                />
            </TouchableOpacity>

            <View style={styles.titleContainer}>
                <CustomText variant="h2"
                    color={colors.primary}
                >
                    Langganan Saya

                </CustomText>

                <CustomText
                    variant="caption"
                    color={colors.textSecondary}
                >
                    Kelola semua langgananmu
                </CustomText>
            </View>

            <TouchableOpacity style={styles.iconButton}>
                <Ionicons
                    name="search-outline"
                    size={24}
                    color={colors.primary}
                />
            </TouchableOpacity>


        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

        marginBottom: 24,
    },

    titleContainer: {
        flex: 1,
        marginHorizontal: 16,
    },

    iconButton: {
        width: 42,
        height: 42,

        justifyContent: 'center',
        alignItems: 'center',
    },

});