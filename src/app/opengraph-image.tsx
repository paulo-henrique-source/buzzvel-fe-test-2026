import { ImageResponse } from 'next/og';

export const alt = 'Luma Learning — Build skills that actually move you forward.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        background: '#f9f8f3',
        color: '#171b2c',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: 72,
        position: 'relative',
      }}
    >
      <div style={{ display: 'flex', fontSize: 42, fontWeight: 700, letterSpacing: -2 }}>luma.</div>
      <div
        style={{ display: 'flex', color: '#3157f6', fontSize: 18, letterSpacing: 3, marginTop: 58 }}
      >
        LEARN AT YOUR OWN PACE
      </div>
      <div
        style={{
          display: 'flex',
          fontSize: 76,
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: -4,
          maxWidth: 920,
          marginTop: 24,
        }}
      >
        Build skills that actually move you forward.
      </div>
      <div
        style={{
          display: 'flex',
          background: '#ffed76',
          width: 120,
          height: 120,
          borderRadius: 60,
          position: 'absolute',
          right: 50,
          bottom: 45,
        }}
      />
    </div>,
    size,
  );
}
