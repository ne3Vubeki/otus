import React, {Component, createRef} from 'react';
import {
    KeyboardAvoidingView,
    ScrollView, StyleSheet, Text, View,
} from 'react-native';
import {Avatar, Button, Input} from 'react-native-elements';
import {Filter, Item} from '../../components';
import {MyHeader} from '../../components/MyHeader/MyHeader';

export class HomeView extends Component {

    static navigationOptions = {
        cardStyle: {
            backgroundColor: 'white',
        },
    };

    name: string = '';
    _input;

    componentDidMount(): void {
        this._input = createRef();
        this.props.fetchDatabase();
    }

    handleInput(text) {
        this.name = text;
    }

    handleAdd() {
        if (this.name) {
            this.props.addGuest({
                name: this.name,
                pair: false,
            });
            this._input.current.clear();
        }
    }

    render() {
        const changeStatus = (status, item) => {
            switch (this.props.status) {
                case 'one':
                    return !item.pair;
                case 'pair':
                    return item.pair;
                default:
                    return true;
            }
        };
        return (
            <>
                <MyHeader
                    title='Guest Book'
                    rightHeader={
                        !this.props.user || !this.props.user.avatar ?
                            <Avatar rounded icon={{name: 'person'}}
                                    size='small'
                                    onPress={() => this.props.navigation.navigate('Profile')}/> :
                            <Avatar rounded source={{uri: this.props.user.avatar}}
                                    size='small'
                                    onPress={() => this.props.navigation.navigate('Profile')}/>
                    }
                />
                <KeyboardAvoidingView>
                    <ScrollView keyboardShouldPersistTaps='always'>
                        <View style={styles.form}>
                            <Input ref={this._input} placeholder='Write Name Guest'
                                   onChangeText={(text) => this.handleInput(text)}/>
                            <Button containerStyle={styles.button} title="Add New Guest"
                                    onPress={() => this.handleAdd()}/>
                            <Filter guests={this.props.guests} status={this.props.status}
                                    filterStatus={this.props.filterStatus}/>
                        </View>
                        <>
                            {
                                this.props.guests.filter(item => changeStatus(this.props.status, item))
                                    .map(guest => {
                                        const {navigation, changeGuest, removeGuest} = this.props;
                                        return <Item key={guest.id}
                                                     guest={guest}
                                                     navigation={navigation}
                                                     changeGuest={changeGuest}
                                                     removeGuest={removeGuest}/>;
                                    })
                            }
                        </>
                    </ScrollView>
                </KeyboardAvoidingView>
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    view: {
        backgroundColor: 'white',
    },
    form: {
        padding: 10
    },
    textTitle: {
        fontSize: 30,
        marginTop: 20,
        textAlign: 'center',
    },
    button: {
        marginTop: 30,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
    },
});

