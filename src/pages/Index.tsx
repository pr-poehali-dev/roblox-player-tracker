import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Player {
  username: string;
  status: 'online' | 'offline';
  game: string;
  lastSeen: string;
}

interface Camera {
  id: string;
  location: string;
  status: 'active' | 'inactive';
}

interface ChatMessage {
  admin: string;
  message: string;
  time: string;
}

const players: Player[] = [
  { username: 'simulation', status: 'offline', game: 'N/A', lastSeen: '2 days ago' },
  { username: 'potatosalad63', status: 'online', game: 'Blox Fruits', lastSeen: 'Online now' },
  { username: 'xXDarkGamerXx', status: 'online', game: 'Adopt Me!', lastSeen: 'Online now' },
  { username: 'NoobMaster420', status: 'online', game: 'Brookhaven', lastSeen: 'Online now' },
  { username: 'ProBuilder99', status: 'offline', game: 'N/A', lastSeen: '4 hours ago' },
  { username: 'SkyWalker_YT', status: 'online', game: 'Tower of Hell', lastSeen: 'Online now' }
];

const cameras: Camera[] = [
  { id: 'CAM-001', location: 'Main Lobby', status: 'active' },
  { id: 'CAM-002', location: 'Server Room A', status: 'active' },
  { id: 'CAM-003', location: 'Player Zone B', status: 'inactive' },
  { id: 'CAM-004', location: 'Trade Hub', status: 'active' },
  { id: 'CAM-005', location: 'PvP Arena', status: 'active' },
  { id: 'CAM-006', location: 'Private Server 47', status: 'inactive' }
];

const adminChat: ChatMessage[] = [
  { admin: 'AdminMike', message: 'lmao did you see NoobMaster420 trying to scam people?', time: '10:23 AM' },
  { admin: 'ModSarah', message: 'yeah hahahaha dude got scammed himself', time: '10:24 AM' },
  { admin: 'AdminMike', message: 'potatosalad63 is grinding hard tho, respect', time: '10:26 AM' },
  { admin: 'AdminJake', message: 'simulation still hasn\'t come back online lol', time: '10:28 AM' },
  { admin: 'ModSarah', message: 'probably got banned again haha', time: '10:29 AM' },
  { admin: 'AdminMike', message: 'xXDarkGamerXx is such a tryhard', time: '10:31 AM' },
  { admin: 'AdminJake', message: 'fr fr, kid plays 24/7', time: '10:32 AM' },
  { admin: 'ModSarah', message: 'someone should check CAM-003, it went offline', time: '10:35 AM' },
  { admin: 'AdminMike', message: 'on it', time: '10:36 AM' }
];

export default function Index() {
  const [showCameraDialog, setShowCameraDialog] = useState(false);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDIwIDAgTCAwIDAgMCAyMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <Alert className="mb-6 border-accent bg-accent/10">
          <Icon name="AlertTriangle" className="h-5 w-5 text-accent" />
          <AlertDescription className="text-accent font-mono">
            ⚠️ WARNING: This site is frequently taken down and moves to new domains. Save the link!
          </AlertDescription>
        </Alert>

        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 text-primary" style={{ fontFamily: 'monospace' }}>
            ROBLOX TRACKER
          </h1>
          <p className="text-muted-foreground text-lg mb-2">Real-time player monitoring system</p>
          <Badge variant="destructive" className="animate-pulse">BETA v0.8.3</Badge>
        </div>

        <Tabs defaultValue="players" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="players">
              <Icon name="Users" className="h-4 w-4 mr-2" />
              Players
            </TabsTrigger>
            <TabsTrigger value="cameras">
              <Icon name="Camera" className="h-4 w-4 mr-2" />
              Cameras
            </TabsTrigger>
            <TabsTrigger value="chat">
              <Icon name="MessageSquare" className="h-4 w-4 mr-2" />
              Admin Chat
            </TabsTrigger>
          </TabsList>

          <TabsContent value="players" className="space-y-4">
            <Card className="border-primary/20 bg-card/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Users" className="h-5 w-5" />
                  Tracked Players
                </CardTitle>
                <CardDescription>Live player activity monitoring</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {players.map((player, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-muted hover:border-primary/50 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary/20 text-primary">
                            {player.username.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-semibold font-mono">{player.username}</p>
                            <div className={`h-2 w-2 rounded-full ${player.status === 'online' ? 'bg-secondary animate-pulse' : 'bg-muted-foreground'}`}></div>
                          </div>
                          <p className="text-sm text-muted-foreground">{player.game}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={player.status === 'online' ? 'default' : 'secondary'} className="font-mono text-xs">
                          {player.status.toUpperCase()}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">{player.lastSeen}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cameras" className="space-y-4">
            <Card className="border-primary/20 bg-card/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Camera" className="h-5 w-5" />
                  Security Cameras
                </CardTitle>
                <CardDescription>Server surveillance system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cameras.map((camera, idx) => (
                    <div
                      key={idx}
                      onClick={() => setShowCameraDialog(true)}
                      className="cursor-pointer p-4 rounded-lg bg-muted/30 border border-muted hover:border-accent transition-all"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Icon name="Camera" className="h-5 w-5 text-primary" />
                          <p className="font-semibold font-mono">{camera.id}</p>
                        </div>
                        <Badge variant={camera.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                          {camera.status.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{camera.location}</p>
                      <div className="mt-3 h-24 bg-black/50 rounded flex items-center justify-center">
                        <Icon name="Lock" className="h-8 w-8 text-muted-foreground" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="chat" className="space-y-4">
            <Card className="border-primary/20 bg-card/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="MessageSquare" className="h-5 w-5" />
                  Admin Chat
                </CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-secondary rounded-full animate-pulse"></div>
                  Live conversation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-[500px] overflow-y-auto">
                  {adminChat.map((msg, idx) => (
                    <div key={idx} className="flex gap-3 p-3 rounded-lg bg-muted/30 border border-muted">
                      <Avatar className="h-8 w-8 shrink-0">
                        <AvatarFallback className="bg-accent/20 text-accent text-xs">
                          {msg.admin.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-semibold text-accent">{msg.admin}</span>
                          <span className="text-xs text-muted-foreground">{msg.time}</span>
                        </div>
                        <p className="text-sm">{msg.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-12 text-center text-xs text-muted-foreground font-mono space-y-1">
          <p>CONNECTION: STABLE</p>
          <p>SYSTEM STATUS: OPERATIONAL</p>
          <p className="text-primary">© 2024 RBLX-TRACK v0.8.3</p>
        </div>
      </div>

      <Dialog open={showCameraDialog} onOpenChange={setShowCameraDialog}>
        <DialogContent className="border-destructive">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <Icon name="ShieldAlert" className="h-5 w-5" />
              ACCESS DENIED
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              This feature is restricted to administrators only. You do not have sufficient permissions to view camera feeds.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center py-6">
            <Icon name="Lock" className="h-16 w-16 text-destructive/50" />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
