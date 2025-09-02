'use client'

import { motion } from 'framer-motion'
import { Banknote, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-dark border-b border-cyan-500/20 relative z-20"
    >
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-4"
          >
            <div className="w-16 h-16 gradient-bg rounded-xl flex items-center justify-center neon-glow">
              <div className="text-2xl font-bold ubl-logo">UBL</div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white font-['Orbitron'] neon-text">UNITED BANK LIMITED</h1>
              <p className="text-sm text-cyan-300 font-['Orbitron']">FUTURISTIC BANKING ASSISTANT</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-cyan-300 hover:text-white transition-colors font-['Orbitron'] text-sm">
              HOME
            </a>
            <a href="#" className="text-cyan-300 hover:text-white transition-colors font-['Orbitron'] text-sm">
              SERVICES
            </a>
            <a href="#" className="text-cyan-300 hover:text-white transition-colors font-['Orbitron'] text-sm">
              SUPPORT
            </a>
            <a href="#" className="text-cyan-300 hover:text-white transition-colors font-['Orbitron'] text-sm">
              CONTACT
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-3 rounded-lg glass-dark hover:neon-glow transition-all duration-300"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-cyan-300" />
            ) : (
              <Menu className="w-6 h-6 text-cyan-300" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pb-4 border-t border-cyan-500/20"
          >
            <div className="flex flex-col space-y-3 pt-4">
              <a href="#" className="text-cyan-300 hover:text-white transition-colors py-2 font-['Orbitron'] text-sm">
                HOME
              </a>
              <a href="#" className="text-cyan-300 hover:text-white transition-colors py-2 font-['Orbitron'] text-sm">
                SERVICES
              </a>
              <a href="#" className="text-cyan-300 hover:text-white transition-colors py-2 font-['Orbitron'] text-sm">
                SUPPORT
              </a>
              <a href="#" className="text-cyan-300 hover:text-white transition-colors py-2 font-['Orbitron'] text-sm">
                CONTACT
              </a>
            </div>
          </motion.nav>
        )}
      </div>
    </motion.header>
  )
}
