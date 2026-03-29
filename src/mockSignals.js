export const SIGNALS = [
  {
    id: 1,
    stock: 'Zomato',
    code: 'ZOMATO',
    sector: 'Quick Commerce',
    price: '₹218.40',
    priceNum: 218.40,
    change: '+4.2%',
    positive: true,
    signalName: 'Insider Accumulation Double Bottom',
    type: 'Bullish',
    confidence: 92,
    tech: 'Classic double bottom at ₹198 confirmed with 3.1× volume surge on breakout candle.',
    fund: 'Promoter + 3 directors bought ₹47 Cr worth of shares in last 15 days (BSE filing).',
    explanation:
      'The big players are buying, and the stock is bouncing from a strong support zone. Both the chart and insider activity are telling the same story — this is a high-conviction entry opportunity with defined risk at ₹198.',
    risk: 'Low',
    action: 'Consider Buy',
    pattern: 'Double Bottom',
    winRate: 78,
    chat: {
      summary: 'Strong buy signal — insiders and technicals are in perfect sync on Zomato.',
      signals: [
        'Double bottom breakout confirmed at ₹218 with 3× average volume',
        '3 company directors bought ₹47Cr in last 2 weeks (BSE insider filing)',
        'FII net buyers for 3rd consecutive week — institutional interest rising',
        'RSI turning up from oversold 42 → bullish momentum building',
      ],
      risk: 'Stop-loss at ₹198 (double bottom neckline). Risk-reward ratio is 1:3.2 at current levels.',
      verdict: 'Accumulate on dips to ₹210–212. Target ₹245–260 in 6–8 weeks.',
    },
    chartData: [
      { d: 'Jan', p: 235 }, { d: 'Feb', p: 220 }, { d: 'Mar 1', p: 205 },
      { d: 'Mar 8', p: 198 }, { d: 'Mar 12', p: 210 }, { d: 'Mar 18', p: 198 },
      { d: 'Mar 22', p: 208 }, { d: 'Mar 25', p: 218 }, { d: 'Today', p: 218 },
    ],
    annotations: [
      { x: 'Mar 8', label: 'Bottom 1' },
      { x: 'Mar 18', label: 'Bottom 2' },
      { x: 'Mar 25', label: 'Breakout ▲' },
    ],
  },
  {
    id: 2,
    stock: 'Reliance',
    code: 'RELIANCE',
    sector: 'Conglomerate',
    price: '₹2,847',
    priceNum: 2847,
    change: '+2.8%',
    positive: true,
    signalName: 'Earnings Catalyst Breakout',
    type: 'Bullish',
    confidence: 88,
    tech: '52-week high breakout on earnings day with highest weekly volume in 6 months.',
    fund: 'Q3 EBITDA beat by 11%; Jio subscriber growth +18M — management raised FY26 guidance.',
    explanation:
      'Reliance just broke to new highs after smashing quarterly estimates. When a stock breaks to new highs on massive volume after an earnings beat, big institutions are loading up. The trend is your friend here.',
    risk: 'Low',
    action: 'Accumulate',
    pattern: 'Breakout',
    winRate: 72,
    chat: {
      summary: 'Reliance is breaking out on strong fundamentals — momentum trade with controlled risk.',
      signals: [
        '52-week high breakout confirmed with 2.4× average daily volume',
        'Q3 EBITDA beat by 11% vs street estimates — earnings surprise trigger',
        'Jio added 18M subscribers — digital segment getting re-rated higher',
        'FIIs added net ₹2,100Cr position in Reliance over last month',
      ],
      risk: 'ATH breakouts can retrace 5–8% before continuing. Keep stop at ₹2,720 level.',
      verdict: 'Buy on momentum with trailing stop. Target ₹3,100+ over 3 months.',
    },
    chartData: [
      { d: 'Oct', p: 2450 }, { d: 'Nov', p: 2520 }, { d: 'Dec', p: 2580 },
      { d: 'Jan', p: 2610 }, { d: 'Feb', p: 2690 }, { d: 'Mar 1', p: 2720 },
      { d: 'Mar 15', p: 2780 }, { d: 'Earnings', p: 2847 }, { d: 'Today', p: 2847 },
    ],
    annotations: [
      { x: 'Earnings', label: 'Earnings Beat' },
      { x: 'Today', label: 'New High ▲' },
    ],
  },
  {
    id: 3,
    stock: 'Tata Motors',
    code: 'TATAMOTORS',
    sector: 'Automobiles',
    price: '₹924.60',
    priceNum: 924.6,
    change: '+3.1%',
    positive: true,
    signalName: 'FII Support Bounce',
    type: 'Bullish',
    confidence: 85,
    tech: 'Stock bounced precisely from 200-DMA support at ₹898 with bullish engulfing candle on daily.',
    fund: 'FIIs net bought ₹3,400Cr in auto sector this week; JLR Q3 margins hit record 12.4%.',
    explanation:
      'Foreign institutions are pouring money into Indian autos, and Tata Motors is bouncing from a key support level. When the 200-day moving average holds and FII buying kicks in together, it signals a lower-risk entry point.',
    risk: 'Medium',
    action: 'Accumulate',
    pattern: 'Support Bounce',
    winRate: 68,
    chat: {
      summary: 'FII-backed support bounce on Tata Motors — solid risk-reward setup.',
      signals: [
        'Bounced from 200-DMA at ₹898 with bullish engulfing candle confirmation',
        'FIIs net bought ₹3,400Cr across Indian auto sector this week',
        'JLR margins at record 12.4% in Q3 — fundamental re-rating underway',
        'EV volume up 34% YoY — long-term growth catalyst strengthening',
      ],
      risk: '200-DMA break on closing basis invalidates setup. Keep stop at ₹895.',
      verdict: 'Accumulate between ₹920–930. Target ₹1,050+ in 4–6 weeks.',
    },
    chartData: [
      { d: 'Dec', p: 980 }, { d: 'Jan', p: 960 }, { d: 'Feb', p: 930 },
      { d: 'Feb 20', p: 910 }, { d: 'Mar 1', p: 898 }, { d: 'Mar 10', p: 905 },
      { d: 'Mar 20', p: 918 }, { d: 'Today', p: 924 },
    ],
    annotations: [
      { x: 'Mar 1', label: '200-DMA Support' },
      { x: 'Today', label: 'Bounce ▲' },
    ],
  },
  {
    id: 4,
    stock: 'HDFC Bank',
    code: 'HDFCBANK',
    sector: 'Banking',
    price: '₹1,642',
    priceNum: 1642,
    change: '+1.9%',
    positive: true,
    signalName: 'Institutional RSI Reversal',
    type: 'Bullish',
    confidence: 81,
    tech: 'RSI recovered from 28 (extreme oversold) to 48; MACD bullish crossover on weekly chart.',
    fund: 'DIIs accumulated 0.8% additional stake worth ₹5,200Cr in February; NIM stabilizing at 3.4%.',
    explanation:
      "HDFC was deeply oversold and domestic institutions quietly accumulated a massive position in February. Now technicals are confirming the reversal. This is the classic 'smart money bought before the crowd' setup.",
    risk: 'Low',
    action: 'Accumulate',
    pattern: 'RSI Reversal',
    winRate: 71,
    chat: {
      summary: "Smart money is already in on HDFC Bank — RSI reversal confirms the entry window is open.",
      signals: [
        'RSI recovery from 28 (extreme oversold zone) to 48 — momentum turning bullish',
        'DIIs accumulated 0.8% stake worth ₹5,200Cr in February — institutional conviction',
        'MACD bullish crossover confirmed on the weekly timeframe',
        'NIM stabilizing at 3.4% — credit growth recovery story intact',
      ],
      risk: 'Banking stocks are macro-sensitive. Monitor RBI policy. Stop at ₹1,590.',
      verdict: 'Buy now at market. Target ₹1,800 over the next 3–4 months.',
    },
    chartData: [
      { d: 'Nov', p: 1780 }, { d: 'Dec', p: 1720 }, { d: 'Jan 1', p: 1680 },
      { d: 'Jan 20', p: 1620 }, { d: 'Feb 1', p: 1595 }, { d: 'Feb 15', p: 1608 },
      { d: 'Mar 1', p: 1625 }, { d: 'Today', p: 1642 },
    ],
    annotations: [
      { x: 'Feb 1', label: 'RSI = 28' },
      { x: 'Feb 15', label: 'DII Accumulation' },
      { x: 'Today', label: 'Reversal ▲' },
    ],
  },
  {
    id: 5,
    stock: 'Adani Ports',
    code: 'ADANIPORTS',
    sector: 'Infrastructure',
    price: '₹1,187',
    priceNum: 1187,
    change: '-1.4%',
    positive: false,
    signalName: 'Bulk Deal Distribution Signal',
    type: 'Bearish',
    confidence: 78,
    tech: 'Shooting star candle at ₹1,210 resistance; RSI bearish divergence on 4H chart; volume climax.',
    fund: '₹890Cr bulk deal executed by promoter-related entity at ₹1,205 — large holder distributing.',
    explanation:
      'A massive bulk deal at the top of the range signals big holders exiting. The chart formed a classic reversal candle at resistance. When large promoter-linked entities sell aggressively at the highs, retail investors often get trapped — this is a clear warning signal.',
    risk: 'High',
    action: 'Watch',
    pattern: 'Resistance Rejection',
    winRate: 65,
    chat: {
      summary: 'Caution — bulk deal at resistance is a distribution / exit signal. Avoid fresh longs.',
      signals: [
        '₹890Cr bulk deal at ₹1,205 executed by promoter-linked entity (exit signal)',
        'Shooting star reversal candle formed at key resistance zone',
        'RSI bearish divergence on 4-hour chart — momentum weakening at highs',
        'Volume climax pattern — exhaustion of buying pressure',
      ],
      risk: 'High risk of short-term correction. If ₹1,210 breaks with volume on upside, signal invalidated.',
      verdict: 'Avoid all fresh buying. Existing holders consider trimming 30–40% of position here.',
    },
    chartData: [
      { d: 'Jan', p: 1050 }, { d: 'Feb', p: 1100 }, { d: 'Feb 20', p: 1150 },
      { d: 'Mar 1', p: 1180 }, { d: 'Mar 10', p: 1205 }, { d: 'Mar 15', p: 1210 },
      { d: 'Mar 22', p: 1195 }, { d: 'Today', p: 1187 },
    ],
    annotations: [
      { x: 'Mar 15', label: '₹890Cr Bulk Deal' },
      { x: 'Today', label: 'Rejection ▼' },
    ],
  },
];

export const QUICK_QUERIES = [
  'Should I buy Zomato?',
  'Why is Reliance going up?',
  'Is Tata Motors a good buy?',
  "What's happening with HDFC Bank?",
  'Should I exit Adani Ports?',
];

export const MARKET_WRAP = `🎙️ Good evening. Here's your AlphaRadar market wrap for today.

Indian markets ended on a positive note, with the Nifty 50 gaining 0.8% to close at 22,450. Auto and banking sectors led the rally.

Highlights from our Alpha Signal Engine today:

• Zomato triggered a high-conviction double bottom breakout. Insider buying of ₹47 crore adds strong fundamental weight to this technical signal.

• Reliance Industries hit a 52-week high post earnings. EBITDA beat of 11% with Jio subscriber surge is re-rating the stock significantly higher.

• Tata Motors bounced from its critical 200-day moving average with strong FII tailwinds. JLR margin recovery at 12.4% is the key fundamental catalyst.

• HDFC Bank shows signs of RSI reversal from extreme oversold territory. Domestic institutions accumulated ₹5,200 crore in February — smart money is positioning early.

• Caution on Adani Ports: A ₹890 crore bulk deal at key resistance is a distribution signal. We recommend avoiding fresh longs at this level.

Today's signal summary: 4 Bullish · 1 Bearish · Average confidence: 84.8%

This is AlphaRadar Copilot. Signal over noise. Always.`;

export const COLORS = {
  bull: '#00E676',
  bear: '#FF3D57',
  risk: { Low: '#00E676', Medium: '#F59E0B', High: '#FF3D57' },
  action: { 'Consider Buy': '#6366F1', Accumulate: '#3B82F6', Watch: '#F59E0B' },
};
