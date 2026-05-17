import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Video, Plus, Edit, Trash2, ExternalLink, Youtube, Film, ArrowLeft, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

const MODULE_NAMES: Record<number, string> = {
  1: "Modul 1: Immobilien-Grundkurs",
  2: "Modul 2: Makler §34c GewO",
  3: "Modul 3: WEG-Verwalter",
  4: "Modul 4: Gutachter",
  5: "Modul 5: §34i Darlehensvermittler",
};

export default function OwnerVideos() {
  const { toast } = useToast();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<any>(null);
  const [filterModule, setFilterModule] = useState<string>("all");

  const [form, setForm] = useState({
    title: "", description: "", videoUrl: "",
    moduleId: "1", dayNumber: "1", displayOrder: "0", isRequired: false,
  });

  const { data: videos, isLoading, refetch } = trpc.videos.list.useQuery();
  const addMutation = trpc.videos.create.useMutation({
    onSuccess: () => { toast({ title: "✅ Video hinzugefügt" }); refetch(); setIsAddOpen(false); resetForm(); },
    onError: (e) => toast({ title: "❌ Fehler", description: e.message, variant: "destructive" }),
  });
  const updateMutation = trpc.videos.update.useMutation({
    onSuccess: () => { toast({ title: "✅ Video aktualisiert" }); refetch(); setEditingVideo(null); },
    onError: (e) => toast({ title: "❌ Fehler", description: e.message, variant: "destructive" }),
  });
  const deleteMutation = trpc.videos.delete.useMutation({
    onSuccess: () => { toast({ title: "✅ Video gelöscht" }); refetch(); },
    onError: (e) => toast({ title: "❌ Fehler", description: e.message, variant: "destructive" }),
  });

  const resetForm = () => setForm({ title: "", description: "", videoUrl: "", moduleId: "1", dayNumber: "1", displayOrder: "0", isRequired: false });

  const handleSubmit = () => {
    const data = { title: form.title, description: form.description, videoUrl: form.videoUrl, moduleId: parseInt(form.moduleId), dayNumber: parseInt(form.dayNumber), displayOrder: parseInt(form.displayOrder), isRequired: form.isRequired };
    if (editingVideo) {
      updateMutation.mutate({ id: editingVideo.id, ...data });
    } else {
      addMutation.mutate(data);
    }
  };

  const handleEdit = (video: any) => {
    setEditingVideo(video);
    setForm({ title: video.title, description: video.description || "", videoUrl: video.videoUrl, moduleId: String(video.moduleId), dayNumber: String(video.dayNumber), displayOrder: String(video.displayOrder), isRequired: video.isRequired });
    setIsAddOpen(true);
  };

  const filtered = videos?.filter(v => filterModule === "all" || v.moduleId === parseInt(filterModule));
  const grouped = filtered?.reduce((acc: any, v) => {
    const key = MODULE_NAMES[v.moduleId] || `Modul ${v.moduleId}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(v);
    return acc;
  }, {});

  const FormDialog = (
    <Dialog open={isAddOpen} onOpenChange={(o) => { setIsAddOpen(o); if (!o) { setEditingVideo(null); resetForm(); } }}>
      <DialogTrigger asChild>
        <Button style={{background:"#3b82f6",color:"white",gap:8}}>
          <Plus className="h-4 w-4" /> Video hinzufügen
        </Button>
      </DialogTrigger>
      <DialogContent style={{maxWidth:560}}>
        <DialogHeader>
          <DialogTitle>{editingVideo ? "Video bearbeiten" : "Neues Video"}</DialogTitle>
        </DialogHeader>
        <div style={{display:"flex",flexDirection:"column",gap:16,padding:"8px 0"}}>
          <div><Label>Titel *</Label><Input value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="z.B. Grundbuch erklärt" /></div>
          <div><Label>YouTube / Vimeo URL *</Label><Input value={form.videoUrl} onChange={e => setForm({...form, videoUrl: e.target.value})} placeholder="https://youtube.com/watch?v=..." /></div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <div><Label>Modul</Label>
              <Select value={form.moduleId} onValueChange={v => setForm({...form, moduleId: v})}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{[1,2,3,4,5].map(i => <SelectItem key={i} value={String(i)}>Modul {i}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div><Label>Lerntag</Label><Input type="number" min={1} max={240} value={form.dayNumber} onChange={e => setForm({...form, dayNumber: e.target.value})} /></div>
          </div>
          <div><Label>Beschreibung</Label><Textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={3} placeholder="Kurze Beschreibung des Videos..." /></div>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <Switch checked={form.isRequired} onCheckedChange={v => setForm({...form, isRequired: v})} />
            <Label>Pflichtinhalt (Nutzer muss Video ansehen)</Label>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => { setIsAddOpen(false); setEditingVideo(null); resetForm(); }}>Abbrechen</Button>
          <Button onClick={handleSubmit} disabled={!form.title || !form.videoUrl} style={{background:"#3b82f6",color:"white"}}>
            {editingVideo ? "Aktualisieren" : "Hinzufügen"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return (
    <div style={{padding:24,maxWidth:1100,margin:"0 auto"}}>
      {/* Header */}
      <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:24}}>
        <Link href="/owner-dashboard">
          <Button variant="ghost" size="sm" style={{gap:8}}>
            <ArrowLeft className="h-4 w-4" /> Owner-Dashboard
          </Button>
        </Link>
        <div style={{flex:1}}>
          <h1 style={{fontSize:24,fontWeight:700,color:"#0f172a",margin:0,display:"flex",alignItems:"center",gap:10}}>
            <Video className="h-6 w-6" style={{color:"#3b82f6"}} /> Video-Verwaltung
          </h1>
          <p style={{color:"#64748b",fontSize:14,margin:0}}>Lernvideos für alle Module verwalten</p>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8,background:"#f0fdf4",border:"1px solid #bbf7d0",borderRadius:8,padding:"6px 12px"}}>
          <Shield className="h-4 w-4" style={{color:"#16a34a"}} />
          <span style={{fontSize:12,color:"#16a34a",fontWeight:600}}>Owner-Zugang</span>
        </div>
      </div>

      {/* Stats + Actions */}
      <div style={{display:"flex",gap:12,marginBottom:24,flexWrap:"wrap"}}>
        <Card style={{flex:1,minWidth:140}}>
          <CardContent style={{padding:16,textAlign:"center"}}>
            <div style={{fontSize:28,fontWeight:700,color:"#3b82f6"}}>{videos?.length || 0}</div>
            <div style={{fontSize:12,color:"#64748b"}}>Videos gesamt</div>
          </CardContent>
        </Card>
        {[1,2,3,4,5].map(m => (
          <Card key={m} style={{flex:1,minWidth:80}}>
            <CardContent style={{padding:16,textAlign:"center"}}>
              <div style={{fontSize:22,fontWeight:700,color:"#0f172a"}}>{videos?.filter(v => v.moduleId === m).length || 0}</div>
              <div style={{fontSize:11,color:"#64748b"}}>Modul {m}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filter + Add */}
      <div style={{display:"flex",gap:12,marginBottom:20,alignItems:"center"}}>
        <Select value={filterModule} onValueChange={setFilterModule}>
          <SelectTrigger style={{width:220}}>
            <SelectValue placeholder="Alle Module" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alle Module</SelectItem>
            {[1,2,3,4,5].map(i => <SelectItem key={i} value={String(i)}>Modul {i}</SelectItem>)}
          </SelectContent>
        </Select>
        {FormDialog}
      </div>

      {/* Video Liste */}
      {isLoading ? (
        <Card><CardContent style={{padding:32,textAlign:"center",color:"#64748b"}}>Lade Videos...</CardContent></Card>
      ) : !videos?.length ? (
        <Card>
          <CardContent style={{padding:48,textAlign:"center"}}>
            <Video style={{width:48,height:48,color:"#cbd5e1",margin:"0 auto 12px"}} />
            <p style={{color:"#64748b",margin:0}}>Noch keine Videos vorhanden.</p>
            <p style={{color:"#94a3b8",fontSize:13,margin:"4px 0 0"}}>Füge YouTube- oder Vimeo-Links für Lernmodule hinzu.</p>
          </CardContent>
        </Card>
      ) : (
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          {Object.entries(grouped || {}).map(([moduleName, moduleVideos]) => {
            const vids = moduleVideos as any[];
            return (
              <Card key={moduleName}>
                <CardHeader style={{paddingBottom:8}}>
                  <CardTitle style={{fontSize:16}}>{moduleName}</CardTitle>
                  <CardDescription>{vids.length} Video{vids.length !== 1 ? "s" : ""}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Titel</TableHead>
                        <TableHead>Tag</TableHead>
                        <TableHead>Plattform</TableHead>
                        <TableHead>Pflicht</TableHead>
                        <TableHead style={{textAlign:"right"}}>Aktionen</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {vids.map(v => (
                        <TableRow key={v.id}>
                          <TableCell style={{fontWeight:500}}>{v.title}</TableCell>
                          <TableCell>Tag {v.dayNumber}</TableCell>
                          <TableCell>
                            <Badge variant="outline" style={{gap:4,display:"inline-flex",alignItems:"center"}}>
                              {v.platform === "youtube" ? <Youtube style={{width:12,height:12}} /> : <Film style={{width:12,height:12}} />}
                              {v.platform}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {v.isRequired && <Badge variant="destructive" style={{fontSize:11}}>Pflicht</Badge>}
                          </TableCell>
                          <TableCell style={{textAlign:"right"}}>
                            <div style={{display:"flex",justifyContent:"flex-end",gap:4}}>
                              <Button variant="ghost" size="sm" onClick={() => window.open(v.videoUrl, "_blank")}><ExternalLink style={{width:15,height:15}} /></Button>
                              <Button variant="ghost" size="sm" onClick={() => handleEdit(v)}><Edit style={{width:15,height:15}} /></Button>
                              <Button variant="ghost" size="sm" onClick={() => { if (confirm("Video löschen?")) deleteMutation.mutate({ id: v.id }); }}>
                                <Trash2 style={{width:15,height:15,color:"#dc2626"}} />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
