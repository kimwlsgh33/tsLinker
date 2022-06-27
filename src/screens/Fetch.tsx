import React, {Children, useCallback, useEffect, useState} from 'react';
import type {FC} from 'react';
import {StyleSheet} from 'react-native';
import {
  NavigationHeader,
  TopBar,
  MyView,
  MyText,
  UnderlineText,
  MySafeAreaView,
} from '../theme';
import {ActivityIndicator, Colors} from 'react-native-paper';

const title = 'Counter';

const Fetch: FC = () => {
  const [humorText, setHumorText] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const getHumor = useCallback(() => {
    setHumorText('');
    setErrorMessage('');
    setLoading(true);

    fetch('https://api.chucknorris.io/jokes/random')
      .then(res => res.json())
      .then(result => {
        setHumorText(result.value);
        setLoading(false);
      })
      .catch(e => {
        setErrorMessage(e.message);
        setLoading(false);
      });
  }, []);

  useEffect(getHumor, []);
  // store에 저장된 counter state 불러오기
  return (
    <MySafeAreaView>
      <NavigationHeader title={title} />
      <TopBar>
        <UnderlineText style={[styles.text]} onPress={getHumor}>
          get humor
        </UnderlineText>
      </TopBar>
      {loading && (
        <ActivityIndicator size="large" color={Colors.lightBlue500} />
      )}
      <MyView style={[styles.content]}>
        <MyText style={[styles.text]}>{humorText}</MyText>
        {errorMessage.length > 0 && (
          <MyText style={[styles.text]}>{errorMessage}</MyText>
        )}
      </MyView>
    </MySafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {fontSize: 20, textAlign: 'center'},
  content: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});

export default Fetch;
