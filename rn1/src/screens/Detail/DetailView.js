import React, {Component} from 'react';
import {KeyboardAvoidingView, ScrollView, StyleSheet, TextInput, View} from 'react-native';
import {Button} from 'react-native-elements';
import {MyHeader} from '../../components/MyHeader/MyHeader';

export class DetailView extends Component {

    static navigationOptions = {
        cardStyle: {
            backgroundColor: 'white',
        },
    };

    guest: any;

    constructor(props) {
        super(props);
        this.guest = this.props.navigation.getParam('guest');
        this.state = {
            isChange: false,
            comment: this.guest.comment
        };
    }

    handleChange(text) {
        this.setState({comment: text, isChange: true});
    }

    handleSave() {
        if (this.guest.comment !== this.state.comment) {
            this.guest.comment = this.state.comment;
            this.props.changeGuest(this.guest);
            this.setState({isChange: false});
        }
    }

    render() {
        const {comment, isChange} = this.state;
        return (
            <>
                <MyHeader
                    title={this.guest.name || ''}
                    navigation={this.props.navigation}
                    isBackNav
                />
                <KeyboardAvoidingView behavior='position'>
                    <ScrollView keyboardShouldPersistTaps='always'>
                        <View style={styles.textAreaContainer}>
                            <TextInput
                                testID='textinput_desc'
                                style={styles.textArea}
                                underlineColorAndroid="transparent"
                                placeholder="Comment"
                                placeholderTextColor="grey"
                                numberOfLines={10}
                                multiline={true}
                                defaultValue={comment}
                                onChangeText={($event) => this.handleChange($event)}
                            />
                            <Button style={styles.button}
                                    testID='text_save'
                                    title="Save Comment"
                                    disabled={!isChange}
                                    onPress={() => this.handleSave()}/>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </>
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
        height: 150,
    },
});
