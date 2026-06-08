import { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  Smile, 
  ArrowLeft, 
  Building2, 
  MessageSquare, 
  MoreVertical
} from 'lucide-react';
import type { Conversation } from '../data/mockData';

interface MessagesProps {
  conversations: Conversation[];
  onSendMessage: (conversationId: string, text: string) => void;
  onReceiveMessage: (conversationId: string, text: string) => void;
  activeConversationId: string;
  setActiveConversationId: (id: string) => void;
}

const EMOJIS = ['😊', '😂', '👍', '🔥', '🎉', '🚀', '❤️', '💯', '👏', '👀'];

export default function Messages({
  conversations,
  onSendMessage,
  onReceiveMessage,
  activeConversationId,
  setActiveConversationId
}: MessagesProps) {
  
  const [inputText, setInputText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [mobileView, setMobileView] = useState<'list' | 'chat'>('list');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const activeConversation = conversations.find(c => c.id === activeConversationId) || conversations[0];

  useEffect(() => {
    if (activeConversationId) {
      setMobileView('chat');
    }
  }, [activeConversationId]);

  // Scroll to bottom of message list on updates
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversation?.messages, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeConversation) return;

    const userText = inputText;
    // Send user message
    onSendMessage(activeConversation.id, userText);
    setInputText('');
    setShowEmojiPicker(false);

    // Simulate Client response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      
      const responses = [
        "Thanks for the update! Let me review this draft and get back to you shortly.",
        "That looks spot on. Can we wrap this up by Friday?",
        "Sounds great, Aryan! Could you also make sure to check the responsiveness on mobile?",
        "Awesome work so far. I will coordinate with the design team and release the milestone.",
        "Got it! Let's get on a quick chat tomorrow at 4 PM if you are free after school.",
        "Perfect. I am going to mark this task as complete. Keep up the great work!"
      ];
      
      const randomReply = responses[Math.floor(Math.random() * responses.length)];
      onReceiveMessage(activeConversation.id, randomReply);
    }, 2000);
  };

  const handleEmojiClick = (emoji: string) => {
    setInputText(prev => prev + emoji);
  };

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="h-[calc(100vh-8rem)] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm flex transition-colors duration-300">
      
      {/* Left Panel: Conversations list */}
      <div className={`w-full md:w-80 border-r border-slate-100 dark:border-slate-800 flex flex-col shrink-0 ${
        mobileView === 'chat' ? 'hidden md:flex' : 'flex'
      }`}>
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Conversations</h3>
          <span className="text-[10px] bg-brand/10 text-brand dark:bg-brand/20 dark:text-brand-light px-2 py-0.5 rounded-full font-bold">
            {conversations.filter(c => c.unread).length} New
          </span>
        </div>
        
        <div className="flex-1 overflow-y-auto divide-y divide-slate-50 dark:divide-slate-850">
          {conversations.length === 0 ? (
            <div className="p-6 text-center text-slate-400">
              <MessageSquare className="w-8 h-8 mx-auto mb-2 text-slate-350" />
              <p className="text-xs">No active chats. Apply to shortlisted projects to initiate chats.</p>
            </div>
          ) : (
            conversations.map((conv) => {
              const lastMsg = conv.messages[conv.messages.length - 1];
              const isActive = conv.id === activeConversation.id;
              
              return (
                <div 
                  key={conv.id}
                  onClick={() => {
                    setActiveConversationId(conv.id);
                    setMobileView('chat');
                  }}
                  className={`p-4 flex gap-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors ${
                    isActive ? 'bg-brand/5 dark:bg-brand/10 border-l-4 border-brand' : ''
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full shrink-0 flex items-center justify-center text-white font-bold text-xs ${conv.avatarColor || 'bg-slate-405'}`}>
                    {conv.clientName.charAt(0)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-0.5">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate pr-2">
                        {conv.clientName}
                      </h4>
                      {lastMsg && (
                        <span className="text-[9px] text-slate-400 shrink-0 font-medium">
                          {formatTime(lastMsg.timestamp)}
                        </span>
                      )}
                    </div>
                    
                    <h5 className="text-[10px] text-brand dark:text-brand-light font-semibold truncate mb-1.5 flex items-center gap-0.5">
                      <Building2 className="w-2.5 h-2.5" />
                      {conv.companyName} • {conv.projectTitle}
                    </h5>
                    
                    <p className={`text-xs truncate ${
                      conv.unread ? 'font-bold text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'
                    }`}>
                      {lastMsg ? lastMsg.text : 'No messages yet...'}
                    </p>
                  </div>

                  {conv.unread && (
                    <div className="w-2 h-2 rounded-full bg-brand shrink-0 self-center"></div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Right Panel: Active chat window */}
      <div className={`flex-1 flex flex-col min-w-0 bg-slate-50/20 dark:bg-slate-900/40 ${
        mobileView === 'list' ? 'hidden md:flex' : 'flex'
      }`}>
        {activeConversation ? (
          <>
            {/* Chat Header */}
            <div className="h-16 px-4 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between shrink-0 transition-colors">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setMobileView('list')}
                  className="md:hidden w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${activeConversation.avatarColor}`}>
                  {activeConversation.clientName.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    {activeConversation.clientName}
                  </h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate max-w-[180px] sm:max-w-xs leading-none mt-0.5">
                    Project: <span className="font-semibold text-brand dark:text-brand-light">{activeConversation.projectTitle}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[9px] font-bold text-emerald-505 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Online
                </span>
                <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-350 cursor-pointer">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Message History area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {activeConversation.messages.map((msg) => {
                const isUser = msg.sender === 'user';
                return (
                  <div 
                    key={msg.id}
                    className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[75%] rounded-2xl p-4 shadow-sm ${
                      isUser 
                        ? 'bg-brand text-white rounded-tr-none' 
                        : 'bg-white border border-slate-100 dark:bg-slate-800 dark:border-slate-800 dark:text-slate-200 text-slate-800 rounded-tl-none'
                    }`}>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                      <span className={`text-[9px] block text-right mt-1.5 font-medium ${
                        isUser ? 'text-white/60' : 'text-slate-400'
                      }`}>
                        {formatTime(msg.timestamp)}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Typing simulation bubble */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-100 dark:bg-slate-800 dark:border-slate-800 rounded-2xl rounded-tl-none p-3 shadow-sm flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Box Footer */}
            <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors relative">
              
              {/* Emojis selector list */}
              {showEmojiPicker && (
                <div className="absolute bottom-20 left-4 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-2xl shadow-xl p-2.5 flex items-center gap-1.5 z-40 animate-float-delayed">
                  {EMOJIS.map(e => (
                    <button 
                      key={e} 
                      type="button" 
                      onClick={() => handleEmojiClick(e)}
                      className="text-base p-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                    >
                      {e}
                    </button>
                  ))}
                </div>
              )}

              <form onSubmit={handleSend} className="flex gap-2">
                <button 
                  type="button"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className={`w-11 h-11 rounded-xl flex items-center justify-center border text-slate-500 hover:text-brand dark:hover:text-brand-light transition-colors cursor-pointer shrink-0 ${
                    showEmojiPicker 
                      ? 'border-brand/40 bg-brand/5 dark:bg-brand/10 text-brand' 
                      : 'border-slate-200 dark:border-slate-800'
                  }`}
                  title="Insert Emojis"
                >
                  <Smile className="w-5 h-5" />
                </button>
                
                <input 
                  type="text" 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type your message here..."
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition-all text-sm bg-transparent dark:text-white"
                />
                
                <button 
                  type="submit"
                  disabled={!inputText.trim()}
                  className="w-11 h-11 bg-brand hover:bg-brand-dark disabled:bg-slate-200 dark:disabled:bg-slate-800 text-white rounded-xl flex items-center justify-center transition-all cursor-pointer shrink-0"
                >
                  <Send className="w-4.5 h-4.5" />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-400">
            <MessageSquare className="w-12 h-12 mb-3 text-slate-300" />
            <h4 className="text-base font-bold text-slate-800 dark:text-slate-300 mb-1">Select a Conversation</h4>
            <p className="text-xs max-w-xs leading-relaxed">Choose a chat from the left panel to discuss project details and milestones.</p>
          </div>
        )}
      </div>

    </div>
  );
}
