import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import api from '../Service/Api';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export default function Details({ route, navigation }) {
  const { movie } = route.params; // get passed movie object
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const getMovieDetails = async () => {
    try {
      const res = await api.get(`/movie/${movie.id}`);
      setDetails(res.data);
    } catch (err) {
      console.error('Error fetching movie details:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovieDetails();
  }, []);

  if (loading) {return <ActivityIndicator size="large" style={styles.loader} />;}

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: `${IMAGE_BASE_URL}${details.poster_path}` }}
        style={styles.poster}
        resizeMode="cover"
      />
      <Text style={styles.title}>{details.title}</Text>
      <Text style={styles.text}>⭐ {details.vote_average} | 🕒 {details.runtime} min</Text>
      <Text style={styles.text}>📅 Release: {details.release_date}</Text>
      <Text style={styles.text}>
        🎭 Genres: {details.genres.map((genre) => genre.name).join(', ')}
      </Text>
      <Text style={styles.overview}>{details.overview}</Text>
      {/* add a goback command here  */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Go Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loader: {
    marginTop: 50,
  },
  poster: {
    width: '100%',
    height: 400,
    borderRadius: 10,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    marginBottom: 6,
  },
  overview: {
    fontSize: 16,
    marginTop: 12,
    lineHeight: 22,
  },
    backButton: {
    marginTop: 20,
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  backText: {
    color: '#fff',
    fontSize: 16,
  },
});
