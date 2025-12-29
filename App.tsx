import React, { useState, useMemo, useRef, useEffect } from 'react';
import { rawCsvData } from './constants';
import { parseCSV, getAverageAQI, getColorForAQI, getHealthImplications } from './utils';
import { AQIRecord, CategoryColors } from './types';
import Map from './Map';
import { 
  Wind, 
  MapPin, 
  Activity, 
  AlertTriangle, 
  Info, 
  Search,
  BarChart3,
  Globe2,
  Leaf,
  ChevronDown,
  FileText
} from 'lucide-react';

// --- Animation Hook ---
const useAnimatedValues = (data: { label: string, value: number }[]) => {
  const [displayData, setDisplayData] = useState(data);
  const requestRef = useRef<number>(0);
  const startTimeRef = useRef<number | null>(null);
  const currentVisualValues = useRef(data.map(d => d.value));

  useEffect(() => {
    const startValues = currentVisualValues.current;
    const targetValues = data.map(d => d.value);
    
    // Handle array length changes immediately
    if (startValues.length !== targetValues.length) {
       currentVisualValues.current = targetValues;
       setDisplayData(data);
       return;
    }

    startTimeRef.current = null;
    
    const animate = (time: number) => {
      if (startTimeRef.current === null) startTimeRef.current = time;
      const progress = Math.min((time - startTimeRef.current) / 800, 1);
      const ease = 1 - Math.pow(1 - progress, 4); // easeOutQuart

      const nextValues = startValues.map((startVal, i) => {
        const targetVal = targetValues[i];
        return Math.round(startVal + (targetVal - startVal) * ease);
      });

      currentVisualValues.current = nextValues;

      setDisplayData(data.map((d, i) => ({ ...d, value: nextValues[i] })));

      if (progress < 1) {
        requestRef.current = requestAnimationFrame(animate);
      }
    };
    
    cancelAnimationFrame(requestRef.current);
    requestRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(requestRef.current);
  }, [data]);

  return displayData;
};

// --- Simple Chart Components (SVG based to avoid heavy deps) ---

const BarChart = ({ data, labelKey, valueKey, colorFn, height = 300 }: any) => {
  const maxValue = Math.max(...data.map((d: any) => d[valueKey]));
  return (
    <div className="w-full flex items-end gap-1" style={{ height }}>
      {data.map((d: any, i: number) => {
        const val = d[valueKey];
        const h = (val / maxValue) * 100;
        return (
          <div key={i} className="flex-1 flex flex-col items-center group relative">
            <div 
              className="w-full rounded-t opacity-80 hover:opacity-100 transition-all duration-700 ease-out cursor-pointer"
              style={{ height: `${h}%`, backgroundColor: colorFn ? colorFn(val) : '#cbd5e1' }}
            ></div>
            <div className="absolute bottom-full mb-2 hidden group-hover:flex flex-col bg-slate-900 text-white text-xs p-2 rounded z-10 whitespace-nowrap">
              <span className="font-bold">{d[labelKey]}</span>
              <span>AQI: {val}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const HorizontalBarChart = ({ data, labelKey, valueKey, colorFn }: any) => {
  const maxValue = Math.max(...data.map((d: any) => d[valueKey]));
  return (
    <div className="w-full flex flex-col gap-2">
      {data.map((d: any, i: number) => (
        <div key={i} className="flex items-center gap-2 text-sm">
          <div className="w-32 truncate text-slate-600 text-right">{d[labelKey]}</div>
          <div className="flex-1 h-6 bg-slate-100 rounded-full overflow-hidden relative group">
            <div 
              className="h-full rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${(d[valueKey] / maxValue) * 100}%`, backgroundColor: colorFn(d[valueKey]) }}
            ></div>
            <span className="absolute left-2 top-0.5 text-xs font-medium text-slate-700 mix-blend-multiply">{d[valueKey]}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

const ScatterPlot = ({ data, xKey, yKey, colorFn }: any) => {
  const maxX = Math.max(...data.map((d: any) => d[xKey])) || 1;
  const maxY = Math.max(...data.map((d: any) => d[yKey])) || 1;
  
  return (
    <div className="w-full h-64 border-l border-b border-slate-300 relative bg-slate-50/50">
      {data.map((d: any, i: number) => (
        <div
          key={i}
          className="absolute w-3 h-3 rounded-full border border-white shadow-sm opacity-70 hover:opacity-100 hover:scale-150 transition-all duration-500 cursor-pointer"
          title={`${d.City}: ${d[yKey]}`}
          style={{
            left: `${(d[xKey] / maxX) * 100}%`,
            bottom: `${(d[yKey] / maxY) * 100}%`,
            backgroundColor: colorFn(d["AQI Value"])
          }}
        />
      ))}
    </div>
  );
};

const PieChart = ({ data }: { data: { label: string, value: number, color: string }[] }) => {
  const total = data.reduce((acc, cur) => acc + cur.value, 0);
  let currentAngle = 0;
  
  if (total === 0) return <div className="w-full h-48 flex items-center justify-center text-slate-400">No Data</div>;

  return (
    <div className="w-48 h-48 relative mx-auto">
      <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full drop-shadow-sm">
        {data.map((slice, i) => {
          const sliceAngle = (slice.value / total) * 360;
          const x1 = 50 + 50 * Math.cos(Math.PI * currentAngle / 180);
          const y1 = 50 + 50 * Math.sin(Math.PI * currentAngle / 180);
          const x2 = 50 + 50 * Math.cos(Math.PI * (currentAngle + sliceAngle) / 180);
          const y2 = 50 + 50 * Math.sin(Math.PI * (currentAngle + sliceAngle) / 180);
          
          const largeArcFlag = sliceAngle > 180 ? 1 : 0;
          
          const pathData = [
            `M 50 50`,
            `L ${x1} ${y1}`,
            `A 50 50 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            `Z`
          ].join(' ');
          
          currentAngle += sliceAngle;
          
          return (
            <path
              key={i}
              d={pathData}
              fill={slice.color}
              stroke="white"
              strokeWidth="1"
              className="hover:opacity-90 transition-opacity cursor-pointer"
            >
              <title>{`${slice.label}: ${slice.value} (${Math.round(slice.value/total*100)}%)`}</title>
            </path>
          );
        })}
      </svg>
    </div>
  );
};

const LineChart = ({ data }: { data: { label: string, value: number }[] }) => {
  const animatedData = useAnimatedValues(data);
  
  if (!animatedData || animatedData.length === 0) return null;

  const width = 400;
  const height = 150;
  const padding = 20;
  
  // Calculate max value based on both current animation state and target to prevent clipping/jumping
  const targetMax = Math.max(...data.map(d => d.value));
  const currentMax = Math.max(...animatedData.map(d => d.value));
  const maxValue = Math.max(targetMax, currentMax) * 1.1 || 100;
  
  const points = animatedData.map((d, i) => {
    const x = (i / (animatedData.length - 1)) * (width - 2 * padding) + padding;
    const y = height - ((d.value / maxValue) * (height - 2 * padding) + padding);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="w-full">
      <div className="w-full h-40">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map(t => {
            const y = height - (t * (height - 2 * padding) + padding);
            return (
              <g key={t}>
                <line 
                  x1={padding} 
                  y1={y} 
                  x2={width - padding} 
                  y2={y} 
                  stroke="#e2e8f0" 
                  strokeWidth="1" 
                />
                <text x={0} y={y + 4} fontSize="10" fill="#94a3b8">{Math.round(t * maxValue)}</text>
              </g>
            );
          })}
          
          {/* Trend Line */}
          <polyline
            fill="none"
            stroke="#3b82f6"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={points}
            className="drop-shadow-sm transition-all duration-75"
          />
          
          {/* Data Points */}
          {animatedData.map((d, i) => {
             const x = (i / (animatedData.length - 1)) * (width - 2 * padding) + padding;
             const y = height - ((d.value / maxValue) * (height - 2 * padding) + padding);
             return (
               <g key={i} className="group cursor-pointer">
                 <circle cx={x} cy={y} r="4" fill="white" stroke="#3b82f6" strokeWidth="2" className="transition-all group-hover:r-6" />
                 <text 
                   x={x} 
                   y={y - 10} 
                   textAnchor="middle" 
                   fontSize="12" 
                   fontWeight="bold" 
                   fill="#1e293b" 
                   className="opacity-0 group-hover:opacity-100 transition-opacity"
                 >
                   {d.value}
                 </text>
               </g>
             );
          })}
        </svg>
      </div>
      {/* X Axis Labels */}
      <div className="flex justify-between px-2 mt-2">
        {data.map((d, i) => (
          <span key={i} className="text-xs font-medium text-slate-500 w-16 text-center">{d.label}</span>
        ))}
      </div>
    </div>
  );
};

const SearchableSelect = ({ options, value, onChange, placeholder = "Select..." }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  const filteredOptions = options.filter((opt: string) => 
    opt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative w-64" ref={wrapperRef}>
      <div
        className="flex items-center justify-between w-full px-4 py-2 bg-white border border-slate-300 rounded-lg shadow-sm cursor-pointer hover:border-emerald-500 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`block truncate ${!value ? 'text-slate-400' : 'text-slate-900'}`}>
          {value || placeholder}
        </span>
        <ChevronDown className="w-4 h-4 text-slate-400" />
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-60 flex flex-col">
          <div className="p-2 border-b border-slate-100 sticky top-0 bg-white rounded-t-lg">
             <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400" />
                <input
                  type="text"
                  className="w-full pl-7 pr-2 py-1 text-sm border border-slate-200 rounded bg-slate-50 focus:outline-none focus:border-emerald-500 text-slate-900"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  autoFocus
                  onClick={(e) => e.stopPropagation()}
                />
             </div>
          </div>
          <div className="overflow-y-auto flex-1 p-1 scrollbar-hide">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt: string) => (
                <div
                  key={opt}
                  className={`px-3 py-2 text-sm rounded cursor-pointer transition-colors ${
                    opt === value ? 'bg-emerald-50 text-emerald-700 font-medium' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                  onClick={() => {
                    onChange(opt);
                    setIsOpen(false);
                    setSearchTerm("");
                  }}
                >
                  {opt}
                </div>
              ))
            ) : (
              <div className="px-3 py-2 text-sm text-slate-400 text-center">No results found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const InsightCard = ({ country, avgAQI, pollutants, distribution, totalCities }: any) => {
  const maxPollutant = pollutants.reduce((prev: any, current: any) => 
    (prev.value > current.value) ? prev : current
  );

  const unhealthyCount = distribution
    .filter((d: any) => ['Unhealthy', 'Very Unhealthy', 'Hazardous', 'Unhealthy for Sensitive Groups'].includes(d.label))
    .reduce((acc: number, cur: any) => acc + cur.value, 0);
  
  const unhealthyPercent = totalCities > 0 ? Math.round((unhealthyCount / totalCities) * 100) : 0;

  let narrative = "";
  let takeaway = "";
  let tone = "neutral";
  let Icon = Info;

  if (avgAQI <= 50) {
    narrative = `Residents in ${country} generally breathe clean air. With ${100 - unhealthyPercent}% of monitored areas falling within safe limits, the environment supports an active outdoor lifestyle. ${maxPollutant.label} is the highest recorded pollutant, but levels remain well below danger thresholds.`;
    takeaway = "Safe for all outdoor activities.";
    tone = "positive";
    Icon = Leaf;
  } else if (avgAQI <= 100) {
    narrative = `Air quality in ${country} is moderate. While generally safe, ${unhealthyPercent}% of cities show elevated readings that may affect sensitive individuals. ${maxPollutant.label} is the primary concern, likely driven by vehicle emissions or localized industrial activity.`;
    takeaway = "Sensitive groups should stay informed.";
    tone = "moderate";
    Icon = Info;
  } else {
    narrative = `Pollution in ${country} has reached concerning levels. A significant ${unhealthyPercent}% of cities fall into unhealthy categories. The high concentration of ${maxPollutant.label} suggests persistent emission sources that may impact public health over time.`;
    takeaway = "Reduce exposure during peak pollution hours.";
    tone = "critical";
    Icon = AlertTriangle;
  }

  const styles = {
    positive: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-900', sub: 'text-emerald-700', icon: 'text-emerald-600' },
    moderate: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-900', sub: 'text-amber-700', icon: 'text-amber-600' },
    critical: { bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-900', sub: 'text-rose-700', icon: 'text-rose-600' },
    neutral: { bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-900', sub: 'text-slate-700', icon: 'text-slate-600' }
  };

  const currentStyle = styles[tone as keyof typeof styles] || styles.neutral;

  return (
    <div className={`p-6 rounded-xl border ${currentStyle.bg} ${currentStyle.border} shadow-sm mb-8 transition-all`}>
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-full bg-white shadow-sm ${currentStyle.icon}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h3 className={`text-lg font-bold mb-2 ${currentStyle.text}`}>Regional Analysis: {country}</h3>
          <p className={`text-sm leading-relaxed mb-4 ${currentStyle.sub}`}>
            {narrative}
          </p>
          <div className="flex items-center gap-2 text-sm font-semibold bg-white/50 p-2 rounded inline-block">
             <span className="uppercase text-xs opacity-60 tracking-wider">Takeaway:</span>
             <span className={currentStyle.text}>{takeaway}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [data] = useState<AQIRecord[]>(() => parseCSV(rawCsvData));
  const [selectedCountry, setSelectedCountry] = useState<string>("India");
  const [pollutantType, setPollutantType] = useState<keyof AQIRecord>("AQI Value");
  const [simulatedAQI, setSimulatedAQI] = useState<number>(150);

  const countries = useMemo(() => Array.from(new Set(data.map(d => d.Country))).sort(), [data]);
  
  const countryData = useMemo(() => 
    data.filter(d => d.Country === selectedCountry)
  , [data, selectedCountry]);

  const globalAvgAQI = useMemo(() => getAverageAQI(data), [data]);
  const countryAvgAQI = useMemo(() => getAverageAQI(countryData), [countryData]);

  // Derived data for Line Chart (Pollutant Profile)
  const pollutantAverages = useMemo(() => {
    if (!countryData.length) return [];
    const sums = {
      "Total AQI": 0,
      "PM2.5": 0,
      "CO": 0,
      "NO2": 0,
      "Ozone": 0
    };
    countryData.forEach(d => {
      sums["Total AQI"] += d["AQI Value"];
      sums["PM2.5"] += d["PM2.5 AQI Value"];
      sums["CO"] += d["CO AQI Value"];
      sums["NO2"] += d["NO2 AQI Value"];
      sums["Ozone"] += d["Ozone AQI Value"];
    });
    const count = countryData.length;
    // Return in specific order for the chart
    return [
      { label: 'Total', value: Math.round(sums['Total AQI'] / count) },
      { label: 'PM2.5', value: Math.round(sums['PM2.5'] / count) },
      { label: 'CO', value: Math.round(sums['CO'] / count) },
      { label: 'NO2', value: Math.round(sums['NO2'] / count) },
      { label: 'Ozone', value: Math.round(sums['Ozone'] / count) },
    ];
  }, [countryData]);

  const topCities = useMemo(() => {
    return [...data]
      .sort((a, b) => (b[pollutantType] as number) - (a[pollutantType] as number))
      .slice(0, 10);
  }, [data, pollutantType]);

  const categoryDist = useMemo(() => {
    const counts: Record<string, number> = {};
    countryData.forEach(d => {
      counts[d["AQI Category"]] = (counts[d["AQI Category"]] || 0) + 1;
    });
    return Object.entries(counts).map(([label, value]) => ({
      label,
      value,
      color: CategoryColors[label] || '#ccc'
    }));
  }, [countryData]);

  const healthEffect = getHealthImplications(simulatedAQI);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      
      {/* 1. Hero / Narrative Beginning */}
      <header className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-20 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6 opacity-80">
            <Wind className="w-6 h-6" />
            <span className="text-sm uppercase tracking-widest font-semibold">Global Air Quality Lens</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            The Invisible <span className="text-red-400">Threat</span>
          </h1>
          <p className="text-xl md:text-2xl font-light text-slate-300 max-w-2xl leading-relaxed">
            Air pollution is one of the world's largest health and environmental problems. 
            It develops in two distinct contexts: indoor (household) air pollution and outdoor air pollution.
          </p>
          <div className="mt-12 flex gap-8">
            <div>
              <div className="text-4xl font-bold text-emerald-400">{data.length}</div>
              <div className="text-sm text-slate-400 uppercase tracking-wide">Cities Monitored</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-400">{countries.length}</div>
              <div className="text-sm text-slate-400 uppercase tracking-wide">Countries</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-400">{globalAvgAQI}</div>
              <div className="text-sm text-slate-400 uppercase tracking-wide">Global Avg AQI</div>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Exploration: Global Context */}
      <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
            <Globe2 className="w-8 h-8 text-blue-600" />
            Global Overview
          </h2>
          <p className="text-slate-600 max-w-3xl">
            Explore air quality through our interactive map and charts. Identify the regions most affected by different pollutants.
          </p>
        </div>

        {/* Map Section */}
        <div className="mb-12">
           <Map data={data} />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-semibold text-slate-800">Top 10 Cities by Pollutant Level</h3>
            <div className="flex gap-2 bg-slate-100 p-1 rounded-lg">
              {[
                { label: 'Total AQI', key: 'AQI Value' },
                { label: 'PM2.5', key: 'PM2.5 AQI Value' },
                { label: 'CO', key: 'CO AQI Value' },
                { label: 'NO2', key: 'NO2 AQI Value' },
              ].map((type) => (
                <button
                  key={type.key}
                  onClick={() => setPollutantType(type.key as keyof AQIRecord)}
                  className={`px-4 py-2 text-sm rounded-md transition-all ${
                    pollutantType === type.key 
                      ? 'bg-white text-blue-600 shadow-sm font-medium' 
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>
          <HorizontalBarChart 
            data={topCities} 
            labelKey="City" 
            valueKey={pollutantType} 
            colorFn={(val: number) => getColorForAQI(val)} 
          />
        </div>
      </section>

      {/* 3. Mini Dashboard: Country Explorer */}
      <section className="py-16 bg-slate-100 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
                <MapPin className="w-8 h-8 text-emerald-600" />
                Country Explorer
              </h2>
              <p className="text-slate-600">Deep dive into specific regions.</p>
            </div>
            
            <SearchableSelect 
              options={countries} 
              value={selectedCountry} 
              onChange={setSelectedCountry} 
              placeholder="Select Country" 
            />

          </div>

          <InsightCard 
            country={selectedCountry} 
            avgAQI={countryAvgAQI} 
            pollutants={pollutantAverages} 
            distribution={categoryDist}
            totalCities={countryData.length}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Metric Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h3 className="text-sm uppercase tracking-wide text-slate-500 font-semibold mb-2">Average AQI</h3>
              <div className="flex items-baseline gap-4">
                <span className="text-6xl font-bold" style={{ color: getColorForAQI(countryAvgAQI) }}>
                  {countryAvgAQI}
                </span>
                <span className="text-lg font-medium text-slate-600">
                  {data.find(d => d["AQI Value"] === countryAvgAQI)?.["AQI Category"] || "Average"}
                </span>
              </div>
              <div className="mt-4 text-sm text-slate-500">
                Across {countryData.length} monitored cities in {selectedCountry}.
              </div>
            </div>

            {/* Line Chart (New) */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 lg:col-span-2">
               <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-slate-800">Average Pollutant Profile</h3>
                <div className="text-xs text-slate-500">Comparison of different indices</div>
              </div>
              <LineChart data={pollutantAverages} />
            </div>

            {/* Scatter Plot */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 lg:col-span-2">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-slate-800">PM2.5 vs Total AQI Correlation</h3>
                <Activity className="w-4 h-4 text-slate-400" />
              </div>
              <ScatterPlot 
                data={countryData} 
                xKey="PM2.5 AQI Value" 
                yKey="AQI Value" 
                colorFn={getColorForAQI} 
              />
              <div className="mt-2 text-xs text-slate-400 flex justify-between">
                <span>Low PM2.5</span>
                <span>High PM2.5</span>
              </div>
            </div>

            {/* Pie Chart (Replaces Donut) */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h3 className="font-semibold text-slate-800 mb-6">Quality Distribution</h3>
              <div className="flex flex-col items-center">
                <PieChart data={categoryDist} />
                <div className="mt-6 w-full space-y-2">
                  {categoryDist.map((d, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }}></div>
                        <span className="text-slate-600">{d.label}</span>
                      </div>
                      <span className="font-medium">{d.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* City List */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 lg:col-span-3 max-h-80 overflow-y-auto scrollbar-hide">
              <h3 className="font-semibold text-slate-800 mb-4 sticky top-0 bg-white pb-2 border-b border-slate-100">City Breakdown</h3>
              <table className="w-full text-sm text-left">
                <thead className="text-slate-500 font-medium">
                  <tr>
                    <th className="pb-3 pl-2">City</th>
                    <th className="pb-3 text-right">AQI</th>
                    <th className="pb-3 text-right">CO</th>
                    <th className="pb-3 text-right">Ozone</th>
                    <th className="pb-3 text-right">NO2</th>
                    <th className="pb-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {countryData.map((d, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="py-2 pl-2 font-medium text-slate-700">{d.City}</td>
                      <td className="py-2 text-right font-bold" style={{ color: getColorForAQI(d["AQI Value"]) }}>{d["AQI Value"]}</td>
                      <td className="py-2 text-right text-slate-500">{d["CO AQI Value"]}</td>
                      <td className="py-2 text-right text-slate-500">{d["Ozone AQI Value"]}</td>
                      <td className="py-2 text-right text-slate-500">{d["NO2 AQI Value"]}</td>
                      <td className="py-2 text-right">
                        <span className="px-2 py-1 rounded-full text-xs text-white" style={{ backgroundColor: getColorForAQI(d["AQI Value"]) }}>
                          {d["AQI Category"]}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Insight Storytelling: Health Impact Slider */}
      <section className="py-16 px-4 md:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 flex justify-center items-center gap-2">
            <AlertTriangle className="w-8 h-8 text-orange-500" />
            What Does the Number Mean?
          </h2>
          <p className="text-slate-600">
            The Air Quality Index (AQI) acts as a thermometer for the air. Slide the bar below to understand the health implications of different AQI levels.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
          <div className="mb-8">
            <input 
              type="range" 
              min="0" 
              max="500" 
              value={simulatedAQI} 
              onChange={(e) => setSimulatedAQI(parseInt(e.target.value))}
              className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-2 font-mono uppercase">
              <span>Good (0)</span>
              <span>Hazardous (500)</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-stretch gap-6">
            <div className="w-full md:w-1/3 flex flex-col justify-center items-center p-6 rounded-xl text-white transition-colors duration-300" 
                 style={{ backgroundColor: getColorForAQI(simulatedAQI) }}>
              <span className="text-6xl font-bold mb-2">{simulatedAQI}</span>
              <span className="text-center font-medium opacity-90">{data.find(d => d["AQI Value"] === simulatedAQI)?.["AQI Category"] || "Selected Value"}</span>
            </div>
            
            <div className="w-full md:w-2/3 flex flex-col justify-center">
              <h3 className="text-xl font-bold text-slate-800 mb-3">Health Implications</h3>
              <p className="text-slate-600 mb-4 leading-relaxed">{healthEffect.impact}</p>
              
              <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-slate-300">
                <h4 className="text-sm font-bold text-slate-700 mb-1 flex items-center gap-2">
                  <Info className="w-4 h-4" /> Recommendation
                </h4>
                <p className="text-sm text-slate-600 italic">"{healthEffect.advice}"</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Conclusion / Recommendations */}
      <footer className="bg-slate-900 text-slate-300 py-16 px-4 md:px-8 mt-12">
        <div className="max-w-4xl mx-auto text-center">
          <Leaf className="w-12 h-12 text-green-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-6">Breathe Better, Live Better</h2>
          <p className="text-lg mb-8 leading-relaxed text-slate-400">
            While local governments work on policy, individual awareness is key. 
            Monitoring daily AQI levels, reducing car usage, and using air purifiers indoors can significantly reduce your exposure to harmful pollutants.
          </p>
          
          <div className="mt-16 pt-8 border-t border-slate-800 text-sm text-slate-500 space-y-4">
            <div className="mb-4">
                <p className="text-white font-semibold uppercase tracking-widest mb-2">Group 11</p>
                <p>CHEN YUCHEN • YAN JINGCHANG • XU ZICHUN • XING WENYUAN</p>
            </div>
            <p>Data Source: Global Air Quality Dataset • Visualization built with React & Tailwind</p>
          </div>
        </div>
      </footer>

    </div>
  );
}