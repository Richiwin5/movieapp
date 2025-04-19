
// src/screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import {
  View, TextInput, FlatList, StyleSheet, SafeAreaView, ActivityIndicator
} from 'react-native';
import MovieCard from './MovieCard';
import { fetchPopularMovies, searchMovies } from '../Service/Api';


export default function Home({ navigation })  {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const loadPopular = async () => {
    setLoading(true);
    try {
      const data = await fetchPopularMovies();
      setMovies(data);
    } catch (e) {
      console.error('Error fetching movies:', e);
    }
    setLoading(false);
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      loadPopular();
      return;
    }

    try {
      const data = await searchMovies(query);
      setMovies(data);
    } catch (e) {
      console.error('Search error:', e);
    }
  };

  const renderMovie = ({ item }) => (
    <MovieCard
      movie={item}
      onPress={() => navigation.navigate('details', { movie: item })}
    />
  );

  useEffect(() => {
    loadPopular();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder="Search movies..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderMovie}
          contentContainerStyle={styles.list}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  search: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    marginBottom: 12,
    fontSize: 18,
    marginTop: 20
  },
  list: {
    paddingBottom: 100,
  },
});


