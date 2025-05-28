
import { useState, useEffect } from "react";
import { OnboardingFlow } from "@/components/OnboardingFlow";
import { Dashboard } from "@/components/Dashboard";

const Index = () => {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  useEffect(() => {
    // Check if user has completed onboarding (skip API key requirement)
    const onboardingComplete = localStorage.getItem("zennfy_onboarding_complete");
    if (onboardingComplete) {
      setHasCompletedOnboarding(true);
    }
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem("zennfy_onboarding_complete", "true");
    setHasCompletedOnboarding(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ios-gray-950 via-ios-gray-900 to-ios-gray-950">
      {!hasCompletedOnboarding ? (
        <OnboardingFlow onComplete={handleOnboardingComplete} />
      ) : (
        <Dashboard />
      )}
    </div>
  );
};

export default Index;
