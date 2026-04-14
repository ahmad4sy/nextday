import { SolarCalculator } from '@/components/SolarCalculator';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { Sun, Moon, Calculator, Github, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/theme-provider';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </Button>
  );
}

function InfoDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Info className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            عن حاسبة الطاقة الشمسية
          </DialogTitle>
          <DialogDescription>
            معلومات عن المعايير والمعادلات المستخدمة في الحسابات
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 text-sm">
          <div>
            <h4 className="font-semibold mb-2">المعايير الدولية المستخدمة</h4>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>IEC 61215 - معايير الألواح الشمسية البلورية</li>
              <li>IEC 61646 - معايير الألواح الشمسية الرقيقة</li>
              <li>IEEE 1547 - معايير توصيل الأنظمة الموزعة</li>
              <li>NEC Article 690 - نظام الطاقة الشمسية الكهروضوئية</li>
              <li>ASHRAE - معايير التبريد والتكييف</li>
            </ul>
          </div>

          <Separator />

          <div>
            <h4 className="font-semibold mb-2">معادلات الحساب</h4>
            
            <div className="space-y-3">
              <div>
                <p className="font-medium">1. حساب عدد الألواح الشمسية:</p>
                <code className="block bg-muted p-2 rounded text-xs mt-1">
                  Energy Needed = Daily Energy / (Inverter Eff × Charge Controller Eff)<br/>
                  Panel Power = Energy Needed / Peak Sun Hours<br/>
                  Actual Power = Panel Power / Loss Factor<br/>
                  Panel Count = ceil(Actual Power / Panel Wattage)
                </code>
              </div>

              <div>
                <p className="font-medium">2. حساب قدرة الانفرتر:</p>
                <code className="block bg-muted p-2 rounded text-xs mt-1">
                  Simultaneous Load = Total Power × 0.7 (Demand Factor)<br/>
                  Inverter Power = Simultaneous Load / Inverter Efficiency<br/>
                  Recommended = Peak Load × 1.25 (Safety Factor)
                </code>
              </div>

              <div>
                <p className="font-medium">3. حساب عدد البطاريات:</p>
                <code className="block bg-muted p-2 rounded text-xs mt-1">
                  Battery Energy = Daily Energy × Days of Autonomy<br/>
                  Usable Energy = Battery Energy / Depth of Discharge<br/>
                  Total Capacity = Usable Energy / System Voltage<br/>
                  Battery Count = ceil(Total Capacity / Battery Capacity)
                </code>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="font-semibold mb-2">معاملات الخسارة الافتراضية</h4>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>معامل درجة الحرارة: 88% (فقد 12% بسبب الحرارة)</li>
              <li>معامل الغبار: 95% (فقد 5% بسبب الاتساخ)</li>
              <li>معامل التقادم: 95% (فقد 5% مع مرور الوقت)</li>
              <li>معامل الأسلاك: 98% (فقد 2% في الأسلاك)</li>
              <li>كفاءة الانفرتر: 95%</li>
              <li>كفاءة منظم الشحن MPPT: 98%</li>
            </ul>
          </div>

          <Separator />

          <div>
            <h4 className="font-semibold mb-2">ملاحظات هامة</h4>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>الحسابات تقديرية وقد تختلف حسب الظروف الفعلية</li>
              <li>يُنصح باستشارة مهندس متخصص قبل التنفيذ</li>
              <li>التكاليف تقديرية وقد تتغير حسب السوق والموقع</li>
              <li>ساعات الذروة الشمسية تختلف حسب الموسم والموقع</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="solar-calculator-theme">
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-lg">
                <Sun className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">حاسبة الطاقة الشمسية</h1>
                <p className="text-xs text-muted-foreground hidden sm:block">Solar System Calculator</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <InfoDialog />
              <ThemeToggle />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="text-gradient">حاسبة احترافية</span> لأنظمة الطاقة الشمسية
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                احسب احتياجاتك من الألواح الشمسية والانفرتر والبطاريات بدقة عالية وفق المعايير الدولية
              </p>
            </div>

            {/* Calculator */}
            <SolarCalculator />

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="text-center p-6 bg-card rounded-xl border border-border/50">
                <div className="p-3 bg-solar-green-100 dark:bg-solar-green-900/30 rounded-full w-14 h-14 mx-auto mb-4 flex items-center justify-center">
                  <Sun className="w-7 h-7 text-solar-green-600" />
                </div>
                <h3 className="font-semibold mb-2">حساب دقيق للألواح</h3>
                <p className="text-sm text-muted-foreground">
                  حساب عدد الألواح المطلوبة مع مراعاة جميع معاملات الخسارة
                </p>
              </div>

              <div className="text-center p-6 bg-card rounded-xl border border-border/50">
                <div className="p-3 bg-solar-yellow-100 dark:bg-solar-yellow-900/30 rounded-full w-14 h-14 mx-auto mb-4 flex items-center justify-center">
                  <Calculator className="w-7 h-7 text-solar-yellow-600" />
                </div>
                <h3 className="font-semibold mb-2">تصميم شامل</h3>
                <p className="text-sm text-muted-foreground">
                  حساب الانفرتر والبطاريات ومنظم الشحن بشكل متكامل
                </p>
              </div>

              <div className="text-center p-6 bg-card rounded-xl border border-border/50">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full w-14 h-14 mx-auto mb-4 flex items-center justify-center">
                  <Github className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">معايير دولية</h3>
                <p className="text-sm text-muted-foreground">
                  الحسابات مبنية على معايير IEC و IEEE و NEC العالمية
                </p>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t mt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <p className="text-muted-foreground text-sm">
                حاسبة الطاقة الشمسية - {new Date().getFullYear()}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                تم التطوير باستخدام React + TypeScript + Tailwind CSS
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                المعايير المستخدمة: IEC 61215 | IEEE 1547 | NEC Article 690
              </p>
            </div>
          </div>
        </footer>
      </div>
      <Toaster position="top-center" richColors />
    </ThemeProvider>
  );
}

export default App;
