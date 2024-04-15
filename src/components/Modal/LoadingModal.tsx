import React from 'react';
import {
    View,
    Modal,
    StyleSheet,
    Text,
    ActivityIndicator,
    StyleProp,
    ViewStyle,
} from 'react-native';
import Theme from '@theme';

interface Props {
    modalVisible?: boolean;
    color?: string;
    title: string;
    modalStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<ViewStyle>;
}

export default function LoadingModal(props: Props) {
    const { modalVisible, title, color = Theme.PRIMARY, modalStyle, textStyle } = props;
    return (
        <Modal animationType="fade" transparent visible={modalVisible} statusBarTranslucent>
            <View style={styles.centeredView}>
                <View style={[styles.modalView, modalStyle]}>
                    <ActivityIndicator size="large" color={color} />
                    <Text style={[styles.modalText, textStyle]}>{title}</Text>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0008',
    },
    modalView: {
        margin: 20,
        width: 200,
        height: 70,
        backgroundColor: 'white',
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    modalText: {
        marginVertical: 15,
        textAlign: 'center',
        fontSize: 16,
        marginLeft: 15,
        color: Theme.PLACE_HOLDER_TEXT_COLOR,
    },
});
