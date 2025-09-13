"use client";

import { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Message, CompanionProfile } from '@/types/companion';

interface CompanionChatProps {
  messages: Message[];
  companion: CompanionProfile;
  isLoading?: boolean;
}

function formatTime(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).format(new Date(date));
}

export function CompanionChat({ messages, companion, isLoading }: CompanionChatProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-hidden flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className="flex items-start space-x-3 max-w-[80%]">
              {message.sender === 'companion' && (
                <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center flex-shrink-0 mt-1">
                  {companion.avatar ? (
                    <img 
                      src={companion.avatar} 
                      alt={companion.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-sm text-white">👤</div>
                  )}
                </div>
              )}
              
              <div className={`space-y-1 ${message.sender === 'user' ? 'items-end' : 'items-start'}`}>
                {message.sender === 'companion' && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">{companion.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {companion.relationshipType}
                    </Badge>
                  </div>
                )}
                
                <Card className={`
                  ${message.sender === 'user' 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none' 
                    : 'bg-muted/50'
                  }
                `}>
                  <CardContent className="p-3">
                    <div className="whitespace-pre-wrap break-words">
                      {message.content}
                    </div>
                  </CardContent>
                </Card>
                
                <div className="text-xs text-muted-foreground px-1">
                  {formatTime(message.timestamp)}
                </div>
              </div>
              
              {message.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-green-400 flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="text-sm text-white">👤</div>
                </div>
              )}
            </div>
          </div>
        ))}
        
        {/* Typing Indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-3 max-w-[80%]">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center flex-shrink-0 mt-1">
                {companion.avatar ? (
                  <img 
                    src={companion.avatar} 
                    alt={companion.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-sm text-white">👤</div>
                )}
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">{companion.name}</span>
                  <Badge variant="outline" className="text-xs">typing...</Badge>
                </div>
                
                <Card className="bg-muted/50">
                  <CardContent className="p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}