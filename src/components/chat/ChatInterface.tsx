'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Sparkles, User, Bot, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFilter } from '@/context/FilterContext';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export const ChatInterface = () => {
  const { selectedSubject } = useFilter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setMessages((prev) => [...prev, {
      role: 'system',
      content: `Uploading and processing "${file.name}"...`
    }]);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = 'Upload failed';
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.error || errorMessage;
        } catch {
          errorMessage = `Server error: ${response.status} ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      if (data.text) {
        setMessages((prev) => [
          ...prev,
          {
            role: 'system',
            content: `Document "${file.name}" processed. Content: ${data.text.slice(0, 3000)}`
          },
          {
            role: 'system',
            content: `Successfully processed "${file.name}". You can now ask questions about it.`
          }
        ]);
        setInput(`Can you summarize the key concepts in ${file.name}?`);
      } else {
        throw new Error(data.error || 'Failed to extract text');
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      setMessages((prev) => [...prev, {
        role: 'system',
        content: `❌ Error processing file: ${message}`
      }]);
    } finally {
      setIsLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          subject: selectedSubject
        }),
      });

      const data = await response.json();
      if (data.message) {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.message }]);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#111521] relative overflow-hidden">
      {/* Header */}
      <header className="h-16 border-b border-gray-200 dark:border-[#252d46] bg-white/80 dark:bg-[#111521]/80 backdrop-blur-md flex items-center px-8 shrink-0 z-10">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-500 dark:text-[#95a0c6]">Chat</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 dark:text-white font-medium">
            {selectedSubject === 'All' ? 'STEM Learning Session' : `${selectedSubject} Session`}
          </span>
        </div>
      </header>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-8 space-y-6 scroll-smooth"
      >
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
            <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Sparkles size={32} />
            </div>
            <div>
              <h2 className="text-xl font-bold dark:text-white">Welcome to STEM Companion</h2>
              <p className="text-gray-500 dark:text-[#95a0c6] max-w-sm">
                Ask a question about Math, Physics, or Engineering to start your Socratic learning journey.
              </p>
            </div>
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={index}
            className={cn(
              "flex items-start gap-4",
              message.role === 'user' ? "justify-end" : "justify-start",
              message.role === 'system' && "justify-center"
            )}
          >
            {message.role === 'assistant' && (
              <div className="size-10 rounded-full bg-primary flex items-center justify-center text-white shrink-0 shadow-lg">
                <Bot size={20} />
              </div>
            )}

            {message.role === 'system' ? (
              <div className="bg-gray-100 dark:bg-[#252d46] px-3 py-1 rounded-full text-[11px] text-gray-500 dark:text-gray-400 italic border border-gray-200 dark:border-[#364063]">
                {message.content}
              </div>
            ) : (
              <div className={cn(
                "flex flex-col gap-1",
                message.role === 'user' ? "items-end" : "items-start"
              )}>
                <p className="text-gray-500 dark:text-[#95a0c6] text-[11px] font-semibold uppercase tracking-tight mx-1">
                  {message.role === 'user' ? 'You' : 'STEM Companion'}
                </p>
                <div className={cn(
                  "rounded-2xl px-4 py-3 max-w-xl shadow-sm border",
                  message.role === 'user'
                    ? "bg-primary text-white border-primary rounded-tr-none"
                    : "bg-white dark:bg-[#1a2033] text-gray-800 dark:text-gray-200 border-gray-200 dark:border-[#252d46] rounded-tl-none"
                )}>
                  <p className="whitespace-pre-wrap text-sm leading-relaxed">
                    {message.content}
                  </p>
                </div>
              </div>
            )}

            {message.role === 'user' && (
              <div className="size-10 rounded-full bg-gray-200 dark:bg-[#252d46] flex items-center justify-center text-gray-500 shrink-0">
                <User size={20} />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-start gap-4">
            <div className="size-10 rounded-full bg-primary flex items-center justify-center text-white shrink-0 shadow-lg animate-pulse">
              <Bot size={20} />
            </div>
            <div className="bg-white dark:bg-[#1a2033] border border-gray-200 dark:border-[#252d46] rounded-2xl rounded-tl-none px-5 py-4 shadow-md">
              <Loader2 className="w-5 h-5 animate-spin text-primary" />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-6 bg-white dark:bg-[#111521] border-t border-gray-200 dark:border-[#252d46]">
        <div className="max-w-4xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="relative flex items-end gap-3 p-2 bg-white dark:bg-[#252d46] border-2 border-gray-100 dark:border-[#252d46] rounded-2xl shadow-sm focus-within:border-primary transition-all"
          >
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.txt"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 text-gray-400 hover:text-primary transition-colors flex items-center justify-center"
            >
              <Paperclip size={20} />
            </button>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              placeholder="Ask a STEM question..."
              rows={1}
              className="flex-1 border-none focus:ring-0 resize-none py-2 text-sm text-gray-800 dark:text-white placeholder-gray-400 bg-transparent"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="size-10 bg-primary text-white rounded-xl flex items-center justify-center hover:bg-primary disabled:opacity-50 disabled:hover:bg-primary transition-colors shadow-lg shadow-primary/20"
            >
              <Send size={18} />
            </button>
          </form>
          <p className="text-center text-[10px] text-gray-400 dark:text-slate-500 mt-3 font-medium uppercase tracking-widest">
            Powered by Groq Llama 3 & Supabase
          </p>
        </div>
      </div>
    </div>
  );
};
