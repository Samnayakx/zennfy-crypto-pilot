
import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { fetchTopCryptos } from "@/services/coinMarketCapService";

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

export const CryptoGrid = () => {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("Fetching crypto data from CoinMarketCap API...");
        
        const data = await fetchTopCryptos();
        console.log("Received crypto data:", data);
        
        setCryptoData(data);
      } catch (error) {
        console.error("Error fetching crypto data:", error);
        setError(error instanceof Error ? error.message : "Failed to fetch data");
        
        toast({
          title: "API Error",
          description: "Using demo data. Please check your CoinMarketCap API key.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    
    // Refresh data every 5 minutes
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
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
      <div className="space-y-4">
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

  if (error && cryptoData.length === 0) {
    return (
      <div className="glass-card rounded-2xl p-6 text-center">
        <div className="text-ios-red mb-2">⚠️ API Error</div>
        <p className="text-ios-gray-400 text-sm">{error}</p>
        <p className="text-ios-gray-500 text-xs mt-2">
          Please check your CoinMarketCap API key in settings
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-ios-orange/20 border border-ios-orange/30 rounded-xl p-3">
          <p className="text-ios-orange text-sm">
            Using demo data - API connection failed
          </p>
        </div>
      )}
      
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
  );
};
