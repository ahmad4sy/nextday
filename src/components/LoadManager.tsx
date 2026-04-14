import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, Lightbulb, Zap, Fan, Tv, Refrigerator, Wind, Droplets, Computer, Wifi } from 'lucide-react';
import type { LoadItem } from '@/types';
import { COMMON_LOADS } from '@/types';

interface LoadManagerProps {
  loads: LoadItem[];
  onLoadsChange: (loads: LoadItem[]) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  'مصباح': <Lightbulb className="w-4 h-4" />,
  'تلفزيون': <Tv className="w-4 h-4" />,
  'ثلاجة': <Refrigerator className="w-4 h-4" />,
  'فريزر': <Refrigerator className="w-4 h-4" />,
  'مكيف': <Wind className="w-4 h-4" />,
  'مروحة': <Fan className="w-4 h-4" />,
  'حاسوب': <Computer className="w-4 h-4" />,
  'شاحن': <Zap className="w-4 h-4" />,
  'غسالة': <Droplets className="w-4 h-4" />,
  'سخان': <Zap className="w-4 h-4" />,
  'مضخة': <Droplets className="w-4 h-4" />,
  'راوتر': <Wifi className="w-4 h-4" />,
};

function getIconForLoad(name: string): React.ReactNode {
  for (const [key, icon] of Object.entries(iconMap)) {
    if (name.includes(key)) return icon;
  }
  return <Zap className="w-4 h-4" />;
}

export function LoadManager({ loads, onLoadsChange }: LoadManagerProps) {
  const [selectedLoad, setSelectedLoad] = useState<string>('');
  const [customName, setCustomName] = useState('');
  const [customPower, setCustomPower] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [hours, setHours] = useState('4');

  const addLoad = () => {
    let name = customName;
    let power = parseFloat(customPower);

    if (selectedLoad) {
      const commonLoad = COMMON_LOADS.find(l => l.name === selectedLoad);
      if (commonLoad) {
        name = commonLoad.name;
        power = commonLoad.power;
      }
    }

    if (!name || !power || power <= 0) return;

    const newLoad: LoadItem = {
      id: Date.now().toString(),
      name,
      power,
      quantity: parseInt(quantity) || 1,
      hoursPerDay: parseFloat(hours) || 0,
    };

    onLoadsChange([...loads, newLoad]);
    
    // Reset form
    setSelectedLoad('');
    setCustomName('');
    setCustomPower('');
    setQuantity('1');
    setHours('4');
  };

  const removeLoad = (id: string) => {
    onLoadsChange(loads.filter(l => l.id !== id));
  };

  const totalDailyEnergy = loads.reduce((sum, load) => 
    sum + (load.power * load.quantity * load.hoursPerDay), 0
  );

  const totalPower = loads.reduce((sum, load) => 
    sum + (load.power * load.quantity), 0
  );

  return (
    <div className="space-y-4">
      {/* إضافة حمل جديد */}
      <Card className="border border-border/50">
        <CardContent className="p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>اختر جهاز شائع</Label>
              <Select value={selectedLoad} onValueChange={setSelectedLoad}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر جهاز..." />
                </SelectTrigger>
                <SelectContent>
                  {COMMON_LOADS.map((load) => (
                    <SelectItem key={load.name} value={load.name}>
                      {load.name} ({load.power}W)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>أو أدخل اسم مخصص</Label>
              <Input
                placeholder="اسم الجهاز"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>القدرة (واط)</Label>
              <Input
                type="number"
                placeholder="مثال: 100"
                value={customPower}
                onChange={(e) => setCustomPower(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label>الكمية</Label>
              <Input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label>ساعات التشغيل/اليوم</Label>
              <Input
                type="number"
                min="0"
                max="24"
                step="0.5"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
              />
            </div>
          </div>

          <Button 
            onClick={addLoad} 
            className="w-full"
            disabled={(!selectedLoad && (!customName || !customPower))}
          >
            <Plus className="w-4 h-4 ml-2" />
            إضافة جهاز
          </Button>
        </CardContent>
      </Card>

      {/* قائمة الأحمال */}
      {loads.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-semibold text-sm text-muted-foreground">الأجهزة المضافة</h4>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {loads.map((load) => (
              <Card key={load.id} className="border border-border/30 hover:border-primary/30 transition-colors">
                <CardContent className="p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      {getIconForLoad(load.name)}
                    </div>
                    <div>
                      <p className="font-medium">{load.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {load.power}W × {load.quantity} = {load.power * load.quantity}W
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {load.hoursPerDay} ساعة/يوم = {(load.power * load.quantity * load.hoursPerDay / 1000).toFixed(2)} كيلواط ساعة
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeLoad(load.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* ملخص */}
      {loads.length > 0 && (
        <Card className="bg-gradient-solar border-primary/20">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">إجمالي القدرة</p>
                <p className="text-2xl font-bold text-primary">{totalPower.toLocaleString()} <span className="text-sm">واط</span></p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">الاستهلاك اليومي</p>
                <p className="text-2xl font-bold text-secondary">{(totalDailyEnergy / 1000).toFixed(2)} <span className="text-sm">كيلواط ساعة</span></p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
