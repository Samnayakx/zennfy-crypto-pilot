
import { useState } from "react";
import { Header } from "./Header";
import { HomeScreen } from "./HomeScreen";
import { AIChat } from "./AIChat";
import { UserProfile } from "./UserProfile";
import { ZenStartFlow } from "./ZenStartFlow";
import { MessageCircle, BarChart3, User, Home } from "lucide-react";

const tabs = [
  { id: "home", label: "Home", icon: Home },
  { id: "portfolio", label: "Portfolio", icon: BarChart3 },
  { id: "chat", label: "AI Chat", icon: MessageCircle },
  { id: "profile", label: "Profile", icon: User }
];

export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [showZenStart, setShowZenStart] = useState(false);

  if (showZenStart) {
    return <ZenStartFlow onComplete={() => setShowZenStart(false)} />;
  }

  return (
    <div className="min-h-screen bg-ios-gray-950">
      <Header />
      
      <main className="pb-20 pt-4">
        {activeTab === "home" && <HomeScreen onStartZenFlow={() => setShowZenStart(true)} />}
        {activeTab === "portfolio" && <HomeScreen onStartZenFlow={() => setShowZenStart(true)} />}
        {activeTab === "chat" && <AIChat />}
        {activeTab === "profile" && <UserProfile />}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 glass-card border-t border-ios-gray-800/50 backdrop-blur-xl">
        <div className="flex items-center justify-around py-3 px-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center space-y-1 py-2 px-4 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? 'text-ios-blue bg-ios-blue/10 scale-105' 
                    : 'text-ios-gray-500 hover:text-ios-gray-300 hover:bg-ios-gray-800/50'
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};
