
export const fetchPerplexityResponse = async (message: string): Promise<string> => {
  const apiKey = localStorage.getItem("zennfy_perplexity_key");
  
  if (!apiKey) {
    throw new Error("Perplexity API key not found. Please add it in your profile settings.");
  }

  try {
    console.log("Sending request to Perplexity API...");
    
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-small-128k-online',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful crypto education assistant. Provide clear, accurate, and beginner-friendly explanations about cryptocurrency topics. Keep responses concise but informative.'
          },
          {
            role: 'user',
            content: message
          }
        ],
        temperature: 0.2,
        top_p: 0.9,
        max_tokens: 1000,
        return_images: false,
        return_related_questions: false,
        search_domain_filter: ['coinmarketcap.com', 'coingecko.com', 'ethereum.org'],
        search_recency_filter: 'month',
        frequency_penalty: 1,
        presence_penalty: 0
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Perplexity API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    console.log("Successfully received Perplexity response");
    
    return data.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error("Perplexity API error:", error);
    
    // Provide a helpful fallback response
    return "I'm currently unable to connect to the AI service. Please check your API key in the profile settings and ensure you have a stable internet connection. You can get a Perplexity API key from perplexity.ai.";
  }
};
