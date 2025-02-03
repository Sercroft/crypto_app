const API_BASE_URL = 'https://api.coinlore.net/api';

/**
 * Fetches JSON data from the specified URL.
 *
 * @param {string} url - The URL to fetch data from.
 * @returns {Promise<any>} A promise that resolves to the JSON data.
 * @throws {Error} If the network response is not ok or if there is a fetch error.
 */
const fetchJson = async (url: string): Promise<any> => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error(`Fetch error: ${error}`);
    throw error;
  }
};

/**
 * Fetches cryptocurrency data from the API.
 *
 * @returns {Promise<any[]>} A promise that resolves to an array of cryptocurrency data.
 * @throws Will return an empty array if the fetch operation fails.
 */
export const fetchCryptos = async () => {
  try {
    const data = await fetchJson(`${API_BASE_URL}/tickers/`);
    return data.data;
  } catch (error) {
    console.error("fetchCryptos Error:", error);
    return [];
  }
};

/**
 * Fetches the details of a cryptocurrency by its ID.
 *
 * @param {string} id - The ID of the cryptocurrency to fetch details for.
 * @returns {Promise<any>} A promise that resolves to the details of the cryptocurrency, or null if an error occurs.
 * @throws Will log an error message to the console if the fetch operation fails.
 */
export const fetchCryptoDetail = async (id: string) => {
  try {
    const data = await fetchJson(`${API_BASE_URL}/ticker/?id=${id}`);
    return data[0];
  } catch (error) {
    console.error(`Error: ${error}`);
    return null;
  }
};
