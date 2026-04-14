// أنواع بيانات حاسبة الطاقة الشمسية

export interface LoadItem {
  id: string;
  name: string;
  power: number; // واط
  quantity: number;
  hoursPerDay: number;
}

export interface SolarCalculationInput {
  // بيانات الأحمال
  loads: LoadItem[];
  
  // بيانات الموقع
  peakSunHours: number; // ساعات الذروة الشمسية
  
  // خيارات النظام
  systemVoltage: 12 | 24 | 48; // جهد النظام
  daysOfAutonomy: number; // أيام الاستقلالية
  depthOfDischarge: number; // عمق التفريغ (0.5 - 0.8)
  
  // مواصفات المعدات
  panelWattage: number; // قدرة اللوح الواحد (واط)
  batteryCapacity: number; // سعة البطارية (أمبير ساعة)
  batteryVoltage: number; // جهد البطارية (فولت)
  inverterEfficiency: number; // كفاءة الانفرتر (0.85 - 0.98)
  chargeControllerEfficiency: number; // كفاءة منظم الشحن (0.95 - 0.98)
  
  // معاملات الخسارة
  temperatureFactor: number; // معامل درجة الحرارة (0.8 - 0.95)
  dustFactor: number; // معامل الغبار (0.9 - 0.95)
  agingFactor: number; // معامل التقادم (0.9 - 0.95)
  wiringFactor: number; // معامل الأسلاك (0.95 - 0.98)
}

export interface SolarCalculationResult {
  // الاستهلاك اليومي
  totalDailyEnergy: number; // إجمالي الطاقة اليومية (واط ساعة)
  totalPower: number; // إجمالي القدرة (واط)
  
  // حسابات الألواح
  panelCount: number;
  totalPanelPower: number;
  panelArrayPower: number;
  
  // حسابات الانفرتر
  inverterPower: number;
  inverterVA: number;
  
  // حسابات البطاريات
  batteryCount: number;
  totalBatteryCapacity: number;
  batteryBankEnergy: number;
  
  // حسابات منظم الشحن
  chargeControllerCurrent: number;
  
  // تفاصيل إضافية
  peakLoad: number;
  simultaneousLoad: number;
}

export interface EquipmentSpecs {
  panels: {
    commonWattages: number[];
    efficiencies: number[];
  };
  batteries: {
    commonCapacities: number[];
    commonVoltages: number[];
    types: string[];
  };
  inverters: {
    commonPowers: number[];
    efficiencies: number[];
  };
}

export interface LocationData {
  name: string;
  country: string;
  peakSunHours: number;
  latitude: number;
  longitude: number;
}

// قيم افتراضية
export const DEFAULT_VALUES = {
  peakSunHours: 6,
  systemVoltage: 48 as const,
  daysOfAutonomy: 2,
  depthOfDischarge: 0.5,
  panelWattage: 550,
  batteryCapacity: 200,
  batteryVoltage: 12,
  inverterEfficiency: 0.95,
  chargeControllerEfficiency: 0.98,
  temperatureFactor: 0.88,
  dustFactor: 0.95,
  agingFactor: 0.95,
  wiringFactor: 0.98,
};

// بيانات مواقع شائعة (ساعات الذروة الشمسية)
export const COMMON_LOCATIONS: LocationData[] = [
  { name: 'الرياض', country: 'السعودية', peakSunHours: 6.5, latitude: 24.71, longitude: 46.67 },
  { name: 'جدة', country: 'السعودية', peakSunHours: 6.2, latitude: 21.54, longitude: 39.18 },
  { name: 'القاهرة', country: 'مصر', peakSunHours: 6.0, latitude: 30.04, longitude: 31.23 },
  { name: 'الإسكندرية', country: 'مصر', peakSunHours: 5.8, latitude: 31.20, longitude: 29.91 },
  { name: 'دبي', country: 'الإمارات', peakSunHours: 6.3, latitude: 25.20, longitude: 55.27 },
  { name: 'أبوظبي', country: 'الإمارات', peakSunHours: 6.4, latitude: 24.45, longitude: 54.37 },
  { name: 'الدوحة', country: 'قطر', peakSunHours: 6.2, latitude: 25.28, longitude: 51.53 },
  { name: 'المنامة', country: 'البحرين', peakSunHours: 6.1, latitude: 26.22, longitude: 50.58 },
  { name: 'مسقط', country: 'عمان', peakSunHours: 6.0, latitude: 23.58, longitude: 58.40 },
  { name: 'الكويت', country: 'الكويت', peakSunHours: 6.3, latitude: 29.37, longitude: 47.97 },
  { name: 'عمان', country: 'الأردن', peakSunHours: 5.9, latitude: 31.94, longitude: 35.92 },
  { name: 'بغداد', country: 'العراق', peakSunHours: 6.1, latitude: 33.31, longitude: 44.36 },
  { name: 'دمشق', country: 'سوريا', peakSunHours: 5.7, latitude: 33.51, longitude: 36.27 },
  { name: 'بيروت', country: 'لبنان', peakSunHours: 5.6, latitude: 33.89, longitude: 35.50 },
  { name: 'الرباط', country: 'المغرب', peakSunHours: 5.5, latitude: 34.02, longitude: -6.84 },
  { name: 'تونس', country: 'تونس', peakSunHours: 5.7, latitude: 36.80, longitude: 10.18 },
  { name: 'الجزائر', country: 'الجزائر', peakSunHours: 5.8, latitude: 36.75, longitude: 3.05 },
  { name: 'طرابلس', country: 'ليبيا', peakSunHours: 6.2, latitude: 32.88, longitude: 13.19 },
];

// أحمال كهربائية شائعة
export const COMMON_LOADS = [
  { name: 'مصباح LED', power: 10 },
  { name: 'مصباح فلورسنت', power: 20 },
  { name: 'تلفزيون', power: 100 },
  { name: 'ثلاجة', power: 150 },
  { name: 'فريزر', power: 200 },
  { name: 'مكيف صغير', power: 1000 },
  { name: 'مكيف متوسط', power: 2000 },
  { name: 'مكيف كبير', power: 3500 },
  { name: 'مروحة سقف', power: 75 },
  { name: 'مروحة عمودية', power: 50 },
  { name: 'حاسوب محمول', power: 65 },
  { name: 'حاسوب مكتبي', power: 200 },
  { name: 'شاحن موبايل', power: 10 },
  { name: 'غسالة ملابس', power: 500 },
  { name: 'غسالة أطباق', power: 1200 },
  { name: 'سخان ماء صغير', power: 1500 },
  { name: 'سخان ماء كبير', power: 3000 },
  { name: 'مايكروويف', power: 1000 },
  { name: ' toaster', power: 800 },
  { name: 'غلاية ماء', power: 1500 },
  { name: 'مضخة ماء صغيرة', power: 250 },
  { name: 'مضخة ماء متوسطة', power: 750 },
  { name: 'مضخة ماء كبيرة', power: 1500 },
  { name: 'إضاءة خارجية', power: 30 },
  { name: 'كاميرا مراقبة', power: 10 },
  { name: 'راوتر واي فاي', power: 15 },
  { name: 'طابعة', power: 50 },
];
