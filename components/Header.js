import { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, Image, TouchableOpacity, TextInput } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Header() {

  const [search, setSearch] = useState('');
  const [searchBarActive, setSearchBarActive] = useState(false)

  return (
    <View style={styles.header}>
      <View style={styles.navBar}>
        <Image width={'100%'} style={styles.logo} source={require('../assets/logo.png')} />

        <View style={styles.navBarContainer}>
          <Text style={styles.headerItems}>Favorite</Text>
          <Text style={styles.headerItems}>Playlist</Text>
          <Text style={styles.headerItems}>Tracks</Text>
          <Text style={styles.headerItems}>Albums</Text>
          <Text style={styles.headerItems}>Artist</Text>
          <TouchableOpacity onPress={() => setSearchBarActive(!searchBarActive)}>
            <Ionicons name='search' size={24} />
          </TouchableOpacity>
        </View>

      </View>
      {searchBarActive || <View style={styles.searchBarContainer}>
        <TextInput style={styles.searchBar} defaultValue={search} onChangeText={newText => setSearch(newText)} />
      </View>}
    </View>
  )
}

const styles = StyleSheet.create({
  logo: {
    height: '100%',
    width: '15%',
    resizeMode: 'contain'
  },
  navBar: {
    flexDirection: 'row',
    backgroundColor: 'grey',
    marginTop: StatusBar.currentHeight,
    height: 50
  },
  navBarContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  header: {
    alignItems: 'center'
  },
  headerItems: {
    color: 'black',
    fontWeight: 'bold'
  },
  searchBarContainer: {
    backgroundColor: 'white',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '80%',
    marginTop: 60,
    zIndex: 2,
    borderColor: 'rgba(245,245,245,.8)',
    borderWidth: 2,
  },
  searchBar: {
    height: 40,
    width: '80%',
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    borderRadius: 10,
  }
})
