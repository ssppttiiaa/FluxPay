// Header halaman dasboard


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

export default function HomeHeader() {
    return (
        <View style={styles.container}>

            <View style={styles.left}>

                <View style={styles.avatar}>
                    <CustomText variant="body" color="#FFFFFF">
                        R
                    </CustomText>
                </View>

                <View style={styles.info}>
                    <CustomText
                        variant="caption"
                        color={colors.textSecondary}
                    >
                        Halo,
                    </CustomText>

                    <CustomText
                        variant="body"
                        style={styles.name}
                    >
                        Ribbi Dwi Pimingkis
                    </CustomText>

                </View>

            </View>

            <TouchableOpacity style={styles.notification}>
                <Ionicons
                    name="notifications-outline"
                    size={28}
                    color={colors.primary}
                />
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },

    left: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#D9CCFF',

        justifyContent: 'center',
        alignItems: 'center',
    },

    info: {
        marginLeft: 12,
    },

    name: {
        fontWeight: '700',
    },

    notification: {
        width: 44,
        height: 44,

        justifyContent: 'center',
        alignItems: 'center',
    },

});