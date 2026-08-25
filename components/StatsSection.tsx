import React from 'react';
import Image from 'next/image';

export interface StatItem {
  id: string;
  icon: string;
  value: string;
  label: string;
}

export const statsList: StatItem[] = [
  {
    id: 'stat-events',
    icon: '/images/stat-icon-01.png',
    value: '100+',
    label: 'Successful Event',
  },
  {
    id: 'stat-clients',
    icon: '/images/stat-icon-02.png',
    value: '75+',
    label: 'Happy Clients',
  },
  {
    id: 'stat-team',
    icon: '/images/stat-icon-03.png',
    value: '30+',
    label: 'Expert Team',
  },
  {
    id: 'stat-experience',
    icon: '/images/stat-icon-04.png',
    value: '6 yrs+',
    label: 'Experience',
  },
];

export default function StatsSection() {
  return (
    <section
      id="stats-section"
      className="relative py-4 sm:py-5 lg:py-6 overflow-hidden"
    >
      {/* Background Graphic Floral Image */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/images/Stat-BG.jpg"
          alt="Golden Floral Background"
          fill
          priority
          className="object-cover object-center"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="relative z-10 max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-center">
          {statsList.map((stat, idx) => (
            <div
              key={stat.id}
              id={`stat-item-${stat.id}`}
              className="flex items-center justify-center space-x-3.5 sm:space-x-4 px-2 sm:px-4"
            >
              {/* Icon */}
              <div className="relative w-11 h-11 sm:w-14 sm:h-14 flex-shrink-0 flex items-center justify-center">
                <Image
                  src={stat.icon}
                  alt={stat.label}
                  fill
                  className="object-contain filter drop-shadow"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Number and Label */}
              <div className="text-left text-white">
                <div className="font-serif-display text-2xl sm:text-3xl lg:text-[40px] tracking-tight leading-none drop-shadow-sm">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-[16px] tracking-wide text-white/95 mt-1 leading-tight drop-shadow-sm">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
