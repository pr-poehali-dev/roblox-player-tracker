import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Icon from '@/components/ui/icon';

interface PlayerActivity {
  timestamp: string;
  action: string;
  game: string;
  location: string;
}

export default function Index() {
  const [username, setUsername] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const [glitchText, setGlitchText] = useState('ROBLOX TRACKER');
  const [activities, setActivities] = useState<PlayerActivity[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const chars = 'ROBLOX TRACKER'.split('');
      const glitched = chars.map(char => 
        Math.random() > 0.9 ? String.fromCharCode(33 + Math.random() * 94) : char
      ).join('');
      setGlitchText(glitched);
      setTimeout(() => setGlitchText('ROBLOX TRACKER'), 50);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isTracking) {
      const interval = setInterval(() => {
        const mockActivities: PlayerActivity[] = [
          {
            timestamp: new Date().toLocaleTimeString(),
            action: Math.random() > 0.5 ? 'JOINED GAME' : 'LEFT GAME',
            game: ['Adopt Me!', 'Brookhaven', 'Tower of Hell', 'Blox Fruits'][Math.floor(Math.random() * 4)],
            location: `Server ${Math.floor(Math.random() * 999)}`
          }
        ];
        setActivities(prev => [...mockActivities, ...prev].slice(0, 10));
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isTracking]);

  const handleTrack = () => {
    if (username.trim()) {
      setIsTracking(true);
      setActivities([{
        timestamp: new Date().toLocaleTimeString(),
        action: 'TRACKING STARTED',
        game: 'System',
        location: 'Initializing...'
      }]);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-scan"></div>
      </div>

      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDIwIDAgTCAwIDAgMCAyMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <Alert className="mb-6 border-accent bg-accent/10 animate-flicker">
          <Icon name="AlertTriangle" className="h-5 w-5 text-accent" />
          <AlertDescription className="text-accent font-mono">
            ⚠️ ВНИМАНИЕ: Этот сайт часто блокируется и переезжает на новые домены. Сохраните ссылку!
          </AlertDescription>
        </Alert>

        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 text-primary animate-glitch" style={{ fontFamily: 'monospace' }}>
            {glitchText}
          </h1>
          <p className="text-muted-foreground text-lg mb-2">Система мониторинга активности игроков в реальном времени</p>
          <Badge variant="destructive" className="animate-pulse">BETA v0.8.3</Badge>
        </div>

        <Card className="mb-8 border-primary/20 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Info" className="h-5 w-5" />
              Что такое Roblox Tracker?
            </CardTitle>
            <CardDescription>Система отслеживания игровой активности</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">
              <span className="text-primary font-bold">Roblox Tracker</span> — это инструмент для мониторинга активности любого игрока в Roblox. 
              Наша система позволяет видеть:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>В какие игры заходит пользователь</li>
              <li>Время входа и выхода из игр</li>
              <li>На каких серверах играет</li>
              <li>Активность в реальном времени</li>
            </ul>
            <div className="flex items-start gap-2 p-3 bg-secondary/20 rounded border border-secondary">
              <Icon name="Shield" className="h-5 w-5 text-secondary mt-0.5" />
              <p className="text-xs text-secondary">
                Данные собираются через публичные API. Мы не храним персональную информацию.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/30 bg-card/80 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Search" className="h-5 w-5" />
              Начать отслеживание
            </CardTitle>
            <CardDescription className="font-mono text-xs">
              {isTracking ? '●ㅤCONNECTED' : '○ㅤDISCONNECTED'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Введите username игрока..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isTracking}
                className="font-mono"
              />
              <Button 
                onClick={handleTrack} 
                disabled={isTracking || !username.trim()}
                className="min-w-[120px]"
              >
                {isTracking ? (
                  <>
                    <Icon name="Loader2" className="h-4 w-4 mr-2 animate-spin" />
                    Идёт сбор...
                  </>
                ) : (
                  <>
                    <Icon name="Play" className="h-4 w-4 mr-2" />
                    Начать
                  </>
                )}
              </Button>
            </div>

            {isTracking && (
              <Button 
                variant="destructive" 
                onClick={() => {
                  setIsTracking(false);
                  setActivities([]);
                  setUsername('');
                }}
                className="w-full"
              >
                <Icon name="StopCircle" className="h-4 w-4 mr-2" />
                Остановить мониторинг
              </Button>
            )}
          </CardContent>
        </Card>

        {isTracking && (
          <Card className="mt-6 border-secondary/30 bg-card/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Activity" className="h-5 w-5 text-secondary animate-pulse" />
                Активность игрока: {username}
              </CardTitle>
              <CardDescription className="font-mono text-xs">Обновление каждые 2 сек</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {activities.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Icon name="Loader2" className="h-8 w-8 mx-auto mb-2 animate-spin" />
                    <p className="text-sm">Загрузка данных...</p>
                  </div>
                ) : (
                  activities.map((activity, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded bg-muted/30 border border-muted hover:border-secondary/50 transition-all animate-fade-in"
                      style={{ animationDelay: `${idx * 0.05}s` }}
                    >
                      <div className="flex items-center gap-3">
                        <Badge 
                          variant={activity.action.includes('JOINED') ? 'default' : activity.action.includes('LEFT') ? 'secondary' : 'outline'}
                          className="font-mono text-xs"
                        >
                          {activity.action}
                        </Badge>
                        <div>
                          <p className="text-sm font-semibold">{activity.game}</p>
                          <p className="text-xs text-muted-foreground">{activity.location}</p>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground font-mono">{activity.timestamp}</span>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="mt-12 text-center text-xs text-muted-foreground font-mono space-y-1">
          <p className="animate-flicker">CONNECTION: UNSTABLE</p>
          <p>SYSTEM STATUS: {Math.random() > 0.5 ? 'OPERATIONAL' : 'DEGRADED'}</p>
          <p className="text-primary">© 2024 RBLX-TRACK v0.8.3</p>
        </div>
      </div>
    </div>
  );
}
