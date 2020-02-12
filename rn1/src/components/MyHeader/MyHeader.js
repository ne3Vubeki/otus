import React, {useCallback} from 'react';
import {Avatar, Header, Icon} from 'react-native-elements';
import {SafeAreaView, StyleSheet} from 'react-native';
import ImagePicker from 'react-native-image-picker';

export const MyHeader = ({title, navigation, isBackNav, rightHeader}) => {

    const backIcon = isBackNav ?
        <Icon name='ios-arrow-back'
              style={styles.back}
              type='ionicon'
              onPress={() => navigation.goBack()}/>
        : undefined;

    return (
        <Header
            leftComponent={backIcon}
            centerComponent={{text: title, style: styles.title}}
            rightComponent={rightHeader}
            containerStyle={styles.header}
        />
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'white',
        paddingTop: 0,
        maxHeight: 50,
    },
    title: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
    },
    back: {
        color: '#cfcfcf',
    },
});
