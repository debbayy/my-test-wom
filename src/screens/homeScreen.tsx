import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  useColorScheme,
} from 'react-native';
import axios from 'axios';

const light_colors = {
  bg: '#fff',
  text: '#111',
  muted: '#888',
  border: '#e0e0e0',
  card: '#fafafa',
  accent: '#3B6D11',
};

const dark_colors = {
  bg: '#1a1a1a',
  text: '#f0f0f0',
  muted: '#888',
  border: '#333',
  card: '#262626',
  accent: '#97C459',
};

export default function HomeScreen({ route, navigation }: any) {
  const { email } = route.params;

  const scheme = useColorScheme();
  const colors = scheme === 'dark' ? dark_colors : light_colors;

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        'https://jsonplaceholder.typicode.com/posts'
      );
      setData(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  if (loading) {
    return (
      <View style={[styles.loader, { backgroundColor: colors.bg }]}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('Detail', { item })}
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
        },
      ]}
    >
      <Text
        style={[styles.title, { color: colors.text }]}
        numberOfLines={2}
      >
        {item.title}
      </Text>

      <Text
        style={[styles.body, { color: colors.muted }]}
        numberOfLines={2}
      >
        {item.body}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.bg }]}>
      <View style={styles.container}>
        
        {/* Header */}
        <Text style={[styles.header, { color: colors.text }]}>
          Welcome 👋
        </Text>
        <Text style={[styles.email, { color: colors.muted }]}>
          {email}
        </Text>

        {/* List */}
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingTop: 16, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.accent}
            />
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },

  container: {
    flex: 1,
    paddingHorizontal: 16,
  },

  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  header: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 10,
  },

  email: {
    fontSize: 13,
    marginTop: 4,
  },

  card: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    marginBottom: 12,

    // shadow iOS
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },

    // shadow Android
    elevation: 2,
  },

  title: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
  },

  body: {
    fontSize: 13,
    lineHeight: 18,
  },
});