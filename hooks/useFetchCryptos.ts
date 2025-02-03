import { useEffect, useState } from 'react';
import { fetchCryptos } from '@/services/api';

export const useFetchCryptos = () => {
  const [cryptos, setCryptos] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCryptos = async () => {
      try {
        const data = await fetchCryptos();
        setCryptos(data);
      } catch (err) {
        setError('Error al obtener criptomonedas');
      } finally {
        setLoading(false);
      }
    };

    loadCryptos();
  }, []);

  return { cryptos, loading, error };
};
