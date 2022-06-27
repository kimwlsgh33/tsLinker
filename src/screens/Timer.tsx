import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, Button, StyleSheet, Text, View} from 'react-native';
import {Colors} from 'react-native-paper';
import * as D from '../data';
import {useTimeout} from '../hooks/useTimeout';
import {useToggle} from '../hooks/useToggle';

const Timer = () => {
  // const [loading, setLoading] = useState<boolean>(true);
  // const toggleLoading = useCallback(() => setLoading(loading => !loading), []);

  const [loading, toggleLoading] = useToggle(true);

  useTimeout(() => loading && toggleLoading(), 3000, [loading]);

  return (
    <View>
      <Text style={styles.text}>Timer</Text>
      <Text style={styles.text}>loading : {loading.toString()}</Text>
      <Button
        onPress={toggleLoading}
        title={loading ? 'stop loading' : 'start loading'}
      />
      {loading && (
        <ActivityIndicator size="large" color={Colors.deepPurple700} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  view: {flex: 1, alignItems: 'center', backgroundColor: Colors.yellow500},
  text: {fontSize: 30, fontWeight: '600'},
});

export default Timer;
