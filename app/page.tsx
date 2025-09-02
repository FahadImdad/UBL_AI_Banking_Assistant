'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Loader2, Mic } from 'lucide-react'
import ChatMessage from '@/components/ChatMessage'


interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const synthRef = useRef<SpeechSynthesis | null>(null)

  // Initialize welcome message only on client side to avoid hydration mismatch
  useEffect(() => {
    const welcomeMessage = 'Hi! I\'m your UBL banking assistant. Ask me anything about UBL services!'
    setMessages([
      {
        id: '1',
        text: welcomeMessage,
        sender: 'bot',
        timestamp: new Date()
      }
    ])
    
    // No auto-speech for welcome message
  }, [])

  // Initialize speech recognition and synthesis (lazy loaded)
  useEffect(() => {
    // Delay speech initialization to improve initial load
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined') {
        // Speech Recognition
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        if (SpeechRecognition) {
          recognitionRef.current = new SpeechRecognition()
          recognitionRef.current.continuous = false
          recognitionRef.current.interimResults = false
          recognitionRef.current.lang = 'en-US'

          recognitionRef.current.onresult = (event) => {
            const transcript = event.results[0][0].transcript
            setInputValue(transcript)
            setIsListening(false)
          }

          recognitionRef.current.onerror = () => {
            setIsListening(false)
          }

          recognitionRef.current.onend = () => {
            setIsListening(false)
          }
        }

        // Speech Synthesis
        synthRef.current = window.speechSynthesis
      }
    }, 500) // 500ms delay for faster initial load

    return () => clearTimeout(timer)
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    const userInput = inputValue
    setInputValue('')
    setIsLoading(true)

    // Create initial empty bot message for streaming
    const botMessageId = (Date.now() + 1).toString()
    const initialBotMessage: Message = {
      id: botMessageId,
      text: '',
      sender: 'bot',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, initialBotMessage])

    try {
      console.log('Sending message to API:', userInput)
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userInput }),
      })

      console.log('Response status:', response.status)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      if (!reader) {
        throw new Error('No reader available')
      }

      let streamedText = ''
      let lastSpokenLength = 0

      while (true) {
        const { done, value } = await reader.read()
        
        if (done) break

        const chunk = decoder.decode(value)
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6))
              
                             if (data.content) {
                 streamedText += data.content
                 setMessages(prev => 
                   prev.map(msg => 
                     msg.id === botMessageId 
                       ? { ...msg, text: streamedText }
                       : msg
                   )
                 )
                 
                 // No auto-speech during streaming
               }
              
                             if (data.done) {
                 setIsLoading(false)
                 return
               }
              
              if (data.error) {
                setMessages(prev => 
                  prev.map(msg => 
                    msg.id === botMessageId 
                      ? { ...msg, text: data.error }
                      : msg
                  )
                )
                setIsLoading(false)
                return
              }
            } catch (parseError) {
              console.error('Error parsing stream data:', parseError)
            }
          }
        }
      }
    } catch (error) {
      console.error('Streaming error:', error)
      setMessages(prev => 
        prev.map(msg => 
          msg.id === botMessageId 
            ? { ...msg, text: 'Sorry, I\'m having some technical issues. Please try again!' }
            : msg
        )
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Audio control functions
  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true)
      recognitionRef.current.start()
    }
  }

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }

  const speakText = (text: string) => {
    if (synthRef.current && text.trim()) {
      // Stop any current speech immediately
      synthRef.current.cancel()
      
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.85
      utterance.pitch = 1
      utterance.volume = 0.8
      
      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      utterance.onerror = () => setIsSpeaking(false)
      
      synthRef.current.speak(utterance)
    }
  }



  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Futuristic Background Elements */}
      <div className="particles">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${6 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* UBL Logo */}
      <div className="flex justify-center pt-16 pb-8 relative z-10">
        <div className="text-center">
          <div className="mb-4">
            <img 
              src="/ubl_logo.png" 
              alt="UBL Logo" 
              className="h-20 w-auto mx-auto"
            />
          </div>
          <div className="text-white text-lg font-['Orbitron'] font-bold tracking-widest neon-text">BANKING ASSISTANT</div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 px-4 pb-4 overflow-y-auto relative z-10">
        <div className="max-w-2xl mx-auto space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} onSpeak={speakText} />
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area - Fixed at bottom */}
      <div className="p-4 glass-dark border-t border-cyan-500/30 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Status Indicators */}
          {(isListening || isSpeaking || isLoading) && (
            <div className="flex justify-center space-x-6 mb-3">
              {isListening && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center space-x-2 text-cyan-400 text-sm font-medium"
                >
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/50"></div>
                  <span>Listening...</span>
                </motion.div>
              )}
              {isSpeaking && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center space-x-2 text-green-400 text-sm font-medium"
                >
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                  <span>Speaking...</span>
                </motion.div>
              )}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center space-x-2 text-blue-400 text-sm font-medium"
                >
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse shadow-lg shadow-blue-400/50"></div>
                  <span>UBL is thinking...</span>
                </motion.div>
              )}
            </div>
          )}

          <div className="flex items-center space-x-3">
            {/* Input Field */}
            <div className="flex-1">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about UBL banking..."
                className="w-full px-5 py-4 simple-input rounded-xl text-base font-medium"
                disabled={isLoading}
              />
            </div>

            {/* Send Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              className={`px-8 py-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 text-base font-semibold shadow-lg transition-all duration-150 ${
                isLoading 
                  ? 'simple-button' 
                  : 'bg-gray-500/20 border-2 border-gray-400 text-gray-400 hover:bg-gray-500/30'
              }`}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </motion.button>

            {/* Microphone Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={isListening ? stopListening : startListening}
              disabled={isLoading}
              className={`px-8 py-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 text-base font-semibold shadow-lg transition-all duration-150 ${
                isListening 
                  ? 'simple-button' 
                  : 'bg-gray-500/20 border-2 border-gray-400 text-gray-400 hover:bg-gray-500/30'
              }`}
            >
              <Mic className="w-5 h-5" />
            </motion.button>


          </div>
        </div>
      </div>
    </div>
  )
}
