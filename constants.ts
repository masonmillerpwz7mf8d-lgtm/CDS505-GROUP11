import { AQIRecord } from './types';

export const COUNTRY_COORDINATES: Record<string, [number, number]> = {
  "Russian Federation": [61.524, 105.318],
  "Brazil": [-14.235, -51.925],
  "Italy": [41.871, 12.567],
  "Poland": [51.919, 19.145],
  "France": [46.227, 2.213],
  "United States of America": [37.090, -95.712],
  "Germany": [51.165, 10.451],
  "Belgium": [50.503, 4.469],
  "Egypt": [26.820, 30.802],
  "China": [35.861, 104.195],
  "Netherlands": [52.132, 5.291],
  "India": [20.593, 78.962],
  "Pakistan": [30.375, 69.345],
  "Republic of North Macedonia": [41.608, 21.745],
  "Colombia": [4.570, -74.297],
  "Romania": [45.943, 24.966],
  "Indonesia": [-0.789, 113.921],
  "Finland": [61.924, 25.748],
  "South Africa": [-30.559, 22.937],
  "United Kingdom of Great Britain and Northern Ireland": [55.378, -3.436],
  "New Zealand": [-40.900, 174.886],
  "Tunisia": [33.886, 9.537],
  "Viet Nam": [14.058, 108.277],
  "Iran (Islamic Republic of)": [32.427, 53.688],
  "Mexico": [23.634, -102.552],
  "El Salvador": [13.794, -88.896],
  "United Republic of Tanzania": [-6.369, 34.888],
  "Bulgaria": [42.733, 25.485],
  "Nigeria": [9.082, 8.675],
  "South Sudan": [6.877, 31.307],
  "Guatemala": [15.783, -90.230],
  "Ireland": [53.142, -7.692],
  "Turkey": [38.963, 35.243],
  "Peru": [-9.190, -75.015],
  "Democratic Republic of the Congo": [-4.038, 21.758],
  "Canada": [56.130, -106.346],
  "Switzerland": [46.818, 8.227],
  "Sweden": [60.128, 18.643],
  "Denmark": [56.263, 9.501],
  "Cameroon": [7.369, 12.354],
  "Somalia": [5.152, 46.199],
  "Australia": [-25.274, 133.775],
  "Portugal": [39.399, -8.224],
  "Côte d'Ivoire": [7.540, -5.547],
  "Haiti": [18.971, -72.285],
  "Latvia": [56.879, 24.603],
  "Chad": [15.454, 18.732],
  "Israel": [31.046, 34.851],
  "Hungary": [47.162, 19.503],
  "Japan": [36.204, 138.252],
  "Thailand": [15.870, 100.992],
  "Philippines": [12.879, 121.774],
  "Kazakhstan": [48.019, 66.923],
  "Ethiopia": [9.145, 40.489]
};

export const rawCsvData = `Country,City,AQI Value,AQI Category,CO AQI Value,CO AQI Category,Ozone AQI Value,Ozone AQI Category,NO2 AQI Value,NO2 AQI Category,PM2.5 AQI Value,PM2.5 AQI Category
Russian Federation,Praskoveya,51,Moderate,1,Good,36,Good,0,Good,51,Moderate
Brazil,Presidente Dutra,41,Good,1,Good,5,Good,1,Good,41,Good
Italy,Priolo Gargallo,66,Moderate,1,Good,39,Good,2,Good,66,Moderate
Poland,Przasnysz,34,Good,1,Good,34,Good,0,Good,20,Good
France,Punaauia,22,Good,0,Good,22,Good,0,Good,6,Good
United States of America,Punta Gorda,54,Moderate,1,Good,14,Good,11,Good,54,Moderate
Germany,Puttlingen,62,Moderate,1,Good,35,Good,3,Good,62,Moderate
Belgium,Puurs,64,Moderate,1,Good,29,Good,7,Good,64,Moderate
Russian Federation,Pyatigorsk,54,Moderate,1,Good,41,Good,1,Good,54,Moderate
Egypt,Qalyub,142,Unhealthy for Sensitive Groups,3,Good,89,Moderate,9,Good,142,Unhealthy for Sensitive Groups
China,Qinzhou,68,Moderate,2,Good,68,Moderate,1,Good,58,Moderate
Netherlands,Raalte,41,Good,1,Good,24,Good,6,Good,41,Good
India,Radaur,158,Unhealthy,3,Good,139,Unhealthy for Sensitive Groups,1,Good,158,Unhealthy
Pakistan,Radhan,158,Unhealthy,1,Good,50,Good,1,Good,158,Unhealthy
Republic of North Macedonia,Radovis,83,Moderate,1,Good,46,Good,0,Good,83,Moderate
France,Raismes,59,Moderate,1,Good,30,Good,4,Good,59,Moderate
India,Rajgir,154,Unhealthy,3,Good,100,Unhealthy for Sensitive Groups,2,Good,154,Unhealthy
Italy,Ramacca,55,Moderate,1,Good,47,Good,0,Good,55,Moderate
United States of America,Phoenix,72,Moderate,1,Good,4,Good,23,Good,72,Moderate
India,Phulabani,161,Unhealthy,2,Good,71,Moderate,0,Good,161,Unhealthy
Poland,Piaseczno,28,Good,1,Good,28,Good,2,Good,28,Good
India,Pimpri,118,Unhealthy for Sensitive Groups,2,Good,30,Good,2,Good,118,Unhealthy for Sensitive Groups
Brazil,Pindobacu,33,Good,0,Good,10,Good,1,Good,33,Good
China,Pingyin,150,Unhealthy,3,Good,95,Moderate,6,Good,150,Unhealthy
Brazil,Pinheiral,154,Unhealthy,5,Good,0,Good,13,Good,154,Unhealthy
India,Piravam,81,Moderate,1,Good,24,Good,1,Good,81,Moderate
Colombia,Plato,67,Moderate,1,Good,16,Good,2,Good,67,Moderate
Romania,Poiana Mare,62,Moderate,1,Good,37,Good,1,Good,62,Moderate
Russian Federation,Polevskoy,31,Good,1,Good,31,Good,0,Good,17,Good
France,Pontarlier,56,Moderate,1,Good,35,Good,0,Good,56,Moderate
United States of America,Pontiac,77,Moderate,2,Good,22,Good,15,Good,77,Moderate
Indonesia,Pontianak,44,Good,1,Good,15,Good,0,Good,44,Good
Brazil,Porecatu,30,Good,1,Good,9,Good,2,Good,30,Good
Finland,Pori,30,Good,1,Good,30,Good,1,Good,15,Good
South Africa,Port Elizabeth,79,Moderate,3,Good,18,Good,5,Good,79,Moderate
United States of America,Port Neches,34,Good,1,Good,19,Good,7,Good,34,Good
United Kingdom of Great Britain and Northern Ireland,Port Talbot,51,Moderate,1,Good,20,Good,5,Good,51,Moderate
United States of America,Portales,77,Moderate,1,Good,34,Good,0,Good,77,Moderate
United States of America,Post Falls,61,Moderate,1,Good,32,Good,3,Good,61,Moderate
Brazil,Pouso Alegre,32,Good,1,Good,7,Good,2,Good,32,Good
China,Dalinghe,64,Moderate,3,Good,64,Moderate,4,Good,64,Moderate
Russian Federation,Dalnegorsk,29,Good,0,Good,29,Good,0,Good,25,Good
United Republic of Tanzania,Dar Es Salaam,51,Moderate,1,Good,23,Good,0,Good,51,Moderate
India,Darbhanga,247,Very Unhealthy,3,Good,162,Unhealthy,1,Good,247,Very Unhealthy
United States of America,Dayton,45,Good,1,Good,32,Good,7,Good,45,Good
Belgium,Deinze,36,Good,1,Good,25,Good,3,Good,36,Good
Egypt,Dekernes,81,Moderate,2,Good,81,Moderate,4,Good,56,Moderate
Haiti,Delmas,124,Unhealthy for Sensitive Groups,2,Good,15,Good,5,Good,124,Unhealthy for Sensitive Groups
United States of America,Deming,72,Moderate,1,Good,26,Good,2,Good,72,Moderate
United Kingdom of Great Britain and Northern Ireland,Denton,55,Moderate,0,Good,32,Good,1,Good,55,Moderate
United States of America,Destin,31,Good,0,Good,31,Good,0,Good,25,Good
Pakistan,Dhadar,157,Unhealthy,1,Good,89,Moderate,0,Good,157,Unhealthy
India,Dharmapuri,60,Moderate,1,Good,31,Good,1,Good,60,Moderate
Pakistan,Digri,153,Unhealthy,1,Good,40,Good,0,Good,153,Unhealthy
Somalia,Dinsor,22,Good,0,Good,19,Good,0,Good,22,Good
Philippines,Dipolog,30,Good,1,Good,17,Good,0,Good,30,Good
Latvia,Dobele,44,Good,1,Good,34,Good,0,Good,44,Good
United States of America,Grandville,47,Good,1,Good,37,Good,4,Good,47,Good
Netherlands,Grave,37,Good,0,Good,32,Good,2,Good,37,Good
United States of America,Green Valley,44,Good,1,Good,14,Good,8,Good,44,Good
United States of America,Greendale,58,Moderate,2,Good,14,Good,24,Good,58,Moderate
Poland,Grudziadz,37,Good,0,Good,33,Good,0,Good,37,Good
Colombia,Guamo,89,Moderate,3,Good,3,Good,6,Good,89,Moderate
Italy,Guardiagrele,52,Moderate,2,Good,38,Good,7,Good,52,Moderate
Chad,Guelengdeng,59,Moderate,2,Good,16,Good,0,Good,59,Moderate
United Kingdom of Great Britain and Northern Ireland,Guildford,51,Moderate,1,Good,25,Good,6,Good,51,Moderate
Philippines,Guiset,66,Moderate,1,Good,26,Good,1,Good,66,Moderate
Russian Federation,Gukovo,38,Good,1,Good,38,Good,0,Good,13,Good
United States of America,Havre De Grace,34,Good,1,Good,30,Good,7,Good,34,Good
United States of America,Hazelwood,88,Moderate,2,Good,11,Good,20,Good,88,Moderate
Germany,Heddesheim,54,Moderate,1,Good,31,Good,3,Good,54,Moderate
Germany,Heiligenhaus,44,Good,1,Good,28,Good,3,Good,44,Good
United Kingdom of Great Britain and Northern Ireland,Hemel Hempstead,51,Moderate,1,Good,26,Good,6,Good,51,Moderate
United States of America,Hicksville,67,Moderate,2,Good,15,Good,23,Good,67,Moderate
Brazil,Hidrolandia,42,Good,1,Good,5,Good,2,Good,42,Good
India,Gyanpur,189,Unhealthy,2,Good,99,Moderate,1,Good,189,Unhealthy
Germany,Haiger,49,Good,1,Good,25,Good,3,Good,49,Good
China,Hangzhou,203,Very Unhealthy,5,Good,203,Very Unhealthy,5,Good,151,Unhealthy
Germany,Harrislee,35,Good,0,Good,32,Good,0,Good,35,Good
United States of America,Harrison,90,Moderate,1,Good,25,Good,2,Good,90,Moderate
India,Harur,67,Moderate,1,Good,26,Good,1,Good,67,Moderate
Germany,Hasbergen,36,Good,0,Good,34,Good,1,Good,36,Good
France,Haubourdin,48,Good,1,Good,28,Good,4,Good,48,Good
United States of America,Taunton,41,Good,1,Good,28,Good,10,Good,41,Good
New Zealand,Tauranga,19,Good,0,Good,19,Good,1,Good,17,Good
Tunisia,Tawzar,73,Moderate,1,Good,43,Good,0,Good,73,Moderate
Viet Nam,Tay Ninh,45,Good,0,Good,18,Good,1,Good,45,Good
Iran (Islamic Republic of),Taybad,170,Unhealthy,1,Good,43,Good,0,Good,170,Unhealthy
Italy,Teano,47,Good,1,Good,47,Good,1,Good,36,Good
India,Tekkali,155,Unhealthy,3,Good,82,Moderate,1,Good,155,Unhealthy
Brazil,Teodoro Sampaio,46,Good,1,Good,9,Good,1,Good,46,Good
Mexico,Tepeaca,172,Unhealthy,5,Good,2,Good,11,Good,172,Unhealthy
Mexico,Tequila,64,Moderate,1,Good,15,Good,2,Good,64,Moderate
Italy,Teramo,44,Good,1,Good,44,Good,1,Good,38,Good
Viet Nam,Thai Nguyen,150,Unhealthy,3,Good,150,Unhealthy,1,Good,105,Unhealthy for Sensitive Groups
China,Tianjin,142,Unhealthy for Sensitive Groups,4,Good,113,Unhealthy for Sensitive Groups,9,Good,142,Unhealthy for Sensitive Groups
Indonesia,Tidore,21,Good,0,Good,13,Good,0,Good,21,Good
Romania,Timisoara,47,Good,1,Good,42,Good,0,Good,47,Good
Tunisia,Tinjah,48,Good,1,Good,48,Good,1,Good,29,Good
Philippines,Toboso,54,Moderate,1,Good,20,Good,0,Good,54,Moderate
Japan,Tokorozawa,60,Moderate,1,Good,44,Good,3,Good,60,Moderate
Mexico,Toluca,166,Unhealthy,4,Good,8,Good,19,Good,166,Unhealthy
Brazil,Itapissuma,27,Good,0,Good,23,Good,1,Good,27,Good
Brazil,Itarantim,23,Good,1,Good,7,Good,1,Good,23,Good
Brazil,Itumbiara,31,Good,1,Good,13,Good,0,Good,31,Good
Mexico,Ixtaczoquitlan,88,Moderate,3,Good,13,Good,9,Good,88,Moderate
El Salvador,Izalco,90,Moderate,2,Good,22,Good,9,Good,90,Moderate
United Republic of Tanzania,Izazi,28,Good,1,Good,15,Good,0,Good,28,Good
Russian Federation,Izberbash,51,Moderate,1,Good,38,Good,0,Good,51,Moderate
India,Jabalpur,170,Unhealthy,1,Good,38,Good,0,Good,170,Unhealthy
Brazil,Jaguaquara,22,Good,0,Good,9,Good,1,Good,22,Good
India,Jahanabad,168,Unhealthy,4,Good,168,Unhealthy,1,Good,156,Unhealthy
Bulgaria,Jambol,40,Good,1,Good,40,Good,0,Good,32,Good
Poland,Jarocin,47,Good,1,Good,27,Good,2,Good,47,Good
Philippines,Jasaan,59,Moderate,1,Good,32,Good,0,Good,59,Moderate
Nigeria,Ilobu,133,Unhealthy for Sensitive Groups,4,Good,23,Good,3,Good,133,Unhealthy for Sensitive Groups
Finland,Imatra,29,Good,1,Good,29,Good,1,Good,7,Good
Brazil,Indaial,73,Moderate,2,Good,2,Good,8,Good,73,Moderate
Philippines,Indang,50,Good,0,Good,24,Good,0,Good,50,Good
Brazil,Itagi,25,Good,0,Good,9,Good,1,Good,25,Good
Nigeria,Iseyin,90,Moderate,3,Good,18,Good,2,Good,90,Moderate
Mexico,Isla,81,Moderate,2,Good,26,Good,3,Good,81,Moderate
Brazil,Itaitinga,29,Good,0,Good,20,Good,1,Good,29,Good
Brazil,Itambe,21,Good,0,Good,8,Good,1,Good,21,Good
Brazil,Itapemirim,44,Good,1,Good,16,Good,1,Good,44,Good
South Sudan,Torit,65,Moderate,1,Good,12,Good,0,Good,65,Moderate
Guatemala,Totonicapan,66,Moderate,2,Good,7,Good,6,Good,66,Moderate
United States of America,Trenton,53,Moderate,1,Good,28,Good,10,Good,53,Moderate
United States of America,Trujillo Alto,56,Moderate,0,Good,23,Good,0,Good,56,Moderate
Ireland,Tullamore,57,Moderate,1,Good,26,Good,3,Good,57,Moderate
Turkey,Tunceli,62,Moderate,0,Good,35,Good,0,Good,62,Moderate
Viet Nam,Tuyen Quang,167,Unhealthy,4,Good,167,Unhealthy,1,Good,107,Unhealthy for Sensitive Groups
United States of America,Two Rivers,49,Good,1,Good,27,Good,4,Good,49,Good
United States of America,Tysons Corner,55,Moderate,2,Good,25,Good,11,Good,55,Moderate
Russian Federation,Tyukalinsk,34,Good,1,Good,34,Good,0,Good,32,Good
India,Udupi,80,Moderate,1,Good,25,Good,0,Good,80,Moderate
India,Umaria,163,Unhealthy,2,Good,92,Moderate,0,Good,163,Unhealthy
United States of America,Willowbrook,126,Unhealthy for Sensitive Groups,4,Good,3,Good,36,Good,126,Unhealthy for Sensitive Groups
United States of America,Wilmette,63,Moderate,2,Good,9,Good,22,Good,63,Moderate
United States of America,Wolf Trap,53,Moderate,2,Good,27,Good,10,Good,53,Moderate
United States of America,Woodhaven,86,Moderate,2,Good,38,Good,10,Good,86,Moderate
China,Wulanhaote,47,Good,2,Good,47,Good,0,Good,25,Good
China,Xiangdong,78,Moderate,2,Good,25,Good,7,Good,78,Moderate
China,Xiaoweizhai,61,Moderate,2,Good,61,Moderate,0,Good,54,Moderate
China,Xushan,112,Unhealthy for Sensitive Groups,2,Good,44,Good,4,Good,112,Unhealthy for Sensitive Groups
Peru,Yanacancha,27,Good,0,Good,6,Good,1,Good,27,Good
China,Yancheng,155,Unhealthy,3,Good,155,Unhealthy,2,Good,151,Unhealthy
Democratic Republic of the Congo,Yangambi,121,Unhealthy for Sensitive Groups,4,Good,24,Good,0,Good,121,Unhealthy for Sensitive Groups
China,Yanggu,160,Unhealthy,3,Good,138,Unhealthy for Sensitive Groups,5,Good,160,Unhealthy
China,Yangliuqing,144,Unhealthy for Sensitive Groups,4,Good,109,Unhealthy for Sensitive Groups,9,Good,144,Unhealthy for Sensitive Groups
China,Yanji,69,Moderate,2,Good,48,Good,0,Good,69,Moderate
United States of America,Yankton,47,Good,1,Good,34,Good,3,Good,47,Good
Germany,Wenden,69,Moderate,1,Good,34,Good,4,Good,69,Moderate
United States of America,West Carrollton City,84,Moderate,3,Good,9,Good,24,Good,84,Moderate
Belgium,Wetteren,64,Moderate,1,Good,32,Good,6,Good,64,Moderate
Canada,Whitehorse,20,Good,1,Good,20,Good,1,Good,10,Good
Ireland,Wicklow,38,Good,1,Good,30,Good,3,Good,38,Good
Switzerland,Wil,59,Moderate,1,Good,27,Good,3,Good,59,Moderate
Germany,Wildeshausen,67,Moderate,1,Good,30,Good,5,Good,67,Moderate
United States of America,Williamsport,75,Moderate,2,Good,13,Good,16,Good,75,Moderate
United States of America,Fox Lake,60,Moderate,2,Good,18,Good,21,Good,60,Moderate
Brazil,Foz Do Iguacu,22,Good,1,Good,13,Good,0,Good,22,Good
Denmark,Frederikssund,36,Good,1,Good,36,Good,0,Good,25,Good
United States of America,Friendly,41,Good,1,Good,30,Good,8,Good,41,Good
Germany,Fuldatal,44,Good,1,Good,28,Good,2,Good,44,Good
Japan,Furano,29,Good,1,Good,26,Good,1,Good,29,Good
China,Fuzhou,168,Unhealthy,3,Good,168,Unhealthy,5,Good,99,Moderate
United Kingdom of Great Britain and Northern Ireland,Galashiels,25,Good,1,Good,25,Good,3,Good,23,Good
Germany,Gangelt,41,Good,1,Good,26,Good,4,Good,41,Good
Germany,Garbsen,36,Good,0,Good,33,Good,1,Good,36,Good
Cameroon,Garoua,59,Moderate,2,Good,12,Good,0,Good,59,Moderate
Somalia,Garowe,98,Moderate,0,Good,17,Good,0,Good,98,Moderate
Netherlands,Geertruidenberg,35,Good,0,Good,33,Good,2,Good,35,Good
Australia,Geraldton,29,Good,0,Good,29,Good,0,Good,13,Good
Germany,Germersheim,51,Moderate,1,Good,29,Good,3,Good,51,Moderate
Colombia,Girardot,103,Unhealthy for Sensitive Groups,4,Good,9,Good,6,Good,103,Unhealthy for Sensitive Groups
Russian Federation,Glubokiy,35,Good,1,Good,35,Good,0,Good,17,Good
United Kingdom of Great Britain and Northern Ireland,Golborne,35,Good,1,Good,30,Good,4,Good,35,Good
Portugal,Gondomar,27,Good,0,Good,27,Good,2,Good,21,Good
Russian Federation,Goryachevodskiy,48,Good,1,Good,39,Good,1,Good,48,Good
India,Govindgarh,307,Hazardous,1,Good,45,Good,0,Good,307,Hazardous
Côte d'Ivoire,Grand Lahou,54,Moderate,1,Good,25,Good,0,Good,54,Moderate
United States of America,Hoffman Estates,61,Moderate,2,Good,26,Good,16,Good,61,Moderate
Sweden,Hoganas,36,Good,1,Good,36,Good,1,Good,30,Good
United States of America,Holly Springs,42,Good,1,Good,42,Good,2,Good,37,Good
Germany,Holzminden,42,Good,0,Good,32,Good,1,Good,42,Good
China,Huaicheng,151,Unhealthy,4,Good,45,Good,4,Good,151,Unhealthy
Ethiopia,Huruta,102,Unhealthy for Sensitive Groups,1,Good,23,Good,0,Good,102,Unhealthy for Sensitive Groups
Nigeria,Idanre,115,Unhealthy for Sensitive Groups,3,Good,24,Good,2,Good,115,Unhealthy for Sensitive Groups
Italy,Iglesias,64,Moderate,1,Good,53,Moderate,1,Good,64,Moderate
Germany,Ihlow,40,Good,1,Good,30,Good,2,Good,40,Good
Japan,Iizuka,45,Good,1,Good,45,Good,0,Good,38,Good
Thailand,Sungai Kolok,65,Moderate,1,Good,34,Good,0,Good,65,Moderate
Indonesia,Sungaipenuh,17,Good,1,Good,13,Good,0,Good,17,Good
Russian Federation,Suvorovskaya,52,Moderate,1,Good,39,Good,1,Good,52,Moderate
Japan,Suzu,69,Moderate,1,Good,69,Moderate,1,Good,60,Moderate
Poland,Swiecie,44,Good,1,Good,33,Good,1,Good,44,Good
Hungary,Szeged,50,Good,1,Good,41,Good,1,Good,50,Good
Hungary,Szerencs,72,Moderate,1,Good,42,Good,1,Good,72,Moderate
Tunisia,Taburbah,49,Good,1,Good,49,Good,1,Good,32,Good
India,Tadepallegudem,127,Unhealthy for Sensitive Groups,2,Good,65,Moderate,1,Good,127,Unhealthy for Sensitive Groups
Iran (Islamic Republic of),Tafresh,125,Unhealthy for Sensitive Groups,2,Good,125,Unhealthy for Sensitive Groups,1,Good,82,Moderate
Philippines,Tagaytay,41,Good,1,Good,25,Good,1,Good,41,Good
Japan,Tajimi,52,Moderate,1,Good,34,Good,3,Good,52,Moderate
Japan,Takahagi,47,Good,1,Good,47,Good,1,Good,44,Good
Japan,Takahashi,36,Good,1,Good,36,Good,3,Good,34,Good
India,Tal,155,Unhealthy,1,Good,39,Good,0,Good,155,Unhealthy
Philippines,Talacogon,37,Good,1,Good,19,Good,0,Good,37,Good
Russian Federation,Taldom,46,Good,1,Good,27,Good,1,Good,46,Good
Kazakhstan,Talgar,69,Moderate,1,Good,42,Good,0,Good,69,Moderate
United States of America,Tamiami,64,Moderate,1,Good,18,Good,12,Good,64,Moderate
Israel,Tamra,92,Moderate,2,Good,52,Moderate,8,Good,92,Moderate
Japan,Tanashi,58,Moderate,1,Good,43,Good,3,Good,58,Moderate
Romania,Tandarei,41,Good,1,Good,41,Good,0,Good,38,Good
Philippines,Tantangan,35,Good,1,Good,20,Good,0,Good,35,Good
Indonesia,Tarogong,88,Moderate,2,Good,53,Moderate,1,Good,88,Moderate
Turkey,Tatvan,45,Good,0,Good,45,Good,0,Good,43,Good
India,Yaval,102,Unhealthy for Sensitive Groups,1,Good,38,Good,0,Good,102,Unhealthy for Sensitive Groups
United Kingdom of Great Britain and Northern Ireland,Yeovil,58,Moderate,1,Good,24,Good,7,Good,58,Moderate
China,Yuanping,143,Unhealthy for Sensitive Groups,2,Good,35,Good,5,Good,143,Unhealthy for Sensitive Groups
China,Yuncheng,187,Unhealthy,2,Good,36,Good,8,Good,187,Unhealthy
Poland,Zambrow,35,Good,1,Good,35,Good,0,Good,17,Good
Poland,Zamosc,48,Good,1,Good,35,Good,1,Good,48,Good
Belgium,Zaventem,58,Moderate,1,Good,29,Good,6,Good,58,Moderate
Belgium,Zemst,65,Moderate,1,Good,27,Good,8,Good,65,Moderate
China,Zhaozhou,73,Moderate,2,Good,66,Moderate,0,Good,73,Moderate
China,Zhicheng,160,Unhealthy,4,Good,36,Good,13,Good,160,Unhealthy
China,Zhongshan,98,Moderate,3,Good,33,Good,9,Good,98,Moderate
China,Zhuji,156,Unhealthy,4,Good,45,Good,10,Good,156,Unhealthy
Mexico,Zimatlan,75,Moderate,2,Good,9,Good,6,Good,75,Moderate
Mexico,Zinacantepec,163,Unhealthy,4,Good,8,Good,18,Good,163,Unhealthy
Russian Federation,Zmeinogorsk,35,Good,1,Good,35,Good,0,Good,21,Good`;