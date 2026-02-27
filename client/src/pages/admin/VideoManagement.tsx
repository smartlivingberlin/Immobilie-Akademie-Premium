import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Video, Plus, Edit, Trash2, ExternalLink, Youtube, Film } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function VideoManagement() {
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<any>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    videoUrl: "",
    moduleId: "1",
    dayNumber: "1",
    displayOrder: "0",
    isRequired: false,
    durationSeconds: "",
  });

  // Get all videos
  const { data: videos, isLoading, refetch } = trpc.videos.list.useQuery();

  // Mutations
  const createMutation = trpc.videos.create.useMutation({
    onSuccess: () => {
      toast({
        title: "Video hinzugefügt",
        description: "Das Video wurde erfolgreich hinzugefügt.",
      });
      refetch();
      setIsAddDialogOpen(false);
      resetForm();
    },
    onError: (error) => {
      toast({
        title: "Fehler",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateMutation = trpc.videos.update.useMutation({
    onSuccess: () => {
      toast({
        title: "Video aktualisiert",
        description: "Das Video wurde erfolgreich aktualisiert.",
      });
      refetch();
      setEditingVideo(null);
      resetForm();
    },
    onError: (error) => {
      toast({
        title: "Fehler",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteMutation = trpc.videos.delete.useMutation({
    onSuccess: () => {
      toast({
        title: "Video gelöscht",
        description: "Das Video wurde erfolgreich gelöscht.",
      });
      refetch();
    },
    onError: (error) => {
      toast({
        title: "Fehler",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      videoUrl: "",
      moduleId: "1",
      dayNumber: "1",
      displayOrder: "0",
      isRequired: false,
      durationSeconds: "",
    });
  };

  const handleSubmit = () => {
    const data = {
      title: formData.title,
      description: formData.description || undefined,
      videoUrl: formData.videoUrl,
      moduleId: parseInt(formData.moduleId),
      dayNumber: parseInt(formData.dayNumber),
      displayOrder: parseInt(formData.displayOrder),
      isRequired: formData.isRequired,
      durationSeconds: formData.durationSeconds ? parseInt(formData.durationSeconds) : undefined,
    };

    if (editingVideo) {
      updateMutation.mutate({ id: editingVideo.id, ...data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (video: any) => {
    setEditingVideo(video);
    setFormData({
      title: video.title,
      description: video.description || "",
      videoUrl: video.videoUrl,
      moduleId: video.moduleId.toString(),
      dayNumber: video.dayNumber.toString(),
      displayOrder: video.displayOrder.toString(),
      isRequired: video.isRequired,
      durationSeconds: video.durationSeconds?.toString() || "",
    });
  };

  const handleDelete = (id: number) => {
    if (confirm("Möchten Sie dieses Video wirklich löschen?")) {
      deleteMutation.mutate({ id });
    }
  };

  // Group videos by module
  const videosByModule = videos?.reduce((acc, video) => {
    const key = `Modul ${video.moduleId}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(video);
    return acc;
  }, {} as Record<string, typeof videos>);

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Video-Verwaltung</h1>
          <p className="text-slate-600 mt-2">
            Verwalten Sie Video-Tutorials für alle Module und Tage
          </p>
        </div>
        <Dialog open={isAddDialogOpen || !!editingVideo} onOpenChange={(open) => {
          if (!open) {
            setIsAddDialogOpen(false);
            setEditingVideo(null);
            resetForm();
          }
        }}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Video hinzufügen
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingVideo ? "Video bearbeiten" : "Neues Video hinzufügen"}
              </DialogTitle>
              <DialogDescription>
                Fügen Sie ein YouTube- oder Vimeo-Video hinzu
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Titel *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="z.B. Einführung in die Maklertätigkeit"
                />
              </div>
              <div>
                <Label htmlFor="videoUrl">Video-URL * (YouTube oder Vimeo)</Label>
                <Input
                  id="videoUrl"
                  value={formData.videoUrl}
                  onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                  placeholder="https://www.youtube.com/watch?v=..."
                />
              </div>
              <div>
                <Label htmlFor="description">Beschreibung</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Kurze Beschreibung des Videos"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="moduleId">Modul *</Label>
                  <Select value={formData.moduleId} onValueChange={(value) => setFormData({ ...formData, moduleId: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Modul 1: Einführung</SelectItem>
                      <SelectItem value="2">Modul 2: Makler §34c</SelectItem>
                      <SelectItem value="3">Modul 3: Verwaltung</SelectItem>
                      <SelectItem value="4">Modul 4: Gutachten</SelectItem>
                      <SelectItem value="5">Modul 5: Prüfung & §34i</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="dayNumber">Tag *</Label>
                  <Input
                    id="dayNumber"
                    type="number"
                    min="1"
                    max="220"
                    value={formData.dayNumber}
                    onChange={(e) => setFormData({ ...formData, dayNumber: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="durationSeconds">Dauer (Sekunden)</Label>
                  <Input
                    id="durationSeconds"
                    type="number"
                    value={formData.durationSeconds}
                    onChange={(e) => setFormData({ ...formData, durationSeconds: e.target.value })}
                    placeholder="z.B. 600 (10 Min)"
                  />
                </div>
                <div>
                  <Label htmlFor="displayOrder">Reihenfolge</Label>
                  <Input
                    id="displayOrder"
                    type="number"
                    value={formData.displayOrder}
                    onChange={(e) => setFormData({ ...formData, displayOrder: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="isRequired"
                  checked={formData.isRequired}
                  onCheckedChange={(checked) => setFormData({ ...formData, isRequired: checked })}
                />
                <Label htmlFor="isRequired">Pflicht-Video</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setIsAddDialogOpen(false);
                setEditingVideo(null);
                resetForm();
              }}>
                Abbrechen
              </Button>
              <Button onClick={handleSubmit} disabled={!formData.title || !formData.videoUrl}>
                {editingVideo ? "Aktualisieren" : "Hinzufügen"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">Gesamt Videos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{videos?.length || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">YouTube Videos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {videos?.filter(v => v.platform === 'youtube').length || 0}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">Vimeo Videos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {videos?.filter(v => v.platform === 'vimeo').length || 0}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Videos by Module */}
      {isLoading ? (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-slate-500">Lade Videos...</p>
          </CardContent>
        </Card>
      ) : !videos || videos.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Video className="h-12 w-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500">Noch keine Videos vorhanden.</p>
            <p className="text-sm text-slate-400 mt-1">
              Klicken Sie auf "Video hinzufügen" um zu starten.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {Object.entries(videosByModule || {}).map(([moduleName, moduleVideos]) => (
            <Card key={moduleName}>
              <CardHeader>
                <CardTitle>{moduleName}</CardTitle>
                <CardDescription>{moduleVideos.length} Videos</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Titel</TableHead>
                      <TableHead>Tag</TableHead>
                      <TableHead>Platform</TableHead>
                      <TableHead>Dauer</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Aktionen</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {moduleVideos.map((video) => (
                      <TableRow key={video.id}>
                        <TableCell className="font-medium">{video.title}</TableCell>
                        <TableCell>Tag {video.dayNumber}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="gap-1">
                            {video.platform === 'youtube' ? (
                              <Youtube className="h-3 w-3" />
                            ) : (
                              <Film className="h-3 w-3" />
                            )}
                            {video.platform}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {video.durationSeconds
                            ? `${Math.ceil(video.durationSeconds / 60)} Min`
                            : "-"}
                        </TableCell>
                        <TableCell>
                          {video.isRequired && (
                            <Badge variant="destructive" className="text-xs">
                              Pflicht
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => window.open(video.videoUrl, '_blank')}
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(video)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(video.id)}
                            >
                              <Trash2 className="h-4 w-4 text-red-600" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
