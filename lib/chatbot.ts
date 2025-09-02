// UBL Chatbot backend integration
// This file can be used to integrate with the Python chatbot if needed

export interface ChatMessage {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

export interface ChatResponse {
  response: string
  error?: string
}

export class UBLChatbotService {
  private static instance: UBLChatbotService

  public static getInstance(): UBLChatbotService {
    if (!UBLChatbotService.instance) {
      UBLChatbotService.instance = new UBLChatbotService()
    }
    return UBLChatbotService.instance
  }

  async sendMessage(message: string): Promise<ChatResponse> {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error sending message:', error)
      return {
        response: "I'm having some technical issues. Please try again!",
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }
}

export const chatbotService = UBLChatbotService.getInstance()
