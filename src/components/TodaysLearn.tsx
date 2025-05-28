
import { Brain, Clock, BookOpen, ChevronRight } from "lucide-react";

const todaysLessons = [
  {
    title: "What's a gas fee?",
    description: "Think of it like paying tolls on a highway - the busier the road, the higher the fee.",
    timeToRead: "2 min",
    emoji: "⛽",
    difficulty: "Beginner"
  },
  {
    title: "Why do crypto prices move so much?",
    description: "Unlike stocks, crypto markets never sleep and have fewer regulations.",
    timeToRead: "3 min",
    emoji: "📈",
    difficulty: "Beginner"
  },
  {
    title: "What is staking?",
    description: "Like putting your money in a vault and earning interest - but for crypto.",
    timeToRead: "4 min",
    emoji: "🔒",
    difficulty: "Intermediate"
  }
];

export const TodaysLearn = () => {
  const todaysLesson = todaysLessons[0]; // In real app, this would be dynamic

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Brain className="w-5 h-5 text-ios-blue" />
        <h2 className="text-xl font-bold text-white">Today's Learn</h2>
      </div>
      
      <div className="glass-card rounded-2xl p-6 border border-ios-blue/20 hover:border-ios-blue/40 transition-all cursor-pointer group">
        <div className="flex items-start space-x-4">
          <div className="text-3xl">{todaysLesson.emoji}</div>
          <div className="flex-1 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs bg-ios-blue/20 text-ios-blue px-2 py-1 rounded-full font-medium">
                {todaysLesson.difficulty}
              </span>
              <div className="flex items-center space-x-1 text-ios-gray-400 text-xs">
                <Clock className="w-3 h-3" />
                <span>{todaysLesson.timeToRead}</span>
              </div>
            </div>
            
            <h3 className="text-white font-semibold group-hover:text-ios-blue transition-colors">
              {todaysLesson.title}
            </h3>
            
            <p className="text-ios-gray-400 text-sm leading-relaxed">
              {todaysLesson.description}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-ios-blue text-sm font-medium">
                <BookOpen className="w-4 h-4" />
                <span>Start learning</span>
              </div>
              <ChevronRight className="w-4 h-4 text-ios-gray-500 group-hover:text-ios-blue group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
