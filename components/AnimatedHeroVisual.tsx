'use client';

import { motion } from 'framer-motion';

const nodes = [
  { label: 'AI', x: 260, y: 60 },
  { label: 'DATA', x: 440, y: 140 },
  { label: 'CODE', x: 440, y: 300 },
  { label: 'DIGITAL', x: 260, y: 380 },
  { label: 'CLOUD', x: 80, y: 300 },
  { label: 'SECURITY', x: 80, y: 140 },
];

const center = { x: 260, y: 220 };

export default function AnimatedHeroVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]" aria-hidden="true">
      <svg viewBox="0 0 520 440" className="h-full w-full overflow-visible">
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3D6BFF" />
            <stop offset="100%" stopColor="#22D3EE" />
          </linearGradient>
        </defs>

        {/* connecting lines */}
        {nodes.map((n, i) => (
          <motion.line
            key={`l-${i}`}
            x1={center.x}
            y1={center.y}
            x2={n.x}
            y2={n.y}
            stroke="url(#lineGrad)"
            strokeWidth="1.5"
            strokeOpacity="0.35"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: 0.15 * i, ease: 'easeInOut' }}
          />
        ))}

        {/* center node */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <circle cx={center.x} cy={center.y} r="46" fill="#0F1526" stroke="url(#lineGrad)" strokeWidth="1.5" />
          <text x={center.x} y={center.y + 5} textAnchor="middle" className="fill-paper font-display text-[15px] font-bold">
            DIGITALAI
          </text>
        </motion.g>

        {/* outer nodes */}
        {nodes.map((n, i) => (
          <motion.g
            key={n.label}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
            transition={{
              opacity: { delay: 0.3 + i * 0.1, duration: 0.5 },
              scale: { delay: 0.3 + i * 0.1, duration: 0.5 },
              y: { delay: 1 + i * 0.2, duration: 4 + i * 0.4, repeat: Infinity, ease: 'easeInOut' },
            }}
          >
            <circle cx={n.x} cy={n.y} r="34" fill="#0A0E1A" stroke="#3D6BFF" strokeOpacity="0.5" strokeWidth="1.5" />
            <text x={n.x} y={n.y + 4} textAnchor="middle" className="fill-mist font-mono text-[10px] font-medium tracking-wide">
              {n.label}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}
