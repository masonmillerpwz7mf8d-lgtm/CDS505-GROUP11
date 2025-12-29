import { AQIRecord, AQICategory, CategoryColors } from './types';

export const parseCSV = (csv: string): AQIRecord[] => {
  const lines = csv.trim().split('\n');
  const headers = lines[0].split(',');
  
  const records: AQIRecord[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    // Handle potential quoted fields if necessary, though simple split suffices for this specific dataset structure
    const currentLine = lines[i].split(',');
    
    if (currentLine.length === headers.length) {
      const record: any = {};
      headers.forEach((header, index) => {
        const value = currentLine[index];
        // Convert numeric values
        if (header.includes("Value")) {
          record[header] = parseInt(value, 10);
        } else {
          record[header] = value;
        }
      });
      records.push(record as AQIRecord);
    }
  }
  return records;
};

export const getAverageAQI = (data: AQIRecord[]): number => {
  if (data.length === 0) return 0;
  const sum = data.reduce((acc, curr) => acc + curr["AQI Value"], 0);
  return Math.round(sum / data.length);
};

export const getColorForAQI = (aqi: number): string => {
  if (aqi <= 50) return CategoryColors["Good"];
  if (aqi <= 100) return CategoryColors["Moderate"];
  if (aqi <= 150) return CategoryColors["Unhealthy for Sensitive Groups"];
  if (aqi <= 200) return CategoryColors["Unhealthy"];
  if (aqi <= 300) return CategoryColors["Very Unhealthy"];
  return CategoryColors["Hazardous"];
};

export const getHealthImplications = (aqi: number): { impact: string; advice: string } => {
  if (aqi <= 50) return { impact: "Air quality is satisfactory, and air pollution poses little or no risk.", advice: "It's a great day to be active outside." };
  if (aqi <= 100) return { impact: "Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.", advice: "Unusually sensitive people should consider reducing prolonged or heavy exertion." };
  if (aqi <= 150) return { impact: "Members of sensitive groups may experience health effects. The general public is less likely to be affected.", advice: "People with heart or lung disease, older adults, and children should reduce prolonged or heavy exertion." };
  if (aqi <= 200) return { impact: "Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.", advice: "People with heart or lung disease, older adults, and children should avoid prolonged or heavy exertion. Everyone else should reduce prolonged or heavy exertion." };
  if (aqi <= 300) return { impact: "Health warnings of emergency conditions. The entire population is more likely to be affected.", advice: "People with heart or lung disease, older adults, and children should avoid all physical activity outdoors. Everyone else should avoid prolonged or heavy exertion." };
  return { impact: "Health alert: everyone may experience more serious health effects.", advice: "Everyone should avoid all physical activity outdoors." };
};