
import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CryptoData {
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
}

const mockCryptoData: CryptoData[] = [
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

export const CryptoGrid = () => {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate API call - replace with actual CoinMarketCap API call
    const fetchCryptoData = async () => {
      try {
        setLoading(true);
        // For demo purposes, using mock data
        setTimeout(() => {
          setCryptoData(mockCryptoData);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching crypto data:", error);
        toast({
          title: "Error",
          description: "Failed to fetch crypto data. Please check your API key.",
          variant: "destructive"
        });
        setLoading(false);
      }
    };

    fetchCryptoData();
  }, [toast]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1e12) {
      return `$${(marketCap / 1e12).toFixed(2)}T`;
    } else if (marketCap >= 1e9) {
      return `$${(marketCap / 1e9).toFixed(2)}B`;
    } else if (marketCap >= 1e6) {
      return `$${(marketCap / 1e6).toFixed(2)}M`;
    }
    return `$${marketCap.toFixed(2)}`;
  };

  if (loading) {
    return (
      <div className="p-6 space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="glass-card rounded-2xl p-6 animate-pulse">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-ios-gray-800 rounded-full" />
                <div className="space-y-2">
                  <div className="w-20 h-4 bg-ios-gray-800 rounded" />
                  <div className="w-16 h-3 bg-ios-gray-800 rounded" />
                </div>
              </div>
              <div className="text-right space-y-2">
                <div className="w-24 h-4 bg-ios-gray-800 rounded" />
                <div className="w-16 h-3 bg-ios-gray-800 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Top Cryptocurrencies</h2>
        <button className="text-ios-blue text-sm font-medium hover:text-ios-blue/80">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {cryptoData.map((crypto) => {
          const isPositive = crypto.quote.USD.percent_change_24h > 0;
          
          return (
            <div
              key={crypto.id}
              className="glass-card rounded-2xl p-6 hover:bg-ios-gray-800/80 transition-all duration-200 active:scale-98"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-ios-blue to-ios-purple flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {crypto.symbol.slice(0, 2)}
                    </span>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-white">{crypto.name}</h3>
                    <p className="text-ios-gray-400 text-sm">{crypto.symbol}</p>
                  </div>
                </div>

                <div className="text-right space-y-1">
                  <p className="font-bold text-white text-lg">
                    {formatPrice(crypto.quote.USD.price)}
                  </p>
                  <div className={`flex items-center space-x-1 ${
                    isPositive ? 'text-ios-green' : 'text-ios-red'
                  }`}>
                    {isPositive ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    <span className="text-sm font-medium">
                      {Math.abs(crypto.quote.USD.percent_change_24h).toFixed(2)}%
                    </span>
                  </div>
                </div>

                <button className="ml-4 p-2 rounded-xl bg-ios-gray-800 hover:bg-ios-gray-700 transition-colors">
                  <Info className="w-5 h-5 text-ios-gray-400" />
                </button>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4 pt-4 border-t border-ios-gray-800">
                <div>
                  <p className="text-ios-gray-500 text-xs">Market Cap</p>
                  <p className="text-white font-medium">
                    {formatMarketCap(crypto.quote.USD.market_cap)}
                  </p>
                </div>
                <div>
                  <p className="text-ios-gray-500 text-xs">24h Volume</p>
                  <p className="text-white font-medium">
                    {formatMarketCap(crypto.quote.USD.volume_24h)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
