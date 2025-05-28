
import { Zap, MessageCircle, TrendingUp, Bookmark, Lightbulb, DollarSign } from "lucide-react";

const suggestedActions = [
  {
    icon: MessageCircle,
    text: "Ask why Ethereum is falling",
    color: "text-ios-blue",
    bgColor: "bg-ios-blue/10",
    borderColor: "border-ios-blue/20"
  },
  {
    icon: TrendingUp,
    text: "Track this coin",
    color: "text-ios-green",
    bgColor: "bg-ios-green/10",
    borderColor: "border-ios-green/20"
  },
  {
    icon: DollarSign,
    text: "Should I buy now?",
    color: "text-ios-purple",
    bgColor: "bg-ios-purple/10",
    borderColor: "border-ios-purple/20"
  },
  {
    icon: Lightbulb,
    text: "Explain market cap",
    color: "text-ios-orange",
    bgColor: "bg-ios-orange/10",
    borderColor: "border-ios-orange/20"
  }
];

export const SuggestedActions = () => {
  return (
    <div className="space-y-5">
      <div className="flex items-center space-x-3">
        <Zap className="w-6 h-6 text-ios-purple" />
        <h2 className="text-2xl font-bold text-white">Suggested Actions</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {suggestedActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              className={`glass-card rounded-xl p-5 border ${action.borderColor} ${action.bgColor} hover:scale-105 transition-all duration-200 text-left group`}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 ${action.bgColor} rounded-xl flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${action.color}`} />
                </div>
                <span className={`font-semibold text-base ${action.color} group-hover:brightness-110`}>
                  {action.text}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
