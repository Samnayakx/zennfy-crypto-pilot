
import { useState } from "react";
import { Header } from "./Header";
import { CryptoGrid } from "./CryptoGrid";
import { AIChat } from "./AIChat";
import { ApiKeyManager } from "./ApiKeyManager";
import { MessageCircle, BarChart3, Settings } from "lucide-react";

const tabs = [
  { id: "portfolio", label: "Portfolio", icon: BarChart3 },
  { id: "chat", label: "AI Chat", icon: MessageCircle },
  { id: "settings", label: "Settings", icon: Settings }
];

export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("portfolio");
  const [hasApiKeys, setHasApiKeys] = useState(false);

  if (!hasApiKeys) {
    return <ApiKeyManager onKeysAdded={() => setHasApiKeys(true)} />;
  }

  return (
    <div className="min-h-screen bg-ios-gray-950">
      <Header />
      
      <main className="pb-20">
        {activeTab === "portfolio" && <CryptoGrid />}
        {activeTab === "chat" && <AIChat />}
        {activeTab === "settings" && (
          <div className="p-6">
            <ApiKeyManager onKeysAdded={() => {}} showTitle={false} />
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 glass-card border-t border-ios-gray-800">
        <div className="flex items-center justify-around py-3 px-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center space-y-1 py-2 px-4 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'text-ios-blue bg-ios-blue/10' 
                    : 'text-ios-gray-500 hover:text-ios-gray-300'
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
