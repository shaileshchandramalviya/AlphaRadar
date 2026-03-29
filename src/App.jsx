import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Radio, BarChart2, Bot, Video, TrendingUp, TrendingDown
} from 'lucide-react';

import './index.css';
import { SIGNALS } from './data/mockSignals';
import SignalCard from './components/SignalCard';
import SignalDetail from './components/SignalDetail';
import ChartPanel from './components/ChartPanel';
import ChatBox from './components/ChatBox';
import VideoSection from './components/VideoSection';

const TABS = [
  { id: 'radar', label: 'Opportunity Radar', icon: <Radio size={14} /> },
  { id: 'chart', label: 'Chart Intelligence', icon: <BarChart2 size={14} /> },
  { id: 'chat',  label: 'Market Copilot',    icon: <Bot size={14} /> },
  { id: 'wrap',  label: 'Market Wrap',       icon: <Video size={14} /> },
];

const sorted = [...SIGNALS].sort((a, b) => b.confidence - a.confidence);

export default function App() {
  const [tab, setTab] = useState('radar');
  const [selId, setSelId] = useState(1);
  const signal = SIGNALS.find(s => s.id === selId) || null;

  const selectSignal = (id) => {
    setSelId(id);
    if (tab === 'wrap') setTab('radar');
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden" style={{ background: '#060B14' }}>
      {/* Ambient glows */}
      <div className="ambient-1" />
      <div className="ambient-2" />
      <div className="ambient-3" />

      {/* ── HEADER ─────────────────────────────────────────── */}
      <header
        className="flex-shrink-0 flex items-center justify-between px-5 z-50"
        style={{
          height: 58,
          background: 'rgba(6,11,20,0.88)',
          backdropFilter: 'blur(24px)',
          borderBottom: '1px solid #1E2D4A',
          position: 'relative',
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg, #3B82F6, #6366F1)',
              boxShadow: '0 0 22px rgba(59,130,246,0.45)',
            }}
          >
            <Radio size={17} color="white" />
          </div>
          <div>
            <div
              className="text-lg font-black tracking-tight leading-none"
              style={{
                background: 'linear-gradient(135deg, #E8EDF5, #8899B8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              AlphaRadar
            </div>
            <div className="text-[10px] tracking-widest leading-none mt-0.5" style={{ color: '#4A5C7A' }}>
              COPILOT · AI FOR INDIAN INVESTORS
            </div>
          </div>
        </div>

        {/* Nav tabs */}
        <nav className="flex gap-1">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium transition-all duration-200"
              style={{
                fontFamily: 'inherit',
                background: tab === t.id ? 'rgba(99,102,241,0.15)' : 'transparent',
                color: tab === t.id ? '#6366F1' : '#8899B8',
                border: tab === t.id ? '1px solid rgba(99,102,241,0.25)' : '1px solid transparent',
                cursor: 'pointer',
              }}
            >
              {t.icon}
              <span className="hidden sm:inline">{t.label}</span>
            </button>
          ))}
        </nav>

        {/* Live badge + Nifty */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-3 text-xs" style={{ color: '#4A5C7A' }}>
            <span>NIFTY 50 <span style={{ color: '#00E676', fontWeight: 600 }}>22,450  ▲0.8%</span></span>
            <span>SENSEX <span style={{ color: '#00E676', fontWeight: 600 }}>74,120  ▲0.7%</span></span>
          </div>
          <div
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full"
            style={{
              background: 'rgba(0,230,118,0.07)',
              border: '1px solid rgba(0,230,118,0.2)',
              color: '#00E676',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse-dot" style={{ background: '#00E676' }} />
            Signals Live · NSE
          </div>
        </div>
      </header>

      {/* ── MAIN 2-COL GRID ────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden" style={{ position: 'relative', zIndex: 1 }}>

        {/* SIDEBAR — Opportunity Radar */}
        <aside
          className="flex-shrink-0 flex flex-col overflow-hidden"
          style={{
            width: 370,
            borderRight: '1px solid #1E2D4A',
          }}
        >
          {/* Sidebar header */}
          <div
            className="flex items-center justify-between px-4 py-3 flex-shrink-0 sticky top-0 z-10"
            style={{
              background: 'rgba(6,11,20,0.92)',
              backdropFilter: 'blur(12px)',
              borderBottom: '1px solid #1E2D4A',
            }}
          >
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest" style={{ color: '#8899B8' }}>
              <Radio size={13} />
              OPPORTUNITY RADAR
            </div>
            <div className="flex gap-1.5">
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(0,230,118,0.08)', color: '#00E676', border: '1px solid rgba(0,230,118,0.2)' }}>
                {sorted.filter(s => s.type === 'Bullish').length} Bullish
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(255,61,87,0.08)', color: '#FF3D57', border: '1px solid rgba(255,61,87,0.2)' }}>
                {sorted.filter(s => s.type === 'Bearish').length} Bearish
              </span>
            </div>
          </div>

          {/* Sorted confidence label */}
          <div className="px-4 py-2 text-[10px] tracking-widest flex-shrink-0"
            style={{ color: '#2A3C58', borderBottom: '1px solid rgba(30,45,74,0.4)' }}>
            SORTED BY CONFIDENCE · CONFLUENCE ONLY
          </div>

          {/* Cards list */}
          <div className="overflow-y-auto flex-1 py-1">
            {sorted.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, duration: 0.3 }}
              >
                <SignalCard
                  signal={s}
                  active={s.id === selId}
                  onClick={() => selectSignal(s.id)}
                />
              </motion.div>
            ))}
            <div className="py-4 text-center text-[10px] tracking-widest" style={{ color: '#1E2D4A' }}>
              REFRESHES EVERY 15 MIN
            </div>
          </div>
        </aside>

        {/* CONTENT PANEL */}
        <main className="flex-1 overflow-y-auto flex flex-col" style={{ position: 'relative' }}>
          <AnimatePresence mode="wait">
            {tab === 'radar' && (
              <motion.div key="radar" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex flex-col flex-1">
                <SignalDetail signal={signal} />
                <ChartPanel signal={signal} />
              </motion.div>
            )}
            {tab === 'chart' && (
              <motion.div key="chart" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex flex-col flex-1 pt-5">
                <ChartPanel signal={signal} />
              </motion.div>
            )}
            {tab === 'chat' && (
              <motion.div key="chat" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex flex-col flex-1">
                <ChartPanel signal={signal} />
                <ChatBox signal={signal} />
              </motion.div>
            )}
            {tab === 'wrap' && (
              <motion.div key="wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex flex-col flex-1 pt-5">
                <VideoSection />
                <ChartPanel signal={signal} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
