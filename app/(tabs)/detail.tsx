import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { CryptoData } from '@/interfaces/CryptoData';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const screenWidth = Dimensions.get('window').width;

const Detail = () => {
  const params = useLocalSearchParams();
  const crypto: CryptoData | null = params.crypto ? JSON.parse(params.crypto as string) : null;

  if (!crypto) {
    return (
      <GestureHandlerRootView style={styles.centered}>
        <Text>No crypto data found</Text>
      </GestureHandlerRootView>
    );
  }

  const iconUrl = `https://static.coincap.io/assets/icons/${crypto.symbol.toLowerCase()}@2x.png`;

  const details = [
    { key: 'Rank', value: crypto.rank, icon: '🏅' },
    { key: 'Symbol', value: crypto.symbol, icon: '🔤' },
    { key: 'Price USD', value: `$${crypto.price_usd}`, icon: '💵' },
    { key: 'Market Cap', value: crypto.price_btc, icon: '🏦' },
    { key: 'Supply', value: crypto.csupply, icon: '📈' },
    { key: 'Percent change 1h', value: `${crypto.percent_change_1h}%`, icon: '📊' },
    { key: 'Percent change 24h', value: `${crypto.percent_change_24h}%`, icon: '📉' },
    { key: 'Percent change 7d', value: `${crypto.percent_change_7d}%`, icon: '📊' },
  ];

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.iconAndNameContainer}>
            <Image source={{ uri: iconUrl }} style={styles.cryptoIcon} />
            <Text style={styles.name}>{crypto.name} ({crypto.symbol})</Text>
          </View>
          <Text style={styles.price}>${crypto.price_usd}</Text>
        </View>
        <FlatList
          data={details}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemText}>{item.icon} {item.key}: {item.value}</Text>
            </View>
          )}
          keyExtractor={(item) => item.key}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.cardsContainer}
        />
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    width: screenWidth * 0.85,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginVertical: 40,
    alignSelf: 'center',
  },
  iconAndNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cryptoIcon: {
    width: 50,
    height: 50,
    marginRight: 16,
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'green',
    textAlign: 'center',
  },
  cardsContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginHorizontal: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Detail;