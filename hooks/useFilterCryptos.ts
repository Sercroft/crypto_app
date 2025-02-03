import { CryptoBodySearch } from '@/interfaces/CryptoBodySearch';
import { useEffect, useState, useMemo } from 'react';

const useFilterCryptos = (cryptos: CryptoBodySearch[], searchTerm: string, minPrice: string, maxPrice: string) => {
  const [filteredCryptos, setFilteredCryptos] = useState(cryptos);

  const normalizedSearchTerm = useMemo(() => searchTerm.toLowerCase(), [searchTerm]);
  const parsedMinPrice = useMemo(() => parseFloat(minPrice), [minPrice]);
  const parsedMaxPrice = useMemo(() => parseFloat(maxPrice), [maxPrice]);

  useEffect(() => {
    const applyFilters = () => {
      const filtered = cryptos.filter((crypto: CryptoBodySearch) => {
        const matchesSearch = [crypto.name, crypto.symbol].some((field) => 
          field.toLowerCase().includes(normalizedSearchTerm)
        );
        const price = parseFloat(crypto.price_usd);
        const matchesPrice =
          (!minPrice || price >= parsedMinPrice) &&
          (!maxPrice || price <= parsedMaxPrice);
        return matchesSearch && matchesPrice;
      });
      setFilteredCryptos(filtered);
    };

    applyFilters();
  }, [normalizedSearchTerm, parsedMinPrice, parsedMaxPrice, cryptos]);

  return filteredCryptos;
};

export default useFilterCryptos;