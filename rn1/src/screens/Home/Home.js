import React, {useRef, useEffect} from 'react';
import {
    KeyboardAvoidingView,
    SafeAreaView,
    ScrollView, StyleSheet, Text,
} from 'react-native';
import {Button, Input, ListItem} from 'react-native-elements';
import {Filter, Item} from '../../components';

export const Home = ({navigation, guests, status, addGuest, changeGuest, removeGuest, filterStatus, fetchDatabase}) => {

    useEffect(() => {
        fetchDatabase();
    }, []);

    let name = '';
    const filter = guests.filter(item => {
        switch (status) {
            case 'one':
                return !item.pair;
            case 'pair':
                return item.pair;
            default:
                return true;
        }
    });
    const _input = useRef();
    const handleInput = (text) => name = text;
    const handleAdd = () => {
        if (name) {
            addGuest({
                name: name,
                pair: false,
            });
            _input.current.clear();
        }
    };

    return (
        <SafeAreaView>
            <KeyboardAvoidingView>
                <ScrollView keyboardShouldPersistTaps='always'>
                    <ListItem
                        title={
                            <Text style={styles.textTitle}>Guest Book</Text>
                        }
                        subtitle={
                            <>
                                <Input ref={_input} placeholder='Write Name Guest' onChangeText={handleInput}/>
                                <Button style={styles.button} title="Add New Guest" onPress={handleAdd}/>
                                <Filter guests={guests} status={status} filterStatus={filterStatus}/>
                            </>
                        }
                    />
                    <>
                        {
                            filter.map(guest => <Item key={guest.id}
                                                      guest={guest}
                                                      navigation={navigation}
                                                      changeGuest={changeGuest}
                                                      removeGuest={removeGuest}/>)
                        }
                    </>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        backgroundColor: 'white',
    },
    textTitle: {
        fontSize: 30,
        marginTop: 20,
        textAlign: 'center',
    },
    button: {
        marginTop: 10,
    },
});

