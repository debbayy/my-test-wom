import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  useColorScheme,
} from 'react-native';

const light_colors = {
  bg: '#fff',
  text: '#111',
  muted: '#888',
  border: '#e0e0e0',
  accent: '#3B6D11',
  card: '#fafafa',
};

const dark_colors = {
  bg: '#1a1a1a',
  text: '#f0f0f0',
  muted: '#888',
  border: '#333',
  accent: '#97C459',
  card: '#262626',
};

export default function DetailScreen({ route }: any) {
  const { item } = route.params;
  const scheme = useColorScheme();
  const colors = scheme === 'dark' ? dark_colors : light_colors;

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.bg }]}>
      <View style={styles.container}>
        
        {/* Header */}
        <Text style={[styles.header, { color: colors.muted }]}>
          Detail
        </Text>

        {/* Card */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
        >
          <Text style={[styles.title, { color: colors.text }]}>
            {item.title}
          </Text>

          <View
            style={[
              styles.divider,
              { backgroundColor: colors.border },
            ]}
          />

          <Text style={[styles.body, { color: colors.text }]}>
            {item.body}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },

  container: {
    flex: 1,
    padding: 20,
  },

  header: {
    fontSize: 14,
    marginBottom: 12,
  },

  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 18,

    // shadow iOS
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },

    // shadow Android
    elevation: 3,
  },

  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },

  divider: {
    height: 1,
    marginVertical: 10,
  },

  body: {
    fontSize: 14,
    lineHeight: 22,
  },
});