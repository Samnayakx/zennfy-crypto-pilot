
import { useState } from "react";
import { ChevronRight, Sparkles, TrendingUp, Shield, Zap } from "lucide-react";

interface OnboardingFlowProps {
  onComplete: () => void;
}

const onboardingSteps = [
  {
    id: 1,
    title: "Welcome to Zennfy",
    subtitle: "Your AI-powered crypto companion",
    description: "Learn crypto investing through simple explanations and real-time market insights.",
    icon: Sparkles,
    color: "text-ios-blue"
  },
  {
    id: 2,
    title: "Smart Explanations",
    subtitle: "No jargon, just clarity",
    description: "Our AI breaks down complex crypto concepts into bite-sized, understandable insights.",
    icon: TrendingUp,
    color: "text-ios-green"
  },
  {
    id: 3,
    title: "Safe Learning",
    subtitle: "Learn without the risks",
    description: "Explore crypto markets with confidence through guided, educational experiences.",
    icon: Shield,
    color: "text-ios-purple"
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
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-ios-blue/5 via-transparent to-ios-purple/5" />
      
      {/* Content */}
      <div className="max-w-md w-full space-y-8 animate-fade-in relative z-10">
        {/* Logo */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-ios-blue to-ios-purple rounded-2xl mb-4 animate-pulse-glow">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-ios-blue to-ios-purple bg-clip-text text-transparent">
            Zennfy
          </h1>
        </div>

        {/* Step indicator */}
        <div className="flex justify-center space-x-2">
          {onboardingSteps.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentStep ? 'w-8 bg-ios-blue' : 'w-2 bg-ios-gray-700'
              }`}
            />
          ))}
        </div>

        {/* Step content */}
        <div className="glass-card rounded-2xl p-8 text-center space-y-6">
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-ios-gray-800 to-ios-gray-700 ${currentStepData.color}`}>
            <Icon className="w-10 h-10" />
          </div>
          
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-white">
              {currentStepData.title}
            </h2>
            <p className="text-ios-blue font-medium">
              {currentStepData.subtitle}
            </p>
            <p className="text-ios-gray-400 leading-relaxed">
              {currentStepData.description}
            </p>
          </div>
        </div>

        {/* Navigation */}
        <button
          onClick={nextStep}
          className="w-full ios-button flex items-center justify-center space-x-2 text-lg"
        >
          <span>{currentStep === onboardingSteps.length - 1 ? "Get Started" : "Continue"}</span>
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Skip option */}
        {currentStep < onboardingSteps.length - 1 && (
          <button
            onClick={onComplete}
            className="w-full text-ios-gray-500 hover:text-ios-gray-400 transition-colors"
          >
            Skip for now
          </button>
        )}
      </div>
    </div>
  );
};
