import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Video, Play, Pause } from 'lucide-react';
import { MARKET_WRAP } from '../data/mockSignals';

export default function VideoSection() {
  const [playing, setPlaying] = useState(false);
  const [text, setText] = useState('');
  const timerRef = useRef(null);

  const toggle = () => {
    if (playing) {
      clearInterval(timerRef.current);
      setPlaying(false);
      setText('');
      return;
    }
    setPlaying(true);
    setText('');
    let i = 0;
    timerRef.current = setInterval(() => {
      i += 5;
      setText(MARKET_WRAP.slice(0, i));
      if (i >= MARKET_WRAP.length) {
        clearInterval(timerRef.current);
        setPlaying(false);
      }
    }, 35);
  };

  return (
    <div className="px-5 pb-5">
      {/* Section label */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-xs font-bold tracking-widest" style={{ color: '#8899B8' }}>
          <Video size={13} />
          AI MARKET WRAP
        </div>
        <span className="text-[10px]" style={{ color: '#4A5C7A' }}>
          Auto-generated · 90s · NSE Data
        </span>
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #1E2D4A', background: 'rgba(13,21,38,0.7)' }}>
        {/* Thumbnail / Play area */}
        <div
          className="relative h-40 flex items-center justify-center cursor-pointer overflow-hidden video-grid"
          style={{ background: 'linear-gradient(135deg, #060B14 0%, #0D1526 55%, #060B14 100%)' }}
          onClick={toggle}
        >
          {/* Radial glow center */}
          <div
            className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.1) 0%, transparent 65%)' }}
          />

          {/* Animated waveform bars (decorative) */}
          <div className="absolute inset-0 flex items-center justify-center gap-1 opacity-20">
            {Array.from({ length: 28 }).map((_, i) => (
              <motion.div
                key={i}
                className="w-0.5 rounded-full"
                style={{ background: '#6366F1' }}
                animate={playing ? {
                  height: [12, Math.random() * 40 + 10, 12],
                } : { height: 12 }}
                transition={playing ? {
                  duration: 0.6 + Math.random() * 0.4,
                  repeat: Infinity,
                  repeatType: 'mirror',
                  delay: i * 0.04,
                } : {}}
              />
            ))}
          </div>

          {/* Play button */}
          <motion.button
            whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.95 }}
            className="relative z-10 w-14 h-14 rounded-full flex items-center justify-center animate-glow-pulse"
            style={{
              background: 'rgba(99,102,241,0.88)',
              border: 'none', cursor: 'pointer',
            }}
          >
            {playing
              ? <Pause size={22} color="white" />
              : <Play size={22} color="white" style={{ marginLeft: 3 }} />
            }
          </motion.button>

          <div className="absolute bottom-3 left-4 text-[11px] font-semibold tracking-wide z-10" style={{ color: '#6366F1' }}>
            {playing ? '▮▮  PAUSE WRAP' : '▶  PLAY TODAY\'S MARKET WRAP'}
          </div>
          <div
            className="absolute top-3 right-3 text-[10px] z-10 px-2 py-0.5 rounded"
            style={{ background: 'rgba(6,11,20,0.85)', color: '#4A5C7A' }}
          >
            ⚡ AI GENERATED
          </div>
        </div>

        {/* Typewriter script */}
        {(text || playing) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="px-5 py-4 text-sm leading-loose whitespace-pre-line overflow-y-auto"
            style={{ color: '#8899B8', borderTop: '1px solid #1E2D4A', maxHeight: 220 }}
          >
            {text}
            {playing && text.length < MARKET_WRAP.length && (
              <span
                className="inline-block w-0.5 h-3.5 animate-blink"
                style={{ background: '#6366F1', verticalAlign: 'middle', marginLeft: 1 }}
              />
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
