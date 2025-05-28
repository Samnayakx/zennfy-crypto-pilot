
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
    
    // Try direct API call first
    const response = await fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=10&convert=USD', {
      method: 'GET',
      headers: {
        'X-CMC_PRO_API_KEY': apiKey,
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: CoinMarketCapResponse = await response.json();
    console.log("Successfully fetched live crypto data");
    
    // Convert the response to an array format
    return Object.values(data.data);
  } catch (error) {
    console.warn("Direct API call failed, trying alternative methods:", error);
    
    // Try alternative proxy services
    try {
      const proxyResponse = await fetch(`https://corsproxy.io/?https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=10&convert=USD`, {
        method: 'GET',
        headers: {
          'X-CMC_PRO_API_KEY': apiKey,
        },
      });

      if (proxyResponse.ok) {
        const data = await proxyResponse.json();
        console.log("Successfully fetched via proxy");
        return Object.values(data.data);
      }
    } catch (proxyError) {
      console.warn("Proxy method also failed:", proxyError);
    }
    
    // Fallback to mock data
    console.log("All methods failed, using demo data");
    return getMockData();
  }
};

const getMockData = () => {
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
    },
    {
      id: 4,
      name: "Cardano",
      symbol: "ADA",
      quote: {
        USD: {
          price: 0.89,
          percent_change_24h: 3.21,
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
          price: 1.23,
          percent_change_24h: -2.45,
          market_cap: 12847562783,
          volume_24h: 947562783
        }
      }
    }
  ];
};
