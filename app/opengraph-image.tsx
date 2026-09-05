import { ImageResponse } from 'next/og';

/**
 * Every page's Open Graph/Twitter Card metadata (lib/seo.ts buildMetadata)
 * falls back to `${domain}/opengraph-image` when a page doesn't supply its
 * own image. That fallback used to point at `/og-image.jpg`, a file that
 * was never actually added to /public — so every share of every page
 * (WhatsApp, Facebook, LinkedIn, Twitter/X, iMessage link previews) showed
 * a broken image. This file generates a real branded image on the fly
 * instead of depending on a static asset that has to be remembered to add.
 */

export const runtime = 'edge';
export const alt = 'DigitalAI Learning Institute';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #05070f 0%, #0b1030 55%, #131a4a 100%)',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'radial-gradient(circle at 20% 20%, rgba(56,132,255,0.35), transparent 40%), radial-gradient(circle at 80% 75%, rgba(0,220,255,0.25), transparent 45%)',
            display: 'flex',
          }}
        />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: 'flex',
              width: 64,
              height: 64,
              borderRadius: 16,
              background: 'linear-gradient(135deg, #3884ff, #00dcff)',
            }}
          />
          <div style={{ display: 'flex', fontSize: 40, fontWeight: 800, color: '#ffffff', letterSpacing: -1 }}>
            Digital<span style={{ color: '#00dcff' }}>AI</span>&nbsp;Learning
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 28,
            fontSize: 30,
            color: '#c7cbe0',
            textAlign: 'center',
            maxWidth: 860,
            zIndex: 1,
          }}
        >
          Practical Online Courses in AI, Data Science, Development &amp; Digital Marketing
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 40,
            padding: '10px 24px',
            borderRadius: 999,
            border: '1px solid rgba(255,255,255,0.25)',
            color: '#e6e8f5',
            fontSize: 22,
            zIndex: 1,
          }}
        >
          digitalailearning.in
        </div>
      </div>
    ),
    { ...size }
  );
}
