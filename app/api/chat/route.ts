import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

// UBL Chatbot functionality with Gemini integration
class UBLChatbot {
  private tavilyApiKey: string
  private geminiApiKey: string
  private gemini: GoogleGenerativeAI

  constructor() {
    this.tavilyApiKey = process.env.TAVILY_API_KEY || ''
    this.geminiApiKey = process.env.GEMINI_API_KEY || ''
    
    // Initialize Gemini only if API key is available and not a placeholder
    if (this.geminiApiKey && 
        this.geminiApiKey !== 'your_gemini_api_key_here' && 
        this.geminiApiKey.length > 20) {
      this.gemini = new GoogleGenerativeAI(this.geminiApiKey)
    }
  }

  public getFallbackResponse(userMessage: string): string {
    const message = userMessage.toLowerCase()
    
    if (message.includes('account') || message.includes('open')) {
      return `To open a UBL account, you can visit any UBL branch with the required documents including your CNIC, proof of income, and address verification. You can also start the process online at ubldigital.com. UBL offers various account types including current, savings, and business accounts with competitive interest rates.`
    }
    
    if (message.includes('loan') || message.includes('credit')) {
      return `UBL offers various loan products including personal loans, home loans, and business loans. You can apply online through ubldigital.com or visit any UBL branch for more information about loan products, interest rates, and eligibility criteria.`
    }
    
    if (message.includes('card') || message.includes('debit') || message.includes('credit card')) {
      return `UBL provides a range of debit and credit cards with various benefits. You can apply for cards online at ubldigital.com or visit any UBL branch. Cards come with features like cashback, rewards, and international usage.`
    }
    
    if (message.includes('mobile') || message.includes('app') || message.includes('digital')) {
      return `UBL offers digital banking services through their mobile app and online platform. You can access your accounts, transfer money, pay bills, and manage your finances digitally. Visit ubldigital.com to learn more about their digital services.`
    }
    
    if (message.includes('interest') || message.includes('rate')) {
      return `UBL offers competitive interest rates on savings accounts, fixed deposits, and other investment products. Current rates and terms may vary, so I recommend visiting ubldigital.com or contacting a UBL branch for the most up-to-date information.`
    }
    
    return `I'm here to help with your UBL banking needs! You can ask me about account opening, loans, cards, digital banking, or any other UBL services. For the most current information, you can also visit ubldigital.com or contact your nearest UBL branch.`
  }



  private async searchWithTavily(query: string): Promise<string> {
    try {
      // Search ONLY on UBL Digital website
      const enhancedQuery = `site:ubldigital.com ${query}`
      
      const response = await fetch('https://api.tavily.com/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.tavilyApiKey}`
        },
        body: JSON.stringify({
          query: enhancedQuery,
          search_depth: 'basic',
          max_results: 3
        })
      })

      if (!response.ok) {
        throw new Error(`Tavily API error: ${response.status}`)
      }

      const data = await response.json()
      
      if (data.results && data.results.length > 0) {
        // Combine information from multiple results
        let combinedContent = ""
        for (const result of data.results) {
          const content = result.content || ''
          if (content.length > 50) {
            combinedContent += content + " "
          }
        }
        return combinedContent.trim()
      } else {
        return "I couldn't find specific information about that on our UBL Digital website. Please visit ubldigital.com for more details or contact our customer service."
      }
    } catch (error) {
      console.error('Tavily search error:', error)
      return "Unable to search for information at the moment. Please visit ubldigital.com for assistance."
    }
  }

  async processMessage(userMessage: string): Promise<string> {
    try {
      // Check if API keys are configured
      if (!this.geminiApiKey || 
          this.geminiApiKey === 'your_gemini_api_key_here' || 
          this.geminiApiKey.length < 20) {
        return this.getFallbackResponse(userMessage)
      }

      if (!this.tavilyApiKey || 
          this.tavilyApiKey === 'your_tavily_api_key_here' || 
          this.tavilyApiKey.length < 20) {
        return this.getFallbackResponse(userMessage)
      }

      let geminiResponse: string
      
      try {
        const model = this.gemini.getGenerativeModel({ model: 'gemini-1.5-flash' })
        
        const prompt = `You are a helpful UBL banking assistant. You have access to a web search tool to find current information ONLY from UBL Digital website (ubldigital.com).

User's question: "${userMessage}"

Instructions:
1. If the user is asking about UBL services, products, rates, or any specific information, use the web search tool to find current information from ubldigital.com ONLY
2. If it's a general greeting or simple question, respond directly
3. Always provide helpful, accurate, and conversational responses based ONLY on UBL Digital website content
4. Don't mention that you're using a search tool - just provide the information naturally
5. If no information is found on ubldigital.com, direct users to visit the website

Available tool: web_search(query) - searches ONLY ubldigital.com for information

How would you like to respond? If you need to search for information, respond with: SEARCH: [your search query]
If you can answer directly, just provide your response.`

        const result = await model.generateContent(prompt)
        const response = await result.response
        geminiResponse = response.text()
      } catch (geminiError) {
        console.error('Gemini processing error:', geminiError)
        // If Gemini fails (quota exceeded, etc.), use fallback response
        return this.getFallbackResponse(userMessage)
      }

      // Check if Gemini wants to use the search tool
      if (geminiResponse.includes('SEARCH:')) {
        const searchQuery = geminiResponse.split('SEARCH:')[1].trim()
        let searchResults: string
        
        try {
          searchResults = await this.searchWithTavily(searchQuery)
        } catch (searchError) {
          console.error('Search error:', searchError)
          // If search fails, use fallback response
          return this.getFallbackResponse(userMessage)
        }
        
        // Now ask Gemini to respond based on the search results
        const finalPrompt = `You are a helpful UBL banking assistant. Based on the following information from UBL Digital website (ubldigital.com), provide a natural response to the user's question.

User's question: "${userMessage}"

UBL Digital website information: "${searchResults}"

Please provide a helpful, natural response that directly answers the user's question using ONLY the information from ubldigital.com. Be conversational and friendly. If the information is incomplete, suggest visiting ubldigital.com for more details.`

        try {
          const finalResult = await model.generateContent(finalPrompt)
          const finalResponse = await finalResult.response
          return finalResponse.text()
        } catch (finalError) {
          console.error('Final Gemini processing error:', finalError)
          // If final processing fails, use fallback response
          return this.getFallbackResponse(userMessage)
        }
      } else {
        // Gemini can answer directly
        return geminiResponse
      }
    } catch (error) {
      console.error('General processing error:', error)
      return this.getFallbackResponse(userMessage)
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('API Route called')
    const { message } = await request.json()
    console.log('Received message:', message)

    if (!message) {
      console.log('No message provided')
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    console.log('Initializing UBL Chatbot...')
    // Initialize UBL Chatbot
    const chatbot = new UBLChatbot()
    
    // Create a readable stream for streaming response
    const stream = new ReadableStream({
      async start(controller) {
        try {
          console.log('Processing message...')
          // Process the message and get the full response
          const fullResponse = await chatbot.processMessage(message)
          console.log('Response generated, starting stream...')
          
          // Split response into words for smoother streaming
          const words = fullResponse.split(' ')
          
          // Stream the response in chunks for faster display
          const chunkSize = 3 // Process 3 words at a time for speed
          for (let i = 0; i < words.length; i += chunkSize) {
            const chunk = words.slice(i, i + chunkSize).join(' ')
            const word = chunk + (i + chunkSize < words.length ? ' ' : '')
            controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ content: word })}\n\n`))
            
            // Reduced delay for faster streaming
            await new Promise(resolve => setTimeout(resolve, 15))
          }
          
          // Send completion signal
          controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ done: true })}\n\n`))
          controller.close()
        } catch (error) {
          console.error('Streaming error:', error)
          const fallbackResponse = chatbot.getFallbackResponse(userInput)
          controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ content: fallbackResponse })}\n\n`))
          controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ done: true })}\n\n`))
          controller.close()
        }
      }
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })

  } catch (error) {
    console.error('Chat API error:', error)
    const chatbot = new UBLChatbot()
    const fallbackResponse = chatbot.getFallbackResponse(userInput)
    return NextResponse.json(
      { message: fallbackResponse },
      { status: 200 }
    )
  }
}
