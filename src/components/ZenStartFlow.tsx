
import { useState } from "react";
import { ArrowLeft, BookOpen, DollarSign, TrendingUp, CheckCircle, Sparkles } from "lucide-react";

interface ZenStartFlowProps {
  onComplete: () => void;
}

const zenGoals = [
  {
    id: "learn",
    title: "I want to learn what coins are",
    description: "Perfect for absolute beginners",
    icon: BookOpen,
    color: "text-ios-blue",
    bgColor: "bg-ios-blue/10",
    borderColor: "border-ios-blue/30",
    emoji: "🎓"
  },
  {
    id: "invest",
    title: "I want to invest $10",
    description: "Start small, learn as you go",
    icon: DollarSign,
    color: "text-ios-green",
    bgColor: "bg-ios-green/10",
    borderColor: "border-ios-green/30",
    emoji: "💰"
  },
  {
    id: "watch",
    title: "I just want to watch the market",
    description: "Observe and understand trends",
    icon: TrendingUp,
    color: "text-ios-purple",
    bgColor: "bg-ios-purple/10",
    borderColor: "border-ios-purple/30",
    emoji: "👀"
  }
];

const flowSteps = {
  learn: [
    { title: "Start with Bitcoin basics", description: "What is it and why does it matter?" },
    { title: "Understand wallets", description: "Where your crypto lives (safely)" },
    { title: "Learn about exchanges", description: "Where people buy and sell crypto" }
  ],
  invest: [
    { title: "Choose a beginner-friendly exchange", description: "We'll recommend the safest options" },
    { title: "Start with $10 in Bitcoin", description: "The most stable option for beginners" },
    { title: "Learn as your investment grows", description: "We'll teach you along the way" }
  ],
  watch: [
    { title: "Add coins to your watchlist", description: "Track Bitcoin, Ethereum, and others" },
    { title: "Understand price movements", description: "Learn what makes crypto go up and down" },
    { title: "Get daily market insights", description: "Our AI will explain what's happening" }
  ]
};

export const ZenStartFlow = ({ onComplete }: ZenStartFlowProps) => {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const handleGoalSelect = (goalId: string) => {
    setSelectedGoal(goalId);
  };

  const handleStepComplete = (stepIndex: number) => {
    setCompletedSteps(prev => [...prev, stepIndex]);
    if (stepIndex < 2) {
      setCurrentStep(stepIndex + 1);
    }
  };

  const handleBack = () => {
    if (selectedGoal) {
      setSelectedGoal(null);
      setCurrentStep(0);
      setCompletedSteps([]);
    } else {
      onComplete();
    }
  };

  const selectedGoalData = selectedGoal ? zenGoals.find(goal => goal.id === selectedGoal) : null;
  const steps = selectedGoal ? flowSteps[selectedGoal as keyof typeof flowSteps] : [];

  return (
    <div className="min-h-screen bg-ios-gray-950 p-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={handleBack}
            className="p-2 hover:bg-ios-gray-800 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-ios-gray-400" />
          </button>
          <div className="text-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-ios-blue to-ios-purple bg-clip-text text-transparent">
              Zen Start
            </h1>
            <p className="text-ios-gray-400 text-sm">Your personalized crypto journey</p>
          </div>
          <div className="w-10" /> {/* Spacer */}
        </div>

        {!selectedGoal ? (
          /* Goal Selection */
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="text-4xl mb-4">🪄</div>
              <h2 className="text-xl font-bold text-white">What's your goal?</h2>
              <p className="text-ios-gray-400">Let's find the perfect path for you</p>
            </div>

            <div className="space-y-4">
              {zenGoals.map((goal) => {
                const Icon = goal.icon;
                return (
                  <button
                    key={goal.id}
                    onClick={() => handleGoalSelect(goal.id)}
                    className={`w-full glass-card rounded-2xl p-6 border ${goal.borderColor} ${goal.bgColor} hover:scale-105 transition-all duration-200 text-left`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="text-3xl">{goal.emoji}</div>
                      <div className="flex-1">
                        <h3 className={`font-semibold ${goal.color} mb-1`}>
                          {goal.title}
                        </h3>
                        <p className="text-ios-gray-400 text-sm">{goal.description}</p>
                      </div>
                      <Icon className={`w-6 h-6 ${goal.color}`} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* Steps Flow */
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="text-3xl">{selectedGoalData?.emoji}</div>
              <h2 className="text-xl font-bold text-white">Perfect choice!</h2>
              <p className="text-ios-gray-400">Here's your 3-step journey</p>
            </div>

            <div className="space-y-4">
              {steps.map((step, index) => {
                const isCompleted = completedSteps.includes(index);
                const isCurrent = currentStep === index;
                const isUpcoming = currentStep < index;

                return (
                  <div
                    key={index}
                    className={`glass-card rounded-xl p-4 border transition-all ${
                      isCompleted
                        ? 'border-ios-green/30 bg-ios-green/5'
                        : isCurrent
                        ? `border-${selectedGoalData?.color.replace('text-', '')}/30 bg-${selectedGoalData?.color.replace('text-', '')}/5`
                        : 'border-ios-gray-800/50 opacity-60'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        isCompleted
                          ? 'bg-ios-green text-white'
                          : isCurrent
                          ? `${selectedGoalData?.bgColor} ${selectedGoalData?.color}`
                          : 'bg-ios-gray-800 text-ios-gray-500'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <span className="font-bold">{index + 1}</span>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className={`font-medium ${
                          isCompleted ? 'text-ios-green' : isCurrent ? 'text-white' : 'text-ios-gray-500'
                        }`}>
                          {step.title}
                        </h3>
                        <p className="text-ios-gray-400 text-sm mt-1">{step.description}</p>
                      </div>

                      {isCurrent && !isCompleted && (
                        <button
                          onClick={() => handleStepComplete(index)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium ${selectedGoalData?.bgColor} ${selectedGoalData?.color} hover:scale-105 transition-transform`}
                        >
                          Start
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {completedSteps.length === 3 && (
              <div className="text-center space-y-4">
                <div className="text-4xl">🎉</div>
                <h3 className="text-xl font-bold text-white">Journey Started!</h3>
                <p className="text-ios-gray-400">You're ready to explore crypto with confidence</p>
                <button
                  onClick={onComplete}
                  className="w-full bg-gradient-to-r from-ios-blue to-ios-purple text-white py-4 rounded-2xl font-semibold flex items-center justify-center space-x-2 hover:scale-105 transition-transform"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Continue to Dashboard</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
