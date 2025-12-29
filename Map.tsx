import React, { useEffect, useRef, useState } from 'react';
import { AQIRecord, CategoryColors } from './types';
import { COUNTRY_COORDINATES } from './constants';
import { getColorForAQI } from './utils';
import { X, List, Info } from 'lucide-react';

interface MapProps {
  data: AQIRecord[];
}

const LEGEND_DATA = [
  { label: 'Good', range: '0-50', color: CategoryColors["Good"] },
  { label: 'Moderate', range: '51-100', color: CategoryColors["Moderate"] },
  { label: 'Sensitive', range: '101-150', color: CategoryColors["Unhealthy for Sensitive Groups"] },
  { label: 'Unhealthy', range: '151-200', color: CategoryColors["Unhealthy"] },
  { label: 'Very Unhealthy', range: '201-300', color: CategoryColors["Very Unhealthy"] },
  { label: 'Hazardous', range: '301+', color: CategoryColors["Hazardous"] },
];

export default function Map({ data }: MapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const [showLegend, setShowLegend] = useState(true);

  // Group data by country
  const countryStats = React.useMemo(() => {
    const stats: Record<string, { totalAQI: number; count: number; cities: AQIRecord[] }> = {};
    
    data.forEach(record => {
      if (!stats[record.Country]) {
        stats[record.Country] = { totalAQI: 0, count: 0, cities: [] };
      }
      stats[record.Country].totalAQI += record["AQI Value"];
      stats[record.Country].count += 1;
      stats[record.Country].cities.push(record);
    });

    return Object.entries(stats).map(([country, stat]) => ({
      country,
      avgAQI: Math.round(stat.totalAQI / stat.count),
      cityCount: stat.count,
      topCities: stat.cities.sort((a, b) => b["AQI Value"] - a["AQI Value"]).slice(0, 3)
    }));
  }, [data]);

  useEffect(() => {
    if (!mapContainer.current) return;
    
    // Check if window.L is available
    const L = (window as any).L;
    if (!L) {
      console.error("Leaflet not loaded");
      return;
    }

    if (!mapInstance.current) {
      // Initialize map
      mapInstance.current = L.map(mapContainer.current, {
        center: [20, 0],
        zoom: 2,
        scrollWheelZoom: false,
        zoomControl: true,
      });

      // Add nice CartoDB tiles
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(mapInstance.current);
    }

    // Clear existing layers (except tile layer)
    mapInstance.current.eachLayer((layer: any) => {
      if (!layer._url) {
        mapInstance.current.removeLayer(layer);
      }
    });

    // Add markers
    countryStats.forEach(stat => {
      const coords = COUNTRY_COORDINATES[stat.country];
      if (coords) {
        const color = getColorForAQI(stat.avgAQI);
        
        const circle = L.circleMarker(coords, {
          radius: 8 + Math.sqrt(stat.cityCount) * 2, // Size based on data points
          fillColor: color,
          color: '#fff',
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8
        }).addTo(mapInstance.current);

        const popupContent = `
          <div class="p-4 font-sans text-slate-900">
            <div class="flex items-center justify-between mb-2">
              <h3 class="font-bold text-lg">${stat.country}</h3>
              <span class="px-2 py-0.5 rounded text-white text-xs font-bold" style="background-color: ${color}">
                AQI ${stat.avgAQI}
              </span>
            </div>
            <p class="text-xs text-slate-500 mb-3">${stat.cityCount} cities monitored</p>
            <div class="space-y-1">
              <p class="text-xs font-semibold text-slate-700 uppercase tracking-wide">Top Polluted Cities:</p>
              ${stat.topCities.map(city => `
                <div class="flex justify-between text-sm border-b border-slate-100 py-1 last:border-0">
                  <span>${city.City}</span>
                  <span class="font-mono font-medium text-slate-600">${city["AQI Value"]}</span>
                </div>
              `).join('')}
            </div>
          </div>
        `;

        circle.bindPopup(popupContent);
      }
    });

    return () => {
      // Cleanup handled by ref check
    };
  }, [countryStats]);

  return (
    <div className="relative w-full h-[500px] rounded-xl overflow-hidden shadow-sm border border-slate-200 z-0 bg-slate-50">
      <div ref={mapContainer} className="w-full h-full" id="map" />
      
      {/* Existing Info Box (Bottom Left) */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur p-3 rounded-lg shadow-lg z-[400] text-xs max-w-xs border border-slate-100 hidden sm:block">
        <p className="font-semibold mb-1 flex items-center gap-1"><Info className="w-3 h-3" /> Interactive Map</p>
        <p className="text-slate-600">Click on circles for details. Size indicates station count.</p>
      </div>

      {/* Interactive Legend (Bottom Right) */}
      {showLegend ? (
        <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur rounded-lg shadow-lg z-[400] text-xs border border-slate-100 w-48 transition-all duration-300">
          <div className="flex items-center justify-between p-3 border-b border-slate-100 bg-slate-50/50 rounded-t-lg">
            <span className="font-semibold text-slate-800">AQI Index</span>
            <button 
              onClick={() => setShowLegend(false)}
              className="text-slate-400 hover:text-slate-600 transition-colors"
              aria-label="Close legend"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="p-2 space-y-1">
            {LEGEND_DATA.map((item) => (
              <div key={item.label} className="flex items-center justify-between p-1.5 rounded hover:bg-slate-50">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full shadow-sm ring-1 ring-slate-100" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-600 font-medium">{item.label}</span>
                </div>
                <span className="text-slate-400 font-mono text-[10px] opacity-75">{item.range}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setShowLegend(true)}
          className="absolute bottom-4 right-4 bg-white hover:bg-slate-50 text-slate-700 p-2.5 rounded-lg shadow-lg z-[400] border border-slate-200 transition-all"
          title="Show Legend"
          aria-label="Show legend"
        >
          <List className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}