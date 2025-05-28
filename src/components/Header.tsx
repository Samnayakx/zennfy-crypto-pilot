
import { useState } from "react";
import { Bell, Search, User } from "lucide-react";

export const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-50 glass-card border-b border-ios-gray-800">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-ios-blue to-ios-purple bg-clip-text text-transparent">
              Zennfy
            </h1>
            <p className="text-ios-gray-400 text-sm">Good morning! Ready to learn?</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="p-2 rounded-xl bg-ios-gray-900 hover:bg-ios-gray-800 transition-colors">
              <Bell className="w-5 h-5 text-ios-gray-400" />
            </button>
            <button className="p-2 rounded-xl bg-ios-gray-900 hover:bg-ios-gray-800 transition-colors">
              <User className="w-5 h-5 text-ios-gray-400" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-ios-gray-500" />
          <input
            type="text"
            placeholder="Search coins or ask a question..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full ios-input pl-11"
          />
        </div>
      </div>
    </header>
  );
};
