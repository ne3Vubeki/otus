import React, {useCallback, useState} from 'react';
import {Button, CheckBox, Input, Text, ListItem} from 'react-native-elements';
import {Animated, StyleSheet, View} from 'react-native';

export const Item = ({guest, navigation, removeGuest, changeGuest}) => {

    // const [scale] = useState(new Animated.Value(1));
    // const animation = [
    //     Animated.timing(scale, {
    //         toValue: 0,
    //         useNativeDriver: true,
    //         duration: 300
    //     })
    // ];
    const handleInput = useCallback((text) => guest.name = text, [guest]);
    const handleChange = useCallback(() => {
        guest.open = !guest.open;
        guest.name ? changeGuest(guest) : removeGuest(guest);
    }, [guest]);
    const handleRemove = useCallback(() => {
        removeGuest(guest);
        // Animated.sequence(animation).start(fn);
    }, [guest]);
    const handleCheck = useCallback(() => changeGuest({...guest, pair: !guest.pair}), [guest]);
    const changeView = useCallback(() => {
        guest.open = !guest.open;
        changeGuest(guest);
    }, [guest]);
    const handlePress = useCallback(() => navigation.navigate('Detail', { guest: guest }), [guest]);

    return (
        <>
            {
                <ListItem onLongPress={changeView}
                          onPress={handlePress}
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
