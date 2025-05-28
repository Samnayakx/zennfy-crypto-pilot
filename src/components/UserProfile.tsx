
import { Award, BookOpen, Bookmark, Star, TrendingUp, Brain, Zap, Settings, Key, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const cryptoBadges = [
  { id: 1, name: "First Question", icon: "🤔", earned: true, description: "Asked your first crypto question" },
  { id: 2, name: "Learner", icon: "📚", earned: true, description: "Completed 5 learning sessions" },
  { id: 3, name: "Tracker", icon: "📈", earned: true, description: "Added coins to watchlist" },
  { id: 4, name: "Analyst", icon: "🔍", earned: false, description: "Asked 10 analytical questions" },
  { id: 5, name: "Expert", icon: "🧠", earned: false, description: "Completed advanced topics" },
];

const savedLearnings = [
  { id: 1, title: "What is staking?", category: "DeFi", saved: "2 days ago" },
  { id: 2, title: "Why Bitcoin price moves", category: "Trading", saved: "1 week ago" },
  { id: 3, title: "Ethereum gas fees explained", category: "Technical", saved: "1 week ago" },
];

const favoriteCoins = [
  { symbol: "BTC", name: "Bitcoin", price: "$43,250", change: "+2.5%" },
  { symbol: "ETH", name: "Ethereum", price: "$2,640", change: "-1.2%" },
  { symbol: "SOL", name: "Solana", price: "$98", change: "+5.8%" },
];

export const UserProfile = () => {
  const [showApiKeys, setShowApiKeys] = useState(false);
  const [perplexityKey, setPerplexityKey] = useState("");
  const [cmcKey, setCmcKey] = useState("");
  const [showPerplexityKey, setShowPerplexityKey] = useState(false);
  const [showCmcKey, setShowCmcKey] = useState(false);
  const { toast } = useToast();

  const earnedBadges = cryptoBadges.filter(badge => badge.earned);
  const conceptsLearned = 8;
  const questionsAsked = 23;

  const handleSaveApiKeys = () => {
    if (!perplexityKey.trim() || !cmcKey.trim()) {
      toast({
        title: "Missing API Keys",
        description: "Please enter both Perplexity and CoinMarketCap API keys.",
        variant: "destructive"
      });
      return;
    }

    localStorage.setItem("zennfy_perplexity_key", perplexityKey);
    localStorage.setItem("zennfy_cmc_key", cmcKey);
    
    toast({
      title: "API Keys Saved",
      description: "Your API keys have been securely stored.",
    });
    
    setShowApiKeys(false);
  };

  return (
    <div className="px-6 space-y-8">
      {/* Profile Header */}
      <div className="glass-card rounded-2xl p-6 border border-ios-gray-800/50">
        <div className="flex items-center space-x-5">
          <div className="w-20 h-20 bg-gradient-to-br from-ios-blue to-ios-purple rounded-2xl flex items-center justify-center">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white mb-1">Your Crypto Journey</h2>
            <p className="text-ios-gray-400 text-lg">Learning crypto, one question at a time</p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-6 mt-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-ios-blue mb-1">{conceptsLearned}</div>
            <div className="text-sm text-ios-gray-400">Concepts Learned</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-ios-green mb-1">{questionsAsked}</div>
            <div className="text-sm text-ios-gray-400">Questions Asked</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-ios-purple mb-1">{earnedBadges.length}</div>
            <div className="text-sm text-ios-gray-400">Badges Earned</div>
          </div>
        </div>
      </div>

      {/* API Keys Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Settings className="w-6 h-6 text-ios-blue" />
            <h3 className="text-xl font-semibold text-white">API Settings</h3>
          </div>
          <button
            onClick={() => setShowApiKeys(!showApiKeys)}
            className="text-ios-blue text-sm font-medium hover:text-ios-blue/80"
          >
            {showApiKeys ? 'Hide' : 'Configure'}
          </button>
        </div>
        
        {showApiKeys && (
          <div className="glass-card rounded-2xl p-6 space-y-6">
            <div className="flex items-center space-x-3 mb-4">
              <Key className="w-5 h-5 text-ios-purple" />
              <h4 className="text-lg font-semibold text-white">Connect Your APIs</h4>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-white font-medium mb-3">
                  Perplexity API Key
                </label>
                <div className="relative">
                  <input
                    type={showPerplexityKey ? "text" : "password"}
                    value={perplexityKey}
                    onChange={(e) => setPerplexityKey(e.target.value)}
                    placeholder="Enter your Perplexity API key"
                    className="w-full ios-input pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPerplexityKey(!showPerplexityKey)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-ios-gray-500 hover:text-ios-gray-400"
                  >
                    {showPerplexityKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <p className="text-ios-gray-500 text-xs mt-2">
                  Get your key from{" "}
                  <a 
                    href="https://perplexity.ai" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-ios-blue hover:underline"
                  >
                    perplexity.ai
                  </a>
                </p>
              </div>

              <div>
                <label className="block text-white font-medium mb-3">
                  CoinMarketCap API Key
                </label>
                <div className="relative">
                  <input
                    type={showCmcKey ? "text" : "password"}
                    value={cmcKey}
                    onChange={(e) => setCmcKey(e.target.value)}
                    placeholder="Enter your CoinMarketCap API key"
                    className="w-full ios-input pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCmcKey(!showCmcKey)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-ios-gray-500 hover:text-ios-gray-400"
                  >
                    {showCmcKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <p className="text-ios-gray-500 text-xs mt-2">
                  Get your key from{" "}
                  <a 
                    href="https://coinmarketcap.com/api/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-ios-blue hover:underline"
                  >
                    coinmarketcap.com/api
                  </a>
                </p>
              </div>
            </div>

            <button
              onClick={handleSaveApiKeys}
              disabled={!perplexityKey.trim() || !cmcKey.trim()}
              className="w-full ios-button disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save API Keys
            </button>

            <div className="bg-ios-gray-800/50 rounded-xl p-4">
              <p className="text-ios-gray-400 text-sm">
                🔒 Your API keys are stored locally and never shared. They're only used to fetch real-time crypto data and AI insights.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Crypto Badges */}
      <div className="space-y-5">
        <div className="flex items-center space-x-3">
          <Award className="w-6 h-6 text-ios-purple" />
          <h3 className="text-xl font-semibold text-white">Crypto Badges</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {cryptoBadges.map((badge) => (
            <div
              key={badge.id}
              className={`glass-card rounded-xl p-4 border transition-all ${
                badge.earned 
                  ? 'border-ios-blue/30 bg-ios-blue/5' 
                  : 'border-ios-gray-800/50 opacity-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`text-2xl ${badge.earned ? 'grayscale-0' : 'grayscale'}`}>
                  {badge.icon}
                </div>
                <div className="flex-1">
                  <h4 className={`font-medium ${badge.earned ? 'text-white' : 'text-ios-gray-500'}`}>
                    {badge.name}
                  </h4>
                  <p className="text-xs text-ios-gray-400 mt-1">{badge.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Saved Learnings */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Bookmark className="w-6 h-6 text-ios-blue" />
            <h3 className="text-xl font-semibold text-white">Saved Learnings</h3>
          </div>
          <button className="text-ios-blue text-sm hover:text-ios-blue/80">View all</button>
        </div>
        
        <div className="space-y-3">
          {savedLearnings.map((learning) => (
            <div key={learning.id} className="glass-card rounded-xl p-4 border border-ios-gray-800/50 hover:border-ios-blue/30 transition-all cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="text-white font-medium">{learning.title}</h4>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs bg-ios-gray-800 text-ios-gray-400 px-2 py-1 rounded">
                      {learning.category}
                    </span>
                    <span className="text-xs text-ios-gray-500">{learning.saved}</span>
                  </div>
                </div>
                <BookOpen className="w-4 h-4 text-ios-gray-500" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Favorite Coins */}
      <div className="space-y-5 pb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Star className="w-6 h-6 text-ios-orange" />
            <h3 className="text-xl font-semibold text-white">Favorite Coins</h3>
          </div>
          <button className="text-ios-blue text-sm hover:text-ios-blue/80">Edit</button>
        </div>
        
        <div className="space-y-3">
          {favoriteCoins.map((coin) => (
            <div key={coin.symbol} className="glass-card rounded-xl p-4 border border-ios-gray-800/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-ios-gray-800 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{coin.symbol}</span>
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{coin.name}</h4>
                    <p className="text-ios-gray-400 text-sm">{coin.symbol}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-semibold">{coin.price}</div>
                  <div className={`text-sm ${
                    coin.change.startsWith('+') ? 'text-ios-green' : 'text-ios-red'
                  }`}>
                    {coin.change}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
