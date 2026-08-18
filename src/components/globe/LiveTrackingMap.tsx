'use client';

import React, { useEffect, useState } from 'react';

interface LiveTrackingMapProps {
  onPortsCountChange: (count: number) => void;
}

export default function LiveTrackingMap({ onPortsCountChange }: LiveTrackingMapProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [iframeSrc, setIframeSrc] = useState<string>(
    'https://www.marinetraffic.com/en/ais/embed/centerx:-78.0/centery:11.0/zoom:3/maptype:3/shownames:false/shownation:false/showmenu:false/fleet:0/fleet_id:0/trackvessel:0'
  );

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Set active ports count to the static original value (7) on mount
    onPortsCountChange(7);

    return () => window.removeEventListener('resize', checkMobile);
  }, [onPortsCountChange]);

  useEffect(() => {
    let active = true;
    const targetUrl = 'https://www.marinetraffic.com/en/ais/home/centerx:-31.2/centery:9.3/zoom:3';
    const fallbackUrl = 'https://www.marinetraffic.com/en/ais/embed/centerx:-78.0/centery:11.0/zoom:3/maptype:3/shownames:false/shownation:false/showmenu:false/fleet:0/fleet_id:0/trackvessel:0';

    fetch(`/api/check-map?url=${encodeURIComponent(targetUrl)}`)
      .then(res => res.json())
      .then(data => {
        if (!active) return;
        if (data.canEmbed) {
          setIframeSrc(targetUrl);
        } else {
          setIframeSrc(fallbackUrl);
        }
      })
      .catch(() => {
        if (!active) return;
        setIframeSrc(fallbackUrl);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl max-[991px]:rounded-xl border border-white/10 shadow-[0_25px_50px_rgba(0,0,0,0.6)] ${
        isMobile ? 'aspect-[4/3]' : 'aspect-[2/1]'
      }`}
    >
      {/* Real-time MarineTraffic AIS Embed Map */}
      <iframe
        src={iframeSrc}
        width="100%"
        height="100%"
        className="absolute inset-0 border-0"
        title="MarineTraffic Live AIS Map"
        allowFullScreen
      />
    </div>
  );
}
