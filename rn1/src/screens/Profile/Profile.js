import React, {Component} from 'react';
import {Alert, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {AvatarEditor} from '../../components';
import {MyHeader} from '../../components/MyHeader/MyHeader';
import {cloneDeep} from 'lodash'

interface IProps {
    navigation: any;
    user: any;
    changeUser: (user, type) => {};
    logoutUser: () => {};
}

export class Profile extends Component<IProps> {

    static navigationOptions = {
        cardStyle: {
            backgroundColor: 'white',
        },
    };

    user: any;

    constructor(props: IProps) {
        super(props);
        this.state = {
            isChange: false,
            isChangeAvatar: false
        };
        this.user = cloneDeep(this.props.user);
        this.handleSave = this.handleSave.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleEditAvatar = this.handleEditAvatar.bind(this);
        this.handleClear = this.handleClear.bind(this);
    }

    handleSave() {
        this.props.changeUser(this.user, this.state.isChangeAvatar && this.state.isChangeName ? 0 : (this.state.isChangeAvatar ? 1 : -1));
        this.setState({ isChangeName: false, isChangeAvatar: false });
        this.props.navigation.goBack();
    }

    handleInput(text) {
        this.user.name = text;
        this.setState({ isChangeName: true });
    }

    handleLogout() {
        this.props.logoutUser(this.props.navigation);
    }

    handleEditAvatar(response) {
        this.user.avatar = response.uri;
        this.setState({ isChangeAvatar: true })
    }

    handleClear() {
        Alert.alert(
            'Clear Photo',
            'Do you want remove photo on avatar?',
            [
                {
                    text: 'Cancel',
                    onPress: () => {},
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: () => {
                        this.user.avatar = '';
                        this.setState({ isChangeAvatar: true })
                    }
                },
            ],
            {cancelable: false},
        );
    }

    render() {
        return (
            <SafeAreaView>
                <MyHeader
                    title={this.props.user ? this.props.user.name || this.props.user.email : ''}
                    navigation={this.props.navigation}
                    isBackNav
                />
                <KeyboardAvoidingView behavior='position'>
                    <ScrollView keyboardShouldPersistTaps='always'>
                        <View style={{backgroundColor: 'white'}}>
                            <AvatarEditor user={this.user}
                                          changeAvatar={this.handleEditAvatar}/>
                            <Button type='clear'
                                    title="Clear Photo"
                                    disabled={!this.user.avatar}
                                    onPress={this.handleClear}/>
                            <Input ref={this._input}
                                   containerStyle={styles.input}
                                   defaultValue={this.user.name}
                                   placeholder='Enter you name'
                                   onChangeText={this.handleInput}/>
                            <Button style={styles.button}
                                    disabled={!this.state.isChangeName && !this.state.isChangeAvatar}
                                    title="Save Profile"
                                    onPress={this.handleSave}/>
                            <Button style={styles.button2}
                                    type='outline'
                                    title="Log Out"
                                    onPress={this.handleLogout}/>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    };
}

const styles = StyleSheet.create({
    input: {
        margin: 0,
    },
    button: {
        margin: 20,
    },
    button2: {
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 40,
    },
});
