export interface AQIRecord {
  Country: string;
  City: string;
  "AQI Value": number;
  "AQI Category": string;
  "CO AQI Value": number;
  "CO AQI Category": string;
  "Ozone AQI Value": number;
  "Ozone AQI Category": string;
  "NO2 AQI Value": number;
  "NO2 AQI Category": string;
  "PM2.5 AQI Value": number;
  "PM2.5 AQI Category": string;
}

export enum AQICategory {
  Good = "Good",
  Moderate = "Moderate",
  UnhealthySensitive = "Unhealthy for Sensitive Groups",
  Unhealthy = "Unhealthy",
  VeryUnhealthy = "Very Unhealthy",
  Hazardous = "Hazardous"
}

export const CategoryColors: Record<string, string> = {
  "Good": "#4ade80", // green-400
  "Moderate": "#facc15", // yellow-400
  "Unhealthy for Sensitive Groups": "#fb923c", // orange-400
  "Unhealthy": "#f87171", // red-400
  "Very Unhealthy": "#a78bfa", // purple-400
  "Hazardous": "#881337" // rose-900
};