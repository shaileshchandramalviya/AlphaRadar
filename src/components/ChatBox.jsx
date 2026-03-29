import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, Zap } from 'lucide-react';
import { QUICK_QUERIES, COLORS } from '../data/mockSignals';

const WELCOME = {
  summary: 'Welcome to AlphaRadar Copilot — your hedge-fund-grade market intelligence layer.',
  signals: [
    'Select any signal from the Opportunity Radar on the left',
    'Ask me anything about that stock\'s technical and fundamental outlook',
    'Or tap a quick query button above ↑',
  ],
  risk: null,
  verdict: 'Ready. Let\'s find alpha.',
};

function buildReply(text, signal) {
  if (!signal) {
    return {
      summary: 'Please select a signal card from the Opportunity Radar first.',
      signals: ['Click any signal on the left panel →'],
      risk: null,
      verdict: 'Load a stock context to get started.',
    };
  }
  const ql = text.toLowerCase();
  const mc = signal.chat;
  const stockMatch =
    ql.includes(signal.stock.toLowerCase()) ||
    ql.includes(signal.code.toLowerCase());
  const actionWord =
    ql.includes('buy') || ql.includes('sell') || ql.includes('why') ||
    ql.includes('good') || ql.includes('happen') || ql.includes('should') ||
    ql.includes('exit') || ql.includes('invest');
  if (stockMatch || actionWord) return mc;
  return {
    summary: `Based on currently loaded signal — ${signal.stock}:`,
    signals: mc.signals.slice(0, 3),
    risk: mc.risk,
    verdict: mc.verdict,
  };
}

function BotBubble({ data }) {
  return (
    <div
      className="max-w-[90%] p-4 rounded-tl rounded-3xl text-sm leading-relaxed"
      style={{ background: 'rgba(13,21,38,0.95)', border: '1px solid #1E2D4A', color: '#C8D5E8' }}
    >
      <p className="font-semibold mb-2" style={{ color: '#E8EDF5' }}>{data.summary}</p>
      {data.signals && (
        <ul className="mb-2 space-y-1.5 pl-4" style={{ color: '#A0B0CC', listStyleType: 'disc' }}>
          {data.signals.map((s, i) => <li key={i}>{s}</li>)}
        </ul>
      )}
      {data.risk && (
        <p className="text-xs mb-2" style={{ color: COLORS.risk.Medium }}>
          ⚠ {data.risk}
        </p>
      )}
      {data.verdict && (
        <p className="font-semibold text-sm" style={{ color: COLORS.bull }}>
          → {data.verdict}
        </p>
      )}
    </div>
  );
}

export default function ChatBox({ signal }) {
  const [messages, setMessages] = useState([{ role: 'bot', data: WELCOME }]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const send = (text) => {
    const t = text || input.trim();
    if (!t) return;
    setInput('');
    setMessages(m => [...m, { role: 'user', text: t }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(m => [...m, { role: 'bot', data: buildReply(t, signal) }]);
    }, 700 + Math.random() * 600);
  };

  return (
    <div className="flex flex-col flex-1" style={{ borderTop: '1px solid #1E2D4A' }}>
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-3 sticky top-0 z-10"
        style={{ borderBottom: '1px solid #1E2D4A', background: 'rgba(6,11,20,0.92)', backdropFilter: 'blur(12px)' }}
      >
        <div className="flex items-center gap-2 text-xs font-bold tracking-widest" style={{ color: '#8899B8' }}>
          <Bot size={14} />
          MARKET COPILOT
        </div>
        {signal && (
          <motion.span
            key={signal.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-xs font-semibold"
            style={{ color: COLORS.bull }}
          >
            ● {signal.stock} loaded
          </motion.span>
        )}
      </div>

      {/* Quick queries */}
      <div className="flex gap-2 px-4 py-2.5 flex-wrap" style={{ borderBottom: '1px solid #1E2D4A' }}>
        {QUICK_QUERIES.slice(0, 4).map(q => (
          <button
            key={q}
            onClick={() => send(q)}
            className="text-[11px] px-3 py-1.5 rounded-full transition-all duration-200 hover:text-white"
            style={{
              background: 'rgba(99,102,241,0.08)',
              color: '#8899B8',
              border: '1px solid rgba(99,102,241,0.2)',
              fontFamily: 'inherit',
            }}
            onMouseEnter={e => { e.target.style.background = 'rgba(99,102,241,0.2)'; }}
            onMouseLeave={e => { e.target.style.background = 'rgba(99,102,241,0.08)'; }}
          >
            {q}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3" style={{ maxHeight: 340 }}>
        <AnimatePresence initial={false}>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28 }}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.role === 'user' ? (
                <div
                  className="max-w-[72%] px-4 py-2.5 text-sm leading-relaxed rounded-[18px] rounded-br-sm"
                  style={{ background: 'linear-gradient(135deg, #6366F1, #3B82F6)', color: '#fff' }}
                >
                  {m.text}
                </div>
              ) : (
                <BotBubble data={m.data} />
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        {typing && (
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div
              className="flex items-center gap-1.5 px-4 py-3 rounded-tl rounded-3xl"
              style={{ background: 'rgba(13,21,38,0.95)', border: '1px solid #1E2D4A' }}
            >
              {[0, 1, 2].map(i => (
                <span
                  key={i}
                  className="block w-2 h-2 rounded-full"
                  style={{
                    background: '#4A5C7A',
                    animation: `typing-dot 1.2s ease-in-out ${i * 0.2}s infinite`,
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex gap-2.5 items-center px-4 py-3" style={{ borderTop: '1px solid #1E2D4A' }}>
        <input
          id="chat-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder={signal ? `Ask about ${signal.stock}…` : 'Ask anything about Indian markets…'}
          className="flex-1 text-sm px-4 py-2.5 rounded-xl outline-none transition-all duration-200"
          style={{
            background: 'rgba(13,21,38,0.8)',
            border: '1px solid #1E2D4A',
            color: '#E8EDF5',
            fontFamily: 'inherit',
          }}
          onFocus={e => { e.target.style.borderColor = '#6366F1'; e.target.style.boxShadow = '0 0 0 2px rgba(99,102,241,0.15)'; }}
          onBlur={e => { e.target.style.borderColor = '#1E2D4A'; e.target.style.boxShadow = 'none'; }}
        />
        <motion.button
          whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
          onClick={() => send()}
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: 'linear-gradient(135deg, #6366F1, #3B82F6)',
            boxShadow: '0 0 18px rgba(99,102,241,0.35)',
            border: 'none', cursor: 'pointer',
          }}
        >
          <Send size={16} color="white" />
        </motion.button>
      </div>
    </div>
  );
}
