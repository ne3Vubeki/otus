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


export class AuthView extends Component {

    login: string;
    password: string;

    componentDidMount(): void {
        const {user} = this.props;
        if(user && Object.keys(user).length) {
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
            <>
                <KeyboardAvoidingView behavior='position'>
                    <ScrollView keyboardShouldPersistTaps='always'>
                        <View style={styles.view}>
                            <View>
                                <Input
                                    containerStyle={styles.input}
                                    placeholder='Email'
                                    value={this.login}
                                    onChangeText={(text) => this.handleMail(text)}
                                />
                                <Input
                                    placeholder='Password'
                                    value={this.password}
                                    onChangeText={(text) => this.handlePassword(text)}
                                />
                                <Button
                                    containerStyle={styles.button}
                                    title="LOGIN"
                                    onPress={() => this.handleLogin()}
                                />
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </>
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
