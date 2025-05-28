
import { useState } from "react";
import { ChevronRight, Brain, TrendingUp, Shield, Zap, Sparkles, MessageCircle, DollarSign } from "lucide-react";

interface OnboardingFlowProps {
  onComplete: () => void;
}

const onboardingSteps = [
  {
    id: 1,
    title: "Crypto can be confusing",
    subtitle: "Let's make it simple",
    description: "No jargon. No overwhelm. Just crypto made easy for real people.",
    icon: Brain,
    color: "text-ios-blue",
    emoji: "🤯"
  },
  {
    id: 2,
    title: "Track real prices",
    subtitle: "Ask questions. Get honest answers",
    description: "Live market data meets AI that speaks your language - not Wall Street's.",
    icon: TrendingUp,
    color: "text-ios-green",
    emoji: "📈"
  },
  {
    id: 3,
    title: "Zennfy is your crypto co-pilot",
    subtitle: "No jargon. Just clarity",
    description: "Think of us as your crypto-savvy friend who explains everything simply.",
    icon: MessageCircle,
    color: "text-ios-purple",
    emoji: "🧭"
  },
  {
    id: 4,
    title: "Ready for takeoff?",
    subtitle: "Start with one-tap actions",
    description: "Track Bitcoin • Learn what a wallet is • Understand market basics",
    icon: Sparkles,
    color: "text-ios-orange",
    emoji: "🚀"
  }
];

export const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const currentStepData = onboardingSteps[currentStep];
  const Icon = currentStepData.icon;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-ios-blue/5 via-transparent to-ios-purple/5" />
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-ios-blue/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-ios-purple/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      {/* Content */}
      <div className="max-w-md w-full space-y-8 animate-fade-in relative z-10">
        {/* Logo */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-ios-blue to-ios-purple rounded-3xl mb-6 animate-pulse-glow">
            <Zap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-ios-blue to-ios-purple bg-clip-text text-transparent mb-2">
            Zennfy
          </h1>
          <p className="text-ios-gray-400 text-sm">Crypto Made Simple for Gen Z</p>
        </div>

        {/* Step indicator */}
        <div className="flex justify-center space-x-2">
          {onboardingSteps.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-500 ${
                index === currentStep 
                  ? 'w-12 bg-gradient-to-r from-ios-blue to-ios-purple' 
                  : index < currentStep 
                    ? 'w-2 bg-ios-blue/50'
                    : 'w-2 bg-ios-gray-700'
              }`}
            />
          ))}
        </div>

        {/* Step content */}
        <div className="glass-card rounded-3xl p-8 text-center space-y-6 border border-ios-gray-800/30">
          <div className="text-6xl mb-4 animate-bounce">
            {currentStepData.emoji}
          </div>
          
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-ios-gray-800 to-ios-gray-700 ${currentStepData.color}`}>
            <Icon className="w-8 h-8" />
          </div>
          
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-white">
              {currentStepData.title}
            </h2>
            <p className={`font-semibold ${currentStepData.color}`}>
              {currentStepData.subtitle}
            </p>
            <p className="text-ios-gray-400 leading-relaxed text-sm">
              {currentStepData.description}
            </p>
          </div>

          {/* Action buttons for last step */}
          {currentStep === onboardingSteps.length - 1 && (
            <div className="flex flex-col space-y-3 pt-4">
              <button className="flex items-center justify-center space-x-2 bg-ios-blue/10 border border-ios-blue/30 rounded-xl py-3 px-4 text-ios-blue hover:bg-ios-blue/20 transition-all">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">Track Bitcoin</span>
              </button>
              <button className="flex items-center justify-center space-x-2 bg-ios-purple/10 border border-ios-purple/30 rounded-xl py-3 px-4 text-ios-purple hover:bg-ios-purple/20 transition-all">
                <Shield className="w-4 h-4" />
                <span className="text-sm font-medium">Learn what a wallet is</span>
              </button>
            </div>
          )}
        </div>

        {/* Navigation */}
        <button
          onClick={nextStep}
          className="w-full ios-button flex items-center justify-center space-x-2 text-lg py-4 rounded-2xl"
        >
          <span>{currentStep === onboardingSteps.length - 1 ? "Let's get started" : "Continue"}</span>
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Skip option */}
        {currentStep < onboardingSteps.length - 1 && (
          <button
            onClick={onComplete}
            className="w-full text-ios-gray-500 hover:text-ios-gray-400 transition-colors py-2"
          >
            Skip for now
          </button>
        )}
      </div>
    </div>
  );
};
