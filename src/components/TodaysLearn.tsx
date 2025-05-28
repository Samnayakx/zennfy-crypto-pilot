
import { Brain, Clock, BookOpen, ChevronRight, CheckCircle, Star, TrendingUp } from "lucide-react";

const todaysLesson = {
  title: "What's a gas fee and why does it matter?",
  description: "Understanding gas fees is crucial for anyone using blockchain networks.",
  timeToRead: "5 min",
  emoji: "⛽",
  difficulty: "Beginner",
  content: {
    introduction: "Think of gas fees like paying tolls on a highway - the busier the road, the higher the fee.",
    keyPoints: [
      {
        title: "What is Gas?",
        description: "Gas is the fee required to conduct a transaction on the Ethereum blockchain",
        icon: "💰"
      },
      {
        title: "Why Gas Fees Exist",
        description: "They prevent spam and compensate miners/validators for processing transactions",
        icon: "🛡️"
      },
      {
        title: "When Fees Are High",
        description: "During busy periods (like NFT drops), fees spike due to network congestion",
        icon: "📈"
      }
    ],
    practicalTip: "Check gas trackers before making transactions to save money!",
    nextSteps: ["Learn about Layer 2 solutions", "Explore gas optimization", "Understand priority fees"]
  }
};

export const TodaysLearn = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Brain className="w-6 h-6 text-ios-blue" />
          <h2 className="text-2xl font-bold text-white">Today's Learn</h2>
        </div>
        <div className="flex items-center space-x-2 text-ios-gray-400 text-sm">
          <Clock className="w-4 h-4" />
          <span>{todaysLesson.timeToRead}</span>
        </div>
      </div>
      
      {/* Main Lesson Card */}
      <div className="glass-card rounded-2xl p-6 border border-ios-blue/20 bg-gradient-to-r from-ios-blue/5 to-ios-purple/5">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-start space-x-4">
            <div className="text-4xl">{todaysLesson.emoji}</div>
            <div className="flex-1 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs bg-ios-blue/20 text-ios-blue px-3 py-1 rounded-full font-semibold">
                  {todaysLesson.difficulty}
                </span>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-ios-orange fill-current" />
                  <Star className="w-4 h-4 text-ios-orange fill-current" />
                  <Star className="w-4 h-4 text-ios-orange fill-current" />
                  <Star className="w-4 h-4 text-ios-orange fill-current" />
                  <Star className="w-4 h-4 text-ios-gray-600" />
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-white leading-tight">
                {todaysLesson.title}
              </h3>
              
              <p className="text-ios-gray-300 text-base leading-relaxed">
                {todaysLesson.content.introduction}
              </p>
            </div>
          </div>

          {/* Key Points */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-ios-blue" />
              <span>Key Learning Points</span>
            </h4>
            
            <div className="grid gap-4">
              {todaysLesson.content.keyPoints.map((point, index) => (
                <div key={index} className="bg-ios-gray-800/50 rounded-xl p-4 border border-ios-gray-700/50">
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">{point.icon}</span>
                    <div className="flex-1">
                      <h5 className="font-semibold text-white mb-2">{point.title}</h5>
                      <p className="text-ios-gray-300 text-sm leading-relaxed">{point.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Practical Tip */}
          <div className="bg-gradient-to-r from-ios-green/10 to-ios-blue/10 border border-ios-green/20 rounded-xl p-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-ios-green/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-4 h-4 text-ios-green" />
              </div>
              <div>
                <h5 className="font-semibold text-ios-green mb-1">Pro Tip</h5>
                <p className="text-ios-gray-300 text-sm">{todaysLesson.content.practicalTip}</p>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="space-y-3">
            <h5 className="font-semibold text-white">What to learn next:</h5>
            <div className="space-y-2">
              {todaysLesson.content.nextSteps.map((step, index) => (
                <div key={index} className="flex items-center space-x-3 text-ios-gray-300">
                  <CheckCircle className="w-4 h-4 text-ios-blue flex-shrink-0" />
                  <span className="text-sm">{step}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* CTA */}
          <button className="w-full bg-gradient-to-r from-ios-blue to-ios-purple text-white py-3 px-6 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:scale-105 transition-transform">
            <BookOpen className="w-5 h-5" />
            <span>Start Learning</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
