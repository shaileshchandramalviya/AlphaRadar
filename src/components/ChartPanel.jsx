import { motion, AnimatePresence } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip,
  ReferenceLine, ResponsiveContainer,
} from 'recharts';
import { BarChart2, TrendingUp, TrendingDown, Shield, Target } from 'lucide-react';
import { COLORS } from '../data/mockSignals';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="px-3 py-2 rounded-lg text-xs" style={{
        background: '#0D1526', border: '1px solid #1E2D4A', color: '#E8EDF5',
      }}>
        <div style={{ color: '#8899B8' }}>{label}</div>
        <div className="font-semibold font-mono mt-0.5">₹{payload[0].value.toLocaleString('en-IN')}</div>
      </div>
    );
  }
  return null;
};

export default function ChartPanel({ signal: s }) {
  if (!s) return (
    <div className="flex items-center justify-center flex-col gap-3 py-16 mx-5 mb-5 rounded-2xl"
      style={{ border: '1px dashed #1E2D4A', color: '#2A3C58' }}>
      <BarChart2 size={36} strokeWidth={1} />
      <p className="text-sm" style={{ color: '#4A5C7A' }}>Select a signal to view chart intelligence</p>
    </div>
  );

  const bull = s.type === 'Bullish';
  const color = bull ? COLORS.bull : COLORS.bear;
  const minP = Math.min(...s.chartData.map(d => d.p));
  const gradId = `grad-${s.id}`;

  const stats = [
    { label: 'PATTERN', value: s.pattern, color: '#6366F1' },
    { label: 'RISK LEVEL', value: s.risk, color: COLORS.risk[s.risk] },
    { label: 'SUGGESTED ACTION', value: s.action, color: COLORS.action[s.action] || '#6366F1' },
    { label: 'HISTORICAL WIN RATE', value: `${s.winRate}%`, color },
  ];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={s.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.35 }}
        className="mx-5 mb-5 rounded-2xl overflow-hidden"
        style={{ border: '1px solid #1E2D4A', background: 'rgba(13,21,38,0.6)' }}
      >
        {/* Header */}
        <div className="flex justify-between items-start px-5 py-4"
          style={{ borderBottom: '1px solid #1E2D4A' }}>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BarChart2 size={14} style={{ color: '#6366F1' }} />
              <span className="text-xs font-bold tracking-widest" style={{ color: '#8899B8' }}>
                CHART INTELLIGENCE
              </span>
            </div>
            <div className="text-base font-bold" style={{ color: '#E8EDF5' }}>
              {s.stock}
            </div>
            <div className="text-xs mt-0.5" style={{ color: '#4A5C7A' }}>
              Pattern:{' '}
              <span style={{ color: '#6366F1', fontWeight: 600 }}>{s.pattern}</span>
              {' · '}Historical Success:{' '}
              <span style={{ color, fontWeight: 600 }}>{s.winRate}%</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold font-mono" style={{ color }}>
              {s.price}
            </div>
            <div className="flex items-center justify-end gap-1 text-sm font-semibold mt-0.5" style={{ color }}>
              {bull ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
              {s.change} today
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="px-2 pt-3 pb-1">
          <ResponsiveContainer width="100%" height={185}>
            <AreaChart data={s.chartData} margin={{ top: 14, right: 12, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="d"
                tick={{ fill: '#4A5C7A', fontSize: 9, fontFamily: 'Inter' }}
                axisLine={{ stroke: '#1E2D4A' }} tickLine={false} />
              <YAxis
                domain={[minP * 0.965, 'auto']}
                tick={{ fill: '#4A5C7A', fontSize: 9, fontFamily: 'JetBrains Mono' }}
                axisLine={false} tickLine={false} width={56}
                tickFormatter={v =>
                  v >= 1000 ? `₹${(v / 1000).toFixed(1)}k` : `₹${v}`
                }
              />
              <Tooltip content={<CustomTooltip />} />
              {s.annotations.map(a => (
                <ReferenceLine
                  key={a.x} x={a.x}
                  stroke={color} strokeDasharray="4 3" strokeOpacity={0.7}
                  label={{ value: a.label, fill: color, fontSize: 9, position: 'top', fontFamily: 'Inter', fontWeight: 600 }}
                />
              ))}
              <Area
                type="monotone" dataKey="p"
                stroke={color} strokeWidth={2.5}
                fill={`url(#${gradId})`}
                dot={false}
                activeDot={{ r: 5, fill: color, stroke: '#0D1526', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-4 gap-0"
          style={{ borderTop: '1px solid #1E2D4A' }}>
          {stats.map((st, i) => (
            <div
              key={st.label}
              className="px-4 py-3"
              style={{ borderRight: i < 3 ? '1px solid #1E2D4A' : 'none' }}
            >
              <div className="text-[9px] tracking-widest mb-1.5" style={{ color: '#4A5C7A' }}>
                {st.label}
              </div>
              <div className="text-sm font-bold font-mono" style={{ color: st.color }}>
                {st.value}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
