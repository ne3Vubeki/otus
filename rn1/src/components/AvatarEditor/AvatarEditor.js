import React, {useCallback} from 'react';
import {Avatar} from 'react-native-elements';
import {StyleSheet} from 'react-native';
import ImagePicker from 'react-native-image-picker';

export const AvatarEditor = ({user, changeAvatar}) => {

    const options = {
        title: 'Take Avatar',
        quality: .2,
        maxWidth: 200,
        maxHeight: 200,
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    };

    const handleEditAvatar = useCallback(() => {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                changeAvatar(response);
            }
        });
    }, [user, changeAvatar]);

    return (
        <>
            {
                !user || !user.avatar ?
                    <Avatar icon={{name: 'person'}}
                            size="xlarge"
                            containerStyle={styles.avatar}
                            onEditPress={handleEditAvatar}
                            showEditButton/> :
                    < Avatar source={{ uri: user.avatar }}
                             size="xlarge"
                             containerStyle={styles.avatar}
                             onEditPress={handleEditAvatar}
                             showEditButton/>
            }
        </>
    );
};

const styles = StyleSheet.create({
    avatar: {
        alignSelf: 'center',
    },
});
