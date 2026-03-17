"use client";

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { Headset, X } from 'lucide-react';

declare global {
  interface Window {
    difyChatbotConfig: any;
    embedChatbot: () => Promise<void>;
  }
}

export default function Chatbot() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Set configuration
    window.difyChatbotConfig = {
      token: 'sdJfmREUmc8d7wS8',
      baseUrl: 'https://app.oriagent.com'
    };

    // Hide the original Dify button
    const style = document.createElement('style');
    style.id = 'hide-dify-button';
    style.innerHTML = '#dify-chatbot-bubble-button { display: none !important; }';
    document.head.appendChild(style);

    return () => {
      const existingStyle = document.getElementById('hide-dify-button');
      if (existingStyle) existingStyle.remove();
    };
  }, []);

  const handleToggle = () => {
    const difyButton = document.getElementById('dify-chatbot-bubble-button');
    if (difyButton) {
      difyButton.click();
      // We can't easily detect the actual state from the Dify iframe easily without polling,
      // but we can toggle our local icon state.
      setIsOpen(!isOpen);
    }
  };

  if (!mounted) return null;

  return (
    <>
      <Script
        src="https://app.oriagent.com/embed.min.js"
        id="sdJfmREUmc8d7wS8"
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window.embedChatbot === 'function') {
            window.embedChatbot();
          }
        }}
      />
      
      {/* Custom Launcher Button */}
      <button
        onClick={handleToggle}
        className="fixed bottom-6 right-6 z-[2147483646] flex items-center gap-3 px-6 py-3 bg-[#0a0a0b] hover:bg-[#1a1a1c] border border-white/10 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 group"
      >
        <div className="relative flex items-center justify-center">
          {isOpen ? (
            <X className="w-5 h-5 text-white" />
          ) : (
            <Headset className="w-5 h-5 text-white" />
          )}
        </div>
        <span className="text-sm font-medium text-white tracking-wide">
          Chat with us
        </span>
        
        {/* Subtle pulse effect when closed */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-white/5 animate-ping -z-10 group-hover:animate-none" />
        )}
      </button>
    </>
  );
}
