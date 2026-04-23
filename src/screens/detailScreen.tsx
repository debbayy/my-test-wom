import React from 'react';
import { View, Text } from 'react-native';

export default function DetailScreen({ route }: any) {
  const { item } = route.params;
console.log('item',item)
  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 20 }}>{item.title}</Text>
      <Text>{item.body}</Text>
    </View>
  );
}