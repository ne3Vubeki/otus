import React, {useCallback} from 'react';
import {Badge, ButtonGroup, Text} from 'react-native-elements';
import {StyleSheet, View} from 'react-native';

export const Filter = ({guests, status = 'all', filterStatus}) => {

    const statuses = ['all', 'one', 'pair'];
    const handleFilter = useCallback((index) => {
        filterStatus(statuses[index]);
    }, [guests]);

    const allGuests = guests.length;
    const oneGuests = guests.filter(item => !item.pair).length;
    const pairGuests = guests.filter(item => item.pair).length;

    const all = () => <View style={styles.buttons}>
        <Text>All</Text>
        <Badge status="success" value={allGuests}/>
    </View>;
    const one = () => <View style={styles.buttons}>
        <Text>One guest</Text>
        <Badge status="warning" value={oneGuests}/>
    </View>;
    const pair = () => <View style={styles.buttons}>
        <Text>Pair guests</Text>
        <Badge status="primary" value={pairGuests}/>
    </View>;

    const buttons = [{ element: all }, { element: one }, { element: pair }];

    return (
        <>
            <ButtonGroup
                onPress={handleFilter}
                selectedIndex={statuses.indexOf(status)}
                buttons={buttons}
                containerStyle={{height: 30}} />
        </>
    );
};

const styles = StyleSheet.create({
    buttons: {
        flexDirection:'row',
        flexWrap:'wrap'
    },
});
