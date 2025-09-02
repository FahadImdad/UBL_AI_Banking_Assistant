'use client'

import { motion } from 'framer-motion'
import { Bot, User, Volume2 } from 'lucide-react'
import { useState, useEffect } from 'react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

interface ChatMessageProps {
  message: Message
  onSpeak?: (text: string) => void
}

export default function ChatMessage({ message, onSpeak }: ChatMessageProps) {
  const isUser = message.sender === 'user'
  const [displayTime, setDisplayTime] = useState<string>('')
  const [displayText, setDisplayText] = useState<string>('')
  const [isStreaming, setIsStreaming] = useState<boolean>(false)

  useEffect(() => {
    // Only generate timestamp on client side to avoid hydration mismatch
    setDisplayTime(message.timestamp.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    }))
  }, [message.timestamp])

  useEffect(() => {
    // Update display text when message text changes
    setDisplayText(message.text)
    
    // Show streaming indicator for bot messages that are empty or being updated
    if (!isUser) {
      if (message.text === '') {
        // Show typing cursor for empty messages (during initial streaming)
        setIsStreaming(true)
      } else {
        // Show typing cursor briefly when text is being updated
        setIsStreaming(true)
        const timer = setTimeout(() => setIsStreaming(false), 300)
        return () => clearTimeout(timer)
      }
    } else {
      setIsStreaming(false)
    }
  }, [message.text, isUser])

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      transition={{ duration: 0.1 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div className={`max-w-[85%] px-5 py-4 ${
        isUser ? 'user-message' : 'bot-message'
      }`}>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {displayText || (isStreaming && !isUser ? 'UBL is typing...' : '')}
          {isStreaming && !isUser && (
            <span className="inline-block w-2 h-4 bg-current ml-1 animate-pulse" />
          )}
        </p>
        
        {/* Timestamp and Speaker Button */}
        <div className="mt-2 flex items-center justify-between">
          <div className="text-xs text-white/70 font-medium">
            {displayTime}
          </div>
          
          {/* Speaker Button for Bot Messages */}
          {!isUser && displayText && onSpeak && (
            <button
              onClick={() => onSpeak(displayText)}
              className="p-1 rounded-full hover:bg-white/10 transition-colors duration-200"
              title="Speak message"
            >
              <Volume2 className="w-4 h-4 text-white/70 hover:text-white" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
