import React, {Component} from 'react';
import auth from '@react-native-firebase/auth';
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import {Button, Input} from 'react-native-elements';

interface IProps {
    user: any;
    navigation: any;
    loginUser: (mail, pass) => {};
}

export class Auth extends Component<IProps> {

    login: string;
    password: string;

    constructor(props: IProps) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleMail = this.handleMail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
    }

    componentDidMount(): void {
        if(this.props.user && Object.keys(this.props.user).length) {
            this.props.navigation.navigate('Home');
        }
    }

    handleLogin() {
        this.props.loginUser(this.login, this.password, this.props.navigation);
    }

    handleMail(text) {
        this.login = text;
    }

    handlePassword(text) {
        this.password = text;
    }


    render() {
        return (
            <SafeAreaView>
                <KeyboardAvoidingView behavior='position'>
                    <ScrollView keyboardShouldPersistTaps='always'>
                        <View style={styles.view}>
                            <View>
                                <Input
                                    containerStyle={styles.input}
                                    placeholder='Email'
                                    value={this.login}
                                    onChangeText={this.handleMail}
                                />
                                <Input
                                    placeholder='Password'
                                    value={this.password}
                                    onChangeText={this.handlePassword}
                                />
                                {this.props.loading && <ActivityIndicator />}
                                <Button
                                    containerStyle={styles.button}
                                    title="LOGIN"
                                    onPress={this.handleLogin}
                                />
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        margin: 20
    },
    button: {
        marginTop: 40
    },
    input: {
        marginTop: 20,
        marginBottom: 20
    }
});
