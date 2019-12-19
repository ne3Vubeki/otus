import React, {useCallback} from 'react';
import {Button, CheckBox, Input, Text, ListItem} from 'react-native-elements';
import {StyleSheet, View} from 'react-native';

export const Item = ({guest, removeGuest, changeGuest}) => {

    const handleInput = useCallback((text) => guest.name = text, [guest]);
    const handleChange = useCallback(() => {
        guest.open = !guest.open;
        guest.name ? changeGuest(guest) : removeGuest(guest.path);
    }, [guest]);
    const handleRemove = useCallback(() => removeGuest(guest.path), [guest]);
    const handleCheck = useCallback(() => changeGuest({...guest, pair: !guest.pair}), [guest]);
    const changeView = useCallback(() => {
        guest.open = !guest.open;
        changeGuest(guest);
    }, [guest]);

    return (
        <>
            {
                <ListItem onLongPress={changeView}
                          title={
                              <View style={styles.inline}>
                                  {
                                      !guest.open ?
                                          <Text style={styles.text}>{guest.name}</Text> :
                                          <Input autoFocus={true}
                                                 defaultValue={guest.name}
                                                 onChangeText={handleInput}
                                                 onBlur={handleChange}/>
                                  }
                                  {
                                      !guest.open ?
                                          <>
                                              <CheckBox title={'Pair'}
                                                        style={{flex:2}}
                                                        checked={guest.pair}
                                                        onPress={handleCheck}/>
                                              <Button title={'X'}
                                                      raised={false}
                                                      style={{flex:1}}
                                                      onPress={handleRemove}/>
                                          </> : null
                                  }
                              </View>
                          }
                          bottomDivider
                />
            }
        </>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        flex: 4,
        paddingLeft: 10
    },
    inline: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'baseline',
    },
});
