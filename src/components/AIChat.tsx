
import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, TrendingUp, Lightbulb, ThumbsUp, ThumbsDown, Bookmark, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { fetchPerplexityResponse } from "@/services/perplexityService";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  liked?: boolean;
  saved?: boolean;
}

const trendingPrompts = [
  "What's happening with Bitcoin today?",
  "Explain staking in simple terms",
  "Is now a good time to buy crypto?",
  "What causes crypto prices to crash?"
];

const quickPrompts = [
  {
    icon: TrendingUp,
    text: "What's trending in crypto?",
    color: "text-ios-green"
  },
  {
    icon: Lightbulb,
    text: "Explain like I'm 5: DeFi",
    color: "text-ios-blue"
  },
  {
    icon: Sparkles,
    text: "Should I invest in altcoins?",
    color: "text-ios-purple"
  }
];

export const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hey! 👋 I'm your crypto co-pilot. I speak human, not Wall Street. What would you like to learn about today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showGlossary, setShowGlossary] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: message,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      console.log("Sending message to Perplexity API:", message);
      const aiResponseContent = await fetchPerplexityResponse(message);
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponseContent,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    } catch (error) {
      console.error("Error sending message:", error);
      
      // Provide a helpful fallback response
      const fallbackResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm currently unable to connect to the AI service. Please check that you've added your Perplexity API key in the Profile settings. You can get a free API key from perplexity.ai. \n\nIn the meantime, I'd be happy to help once you've set up the API connection! 🔧",
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, fallbackResponse]);
      setIsTyping(false);
      
      toast({
        title: "API Connection Error",
        description: "Please add your Perplexity API key in Profile settings",
        variant: "destructive"
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const handleQuickPrompt = (prompt: string) => {
    sendMessage(prompt);
  };

  const handleMessageAction = (messageId: string, action: 'like' | 'dislike' | 'save') => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        if (action === 'like') return { ...msg, liked: !msg.liked };
        if (action === 'save') return { ...msg, saved: !msg.saved };
      }
      return msg;
    }));
    
    if (action === 'save') {
      toast({
        title: "Saved!",
        description: "Added to your learnings",
      });
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)]">
      {/* Chat Header */}
      <div className="px-6 py-4 border-b border-ios-gray-800/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-ios-blue to-ios-purple rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-white font-semibold">AI Chat</h2>
              <p className="text-ios-gray-400 text-sm">Your crypto co-pilot</p>
            </div>
          </div>
          
          <button
            onClick={() => setShowGlossary(!showGlossary)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              showGlossary 
                ? 'bg-ios-blue text-white' 
                : 'bg-ios-gray-800 text-ios-gray-400 hover:bg-ios-gray-700'
            }`}
          >
            Still learning?
          </button>
        </div>

        {/* Trending Pills */}
        <div className="mt-4 space-y-2">
          <p className="text-ios-gray-400 text-xs font-medium">🔥 What's trending</p>
          <div className="flex flex-wrap gap-2">
            {trendingPrompts.slice(0, 2).map((prompt, index) => (
              <button
                key={index}
                onClick={() => handleQuickPrompt(prompt)}
                className="bg-ios-gray-800/50 hover:bg-ios-gray-700 text-ios-gray-300 text-xs px-3 py-2 rounded-full border border-ios-gray-700 transition-all hover:border-ios-blue/50"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl relative group ${
                message.isUser
                  ? 'bg-gradient-to-r from-ios-blue to-ios-purple text-white'
                  : 'glass-card text-white border border-ios-gray-800/50'
              }`}
            >
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
              <p className={`text-xs mt-2 ${
                message.isUser ? 'text-blue-100' : 'text-ios-gray-500'
              }`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
              
              {!message.isUser && (
                <div className="flex items-center space-x-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleMessageAction(message.id, 'like')}
                    className={`p-1 rounded hover:bg-ios-gray-700 transition-colors ${
                      message.liked ? 'text-ios-green' : 'text-ios-gray-500'
                    }`}
                  >
                    <ThumbsUp className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => handleMessageAction(message.id, 'dislike')}
                    className="p-1 rounded hover:bg-ios-gray-700 transition-colors text-ios-gray-500"
                  >
                    <ThumbsDown className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => handleMessageAction(message.id, 'save')}
                    className={`p-1 rounded hover:bg-ios-gray-700 transition-colors ${
                      message.saved ? 'text-ios-blue' : 'text-ios-gray-500'
                    }`}
                  >
                    <Bookmark className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="glass-card max-w-xs px-4 py-3 rounded-2xl border border-ios-gray-800/50">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-ios-blue rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-ios-blue rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-ios-blue rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts */}
      {messages.length === 1 && (
        <div className="px-6 pb-4">
          <p className="text-ios-gray-400 text-sm mb-3">💡 Quick starters:</p>
          <div className="space-y-2">
            {quickPrompts.map((prompt, index) => {
              const Icon = prompt.icon;
              return (
                <button
                  key={index}
                  onClick={() => handleQuickPrompt(prompt.text)}
                  className="w-full glass-card rounded-xl p-3 text-left hover:bg-ios-gray-800/80 transition-all duration-200 active:scale-98 border border-ios-gray-800/50"
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-5 h-5 ${prompt.color}`} />
                    <span className="text-white text-sm">{prompt.text}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-6 border-t border-ios-gray-800/50">
        <form onSubmit={handleSubmit} className="flex space-x-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask me anything about crypto..."
            className="flex-1 ios-input"
            disabled={isTyping}
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isTyping}
            className="p-3 bg-gradient-to-r from-ios-blue to-ios-purple rounded-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </form>
      </div>
    </div>
  );
};
