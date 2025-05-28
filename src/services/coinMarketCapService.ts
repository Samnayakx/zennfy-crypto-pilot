
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
    console.log("CoinMarketCap API key not found, using demo data");
    return getMockData();
  }

  try {
    console.log("Attempting to fetch from CoinMarketCap API...");
    
    // Try multiple CORS proxy services
    const proxyUrls = [
      `https://api.allorigins.win/raw?url=${encodeURIComponent('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=10&convert=USD')}`,
      `https://corsproxy.io/?https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=10&convert=USD`,
      `https://cors-anywhere.herokuapp.com/https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=10&convert=USD`
    ];

    for (const proxyUrl of proxyUrls) {
      try {
        console.log(`Trying proxy: ${proxyUrl}`);
        
        const response = await fetch(proxyUrl, {
          method: 'GET',
          headers: {
            'X-CMC_PRO_API_KEY': apiKey,
            'Accept': 'application/json',
          },
        });

        if (response.ok) {
          const data: CoinMarketCapResponse = await response.json();
          console.log("Successfully fetched live crypto data via proxy");
          
          // Convert the response to an array format
          if (data.data && typeof data.data === 'object') {
            return Object.values(data.data);
          } else if (Array.isArray(data.data)) {
            return data.data;
          }
        }
      } catch (proxyError) {
        console.warn(`Proxy ${proxyUrl} failed:`, proxyError);
        continue;
      }
    }
    
    // If all proxies fail, try direct API call as last resort
    try {
      const directResponse = await fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=10&convert=USD', {
        method: 'GET',
        headers: {
          'X-CMC_PRO_API_KEY': apiKey,
          'Accept': 'application/json',
        },
      });

      if (directResponse.ok) {
        const data: CoinMarketCapResponse = await directResponse.json();
        console.log("Successfully fetched via direct API call");
        return Object.values(data.data);
      }
    } catch (directError) {
      console.warn("Direct API call also failed:", directError);
    }
    
    // Fallback to mock data if all methods fail
    console.log("All API methods failed, using demo data");
    return getMockData();
  } catch (error) {
    console.warn("Error in fetchTopCryptos:", error);
    return getMockData();
  }
};

const getMockData = () => {
  // Add timestamp to show data freshness
  const now = new Date();
  console.log(`Using mock data generated at: ${now.toLocaleTimeString()}`);
  
  return [
    {
      id: 1,
      name: "Bitcoin",
      symbol: "BTC",
      quote: {
        USD: {
          price: 97234.56 + (Math.random() - 0.5) * 1000,
          percent_change_24h: 2.45 + (Math.random() - 0.5) * 2,
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
          price: 3456.78 + (Math.random() - 0.5) * 200,
          percent_change_24h: -1.23 + (Math.random() - 0.5) * 2,
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
          price: 234.56 + (Math.random() - 0.5) * 50,
          percent_change_24h: 5.67 + (Math.random() - 0.5) * 3,
          market_cap: 110847562783,
          volume_24h: 3847562783
        }
      }
    },
    {
      id: 4,
      name: "Cardano",
      symbol: "ADA",
      quote: {
        USD: {
          price: 0.89 + (Math.random() - 0.5) * 0.1,
          percent_change_24h: 3.21 + (Math.random() - 0.5) * 2,
          market_cap: 31847562783,
          volume_24h: 1847562783
        }
      }
    },
    {
      id: 5,
      name: "Polygon",
      symbol: "MATIC",
      quote: {
        USD: {
          price: 1.23 + (Math.random() - 0.5) * 0.2,
          percent_change_24h: -2.45 + (Math.random() - 0.5) * 2,
          market_cap: 12847562783,
          volume_24h: 947562783
        }
      }
    }
  ];
};
