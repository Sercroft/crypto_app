import React, { useState } from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Image, Dimensions } from 'react-native';
import { useFetchCryptos } from '@/hooks/useFetchCryptos';
import { useRouter } from 'expo-router';
import SearchBar from '@/components/generic/SearchBar';
import useFilterCryptos from '@/hooks/useFilterCryptos';
import InputPriceFilter from '@/components/generic/InputPriceFilter';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const CryptoItem = ({ crypto }: { crypto: any }) => {
  const router = useRouter();
  const iconUrl = `https://static.coincap.io/assets/icons/${crypto.symbol.toLowerCase()}@2x.png`;

  const chartData = {
    labels: ['1h', '24h', '7d'],
    datasets: [
      {
        data: [
          parseFloat(crypto.percent_change_1h),
          parseFloat(crypto.percent_change_24h),
          parseFloat(crypto.percent_change_7d),
        ],
        color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => router.push({ pathname: "/detail", params: { crypto: JSON.stringify(crypto) }})}
    >
      <View style={styles.iconContainer}>
        <Image source={{ uri: iconUrl }} style={styles.cryptoIcon} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.itemText}>{crypto.symbol}</Text>
        <View style={styles.rowContainer}>

          <View style={styles.priceContainer}>
            <Text style={styles.itemPrice}>${crypto.price_usd}</Text>
          </View>

          <View style={styles.chartWrapper}>
            <LineChart
              data={chartData}
              width={screenWidth * 0.4}  
              height={65}
              withVerticalLabels={false}
              withHorizontalLabels={false}
              withInnerLines={false}
              withDots={false}
              chartConfig={{
                backgroundGradientFromOpacity: 0,
                backgroundGradientToOpacity: 0,
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              style={{
                justifyContent: "flex-end",
                borderRadius: 16,
              }}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Index = () => {
  const { cryptos, loading, error } = useFetchCryptos();

  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const filteredCryptos = useFilterCryptos(cryptos, searchTerm, minPrice, maxPrice);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Search bar */}
      <SearchBar
        placeholder='Buscar crypto'
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      {/* Filtered by price */}
      <InputPriceFilter
        placeholder="Precio mínimo"
        value={minPrice}
        keyboardType="numeric"
        onChangeText={setMinPrice}
      />

      <InputPriceFilter
        placeholder="Precio máximo"
        value={maxPrice}
        keyboardType="numeric"
        onChangeText={setMaxPrice}
      />

      <FlatList
        data={filteredCryptos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <CryptoItem crypto={item} />}
        initialNumToRender={10}
        maxToRenderPerBatch={20}
        windowSize={5}
        updateCellsBatchingPeriod={100}
        removeClippedSubviews={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    position: 'relative',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  cryptoIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  itemPrice: {
    fontSize: 18,
    color: 'green',
  },
  chartWrapper: {
    position: 'absolute',
    top: 0,
    left: 140,
    right: 0,
    height: 20, 
    zIndex: -1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Index;
