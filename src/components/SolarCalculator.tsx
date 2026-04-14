import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Calculator, 
  Sun, 
  MapPin, 
  Settings2, 
  Battery, 
  Zap,
  RotateCcw,
  Info
} from 'lucide-react';
import { LoadManager } from './LoadManager';
import { ResultsCard } from './ResultsCard';
import type { SolarCalculationInput, LoadItem } from '@/types';
import { DEFAULT_VALUES, COMMON_LOCATIONS } from '@/types';
import { calculateSolarSystem } from '@/lib/calculator';
import { toast } from 'sonner';

export function SolarCalculator() {
  // حالة الأحمال
  const [loads, setLoads] = useState<LoadItem[]>([]);
  
  // حالة الموقع
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [customPeakSunHours, setCustomPeakSunHours] = useState(DEFAULT_VALUES.peakSunHours);
  
  // حالة خيارات النظام
  const [systemVoltage, setSystemVoltage] = useState<number>(DEFAULT_VALUES.systemVoltage);
  const [daysOfAutonomy, setDaysOfAutonomy] = useState(DEFAULT_VALUES.daysOfAutonomy);
  const [depthOfDischarge, setDepthOfDischarge] = useState(DEFAULT_VALUES.depthOfDischarge * 100);
  
  // حالة المعدات
  const [panelWattage, setPanelWattage] = useState(DEFAULT_VALUES.panelWattage);
  const [batteryCapacity, setBatteryCapacity] = useState(DEFAULT_VALUES.batteryCapacity);
  const [batteryVoltage, setBatteryVoltage] = useState(DEFAULT_VALUES.batteryVoltage);
  
  // حالة المعاملات المتقدمة
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [inverterEfficiency, setInverterEfficiency] = useState(DEFAULT_VALUES.inverterEfficiency * 100);
  const [chargeControllerEfficiency, setChargeControllerEfficiency] = useState(DEFAULT_VALUES.chargeControllerEfficiency * 100);
  const [temperatureFactor, setTemperatureFactor] = useState(DEFAULT_VALUES.temperatureFactor * 100);
  const [dustFactor, setDustFactor] = useState(DEFAULT_VALUES.dustFactor * 100);
  const [agingFactor, setAgingFactor] = useState(DEFAULT_VALUES.agingFactor * 100);
  const [wiringFactor, setWiringFactor] = useState(DEFAULT_VALUES.wiringFactor * 100);
  
  // حالة النتائج
  const [result, setResult] = useState<ReturnType<typeof calculateSolarSystem> | null>(null);
  const [inputData, setInputData] = useState<SolarCalculationInput | null>(null);

  const handleLocationChange = (value: string) => {
    setSelectedLocation(value);
    if (value === 'custom') {
      setCustomPeakSunHours(5);
    } else {
      const location = COMMON_LOCATIONS.find(l => l.name === value);
      if (location) {
        setCustomPeakSunHours(location.peakSunHours);
      }
    }
  };

  const handleCalculate = () => {
    if (loads.length === 0) {
      toast.error('الرجاء إضافة أحمال أولاً');
      return;
    }

    const input: SolarCalculationInput = {
      loads,
      peakSunHours: customPeakSunHours,
      systemVoltage: systemVoltage as 12 | 24 | 48,
      daysOfAutonomy,
      depthOfDischarge: depthOfDischarge / 100,
      panelWattage,
      batteryCapacity,
      batteryVoltage,
      inverterEfficiency: inverterEfficiency / 100,
      chargeControllerEfficiency: chargeControllerEfficiency / 100,
      temperatureFactor: temperatureFactor / 100,
      dustFactor: dustFactor / 100,
      agingFactor: agingFactor / 100,
      wiringFactor: wiringFactor / 100,
    };

    const calculationResult = calculateSolarSystem(input);
    setResult(calculationResult);
    setInputData(input);
    
    toast.success('تم حساب النظام بنجاح!');
  };

  const handleReset = () => {
    setLoads([]);
    setSelectedLocation('');
    setCustomPeakSunHours(DEFAULT_VALUES.peakSunHours);
    setSystemVoltage(DEFAULT_VALUES.systemVoltage);
    setDaysOfAutonomy(DEFAULT_VALUES.daysOfAutonomy);
    setDepthOfDischarge(DEFAULT_VALUES.depthOfDischarge * 100);
    setPanelWattage(DEFAULT_VALUES.panelWattage);
    setBatteryCapacity(DEFAULT_VALUES.batteryCapacity);
    setBatteryVoltage(DEFAULT_VALUES.batteryVoltage);
    setInverterEfficiency(DEFAULT_VALUES.inverterEfficiency * 100);
    setChargeControllerEfficiency(DEFAULT_VALUES.chargeControllerEfficiency * 100);
    setTemperatureFactor(DEFAULT_VALUES.temperatureFactor * 100);
    setDustFactor(DEFAULT_VALUES.dustFactor * 100);
    setAgingFactor(DEFAULT_VALUES.agingFactor * 100);
    setWiringFactor(DEFAULT_VALUES.wiringFactor * 100);
    setResult(null);
    setInputData(null);
    toast.info('تم إعادة تعيين جميع القيم');
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="loads" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="loads" className="gap-2">
            <Zap className="w-4 h-4" />
            الأحمال
          </TabsTrigger>
          <TabsTrigger value="location" className="gap-2">
            <MapPin className="w-4 h-4" />
            الموقع
          </TabsTrigger>
          <TabsTrigger value="equipment" className="gap-2">
            <Battery className="w-4 h-4" />
            المعدات
          </TabsTrigger>
          <TabsTrigger value="advanced" className="gap-2">
            <Settings2 className="w-4 h-4" />
            متقدم
          </TabsTrigger>
        </TabsList>

        {/* تبويب الأحمال */}
        <TabsContent value="loads" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                إدارة الأحمال الكهربائية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <LoadManager loads={loads} onLoadsChange={setLoads} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* تبويب الموقع */}
        <TabsContent value="location" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                بيانات الموقع الجغرافي
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>اختر المدينة</Label>
                <Select value={selectedLocation} onValueChange={handleLocationChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر مدينة..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="custom">إدخال يدوي</SelectItem>
                    {COMMON_LOCATIONS.map((location) => (
                      <SelectItem key={location.name} value={location.name}>
                        {location.name} - {location.country} ({location.peakSunHours} ساعة)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>ساعات الذروة الشمسية (PSH)</Label>
                  <Badge variant="secondary">{customPeakSunHours} ساعة</Badge>
                </div>
                <Slider
                  value={[customPeakSunHours]}
                  onValueChange={(value) => setCustomPeakSunHours(value[0])}
                  min={3}
                  max={8}
                  step={0.1}
                />
                <p className="text-sm text-muted-foreground">
                  ساعات الذروة الشمسية هي متوسط ساعات الإشعاع الشمسي المكافئ لـ 1000 واط/م² يومياً
                </p>
              </div>

              {selectedLocation && selectedLocation !== 'custom' && (
                <div className="bg-muted/50 rounded-lg p-4">
                  {(() => {
                    const location = COMMON_LOCATIONS.find(l => l.name === selectedLocation);
                    return location ? (
                      <div className="space-y-2">
                        <p><strong>المدينة:</strong> {location.name}</p>
                        <p><strong>الدولة:</strong> {location.country}</p>
                        <p><strong>خط العرض:</strong> {location.latitude}°</p>
                        <p><strong>خط الطول:</strong> {location.longitude}°</p>
                        <p><strong>ساعات الذروة:</strong> {location.peakSunHours} ساعة/يوم</p>
                      </div>
                    ) : null;
                  })()}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* تبويب المعدات */}
        <TabsContent value="equipment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Battery className="w-5 h-5 text-primary" />
                مواصفات المعدات
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* الألواح الشمسية */}
              <div className="space-y-4">
                <h4 className="font-semibold flex items-center gap-2">
                  <Sun className="w-4 h-4 text-solar-green-600" />
                  الألواح الشمسية
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>قدرة اللوح الواحد</Label>
                    <Badge variant="secondary">{panelWattage} واط</Badge>
                  </div>
                  <Slider
                    value={[panelWattage]}
                    onValueChange={(value) => setPanelWattage(value[0])}
                    min={100}
                    max={700}
                    step={10}
                  />
                  <div className="flex gap-2 flex-wrap">
                    {[300, 400, 450, 500, 550, 600, 650].map((w) => (
                      <Button
                        key={w}
                        variant={panelWattage === w ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setPanelWattage(w)}
                      >
                        {w}W
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <Separator />

              {/* البطاريات */}
              <div className="space-y-4">
                <h4 className="font-semibold flex items-center gap-2">
                  <Battery className="w-4 h-4 text-blue-600" />
                  البطاريات
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>سعة البطارية</Label>
                    <Select 
                      value={batteryCapacity.toString()} 
                      onValueChange={(v) => setBatteryCapacity(parseInt(v))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[100, 150, 200, 250, 300].map((cap) => (
                          <SelectItem key={cap} value={cap.toString()}>
                            {cap} أمبير ساعة
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>جهد البطارية</Label>
                    <Select 
                      value={batteryVoltage.toString()} 
                      onValueChange={(v) => setBatteryVoltage(parseInt(v))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[12, 24].map((v) => (
                          <SelectItem key={v} value={v.toString()}>
                            {v} فولت
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              {/* جهد النظام */}
              <div className="space-y-4">
                <h4 className="font-semibold flex items-center gap-2">
                  <Zap className="w-4 h-4 text-solar-yellow-600" />
                  جهد النظام
                </h4>
                <div className="space-y-2">
                  <Label>جهد النظام الكهربائي</Label>
                  <div className="flex gap-2">
                    {[12, 24, 48].map((v) => (
                      <Button
                        key={v}
                        variant={systemVoltage === v ? 'default' : 'outline'}
                        className="flex-1"
                        onClick={() => setSystemVoltage(v)}
                      >
                        {v} فولت
                      </Button>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {systemVoltage === 12 && 'مناسب للأنظمة الصغيرة (< 1000 واط)'}
                    {systemVoltage === 24 && 'مناسب للأنظمة المتوسطة (1000-3000 واط)'}
                    {systemVoltage === 48 && 'مناسب للأنظمة الكبيرة (> 3000 واط)'}
                  </p>
                </div>
              </div>

              <Separator />

              {/* أيام الاستقلالية */}
              <div className="space-y-4">
                <h4 className="font-semibold">فترة الاحتياطية</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>أيام الاستقلالية (بدون شمس)</Label>
                    <Badge variant="secondary">{daysOfAutonomy} يوم</Badge>
                  </div>
                  <Slider
                    value={[daysOfAutonomy]}
                    onValueChange={(value) => setDaysOfAutonomy(value[0])}
                    min={1}
                    max={5}
                    step={1}
                  />
                  <p className="text-sm text-muted-foreground">
                    عدد الأيام التي يجب أن يعمل النظام بدون إشعاع شمسي
                  </p>
                </div>
              </div>

              <Separator />

              {/* عمق التفريغ */}
              <div className="space-y-4">
                <h4 className="font-semibold">عمق تفريغ البطارية</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>نسبة التفريغ المسموح بها</Label>
                    <Badge variant="secondary">{depthOfDischarge}%</Badge>
                  </div>
                  <Slider
                    value={[depthOfDischarge]}
                    onValueChange={(value) => setDepthOfDischarge(value[0])}
                    min={30}
                    max={80}
                    step={5}
                  />
                  <p className="text-sm text-muted-foreground">
                    نسبة السعة المسموح باستخدامها قبل إعادة الشحن (50% موصى به لبطاريات الرصاص)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* تبويب متقدم */}
        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings2 className="w-5 h-5 text-primary" />
                إعدادات متقدمة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">عرض الإعدادات المتقدمة</Label>
                  <p className="text-sm text-muted-foreground">تعديل معاملات الكفاءة والخسارة</p>
                </div>
                <Switch checked={showAdvanced} onCheckedChange={setShowAdvanced} />
              </div>

              {showAdvanced && (
                <div className="space-y-6">
                  <Separator />
                  
                  {/* كفاءة الانفرتر */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>كفاءة الانفرتر</Label>
                      <Badge variant="secondary">{inverterEfficiency}%</Badge>
                    </div>
                    <Slider
                      value={[inverterEfficiency]}
                      onValueChange={(value) => setInverterEfficiency(value[0])}
                      min={85}
                      max={98}
                      step={1}
                    />
                  </div>

                  {/* كفاءة منظم الشحن */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>كفاءة منظم الشحن (MPPT)</Label>
                      <Badge variant="secondary">{chargeControllerEfficiency}%</Badge>
                    </div>
                    <Slider
                      value={[chargeControllerEfficiency]}
                      onValueChange={(value) => setChargeControllerEfficiency(value[0])}
                      min={95}
                      max={99}
                      step={1}
                    />
                  </div>

                  {/* معامل درجة الحرارة */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>معامل درجة الحرارة</Label>
                      <Badge variant="secondary">{temperatureFactor}%</Badge>
                    </div>
                    <Slider
                      value={[temperatureFactor]}
                      onValueChange={(value) => setTemperatureFactor(value[0])}
                      min={80}
                      max={95}
                      step={1}
                    />
                    <p className="text-sm text-muted-foreground">
                      تأثير ارتفاع درجة الحرارة على كفاءة الألواح
                    </p>
                  </div>

                  {/* معامل الغبار */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>معامل الغبار والاتساخ</Label>
                      <Badge variant="secondary">{dustFactor}%</Badge>
                    </div>
                    <Slider
                      value={[dustFactor]}
                      onValueChange={(value) => setDustFactor(value[0])}
                      min={85}
                      max={98}
                      step={1}
                    />
                  </div>

                  {/* معامل التقادم */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>معامل تقادم الألواح</Label>
                      <Badge variant="secondary">{agingFactor}%</Badge>
                    </div>
                    <Slider
                      value={[agingFactor]}
                      onValueChange={(value) => setAgingFactor(value[0])}
                      min={85}
                      max={98}
                      step={1}
                    />
                    <p className="text-sm text-muted-foreground">
                      فقد الكفاءة مع مرور الوقت (تقادم الألواح)
                    </p>
                  </div>

                  {/* معامل الأسلاك */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>معامل فقد الأسلاك</Label>
                      <Badge variant="secondary">{wiringFactor}%</Badge>
                    </div>
                    <Slider
                      value={[wiringFactor]}
                      onValueChange={(value) => setWiringFactor(value[0])}
                      min={95}
                      max={99}
                      step={1}
                    />
                  </div>

                  <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                      <Info className="w-5 h-5 text-amber-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-amber-800 dark:text-amber-200">تنبيه</p>
                        <p className="text-sm text-amber-700 dark:text-amber-300">
                          تعديل هذه القيم يؤثر بشكل مباشر على دقة الحسابات. يُنصح بالاحتفاظ بالقيم الافتراضية إلا إذا كنت على دراية بالمعايير الفنية.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* أزرار التحكم */}
      <div className="flex gap-4">
        <Button 
          onClick={handleCalculate} 
          className="flex-1 gap-2"
          size="lg"
          disabled={loads.length === 0}
        >
          <Calculator className="w-5 h-5" />
          حساب النظام
        </Button>
        <Button 
          onClick={handleReset} 
          variant="outline"
          size="lg"
        >
          <RotateCcw className="w-5 h-5" />
        إعادة تعيين
        </Button>
      </div>

      {/* النتائج */}
      <ResultsCard result={result} input={inputData} />
    </div>
  );
}
