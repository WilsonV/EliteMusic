import { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import SearchResults from './SearchResults';
import makeYoutubeSearch from './SearchCalls';

export default function SearchPage() {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([])
  return (
    <View>
      <View>
        <TextInput autoFocus={true} style={styles.searchBar} placeholder={"Search"} defaultValue={search} onChangeText={newText => setSearch(newText)} onSubmitEditing={async () => { setSearchResults(await makeYoutubeSearch(search)) }} />
      </View>

      {/*Search Results */}
      <SearchResults results={searchResults} />

    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    height: 40,
    borderBottomWidth: 2,
  }
})
