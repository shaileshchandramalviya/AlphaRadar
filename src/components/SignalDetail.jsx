import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Shield, TrendingUp, TrendingDown, X } from 'lucide-react';
import { COLORS } from '../data/mockSignals';

export default function SignalDetail({ signal: s, onClose }) {
  if (!s) return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 px-6 flex-1">
      <div className="w-16 h-16 rounded-full flex items-center justify-center"
        style={{ background: 'rgba(30,45,74,0.4)', border: '1px solid #1E2D4A' }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2A3C58" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
        </svg>
      </div>
      <div className="text-center">
        <p className="text-sm font-medium" style={{ color: '#4A5C7A' }}>Select a signal to view confluence details</p>
        <p className="text-xs mt-1" style={{ color: '#2A3C58' }}>Click any card from the Opportunity Radar</p>
      </div>
    </div>
  );

  const bull = s.type === 'Bullish';
  const color = bull ? COLORS.bull : COLORS.bear;
  const acColor = COLORS.action[s.action] || '#6366F1';

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={s.id}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.32 }}
        className="px-6 pt-5 pb-4"
        style={{ borderBottom: '1px solid #1E2D4A' }}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <Zap size={10} fill="#6366F1" style={{ color: '#6366F1' }} />
              <span className="text-[10px] font-bold tracking-widest" style={{ color: '#4A5C7A' }}>
                HIGH-CONVICTION SIGNAL
              </span>
            </div>
            <h2 className="text-3xl font-black tracking-tight" style={{ color: '#E8EDF5' }}>
              {s.stock}
            </h2>
            <p className="text-sm mt-1.5" style={{ color: '#8899B8' }}>
              <span style={{ color, fontWeight: 700 }}>{s.price}</span>
              {' '}
              <span style={{ color, fontWeight: 600 }}>{s.change}</span>
              <span style={{ color: '#4A5C7A', marginLeft: 10 }}>{s.sector} · NSE:{s.code}</span>
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="text-right">
              <div className="text-5xl font-black leading-none font-mono" style={{ color }}>
                {s.confidence}%
              </div>
              <div className="text-[9px] tracking-widest mt-1" style={{ color: '#4A5C7A' }}>
                SIGNAL CONFIDENCE
              </div>
            </div>
          </div>
        </div>

        {/* Confluence Detection Box */}
        <div className="rounded-xl px-4 pt-4 pb-4 mb-4"
          style={{ background: 'rgba(99,102,241,0.07)', border: '1px solid rgba(99,102,241,0.22)' }}>
          <div className="flex items-center gap-2 mb-3">
            <Zap size={12} fill="#6366F1" style={{ color: '#6366F1' }} />
            <span className="text-[10px] font-bold tracking-widest" style={{ color: '#6366F1' }}>
              CONFLUENCE DETECTED — BOTH SIGNALS ALIGN
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            {/* Technical */}
            <div className="p-3 rounded-xl"
              style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)' }}>
              <div className="text-[10px] font-bold tracking-wide mb-2"
                style={{ color: '#3B82F6' }}>
                📈 TECHNICAL SIGNAL
              </div>
              <p className="text-[13px] leading-relaxed" style={{ color: '#C8D5E8' }}>{s.tech}</p>
            </div>
            {/* Fundamental */}
            <div className="p-3 rounded-xl"
              style={{ background: 'rgba(0,230,118,0.06)', border: '1px solid rgba(0,230,118,0.18)' }}>
              <div className="text-[10px] font-bold tracking-wide mb-2"
                style={{ color: COLORS.bull }}>
                🏛 FUNDAMENTAL SIGNAL
              </div>
              <p className="text-[13px] leading-relaxed" style={{ color: '#C8D5E8' }}>{s.fund}</p>
            </div>
          </div>

          {/* Confidence bar */}
          <div>
            <div className="flex justify-between text-[10px] mb-1.5" style={{ color: '#4A5C7A' }}>
              <span>Signal Strength</span>
              <span style={{ color, fontWeight: 600 }}>{s.confidence}% Confidence</span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#1E2D4A' }}>
              <motion.div
                className="h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${s.confidence}%` }}
                transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{
                  background: bull
                    ? 'linear-gradient(90deg, #00C853, #00E676)'
                    : 'linear-gradient(90deg, #D32F2F, #FF3D57)',
                  boxShadow: `0 0 10px ${color}70`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Copilot Explanation */}
        <div className="rounded-xl p-4 mb-4"
          style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid #1E2D4A' }}>
          <div className="text-[10px] font-bold tracking-widest mb-2" style={{ color: '#4A5C7A' }}>
            🤖 COPILOT SAYS
          </div>
          <p className="text-sm italic leading-7" style={{ color: '#A0B0CC' }}>
            "{s.explanation}"
          </p>
        </div>

        {/* Meta chips */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: 'PATTERN', value: s.pattern, color: '#6366F1' },
            { label: 'RISK', value: s.risk, color: COLORS.risk[s.risk] },
            { label: 'ACTION', value: s.action, color: acColor },
            { label: 'WIN RATE', value: `${s.winRate}%`, color },
          ].map(c => (
            <div key={c.label} className="rounded-xl p-3"
              style={{ background: 'rgba(13,21,38,0.85)', border: '1px solid #1E2D4A' }}>
              <div className="text-[9px] tracking-widest mb-1.5" style={{ color: '#4A5C7A' }}>
                {c.label}
              </div>
              <div className="text-sm font-bold font-mono" style={{ color: c.color }}>
                {c.value}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
