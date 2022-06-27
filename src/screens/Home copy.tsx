import React, {useCallback, useEffect, useRef, useState} from 'react'
import {FlatList, StyleSheet} from 'react-native'
import {ScrollEnabledProvider, useScrollEnabled} from '../context'
import * as D from '../data'
import Person from '../copy/Person'
import {DrawerActions, useNavigation} from '@react-navigation/native'
import {LeftRightNavigation, LeftRightNavigationMethods} from '../components'
import {
  NavigationHeader,
  MySafeAreaView,
  MyView,
  TopBar,
  UnderlineText,
  MaterialCommunityIcon as Icon
} from '../theme'
import {useAppDispatch, useAppSelector} from '../store'
import {logout} from '../store/slice/loginSlice'

export default function Home() {
  const [people, setPeople] = useState<D.IPerson[]>([])
  // navigation
  const navigation = useNavigation()
  const goLeft = useCallback(() => navigation.navigate('HomeLeft'), [])
  const goRight = useCallback(
    () => navigation.navigate('HomeRight', {name: 'Jack', age: 32}),
    []
  )

  const open = useCallback(
    () => navigation.dispatch(DrawerActions.openDrawer()),
    []
  )

  // use Redux
  const dispatch = useAppDispatch()
  const logoutHandler = useCallback(() => {
    dispatch(logout()), navigation.navigate('Login')
  }, [])

  // scroll for apple
  const [scrollEnabled] = useScrollEnabled()

  // LeftRightNavigate
  const leftRef = useRef<LeftRightNavigationMethods | null>(null)
  const flatListRef = useRef<FlatList | null>(null)

  // handlers
  const add = useCallback(() => {
    setPeople((people) => {
      if (people) {
        return [D.createRandomPerson(), ...people]
      } else return [D.createRandomPerson()]
    })
  }, [])
  const removePerson = useCallback(
    (id: string) => () => {
      setPeople((people) => people.filter((person) => person.id != id))
      leftRef.current?.resetOffset()
      flatListRef.current?.scrollToOffset({animated: true, offset: 0})
    },
    []
  )
  const removeAllPersons = useCallback(() => setPeople([]), [])

  useEffect(() => D.makeArray(5).forEach(add), [])

  const {signUpJWT} = useAppSelector(({storage}) => storage)

  return (
    <MySafeAreaView>
      <ScrollEnabledProvider>
        <MyView style={[styles.view]}>
          <NavigationHeader
            title="Home"
            Left={() => <Icon name="menu" size={30} onPress={open} />}
            Right={() => (
              <Icon name="logout" size={30} onPress={logoutHandler} />
            )}
          />
          <TopBar noSwitch>
            <UnderlineText onPress={add} style={styles.text}>
              add
            </UnderlineText>
            <UnderlineText onPress={removeAllPersons} style={styles.text}>
              remove all
            </UnderlineText>
          </TopBar>
          <LeftRightNavigation
            ref={leftRef}
            distance={40}
            flatListRef={flatListRef}
            onLeftToRight={goLeft}
            onRightToLeft={goRight}>
            <FlatList
              ref={flatListRef}
              data={people}
              renderItem={({item}) => (
                <Person person={item} deletePressed={removePerson(item.id)} />
              )}
              keyExtractor={(item) => item.id}
              scrollEnabled={scrollEnabled}
            />
          </LeftRightNavigation>
        </MyView>
      </ScrollEnabledProvider>
    </MySafeAreaView>
  )
}

const styles = StyleSheet.create({
  view: {flex: 1},
  text: {marginRight: 10, fontSize: 20}
})
