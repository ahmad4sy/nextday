import type { SolarCalculationInput, SolarCalculationResult, LoadItem } from '@/types';

/**
 * حاسبة الطاقة الشمسية - منطق الحسابات
 * تتبع المعايير الدولية:
 * - IEC 61215 للألواح الشمسية
 * - IEEE 1547 لأنظمة التوزيع
 * - NEC (National Electrical Code) للتركيبات الكهربائية
 */

/**
 * حساب إجمالي الاستهلاك اليومي
 */
export function calculateDailyEnergy(loads: LoadItem[]): number {
  return loads.reduce((total, load) => {
    return total + (load.power * load.quantity * load.hoursPerDay);
  }, 0);
}

/**
 * حساب إجمالي القدرة المتزامنة (مع معامل التزامن 0.7)
 */
export function calculateSimultaneousLoad(loads: LoadItem[]): number {
  const totalPower = loads.reduce((total, load) => {
    return total + (load.power * load.quantity);
  }, 0);
  // معامل التزامن typical 0.6 - 0.8
  return totalPower * 0.7;
}

/**
 * حساب الحمل الأقصى (Peak Load)
 */
export function calculatePeakLoad(loads: LoadItem[]): number {
  return loads.reduce((total, load) => {
    return total + (load.power * load.quantity);
  }, 0);
}

/**
 * حساب معامل الخسارة الكلي
 * يأخذ في الاعتبار:
 * - درجة الحرارة
 * - الغبار والاتساخ
 * - تقادم الألواح
 * - فقد الأسلاك
 */
export function calculateTotalLossFactor(input: SolarCalculationInput): number {
  return (
    input.temperatureFactor *
    input.dustFactor *
    input.agingFactor *
    input.wiringFactor
  );
}

/**
 * حساب عدد الألواح الشمسية المطلوبة
 * 
 * المعادلة:
 * Energy Needed = Daily Energy / (Inverter Eff × Charge Controller Eff)
 * Panel Power Needed = Energy Needed / Peak Sun Hours
 * Actual Panel Power = Panel Power Needed / Loss Factor
 * Number of Panels = Actual Panel Power / Panel Wattage (rounded up)
 */
export function calculatePanels(input: SolarCalculationInput): {
  count: number;
  totalPower: number;
  arrayPower: number;
} {
  const dailyEnergy = calculateDailyEnergy(input.loads);
  
  // الطاقة المطلوبة من الألواح (مع مراعاة كفاءة الانفرتر ومنظم الشحن)
  const energyNeeded = dailyEnergy / (input.inverterEfficiency * input.chargeControllerEfficiency);
  
  // القدرة المطلوبة من الألواح
  const panelPowerNeeded = energyNeeded / input.peakSunHours;
  
  // معامل الخسارة الكلي
  const lossFactor = calculateTotalLossFactor(input);
  
  // القدرة الفعلية المطلوبة (مع الخسائر)
  const actualPanelPower = panelPowerNeeded / lossFactor;
  
  // عدد الألواح (تقريب لأعلى)
  const count = Math.ceil(actualPanelPower / input.panelWattage);
  
  // القدرة الإجمالية للألواح
  const totalPower = count * input.panelWattage;
  
  return {
    count,
    totalPower,
    arrayPower: actualPanelPower,
  };
}

/**
 * حساب قدرة الانفرتر المطلوبة
 * 
 * المعادلة:
 * Inverter Power = Simultaneous Load / Inverter Efficiency
 * Inverter VA = Inverter Power / Power Factor (0.8)
 * Safety Factor = 1.25 (25% هامش أمان)
 */
export function calculateInverter(input: SolarCalculationInput): {
  power: number;
  va: number;
  recommendedPower: number;
} {
  const simultaneousLoad = calculateSimultaneousLoad(input.loads);
  const peakLoad = calculatePeakLoad(input.loads);
  
  // قدرة الانفرتر (واط)
  const power = simultaneousLoad / input.inverterEfficiency;
  
  // القدرة الظاهرية (VA) - معامل القدرة 0.8
  const va = power / 0.8;
  
  // القدرة الموصى بها مع هامش أمان 25%
  const recommendedPower = Math.ceil((peakLoad * 1.25) / 100) * 100;
  
  return {
    power: Math.ceil(power),
    va: Math.ceil(va),
    recommendedPower,
  };
}

/**
 * حساب عدد البطاريات المطلوبة
 * 
 * المعادلة:
 * Daily Energy = Sum(Load × Hours)
 * Battery Energy Needed = Daily Energy × Days of Autonomy
 * Usable Battery Energy = Battery Energy Needed / Depth of Discharge
 * Total Battery Capacity (Ah) = Usable Battery Energy / System Voltage
 * Number of Batteries = Total Battery Capacity / Single Battery Capacity
 */
export function calculateBatteries(input: SolarCalculationInput): {
  count: number;
  totalCapacity: number;
  bankEnergy: number;
  seriesCount: number;
  parallelCount: number;
} {
  const dailyEnergy = calculateDailyEnergy(input.loads);
  
  // الطاقة المطلوبة للاستقلالية
  const batteryEnergyNeeded = dailyEnergy * input.daysOfAutonomy;
  
  // الطاقة الفعلية مع مراعاة عمق التفريغ
  const usableBatteryEnergy = batteryEnergyNeeded / input.depthOfDischarge;
  
  // السعة الكلية المطلوبة (أمبير ساعة)
  const totalBatteryCapacityAh = (usableBatteryEnergy / input.systemVoltage);
  
  // حساب التوصيل:
  // التوصيل التسلسلي: number in series = system voltage / battery voltage
  const seriesCount = input.systemVoltage / input.batteryVoltage;
  
  // السعة المطلوبة لكل سلسلة
  const capacityPerString = totalBatteryCapacityAh;
  
  // التوصيل المتوازي
  const parallelCount = Math.ceil(capacityPerString / input.batteryCapacity);
  
  // العدد الكلي
  const count = seriesCount * parallelCount;
  
  // السعة الفعلية الكلية
  const totalCapacity = parallelCount * input.batteryCapacity;
  
  // طاقة بنك البطاريات
  const bankEnergy = totalCapacity * input.systemVoltage;
  
  return {
    count,
    totalCapacity,
    bankEnergy,
    seriesCount,
    parallelCount,
  };
}

/**
 * حساب تيار منظم الشحن (MPPT Charge Controller)
 * 
 * المعادلة:
 * Isc (short circuit current) = Panel Wattage / Vmp × 1.25 (safety factor)
 * Total Current = Isc × Number of Panels in Parallel
 * Controller Current = Total Current × 1.25 (safety factor)
 */
export function calculateChargeController(
  panelCount: number,
  panelWattage: number,
  systemVoltage: number
): number {
  // تيار الدائرة القصيرة التقريبي (Isc ≈ 1.25 × Imp)
  const isc = (panelWattage / (systemVoltage * 0.8)) * 1.25;
  
  // افتراض توصيل الألواح على شكل سلاسل
  // عدد الألواح في التوصيل المتوازي
  const panelsInParallel = Math.ceil(panelCount / (systemVoltage / 12));
  
  // التيار الكلي
  const totalCurrent = isc * panelsInParallel;
  
  // معامل أمان 25%
  const controllerCurrent = totalCurrent * 1.25;
  
  // تقريب لأعلى قيمة قياسية
  const standardValues = [20, 30, 40, 50, 60, 80, 100, 120, 150];
  const recommended = standardValues.find(v => v >= controllerCurrent) || 150;
  
  return recommended;
}

/**
 * الحساب الكامل
 */
export function calculateSolarSystem(input: SolarCalculationInput): SolarCalculationResult {
  // حساب الألواح
  const panels = calculatePanels(input);
  
  // حساب الانفرتر
  const inverter = calculateInverter(input);
  
  // حساب البطاريات
  const batteries = calculateBatteries(input);
  
  // حساب منظم الشحن
  const chargeControllerCurrent = calculateChargeController(
    panels.count,
    input.panelWattage,
    input.systemVoltage
  );
  
  return {
    // الاستهلاك
    totalDailyEnergy: calculateDailyEnergy(input.loads),
    totalPower: calculatePeakLoad(input.loads),
    
    // الألواح
    panelCount: panels.count,
    totalPanelPower: panels.totalPower,
    panelArrayPower: Math.ceil(panels.arrayPower),
    
    // الانفرتر
    inverterPower: inverter.recommendedPower,
    inverterVA: inverter.va,
    
    // البطاريات
    batteryCount: batteries.count,
    totalBatteryCapacity: batteries.totalCapacity,
    batteryBankEnergy: batteries.bankEnergy,
    
    // منظم الشحن
    chargeControllerCurrent,
    
    // تفاصيل
    peakLoad: calculatePeakLoad(input.loads),
    simultaneousLoad: calculateSimultaneousLoad(input.loads),
  };
}

/**
 * توصيات المعدات
 */
export function getEquipmentRecommendations(result: SolarCalculationResult) {
  return {
    inverter: {
      minPower: result.inverterPower,
      recommendedPower: Math.ceil(result.inverterPower * 1.2 / 1000) * 1000,
      type: result.inverterPower > 5000 ? 'هجين (Hybrid)' : 'منفصل (Off-Grid)',
    },
    chargeController: {
      current: result.chargeControllerCurrent,
      type: 'MPPT',
      voltage: result.inverterPower > 3000 ? 48 : result.inverterPower > 1500 ? 24 : 12,
    },
    panels: {
      count: result.panelCount,
      totalPower: result.totalPanelPower,
      configuration: `${Math.ceil(result.panelCount / 2)} × 2`,
    },
    batteries: {
      count: result.batteryCount,
      totalCapacity: result.totalBatteryCapacity,
      backupHours: Math.round((result.batteryBankEnergy / result.totalDailyEnergy) * 24),
    },
  };
}

/**
 * تقدير التكلفة
 */
export function estimateCost(result: SolarCalculationResult, input: SolarCalculationInput): {
  panels: number;
  inverter: number;
  batteries: number;
  chargeController: number;
  installation: number;
  total: number;
} {
  // أسعار تقديرية بالدولار
  const panelPricePerWatt = 0.25; // $0.25 per watt
  const batteryPricePerAh = 2.5; // $2.5 per Ah (12V)
  
  const panelsCost = result.totalPanelPower * panelPricePerWatt;
  
  const inverterCost = result.inverterPower <= 1000 ? 200 :
                       result.inverterPower <= 3000 ? 600 :
                       result.inverterPower <= 5000 ? 1200 :
                       result.inverterPower <= 10000 ? 2500 : 4000;
  
  const batteriesCost = result.batteryCount * input.batteryCapacity * batteryPricePerAh;
  
  const chargeControllerCost = result.chargeControllerCurrent <= 30 ? 150 :
                               result.chargeControllerCurrent <= 60 ? 300 :
                               result.chargeControllerCurrent <= 100 ? 500 : 800;
  
  const installationCost = (panelsCost + inverterCost + batteriesCost + chargeControllerCost) * 0.2;
  
  return {
    panels: Math.round(panelsCost),
    inverter: inverterCost,
    batteries: Math.round(batteriesCost),
    chargeController: chargeControllerCost,
    installation: Math.round(installationCost),
    total: Math.round(panelsCost + inverterCost + batteriesCost + chargeControllerCost + installationCost),
  };
}

/**
 * حساب فترة الاسترداد
 */
export function calculatePaybackPeriod(
  totalCost: number,
  monthlyEnergyProduction: number,
  electricityRate: number = 0.15 // $0.15 per kWh
): {
  years: number;
  months: number;
  annualSavings: number;
} {
  const annualProduction = monthlyEnergyProduction * 12;
  const annualSavings = annualProduction * electricityRate;
  const years = totalCost / annualSavings;
  const months = Math.ceil(years * 12);
  
  return {
    years: Math.floor(years),
    months: months % 12,
    annualSavings: Math.round(annualSavings),
  };
}

/**
 * حساب البصمة الكربونية
 */
export function calculateCarbonFootprint(
  annualEnergyProduction: number
): {
  co2SavedKg: number;
  treesEquivalent: number;
  carsEquivalent: number;
} {
  // متوسط انبعاثات CO2 للكهرباء: 0.5 kg CO2 per kWh
  const co2SavedKg = annualEnergyProduction * 0.5;
  
  // شجرة متوسطة تمتص 22 kg CO2 سنوياً
  const treesEquivalent = Math.round(co2SavedKg / 22);
  
  // سيارة متوسطة تنبعث 4600 kg CO2 سنوياً
  const carsEquivalent = Math.round((co2SavedKg / 4600) * 100) / 100;
  
  return {
    co2SavedKg: Math.round(co2SavedKg),
    treesEquivalent,
    carsEquivalent,
  };
}
