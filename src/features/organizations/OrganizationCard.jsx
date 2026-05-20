export default function OrganizationCard({ org }) {
  return (
    <article
      style={{
        fontFamily: 'var(--font-body)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        borderRadius: '1.5rem',
        background: 'rgba(4, 20, 20, 0.82)',
        border: '1px solid rgba(255,255,255,0.1)',
        backdropFilter: 'blur(32px)',
        WebkitBackdropFilter: 'blur(32px)',
        boxShadow: '0 32px 80px rgba(0,0,0,0.55), 0 8px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.07)',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          height: '2px',
          background: 'linear-gradient(90deg, #0f8a82 0%, #1fa89f 40%, transparent 100%)',
          flexShrink: 0,
        }}
      />
      <div style={{ padding: '3rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.1rem', marginBottom: '1.5rem' }}>
          <div
            style={{
              width: '5rem',
              height: '5rem',
              borderRadius: '0.875rem',
              overflow: 'hidden',
              flexShrink: 0,
              border: '1px solid rgba(255,255,255,0.12)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
              background: 'rgba(255,255,255,0.05)',
            }}
          >
            <img
              src={org.logo}
              alt={`${org.name} logo`}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              loading="lazy"
            />
          </div>
          <div style={{ flex: 1, minWidth: 0, paddingTop: '0.1rem' }}>
            <h3
              style={{
                fontFamily: 'var(--font-display, sans-serif)',
                fontWeight: 700,
                fontSize: 'clamp(1rem, 2.2vw, 1.3rem)',
                lineHeight: 1.25,
                letterSpacing: '-0.02em',
                color: '#ffffff',
                margin: '0 0 0.5rem',
              }}
            >
              {org.name}
            </h3>
            {org.category && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  fontSize: '0.6rem',
                  fontFamily: 'var(--font-display, sans-serif)',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  background: 'rgba(31,168,159,0.15)',
                  border: '1px solid rgba(31,168,159,0.35)',
                  color: '#1fa89f',
                  borderRadius: '999px',
                  padding: '0.18rem 0.6rem',
                }}
              >
                {org.category}
              </span>
            )}
          </div>
        </div>
        <div
          style={{
            height: '1px',
            background: 'linear-gradient(90deg, rgba(255,255,255,0.1), rgba(255,255,255,0.03))',
            marginBottom: '1.25rem',
            flexShrink: 0,
          }}
        />
        <p
          style={{
            fontSize: '1.2rem',
            lineHeight: 1.8,
            color: 'rgba(255, 255, 255, 0.92)',
            marginBottom: '1.35rem',
            display: '-webkit-box',
            WebkitLineClamp: 4,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            flex: 1,
          }}
        >
          {org.description}
        </p>
        {org.services?.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginBottom: '1.75rem' }}>
            {org.services.map((service, idx) => (
              <span
                key={idx}
                style={{
                  fontSize: '0.7rem',
                  fontFamily: 'var(--font-display, sans-serif)',
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.5)',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.09)',
                  borderRadius: '999px',
                  padding: '0.2rem 0.65rem',
                  transition: 'all 0.18s ease',
                  cursor: 'default',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(31,168,159,0.16)';
                  e.currentTarget.style.color = '#1fa89f';
                  e.currentTarget.style.borderColor = 'rgba(31,168,159,0.32)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)';
                }}
              >
                {service}
              </span>
            ))}
          </div>
        )}
        <div style={{ flexShrink: 0 }}>
          <a
            href={org.website}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${org.name} website`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: '#0f766e',
              color: '#ffffff',
              fontFamily: 'var(--font-display, sans-serif)',
              fontWeight: 600,
              fontSize: '0.82rem',
              letterSpacing: '-0.01em',
              padding: '0.6rem 1.35rem',
              borderRadius: '999px',
              border: '1px solid rgba(255,255,255,0.1)',
              textDecoration: 'none',
              boxShadow: '0 4px 18px rgba(15,118,110,0.4)',
              transition: 'background 0.2s, box-shadow 0.2s, transform 0.15s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#0a5c56';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 28px rgba(15,118,110,0.5)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#0f766e';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 18px rgba(15,118,110,0.4)';
            }}
          >
            Visit website
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
}