import React, {Component, useState} from 'react';
import {KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, TextInput, View} from 'react-native';
import {Button} from 'react-native-elements';

interface IProps {
    navigation: any;
    changeGuest: (quest) => {};
}

export class Detail extends Component<IProps> {

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: navigation.getParam('guest').name,
        }
    };

    guest: any;
    comment: string;

    constructor(props: IProps) {
        super(props);
        this.state = {
            isChange: false
        };
        this.guest = this.props.navigation.getParam('guest');
        this.comment = this.guest.comment;
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    handleChange(text) {
        this.comment = text;
        this.setState({isChange: true});
    }

    handleSave() {
        if(this.guest.comment !== this.comment) {
            this.guest.comment = this.comment;
            this.props.changeGuest(this.guest);
            this.setState({isChange: false});
        }
    }

    render() {
        return (
            <SafeAreaView>
                <KeyboardAvoidingView behavior='position'>
                    <ScrollView keyboardShouldPersistTaps='always'>
                        <View style={styles.textAreaContainer}>
                            <TextInput
                                style={styles.textArea}
                                underlineColorAndroid="transparent"
                                placeholder="Comment"
                                placeholderTextColor="grey"
                                numberOfLines={10}
                                multiline={true}
                                defaultValue={this.comment}
                                onChangeText={this.handleChange}
                            />
                            <Button style={styles.button}
                                    title="Save Comment"
                                    disabled={!this.state.isChange}
                                    onPress={this.handleSave}/>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        marginTop: 10,
    },
    textAreaContainer: {
        padding: 10,
    },
    textArea: {
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        height: 150
    }
});
