import { motion } from 'framer-motion';
import { Zap, TrendingUp, TrendingDown } from 'lucide-react';
import { COLORS } from '../data/mockSignals';

const riskColor = (r) => COLORS.risk[r] || '#8899B8';
const actionColor = (a) => COLORS.action[a] || '#6366F1';

export default function SignalCard({ signal: s, active, onClick }) {
  const bull = s.type === 'Bullish';
  const color = bull ? COLORS.bull : COLORS.bear;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className="mx-3 my-2 p-4 rounded-2xl cursor-pointer transition-shadow duration-300"
      style={{
        background: active
          ? `linear-gradient(135deg, ${color}0F 0%, rgba(13,21,38,0.9) 100%)`
          : 'rgba(13,21,38,0.8)',
        border: `1px solid ${active ? `${color}55` : '#1E2D4A'}`,
        boxShadow: active
          ? `0 0 32px ${color}20, inset 0 0 28px ${color}08`
          : 'none',
      }}
    >
      {/* Top Row */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="text-base font-bold tracking-tight" style={{ color: '#E8EDF5' }}>
            {s.stock}
          </div>
          <div className="text-xs mt-0.5 font-mono" style={{ color: '#4A5C7A' }}>
            {s.code} · {s.sector}
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-black leading-none font-mono" style={{ color }}>
            {s.confidence}%
          </div>
          <div className="text-[9px] tracking-widest mt-1" style={{ color: '#4A5C7A' }}>
            CONFIDENCE
          </div>
        </div>
      </div>

      {/* Signal Name */}
      <div className="flex items-center gap-1.5 mb-2.5">
        <Zap size={11} style={{ color: '#6366F1' }} fill="#6366F1" />
        <span className="text-xs font-semibold" style={{ color: '#6366F1' }}>
          {s.signalName}
        </span>
      </div>

      {/* Explanation */}
      <p className="text-xs leading-relaxed mb-3" style={{ color: '#6A7B96' }}>
        {s.explanation.length > 100 ? s.explanation.slice(0, 100) + '…' : s.explanation}
      </p>

      {/* Footer Pills */}
      <div className="flex items-center justify-between">
        <span
          className="flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full"
          style={{
            background: `${color}18`,
            color,
            border: `1px solid ${color}35`,
          }}
        >
          {bull ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
          {s.type}
        </span>
        <span
          className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
          style={{
            background: `${actionColor(s.action)}18`,
            color: actionColor(s.action),
            border: `1px solid ${actionColor(s.action)}35`,
          }}
        >
          {s.action}
        </span>
      </div>

      {/* Confidence Bar */}
      <div className="mt-3 h-0.5 rounded-full overflow-hidden" style={{ background: '#1E2D4A' }}>
        <motion.div
          className="h-full rounded-full conf-bar-fill"
          initial={{ width: 0 }}
          animate={{ width: `${s.confidence}%` }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
          style={{
            background: bull
              ? 'linear-gradient(90deg, #00C853, #00E676)'
              : 'linear-gradient(90deg, #D32F2F, #FF3D57)',
            boxShadow: `0 0 6px ${color}60`,
          }}
        />
      </div>
    </motion.div>
  );
}
