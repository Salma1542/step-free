import { useState, useMemo } from 'react';
import styles from './AdminAnalyticsPage.module.css';

// Custom Chart Components
const AnalyticsCard = ({ title, value, change, icon, bgColor }) => (
  <div className={`${styles.card} ${styles[bgColor]}`}>
    <div className={styles.cardHeader}>
      <span className={styles.cardTitle}>{title}</span>
      <i className={`bi ${icon} ${styles.cardIcon}`} />
    </div>
    <div className={styles.cardValue}>{value.toLocaleString()}</div>
    <div className={`${styles.cardChange} ${change >= 0 ? styles.positive : styles.negative}`}>
      <i className={`bi ${change >= 0 ? 'bi-arrow-up' : 'bi-arrow-down'}`} />
      <span>{Math.abs(change)}% since last month</span>
    </div>
  </div>
);

const LineChart = ({ data, title }) => {
  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue || 1;
  
  return (
    <div className={styles.chartContainer}>
      <h3 className={styles.chartTitle}>{title}</h3>
      <div className={styles.chart}>
        <div className={styles.chartGrid}>
          {[...Array(4)].map((_, i) => (
            <div key={i} className={styles.gridLine} />
          ))}
        </div>
        <svg viewBox="0 0 100 60" preserveAspectRatio="none" className={styles.chartSvg}>
          {/* Line path */}
          <polyline
            points={data
              .map((d, i) => `${(i / (data.length - 1)) * 100},${60 - ((d.value - minValue) / range) * 50}`)
              .join(' ')}
            className={styles.chartLine}
          />
          {/* Data points */}
          {data.map((d, i) => (
            <circle
              key={i}
              cx={(i / (data.length - 1)) * 100}
              cy={60 - ((d.value - minValue) / range) * 50}
              r="1.5"
              className={styles.chartDot}
            />
          ))}
        </svg>
      </div>
      <div className={styles.chartLabels}>
        {data.map((d, i) => (
          <span key={i} className={styles.label}>{d.label}</span>
        ))}
      </div>
    </div>
  );
};

const BarChart = ({ data, title }) => {
  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <div className={styles.barChartContainer}>
      <h3 className={styles.chartTitle}>{title}</h3>
      <div className={styles.barChart}>
        {data.map((d, i) => (
          <div key={i} className={styles.barWrapper}>
            <div className={styles.barLabel}>{d.value}</div>
            <div className={styles.bar}>
              <div
                className={styles.barFill}
                style={{ height: `${(d.value / maxValue) * 100}%` }}
                data-color={d.color}
              />
            </div>
            <div className={styles.barName}>{d.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const DonutChart = ({ data, title }) => {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];
  
  let currentAngle = 0;
  const segments = data.map((d, i) => {
    const sliceAngle = (d.value / total) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + sliceAngle;
    currentAngle = endAngle;
    
    return {
      ...d,
      startAngle,
      endAngle,
      color: colors[i % colors.length]
    };
  });
  
  const radius = 45;
  const centerX = 50;
  const centerY = 50;
  
  const angleToCoords = (angle) => {
    const rad = (angle - 90) * Math.PI / 180;
    return {
      x: centerX + radius * Math.cos(rad),
      y: centerY + radius * Math.sin(rad)
    };
  };
  
  return (
    <div className={styles.donutChartContainer}>
      <h3 className={styles.chartTitle}>{title}</h3>
      <div className={styles.donutWrapper}>
        <svg viewBox="0 0 100 100" className={styles.donutSvg}>
          {segments.map((seg, i) => {
            const start = angleToCoords(seg.startAngle);
            const end = angleToCoords(seg.endAngle);
            const largeArc = seg.endAngle - seg.startAngle > 180 ? 1 : 0;
            
            const pathData = [
              `M ${start.x} ${start.y}`,
              `A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y}`,
              `L ${centerX} ${centerY}`,
              'Z'
            ].join(' ');
            
            return (
              <path key={i} d={pathData} fill={seg.color} opacity="0.8" />
            );
          })}
          <circle cx={centerX} cy={centerY} r="20" fill="white" />
        </svg>
        <div className={styles.donutCenter}>
          <div className={styles.donutValue}>{total.toLocaleString()}</div>
          <div className={styles.donutLabel}>Total</div>
        </div>
      </div>
      <div className={styles.donutLegend}>
        {segments.map((seg, i) => (
          <div key={i} className={styles.legendItem}>
            <span className={styles.legendColor} style={{ backgroundColor: seg.color }} />
            <span className={styles.legendLabel}>{seg.label}</span>
            <span className={styles.legendValue}>{seg.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function AdminAnalyticsPage() {
  // Sample data
  const [timeRange, setTimeRange] = useState('month');
  
  const analyticsData = useMemo(() => ({
    month: {
      users: 1250,
      places: 342,
      reviews: 5680,
      bookings: 2314,
      userChange: 12,
      placesChange: 8,
      reviewsChange: -5,
      bookingsChange: 18
    },
    week: {
      users: 280,
      places: 45,
      reviews: 890,
      bookings: 320,
      userChange: 5,
      placesChange: 2,
      reviewsChange: 10,
      bookingsChange: 8
    }
  }), []);
  
  const currentData = analyticsData[timeRange];
  
  // Chart data
  const usersTrend = [
    { label: 'January', value: 850 },
    { label: 'February', value: 920 },
    { label: 'March', value: 1050 },
    { label: 'April', value: 1100 },
    { label: 'May', value: 1200 },
    { label: 'June', value: 1250 }
  ];
  
  const placesByType = [
    { label: 'Restaurants', value: 156, color: '#FF6B6B' },
    { label: 'Shops', value: 98, color: '#4ECDC4' },
    { label: 'Hotels', value: 64, color: '#45B7D1' },
    { label: 'Others', value: 24, color: '#FFA07A' }
  ];
  
  const ratingDistribution = [
    { label: '5 Stars', value: 2834 },
    { label: '4 Stars', value: 1456 },
    { label: '3 Stars', value: 892 },
    { label: '2 Stars', value: 342 },
    { label: '1 Star', value: 156 }
  ];
  
  const topPlaces = [
    { name: 'The Flavor Restaurant', reviews: 245, rating: 4.8 },
    { name: 'Comfort Hotel', reviews: 198, rating: 4.6 },
    { name: 'Fragrance Store', reviews: 167, rating: 4.7 },
    { name: 'Quiet Cafe', reviews: 142, rating: 4.5 }
  ];
  
  return (
    <div className={styles.container}>
      {/* Page Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Analytics & Statistics</h1>
          <p className={styles.subtitle}>Comprehensive view of system performance and key metrics</p>
        </div>
        
        {/* Time Range Selector */}
        <div className={styles.timeRangeSelector}>
          <button
            className={`${styles.timeBtn} ${timeRange === 'week' ? styles.active : ''}`}
            onClick={() => setTimeRange('week')}
          >
            Week
          </button>
          <button
            className={`${styles.timeBtn} ${timeRange === 'month' ? styles.active : ''}`}
            onClick={() => setTimeRange('month')}
          >
            Month
          </button>
        </div>
      </div>
      
      {/* Key Metrics Cards */}
      <div className={styles.metricsGrid}>
        <AnalyticsCard
          title="Users"
          value={currentData.users}
          change={currentData.userChange}
          icon="bi-people-fill"
          bgColor="bgBlue"
        />
        <AnalyticsCard
          title="Places"
          value={currentData.places}
          change={currentData.placesChange}
          icon="bi-geo-alt-fill"
          bgColor="bgGreen"
        />
        <AnalyticsCard
          title="Reviews"
          value={currentData.reviews}
          change={currentData.reviewsChange}
          icon="bi-star-fill"
          bgColor="bgOrange"
        />
        <AnalyticsCard
          title="Bookings"
          value={currentData.bookings}
          change={currentData.bookingsChange}
          icon="bi-calendar-check-fill"
          bgColor="bgPurple"
        />
      </div>
      
      {/* Main Charts */}
      <div className={styles.chartsSection}>
        <div className={styles.chartLarge}>
          <LineChart data={usersTrend} title="User Growth" />
        </div>
        <div className={styles.chartMedium}>
          <BarChart data={placesByType} title="Places by Type" />
        </div>
      </div>
      
      {/* Additional Charts */}
      <div className={styles.chartsSection}>
        <div className={styles.chartMedium}>
          <DonutChart data={ratingDistribution} title="Rating Distribution" />
        </div>
        <div className={styles.chartMedium}>
          <div className={styles.topPlacesCard}>
            <h3 className={styles.chartTitle}>Top Places</h3>
            <div className={styles.topPlacesList}>
              {topPlaces.map((place, i) => (
                <div key={i} className={styles.placeItem}>
                  <div className={styles.placeInfo}>
                    <div className={styles.placeName}>{place.name}</div>
                    <div className={styles.placeReviews}>
                      <i className="bi bi-chat-dots" /> {place.reviews} reviews
                    </div>
                  </div>
                  <div className={styles.placeRating}>
                    <span className={styles.rating}>{place.rating}</span>
                    <i className="bi bi-star-fill" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}