import React from 'react';
import styles from '../styles/RoleSelection.module.css';
import { useNavigate } from 'react-router-dom';

const roles = [
  {
    id: 'user',
    title: 'Find places',
    description: 'Explore accessible routes and locations tailored for you.',
    icon: 'ti-map-search',
    route: '/user',
  },
  {
    id: 'placeOwner',
    title: 'Add / Register a place',
    description: 'Own or visited a place? Help the community by adding it.',
    icon: 'ti-map-pin-plus',
    route: '/register-place',
  },
  {
    id: 'driver',
    title: 'I am a driver',
    description: 'Provide assistance and earn by helping others move around.',
    icon: 'ti-steering-wheel',
    route: '/driver',
  },
];

export default function RoleSelection() {
  const navigate = useNavigate();

  const handleNavigate = (roleId, route) => {
    navigate(route, { state: { role: roleId } });
  };

  return (
    <div className={styles.sfRoot}>

      {/* ===== Left Panel ===== */}
      <div className={styles.sfPanel}>
        <div className={styles.sfPanelCircle} />
        <div className={styles.sfPanelCircle2} />
        <div className={styles.overlayPatternDots} />

        <div className={styles.sfPanelContent}>
          <div className={styles.sfBadge}>
            <i className="ti ti-wheelchair" aria-hidden="true" />
            Step Free Community
          </div>

          <h1 className={styles.sfPanelTitle}>
            Move freely,<br />anywhere.
          </h1>

          <p className={styles.sfPanelSub}>
            Join a growing community making the world more accessible,
            one step at a time.
          </p>

          <div className={styles.sfPanelStat}>
            <div>
              <div className={styles.sfPanelStatNum}>12k+</div>
              <div className={styles.sfPanelStatLabel}>Active members</div>
            </div>
            <div className={styles.sfStatDivider} />
            <div>
              <div className={styles.sfPanelStatNum}>3.4k</div>
              <div className={styles.sfPanelStatLabel}>Accessible places</div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Right Panel ===== */}
      <div className={styles.sfRight}>
        <div className={styles.sfHead}>
          <h2 className={styles.sfHeadTitle}>How will you use Step Free?</h2>
          <p className={styles.sfHeadSub}>Choose your role to get started</p>
        </div>

        <div className={styles.sfCards}>
          {roles.map((role) => (
            <button
              key={role.id}
              className={styles.sfCard}
              onClick={() => handleNavigate(role.id, role.route)}
              aria-label={role.title}
            >
              <div className={styles.sfIconWrap}>
                <i className={`ti ${role.icon}`} aria-hidden="true" />
              </div>
              <div className={styles.sfCardText}>
                <p className={styles.sfCardTitle}>{role.title}</p>
                <p className={styles.sfCardDesc}>{role.description}</p>
              </div>
              <i className="ti ti-chevron-right" aria-hidden="true" />
            </button>
          ))}
        </div>

        <div className={styles.sfFooter}>
          Already have an account?{' '}
          <a href="/login">Log in</a>
        </div>
      </div>

    </div>
  );
}