
interface CoinMarketCapResponse {
  data: {
    [key: string]: {
      id: number;
      name: string;
      symbol: string;
      quote: {
        USD: {
          price: number;
          percent_change_24h: number;
          market_cap: number;
          volume_24h: number;
        };
      };
    };
  };
}

export const fetchTopCryptos = async (): Promise<any[]> => {
  const apiKey = localStorage.getItem("zennfy_cmc_key");
  
  if (!apiKey) {
    throw new Error("CoinMarketCap API key not found");
  }

  // Using a CORS proxy since CoinMarketCap API doesn't support direct browser requests
  const proxyUrl = 'https://api.allorigins.win/raw?url=';
  const targetUrl = encodeURIComponent('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=10&convert=USD');
  
  try {
    const response = await fetch(`${proxyUrl}${targetUrl}`, {
      method: 'GET',
      headers: {
        'X-CMC_PRO_API_KEY': apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: CoinMarketCapResponse = await response.json();
    
    // Convert the response to an array format
    return Object.values(data.data);
  } catch (error) {
    console.error("Error fetching crypto data:", error);
    // Fallback to mock data if API fails
    return [
      {
        id: 1,
        name: "Bitcoin",
        symbol: "BTC",
        quote: {
          USD: {
            price: 97234.56,
            percent_change_24h: 2.45,
            market_cap: 1923847562783,
            volume_24h: 23847562783
          }
        }
      },
      {
        id: 2,
        name: "Ethereum",
        symbol: "ETH",
        quote: {
          USD: {
            price: 3456.78,
            percent_change_24h: -1.23,
            market_cap: 415847562783,
            volume_24h: 12847562783
          }
        }
      },
      {
        id: 3,
        name: "Solana",
        symbol: "SOL",
        quote: {
          USD: {
            price: 234.56,
            percent_change_24h: 5.67,
            market_cap: 110847562783,
            volume_24h: 3847562783
          }
        }
      }
    ];
  }
};
