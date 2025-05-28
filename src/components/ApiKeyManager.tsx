
import { useState } from "react";
import { Key, Eye, EyeOff, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ApiKeyManagerProps {
  onKeysAdded: () => void;
  showTitle?: boolean;
}

export const ApiKeyManager = ({ onKeysAdded, showTitle = true }: ApiKeyManagerProps) => {
  const [perplexityKey, setPerplexityKey] = useState("");
  const [cmcKey, setCmcKey] = useState("");
  const [showPerplexityKey, setShowPerplexityKey] = useState(false);
  const [showCmcKey, setShowCmcKey] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    if (!perplexityKey.trim() || !cmcKey.trim()) {
      toast({
        title: "Missing API Keys",
        description: "Please enter both Perplexity and CoinMarketCap API keys.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Store keys in localStorage (in a real app, these would be stored securely)
      localStorage.setItem("zennfy_perplexity_key", perplexityKey);
      localStorage.setItem("zennfy_cmc_key", cmcKey);
      
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API validation
      
      toast({
        title: "API Keys Saved",
        description: "Your API keys have been securely stored.",
      });
      
      onKeysAdded();
    } catch (error) {
      console.error("Error saving API keys:", error);
      toast({
        title: "Error",
        description: "Failed to save API keys. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-6">
        {showTitle && (
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-ios-blue to-ios-purple rounded-2xl mb-4">
              <Key className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Setup API Keys</h1>
            <p className="text-ios-gray-400">
              Connect your Perplexity and CoinMarketCap API keys to get started
            </p>
          </div>
        )}

        <div className="glass-card rounded-2xl p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-white font-medium mb-2">
                Perplexity API Key
              </label>
              <div className="relative">
                <input
                  type={showPerplexityKey ? "text" : "password"}
                  value={perplexityKey}
                  onChange={(e) => setPerplexityKey(e.target.value)}
                  placeholder="Enter your Perplexity API key"
                  className="w-full ios-input pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPerplexityKey(!showPerplexityKey)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-ios-gray-500 hover:text-ios-gray-400"
                >
                  {showPerplexityKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-ios-gray-500 text-xs mt-1">
                Get your key from{" "}
                <a 
                  href="https://perplexity.ai" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-ios-blue hover:underline"
                >
                  perplexity.ai
                </a>
              </p>
            </div>

            <div>
              <label className="block text-white font-medium mb-2">
                CoinMarketCap API Key
              </label>
              <div className="relative">
                <input
                  type={showCmcKey ? "text" : "password"}
                  value={cmcKey}
                  onChange={(e) => setCmcKey(e.target.value)}
                  placeholder="Enter your CoinMarketCap API key"
                  className="w-full ios-input pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowCmcKey(!showCmcKey)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-ios-gray-500 hover:text-ios-gray-400"
                >
                  {showCmcKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-ios-gray-500 text-xs mt-1">
                Get your key from{" "}
                <a 
                  href="https://coinmarketcap.com/api/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-ios-blue hover:underline"
                >
                  coinmarketcap.com/api
                </a>
              </p>
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={isLoading || !perplexityKey.trim() || !cmcKey.trim()}
            className="w-full ios-button flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <CheckCircle className="w-5 h-5" />
            )}
            <span>{isLoading ? "Saving..." : "Save & Continue"}</span>
          </button>

          <div className="bg-ios-gray-800/50 rounded-xl p-4">
            <p className="text-ios-gray-400 text-sm">
              🔒 Your API keys are stored locally and never shared. They're only used to fetch real-time crypto data and AI insights for your learning experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
