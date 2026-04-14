import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Sun, 
  Battery, 
  Zap, 
  Cpu, 
  TrendingUp, 
  TreePine, 
  Car,
  DollarSign,
  Clock,
  Leaf
} from 'lucide-react';
import type { SolarCalculationResult, SolarCalculationInput } from '@/types';
import { 
  getEquipmentRecommendations, 
  estimateCost, 
  calculatePaybackPeriod,
  calculateCarbonFootprint 
} from '@/lib/calculator';

interface ResultsCardProps {
  result: SolarCalculationResult | null;
  input: SolarCalculationInput | null;
}

export function ResultsCard({ result, input }: ResultsCardProps) {
  if (!result || !input) {
    return (
      <Card className="border-dashed border-2">
        <CardContent className="p-8 text-center">
          <Sun className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
          <p className="text-muted-foreground">
            أضف الأحمال واضغط على "حساب النظام" لرؤية النتائج
          </p>
        </CardContent>
      </Card>
    );
  }

  const recommendations = getEquipmentRecommendations(result);
  const costs = estimateCost(result, input);
  const monthlyProduction = result.totalDailyEnergy * 30 / 1000; // kWh
  const payback = calculatePaybackPeriod(costs.total, monthlyProduction);
  const carbon = calculateCarbonFootprint(monthlyProduction * 12);

  return (
    <div className="space-y-4">
      {/* ملخص الاستهلاك */}
      <Card className="border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            ملخص الاستهلاك
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-sm text-muted-foreground">إجمالي القدرة</p>
              <p className="text-xl font-bold">{result.totalPower.toLocaleString()} <span className="text-sm font-normal">واط</span></p>
            </div>
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-sm text-muted-foreground">الاستهلاك اليومي</p>
              <p className="text-xl font-bold">{(result.totalDailyEnergy / 1000).toFixed(2)} <span className="text-sm font-normal">كيلواط ساعة</span></p>
            </div>
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-sm text-muted-foreground">الاستهلاك الشهري</p>
              <p className="text-xl font-bold">{(result.totalDailyEnergy * 30 / 1000).toFixed(1)} <span className="text-sm font-normal">كيلواط ساعة</span></p>
            </div>
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-sm text-muted-foreground">الاستهلاك السنوي</p>
              <p className="text-xl font-bold">{(result.totalDailyEnergy * 365 / 1000).toFixed(0)} <span className="text-sm font-normal">كيلواط ساعة</span></p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* الألواح الشمسية */}
      <Card className="border-solar-green-500/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Sun className="w-5 h-5 text-solar-green-600" />
            الألواح الشمسية
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">عدد الألواح</span>
            <Badge variant="secondary" className="text-lg px-3 py-1">
              {result.panelCount} لوح
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">قدرة اللوح الواحد</span>
            <span className="font-medium">{input.panelWattage} واط</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">القدرة الإجمالية</span>
            <span className="font-medium">{result.totalPanelPower.toLocaleString()} واط</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">القدرة الفعلية المطلوبة</span>
            <span className="font-medium">{result.panelArrayPower.toLocaleString()} واط</span>
          </div>
          <Separator />
          <div className="bg-solar-green-50 dark:bg-solar-green-900/20 rounded-lg p-3">
            <p className="text-sm text-solar-green-700 dark:text-solar-green-300">
              <strong>التوصية:</strong> {recommendations.panels.configuration} (توازي × تسلسل)
            </p>
          </div>
        </CardContent>
      </Card>

      {/* الانفرتر */}
      <Card className="border-solar-yellow-500/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Zap className="w-5 h-5 text-solar-yellow-600" />
            الانفرتر (المحول)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">القدرة المطلوبة</span>
            <Badge variant="secondary" className="text-lg px-3 py-1">
              {result.inverterPower.toLocaleString()} واط
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">القدرة الظاهرية</span>
            <span className="font-medium">{result.inverterVA.toLocaleString()} VA</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">الجهد</span>
            <span className="font-medium">{input.systemVoltage} فولت</span>
          </div>
          <Separator />
          <div className="bg-solar-yellow-50 dark:bg-solar-yellow-900/20 rounded-lg p-3">
            <p className="text-sm text-solar-yellow-700 dark:text-solar-yellow-300">
              <strong>التوصية:</strong> انفرتر {recommendations.inverter.recommendedPower.toLocaleString()} واط - {recommendations.inverter.type}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* البطاريات */}
      <Card className="border-blue-500/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Battery className="w-5 h-5 text-blue-600" />
            بنك البطاريات
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">عدد البطاريات</span>
            <Badge variant="secondary" className="text-lg px-3 py-1">
              {result.batteryCount} بطارية
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">سعة البطارية الواحدة</span>
            <span className="font-medium">{input.batteryCapacity} أمبير ساعة</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">جهد البطارية</span>
            <span className="font-medium">{input.batteryVoltage} فولت</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">السعة الكلية</span>
            <span className="font-medium">{result.totalBatteryCapacity} أمبير ساعة</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">طاقة البنك</span>
            <span className="font-medium">{(result.batteryBankEnergy / 1000).toFixed(1)} كيلواط ساعة</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">فترة الاحتياطية</span>
            <span className="font-medium">{input.daysOfAutonomy} يوم</span>
          </div>
          <Separator />
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              <strong>التوصية:</strong> {result.batteryCount / (input.systemVoltage / input.batteryVoltage)} بطارية × {input.systemVoltage / input.batteryVoltage} (توازي × تسلسل)
            </p>
          </div>
        </CardContent>
      </Card>

      {/* منظم الشحن */}
      <Card className="border-purple-500/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Cpu className="w-5 h-5 text-purple-600" />
            منظم الشحن (MPPT)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">التيار المطلوب</span>
            <Badge variant="secondary" className="text-lg px-3 py-1">
              {result.chargeControllerCurrent} أمبير
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">النوع</span>
            <span className="font-medium">MPPT</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">جهد النظام</span>
            <span className="font-medium">{input.systemVoltage} فولت</span>
          </div>
          <Separator />
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
            <p className="text-sm text-purple-700 dark:text-purple-300">
              <strong>التوصية:</strong> منظم MPPT {result.chargeControllerCurrent}A / {input.systemVoltage}V
            </p>
          </div>
        </CardContent>
      </Card>

      {/* التكلفة التقديرية */}
      <Card className="border-orange-500/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-orange-600" />
            التكلفة التقديرية (USD)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">الألواح الشمسية</span>
            <span className="font-medium">${costs.panels.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">الانفرتر</span>
            <span className="font-medium">${costs.inverter.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">البطاريات</span>
            <span className="font-medium">${costs.batteries.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">منظم الشحن</span>
            <span className="font-medium">${costs.chargeController.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">التركيب والأسلاك</span>
            <span className="font-medium">${costs.installation.toLocaleString()}</span>
          </div>
          <Separator />
          <div className="flex items-center justify-between bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3">
            <span className="font-bold text-orange-700 dark:text-orange-300">التكلفة الإجمالية</span>
            <span className="font-bold text-xl text-orange-700 dark:text-orange-300">${costs.total.toLocaleString()}</span>
          </div>
        </CardContent>
      </Card>

      {/* فترة الاسترداد */}
      <Card className="border-green-500/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="w-5 h-5 text-green-600" />
            فترة الاسترداد
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">المدة</span>
            <Badge variant="secondary" className="text-lg px-3 py-1">
              {payback.years} سنة و {payback.months} شهر
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">التوفير السنوي</span>
            <span className="font-medium">${payback.annualSavings.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">الإنتاج السنوي</span>
            <span className="font-medium">{(monthlyProduction * 12).toFixed(0)} كيلواط ساعة</span>
          </div>
        </CardContent>
      </Card>

      {/* البصمة الكربونية */}
      <Card className="border-emerald-500/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Leaf className="w-5 h-5 text-emerald-600" />
            التأثير البيئي (سنوياً)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-full w-14 h-14 mx-auto mb-2 flex items-center justify-center">
                <Leaf className="w-7 h-7 text-emerald-600" />
              </div>
              <p className="text-2xl font-bold text-emerald-600">{carbon.co2SavedKg}</p>
              <p className="text-xs text-muted-foreground">كجم CO2</p>
            </div>
            <div className="text-center">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full w-14 h-14 mx-auto mb-2 flex items-center justify-center">
                <TreePine className="w-7 h-7 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-green-600">{carbon.treesEquivalent}</p>
              <p className="text-xs text-muted-foreground">شجرة</p>
            </div>
            <div className="text-center">
              <div className="p-3 bg-lime-100 dark:bg-lime-900/30 rounded-full w-14 h-14 mx-auto mb-2 flex items-center justify-center">
                <Car className="w-7 h-7 text-lime-600" />
              </div>
              <p className="text-2xl font-bold text-lime-600">{carbon.carsEquivalent}</p>
              <p className="text-xs text-muted-foreground">سيارة</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
