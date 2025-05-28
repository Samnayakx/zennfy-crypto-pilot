
import { Award, BookOpen, Bookmark, Star, TrendingUp, Brain, Zap } from "lucide-react";

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
  const earnedBadges = cryptoBadges.filter(badge => badge.earned);
  const conceptsLearned = 8;
  const questionsAsked = 23;

  return (
    <div className="px-6 space-y-6">
      {/* Profile Header */}
      <div className="glass-card rounded-2xl p-6 border border-ios-gray-800/50">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-ios-blue to-ios-purple rounded-2xl flex items-center justify-center">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-white">Your Crypto Journey</h2>
            <p className="text-ios-gray-400">Learning crypto, one question at a time</p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-ios-blue">{conceptsLearned}</div>
            <div className="text-xs text-ios-gray-400">Concepts Learned</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-ios-green">{questionsAsked}</div>
            <div className="text-xs text-ios-gray-400">Questions Asked</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-ios-purple">{earnedBadges.length}</div>
            <div className="text-xs text-ios-gray-400">Badges Earned</div>
          </div>
        </div>
      </div>

      {/* Crypto Badges */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Award className="w-5 h-5 text-ios-purple" />
          <h3 className="text-lg font-semibold text-white">Crypto Badges</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
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
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bookmark className="w-5 h-5 text-ios-blue" />
            <h3 className="text-lg font-semibold text-white">Saved Learnings</h3>
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
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-ios-orange" />
            <h3 className="text-lg font-semibold text-white">Favorite Coins</h3>
          </div>
          <button className="text-ios-blue text-sm hover:text-ios-blue/80">Edit</button>
        </div>
        
        <div className="space-y-3">
          {favoriteCoins.map((coin) => (
            <div key={coin.symbol} className="glass-card rounded-xl p-4 border border-ios-gray-800/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-ios-gray-800 rounded-lg flex items-center justify-center">
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
