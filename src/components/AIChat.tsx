
import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, TrendingUp, Lightbulb } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const quickPrompts = [
  {
    icon: TrendingUp,
    text: "What's happening with Bitcoin today?",
    color: "text-ios-green"
  },
  {
    icon: Lightbulb,
    text: "Explain what staking means",
    color: "text-ios-blue"
  },
  {
    icon: Sparkles,
    text: "Should I invest in Ethereum?",
    color: "text-ios-purple"
  }
];

export const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi! I'm your Zennfy AI assistant. I can help you understand crypto concepts, explain market trends, and guide your investment decisions. What would you like to learn about today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
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
      // Simulate API call to Perplexity
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: `Great question! I'd be happy to help you understand that. Since this is a demo, I'm showing you a sample response. In the full version, I would use Perplexity's API to analyze real-time crypto data and provide personalized insights about "${message}".`,
          isUser: false,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, aiResponse]);
        setIsTyping(false);
      }, 2000);
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please check your API key.",
        variant: "destructive"
      });
      setIsTyping(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const handleQuickPrompt = (prompt: string) => {
    sendMessage(prompt);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)]">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                message.isUser
                  ? 'bg-ios-blue text-white'
                  : 'glass-card text-white'
              }`}
            >
              <p className="text-sm leading-relaxed">{message.content}</p>
              <p className={`text-xs mt-2 ${
                message.isUser ? 'text-blue-100' : 'text-ios-gray-500'
              }`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="glass-card max-w-xs px-4 py-3 rounded-2xl">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-ios-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-ios-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-ios-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts */}
      {messages.length === 1 && (
        <div className="px-6 pb-4">
          <p className="text-ios-gray-400 text-sm mb-3">Quick questions to get started:</p>
          <div className="space-y-2">
            {quickPrompts.map((prompt, index) => {
              const Icon = prompt.icon;
              return (
                <button
                  key={index}
                  onClick={() => handleQuickPrompt(prompt.text)}
                  className="w-full glass-card rounded-xl p-3 text-left hover:bg-ios-gray-800/80 transition-all duration-200 active:scale-98"
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
      <div className="p-6 border-t border-ios-gray-800">
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
            className="p-3 bg-ios-blue rounded-xl hover:bg-ios-blue/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 active:scale-95"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </form>
      </div>
    </div>
  );
};
