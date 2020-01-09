import React, {Component} from 'react';
import {KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, TextInput, View} from 'react-native';
import {Button} from 'react-native-elements';

interface IProps {
    guest: any;
    changeGuest: (comment) => {}
}

export class Detail extends Component<IProps> {

    static navigationOptions = {
        headerTitle: this.guest.name,
    };

    comment: string;
    isSaved: boolean;

    constructor(props: IProps) {
        super(props);
        this.comment = this.guest.comment;
        this.isSaved = true;
        this.handleChange.bind(this);
        this.handleSave.bind(this);
    }

    static guest() {
        return this.props.navigation.getParam('guest');
    }

    handleChange(text) {
        this.comment = text;
        this.isSaved = false;
    }

    handleSave() {
        this.guest.comment = this.comment;
        this.props.changeGuest(this.guest);
        this.isSaved = true;
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
                                    disabled={this.isSaved}
                                    title="Save Comment"
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
        borderColor: 'gray',
        borderWidth: 1,
        padding: 5
    },
    textArea: {
        height: 150,
        justifyContent: "flex-start"
    }
});
