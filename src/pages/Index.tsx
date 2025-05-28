
import { useState } from "react";
import { OnboardingFlow } from "@/components/OnboardingFlow";
import { Dashboard } from "@/components/Dashboard";

const Index = () => {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-ios-gray-950 via-ios-gray-900 to-ios-gray-950">
      {!hasCompletedOnboarding ? (
        <OnboardingFlow onComplete={() => setHasCompletedOnboarding(true)} />
      ) : (
        <Dashboard />
      )}
    </div>
  );
};

export default Index;
