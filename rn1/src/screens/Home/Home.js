import React, {Component, createRef} from 'react';
import {
    KeyboardAvoidingView,
    SafeAreaView,
    ScrollView, StyleSheet, Text,
} from 'react-native';
import {Avatar, Button, Input, ListItem} from 'react-native-elements';
import {Filter, Item} from '../../components';
import {MyHeader} from '../../components/MyHeader/MyHeader';

interface IProps {
    navigation: any;
    guests: any;
    user: any;
    status: any;
    addGuest: any;
    changeGuest: any;
    removeGuest: any;
    filterStatus: any;
    fetchDatabase: any;
}

export class Home extends Component<IProps> {

    static navigationOptions = {
        cardStyle: {
            backgroundColor: 'white',
        },
    };

    name: string = '';
    filter: any[];
    _input;

    constructor(props: IProps) {
        super(props);
        this._input = createRef();
        this.handleAdd = this.handleAdd.bind(this);
        this.handleInput = this.handleInput.bind(this);
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
        this.filter = this.props.guests.filter(item => {
            switch (this.props.status) {
                case 'one':
                    return !item.pair;
                case 'pair':
                    return item.pair;
                default:
                    return true;
            }
        });
        return (
            <SafeAreaView>
                <MyHeader
                    title='Home'
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
                        <ListItem
                            title={
                                <Text style={styles.textTitle}>Guest Book</Text>
                            }
                            subtitle={
                                <>
                                    <Input ref={this._input} placeholder='Write Name Guest'
                                           onChangeText={this.handleInput}/>
                                    <Button style={styles.button} title="Add New Guest" onPress={this.handleAdd}/>
                                    <Filter guests={this.props.guests} status={this.props.status}
                                            filterStatus={this.props.filterStatus}/>
                                </>
                            }
                        />
                        <>
                            {
                                this.filter.map(guest => <Item key={guest.id}
                                                               guest={guest}
                                                               navigation={this.props.navigation}
                                                               changeGuest={this.props.changeGuest}
                                                               removeGuest={this.props.removeGuest}/>)
                            }
                        </>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
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
    textTitle: {
        fontSize: 30,
        marginTop: 20,
        textAlign: 'center',
    },
    button: {
        marginTop: 10,
    },
});

