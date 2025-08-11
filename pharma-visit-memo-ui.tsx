import React, { useState, useRef, useEffect } from 'react';
import {
  Mic,
  MicOff,
  Send,
  Calendar,
  User,
  Pill,
  Brain,
  ChevronDown,
  ChevronUp,
  Edit2,
  Trash2,
  Check,
  X,
  Clock,
  Search,
  Filter,
  Plus
} from 'lucide-react';

const PharmaVisitMemoApp = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'agent',
      text: '您好！我是您的拜访备忘助手。您可以通过语音告诉我今天的医生拜访情况，我会帮您整理成结构化的会议纪要。',
      timestamp: '09:00'
    },
    {
      id: 2,
      type: 'user',
      text: '今天上午10点拜访了张医生，讨论了阿莫西林的使用，他认为这个药物的抗菌谱比较广，适合社区感染的初始治疗。下午2点见了李主任，谈到了头孢克肟，她对第三代头孢的耐药性表示担忧。',
      timestamp: '18:30'
    },
    {
      id: 3,
      type: 'agent',
      text: '已为您记录2条拜访纪要，请查看下方卡片确认信息是否正确。',
      timestamp: '18:31',
      cards: [
        {
          id: 'v1',
          visitTime: '2024-01-15 10:00',
          doctorName: '张医生',
          drugName: '阿莫西林',
          concept: '广谱抗菌药物',
          conceptCategory: '药物优势认知',
          notes: '认为抗菌谱广，适合社区感染初始治疗'
        },
        {
          id: 'v2',
          visitTime: '2024-01-15 14:00',
          doctorName: '李主任',
          drugName: '头孢克肟',
          concept: '耐药性担忧',
          conceptCategory: '用药顾虑',
          notes: '对第三代头孢的耐药性表示担忧'
        }
      ]
    }
  ]);

  const [isRecording, setIsRecording] = useState(false);
  const [inputText, setInputText] = useState('');
  const [expandedCards, setExpandedCards] = useState({});
  const [editingCard, setEditingCard] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleCardExpansion = (cardId) => {
    setExpandedCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  const handleEdit = (cardId) => {
    setEditingCard(cardId);
  };

  const handleDelete = (messageId, cardId) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId && msg.cards) {
        return {
          ...msg,
          cards: msg.cards.filter(card => card.id !== cardId)
        };
      }
      return msg;
    }));
  };

  const VisitCard = ({ card, messageId, expanded, onToggle }) => {
    const [localCard, setLocalCard] = useState(card);
    const isEditing = editingCard === card.id;

    const conceptCategories = [
      '药物优势认知',
      '用药顾虑',
      '疗效期待',
      '成本考虑',
      '依从性关注',
      '安全性重视'
    ];

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300">
        <div
          className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => onToggle(card.id)}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{card.visitTime}</span>
                </div>
                <div className="flex items-center gap-1 text-sm font-medium text-blue-600">
                  <User className="w-4 h-4" />
                  <span>{card.doctorName}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-medium">
                  <Pill className="w-3 h-3" />
                  {card.drugName}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium">
                  <Brain className="w-3 h-3" />
                  {card.conceptCategory}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {expanded ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
            </div>
          </div>
        </div>

        {expanded && (
          <div className="border-t border-gray-100 p-4 bg-gray-50">
            {isEditing ? (
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">拜访时间</label>
                  <input
                    type="datetime-local"
                    value={localCard.visitTime.replace(' ', 'T')}
                    onChange={(e) => setLocalCard({ ...localCard, visitTime: e.target.value.replace('T', ' ') })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">医生姓名</label>
                  <input
                    type="text"
                    value={localCard.doctorName}
                    onChange={(e) => setLocalCard({ ...localCard, doctorName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">药品名称</label>
                  <input
                    type="text"
                    value={localCard.drugName}
                    onChange={(e) => setLocalCard({ ...localCard, drugName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">观念类别</label>
                  <select
                    value={localCard.conceptCategory}
                    onChange={(e) => setLocalCard({ ...localCard, conceptCategory: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {conceptCategories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">详细记录</label>
                  <textarea
                    value={localCard.notes}
                    onChange={(e) => setLocalCard({ ...localCard, notes: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    rows="3"
                  />
                </div>
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => setEditingCard(null)}
                    className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      // Save logic here
                      setEditingCard(null);
                    }}
                    className="p-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <h4 className="text-xs font-medium text-gray-600 mb-1">医生观念</h4>
                  <p className="text-sm text-gray-800">{card.concept}</p>
                </div>
                <div>
                  <h4 className="text-xs font-medium text-gray-600 mb-1">详细记录</h4>
                  <p className="text-sm text-gray-700">{card.notes}</p>
                </div>
                <div className="flex gap-2 justify-end pt-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(card.id);
                    }}
                    className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(messageId, card.id);
                    }}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold text-gray-800">拜访备忘录</h1>
              <p className="text-xs text-gray-500">智能语音记录助手</p>
            </div>
            <div className="flex gap-2">
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Search className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] ${message.type === 'user' ? 'order-2' : ''}`}>
              <div
                className={`rounded-2xl px-4 py-3 ${message.type === 'user'
                    ? 'bg-blue-500 text-white rounded-br-sm'
                    : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-sm'
                  }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                <span className={`text-xs mt-1 block ${message.type === 'user' ? 'text-blue-100' : 'text-gray-400'
                  }`}>
                  {message.timestamp}
                </span>
              </div>

              {/* Visit Cards */}
              {message.cards && (
                <div className="mt-3 space-y-3">
                  {message.cards.map((card) => (
                    <VisitCard
                      key={card.id}
                      card={card}
                      messageId={message.id}
                      expanded={expandedCards[card.id]}
                      onToggle={toggleCardExpansion}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 px-4 py-3 safe-area-bottom">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsRecording(!isRecording)}
            className={`p-3 rounded-full transition-all ${isRecording
                ? 'bg-red-500 text-white animate-pulse shadow-lg'
                : 'bg-blue-500 text-white hover:bg-blue-600 shadow-md'
              }`}
          >
            {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          <div className="flex-1 relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={isRecording ? "正在录音..." : "点击麦克风开始录音"}
              className="w-full px-4 py-3 bg-gray-50 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
              disabled={isRecording}
            />
            {inputText && !isRecording && (
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors">
                <Send className="w-4 h-4" />
              </button>
            )}
          </div>

          <button className="p-3 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {isRecording && (
          <div className="mt-2 flex items-center justify-center">
            <div className="flex gap-1">
              <span className="w-1 h-4 bg-red-500 rounded-full animate-wave"></span>
              <span className="w-1 h-4 bg-red-500 rounded-full animate-wave animation-delay-200"></span>
              <span className="w-1 h-4 bg-red-500 rounded-full animate-wave animation-delay-400"></span>
            </div>
            <span className="ml-2 text-xs text-red-500">正在录音中...</span>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes wave {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(2); }
        }
        
        .animate-wave {
          animation: wave 1s ease-in-out infinite;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        
        .safe-area-bottom {
          padding-bottom: env(safe-area-inset-bottom, 12px);
        }
      `}</style>
    </div>
  );
};

export default PharmaVisitMemoApp;