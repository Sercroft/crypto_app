import { fetchCryptoDetail } from './api';

global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: {
            get: () => 'application/json',
        },
        json: () => Promise.resolve([{ id: '90', name: 'Bitcoin', symbol: 'BTC' }]),
        redirected: false,
        type: 'basic',
        url: '',
        clone: jest.fn(),
        body: null,
        bodyUsed: false,
        arrayBuffer: jest.fn(),
        blob: jest.fn(),
        formData: jest.fn(),
        text: jest.fn(),
    } as unknown as Response)
);

describe('fetchCryptoDetail', () => {
    beforeEach(() => {
        (fetch as jest.Mock).mockClear();
    });

    it('should fetch and return cryptocurrency details for a valid ID', async () => {
        const id = '90';
        const result = await fetchCryptoDetail(id);
        expect(fetch).toHaveBeenCalledWith(`https://api.coinlore.net/api/ticker/?id=${id}`);
        expect(result).toEqual({ id: '90', name: 'Bitcoin', symbol: 'BTC' });
    });

    it('should return null and log an error if the fetch fails', async () => {
        (fetch as jest.Mock).mockImplementationOnce(() => Promise.reject('API is down'));
        console.error = jest.fn();

        const result = await fetchCryptoDetail('90');
        expect(result).toBeNull();
        expect(console.error).toHaveBeenCalledWith('Error: API is down');
    });

    it('should return null if the response is not ok', async () => {
        (fetch as jest.Mock).mockImplementationOnce(() =>
            Promise.resolve({
                ok: false,
                status: 500,
                statusText: 'Internal Server Error',
                headers: {
                    get: () => 'application/json',
                },
                json: () => Promise.resolve([]),
            })
        );
        console.error = jest.fn();

        const result = await fetchCryptoDetail('90');
        expect(result).toBeNull();
    });
});