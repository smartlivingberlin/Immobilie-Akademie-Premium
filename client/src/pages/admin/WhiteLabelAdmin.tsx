import { useState, useRef } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Plus,
  Pencil,
  Trash2,
  Building2,
  Palette,
  Users,
  Shield,
  Upload,
  Eye,
  Globe,
  Mail,
  Phone,
  ExternalLink,
  CheckCircle2,
  XCircle,
  Settings,
} from "lucide-react";

interface WhitelabelFormData {
  slug: string;
  companyName: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  sidebarColor: string;
  welcomeText: string;
  footerText: string;
  contactEmail: string;
  contactPhone: string;
  websiteUrl: string;
  azavEnabled: boolean;
  azavCertNumber: string;
  enabledModules: string;
  maxUsers: number;
}

const defaultFormData: WhitelabelFormData = {
  slug: "",
  companyName: "",
  primaryColor: "#2563eb",
  secondaryColor: "#1e293b",
  accentColor: "#3b82f6",
  sidebarColor: "#0f172a",
  welcomeText: "",
  footerText: "",
  contactEmail: "",
  contactPhone: "",
  websiteUrl: "",
  azavEnabled: false,
  azavCertNumber: "",
  enabledModules: "1,2,3,4,5",
  maxUsers: 100,
};

export default function WhiteLabelAdmin() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<WhitelabelFormData>(defaultFormData);
  const [previewTenant, setPreviewTenant] = useState<number | null>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const faviconInputRef = useRef<HTMLInputElement>(null);

  const utils = trpc.useUtils();

  // Queries
  const { data: configs, isLoading } = trpc.whitelabel.list.useQuery();

  // Mutations
  const createMutation = trpc.whitelabel.create.useMutation({
    onSuccess: () => {
      utils.whitelabel.list.invalidate();
      setIsCreateOpen(false);
      setFormData(defaultFormData);
      toast({ title: "Erfolg", description: "White-Label-Konfiguration erstellt." });
    },
    onError: (err) => {
      toast({ title: "Fehler", description: err.message, variant: "destructive" });
    },
  });

  const updateMutation = trpc.whitelabel.update.useMutation({
    onSuccess: () => {
      utils.whitelabel.list.invalidate();
      setEditingId(null);
      toast({ title: "Erfolg", description: "Konfiguration aktualisiert." });
    },
    onError: (err) => {
      toast({ title: "Fehler", description: err.message, variant: "destructive" });
    },
  });

  const deleteMutation = trpc.whitelabel.delete.useMutation({
    onSuccess: () => {
      utils.whitelabel.list.invalidate();
      toast({ title: "Erfolg", description: "Konfiguration gelöscht." });
    },
    onError: (err) => {
      toast({ title: "Fehler", description: err.message, variant: "destructive" });
    },
  });

  const uploadLogoMutation = trpc.whitelabel.uploadLogo.useMutation({
    onSuccess: () => {
      utils.whitelabel.list.invalidate();
      toast({ title: "Erfolg", description: "Logo hochgeladen." });
    },
    onError: (err) => {
      toast({ title: "Fehler", description: err.message, variant: "destructive" });
    },
  });

  const uploadFaviconMutation = trpc.whitelabel.uploadFavicon.useMutation({
    onSuccess: () => {
      utils.whitelabel.list.invalidate();
      toast({ title: "Erfolg", description: "Favicon hochgeladen." });
    },
    onError: (err) => {
      toast({ title: "Fehler", description: err.message, variant: "destructive" });
    },
  });

  // Check admin access
  if (user?.role !== "admin") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
        <Shield className="h-16 w-16 text-slate-300" />
        <h2 className="text-2xl font-bold text-slate-900">Zugriff verweigert</h2>
        <p className="text-slate-500 max-w-md">
          Nur Administratoren haben Zugriff auf die White-Label-Verwaltung.
        </p>
      </div>
    );
  }

  const handleCreate = () => {
    createMutation.mutate({
      slug: formData.slug,
      companyName: formData.companyName,
      primaryColor: formData.primaryColor,
      secondaryColor: formData.secondaryColor,
      accentColor: formData.accentColor,
      sidebarColor: formData.sidebarColor,
      welcomeText: formData.welcomeText || undefined,
      footerText: formData.footerText || undefined,
      contactEmail: formData.contactEmail || undefined,
      contactPhone: formData.contactPhone || undefined,
      websiteUrl: formData.websiteUrl || undefined,
      azavEnabled: formData.azavEnabled,
      azavCertNumber: formData.azavCertNumber || undefined,
      enabledModules: formData.enabledModules,
      maxUsers: formData.maxUsers,
    });
  };

  const handleUpdate = (id: number) => {
    updateMutation.mutate({
      id,
      companyName: formData.companyName,
      primaryColor: formData.primaryColor,
      secondaryColor: formData.secondaryColor,
      accentColor: formData.accentColor,
      sidebarColor: formData.sidebarColor,
      welcomeText: formData.welcomeText || undefined,
      footerText: formData.footerText || undefined,
      contactEmail: formData.contactEmail || undefined,
      contactPhone: formData.contactPhone || undefined,
      websiteUrl: formData.websiteUrl || undefined,
      azavEnabled: formData.azavEnabled,
      azavCertNumber: formData.azavCertNumber || undefined,
      enabledModules: formData.enabledModules,
      maxUsers: formData.maxUsers,
    });
  };

  const handleLogoUpload = async (id: number, file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(",")[1];
      uploadLogoMutation.mutate({
        id,
        logoBase64: base64,
        mimeType: file.type,
        fileName: file.name,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleFaviconUpload = async (id: number, file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(",")[1];
      uploadFaviconMutation.mutate({
        id,
        faviconBase64: base64,
        mimeType: file.type,
        fileName: file.name,
      });
    };
    reader.readAsDataURL(file);
  };

  const startEditing = (config: any) => {
    setEditingId(config.id);
    setFormData({
      slug: config.slug,
      companyName: config.companyName,
      primaryColor: config.primaryColor,
      secondaryColor: config.secondaryColor,
      accentColor: config.accentColor,
      sidebarColor: config.sidebarColor,
      welcomeText: config.welcomeText || "",
      footerText: config.footerText || "",
      contactEmail: config.contactEmail || "",
      contactPhone: config.contactPhone || "",
      websiteUrl: config.websiteUrl || "",
      azavEnabled: config.azavEnabled,
      azavCertNumber: config.azavCertNumber || "",
      enabledModules: config.enabledModules || "1,2,3,4,5",
      maxUsers: config.maxUsers,
    });
  };

  const moduleNames: Record<string, string> = {
    "1": "Einführung",
    "2": "Makler §34c",
    "3": "Verwaltung",
    "4": "Gutachten",
    "5": "Prüfung §34i",
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <Building2 className="h-8 w-8 text-blue-600" />
            White-Label Verwaltung
          </h1>
          <p className="text-slate-500 mt-1">
            Erstellen und verwalten Sie individuelle Branding-Konfigurationen für B2B-Kunden.
          </p>
        </div>

        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setFormData(defaultFormData)}>
              <Plus className="h-4 w-4 mr-2" />
              Neuer Mandant
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Neuen White-Label-Mandanten erstellen</DialogTitle>
              <DialogDescription>
                Erstellen Sie eine neue Branding-Konfiguration für einen B2B-Kunden.
              </DialogDescription>
            </DialogHeader>
            <TenantForm
              formData={formData}
              setFormData={setFormData}
              isNew={true}
            />
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                Abbrechen
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700"
                onClick={handleCreate}
                disabled={createMutation.isPending || !formData.slug || !formData.companyName}
              >
                {createMutation.isPending ? "Erstelle..." : "Mandant erstellen"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Building2 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">{configs?.length || 0}</div>
                <div className="text-sm text-slate-500">Mandanten gesamt</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">
                  {configs?.filter((c) => c.isActive).length || 0}
                </div>
                <div className="text-sm text-slate-500">Aktive Mandanten</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Shield className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">
                  {configs?.filter((c) => c.azavEnabled).length || 0}
                </div>
                <div className="text-sm text-slate-500">AZAV-zertifiziert</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tenant List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full" />
        </div>
      ) : configs?.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <Building2 className="h-16 w-16 text-slate-300 mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Noch keine Mandanten
            </h3>
            <p className="text-slate-500 max-w-md mb-6">
              Erstellen Sie Ihren ersten White-Label-Mandanten, um das Branding für B2B-Kunden anzupassen.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsCreateOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Ersten Mandanten erstellen
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {configs?.map((config) => (
            <Card key={config.id} className={`overflow-hidden ${!config.isActive ? "opacity-60" : ""}`}>
              <div className="flex">
                {/* Color Preview Strip */}
                <div
                  className="w-2 flex-shrink-0"
                  style={{ backgroundColor: config.primaryColor }}
                />

                <div className="flex-1">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        {config.logoUrl ? (
                          <img
                            src={config.logoUrl}
                            alt={config.companyName}
                            className="h-10 w-10 rounded-lg object-contain border border-slate-200"
                          />
                        ) : (
                          <div
                            className="h-10 w-10 rounded-lg flex items-center justify-center text-white font-bold text-lg"
                            style={{ backgroundColor: config.primaryColor }}
                          >
                            {config.companyName.charAt(0)}
                          </div>
                        )}
                        <div>
                          <CardTitle className="text-lg">{config.companyName}</CardTitle>
                          <CardDescription className="flex items-center gap-2 mt-0.5">
                            <Globe className="h-3 w-3" />
                            {config.slug}
                          </CardDescription>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {config.azavEnabled && (
                          <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">
                            <Shield className="h-3 w-3 mr-1" />
                            AZAV
                          </Badge>
                        )}
                        <Badge variant={config.isActive ? "default" : "secondary"}>
                          {config.isActive ? "Aktiv" : "Inaktiv"}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      {/* Color Palette */}
                      <div>
                        <div className="text-xs font-medium text-slate-500 mb-2 flex items-center gap-1">
                          <Palette className="h-3 w-3" />
                          Farbpalette
                        </div>
                        <div className="flex gap-1.5">
                          {[
                            { color: config.primaryColor, label: "Primär" },
                            { color: config.secondaryColor, label: "Sekundär" },
                            { color: config.accentColor, label: "Akzent" },
                            { color: config.sidebarColor, label: "Sidebar" },
                          ].map((c) => (
                            <div key={c.label} className="group relative">
                              <div
                                className="h-8 w-8 rounded-md border border-slate-200 cursor-help"
                                style={{ backgroundColor: c.color }}
                              />
                              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                {c.label}: {c.color}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Module Access */}
                      <div>
                        <div className="text-xs font-medium text-slate-500 mb-2 flex items-center gap-1">
                          <Settings className="h-3 w-3" />
                          Module
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {config.enabledModules.split(",").map((m) => (
                            <Badge key={m} variant="outline" className="text-xs">
                              M{m.trim()}: {moduleNames[m.trim()] || m.trim()}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Contact Info */}
                      <div>
                        <div className="text-xs font-medium text-slate-500 mb-2 flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          Kontakt & Limits
                        </div>
                        <div className="space-y-1 text-sm text-slate-600">
                          {config.contactEmail && (
                            <div className="flex items-center gap-1.5">
                              <Mail className="h-3 w-3 text-slate-400" />
                              {config.contactEmail}
                            </div>
                          )}
                          {config.contactPhone && (
                            <div className="flex items-center gap-1.5">
                              <Phone className="h-3 w-3 text-slate-400" />
                              {config.contactPhone}
                            </div>
                          )}
                          <div className="flex items-center gap-1.5">
                            <Users className="h-3 w-3 text-slate-400" />
                            Max. {config.maxUsers} Benutzer
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => startEditing(config)}
                      >
                        <Pencil className="h-3.5 w-3.5 mr-1.5" />
                        Bearbeiten
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPreviewTenant(previewTenant === config.id ? null : config.id)}
                      >
                        <Eye className="h-3.5 w-3.5 mr-1.5" />
                        Vorschau
                      </Button>

                      <input
                        type="file"
                        ref={logoInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleLogoUpload(config.id, file);
                        }}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => logoInputRef.current?.click()}
                      >
                        <Upload className="h-3.5 w-3.5 mr-1.5" />
                        Logo
                      </Button>

                      <input
                        type="file"
                        ref={faviconInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFaviconUpload(config.id, file);
                        }}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => faviconInputRef.current?.click()}
                      >
                        <Upload className="h-3.5 w-3.5 mr-1.5" />
                        Favicon
                      </Button>

                      <div className="flex-1" />

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                            <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                            Löschen
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Mandant löschen?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Sind Sie sicher, dass Sie den Mandanten "{config.companyName}" löschen möchten?
                              Diese Aktion kann nicht rückgängig gemacht werden.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Abbrechen</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-red-600 hover:bg-red-700"
                              onClick={() => deleteMutation.mutate({ id: config.id })}
                            >
                              Endgültig löschen
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>

                    {/* Preview Section */}
                    {previewTenant === config.id && (
                      <div className="mt-4 p-4 border border-slate-200 rounded-lg bg-slate-50">
                        <h4 className="font-semibold text-sm text-slate-700 mb-3">Live-Vorschau</h4>
                        <div className="flex gap-4">
                          {/* Mini Sidebar Preview */}
                          <div
                            className="w-48 h-40 rounded-lg p-3 flex flex-col"
                            style={{ backgroundColor: config.sidebarColor }}
                          >
                            <div className="flex items-center gap-2 mb-3">
                              {config.logoUrl ? (
                                <img src={config.logoUrl} alt="" className="h-6 w-6 rounded object-contain" />
                              ) : (
                                <div
                                  className="h-6 w-6 rounded flex items-center justify-center text-white text-xs font-bold"
                                  style={{ backgroundColor: config.primaryColor }}
                                >
                                  {config.companyName.charAt(0)}
                                </div>
                              )}
                              <span className="text-white text-xs font-semibold truncate">
                                {config.companyName}
                              </span>
                            </div>
                            <div className="space-y-1.5 flex-1">
                              {["Startseite", "Modul 1", "Modul 2", "Modul 3"].map((item, i) => (
                                <div
                                  key={item}
                                  className="h-5 rounded text-[10px] flex items-center px-2 text-white/80"
                                  style={{
                                    backgroundColor: i === 0 ? config.primaryColor : "transparent",
                                  }}
                                >
                                  {item}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Mini Content Preview */}
                          <div className="flex-1 bg-white rounded-lg p-3 border border-slate-200">
                            <div
                              className="h-3 w-32 rounded mb-2"
                              style={{ backgroundColor: config.primaryColor }}
                            />
                            <div className="h-2 w-full bg-slate-100 rounded mb-1.5" />
                            <div className="h-2 w-3/4 bg-slate-100 rounded mb-3" />
                            <div className="flex gap-2">
                              <div
                                className="h-6 px-3 rounded text-[10px] text-white flex items-center"
                                style={{ backgroundColor: config.primaryColor }}
                              >
                                Primär
                              </div>
                              <div
                                className="h-6 px-3 rounded text-[10px] text-white flex items-center"
                                style={{ backgroundColor: config.accentColor }}
                              >
                                Akzent
                              </div>
                            </div>
                            {config.footerText && (
                              <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] text-slate-400">
                                {config.footerText}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={editingId !== null} onOpenChange={(open) => !open && setEditingId(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Mandant bearbeiten</DialogTitle>
            <DialogDescription>
              Passen Sie die Branding-Konfiguration für diesen Mandanten an.
            </DialogDescription>
          </DialogHeader>
          <TenantForm
            formData={formData}
            setFormData={setFormData}
            isNew={false}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingId(null)}>
              Abbrechen
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => editingId && handleUpdate(editingId)}
              disabled={updateMutation.isPending}
            >
              {updateMutation.isPending ? "Speichere..." : "Änderungen speichern"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Reusable Tenant Form Component
function TenantForm({
  formData,
  setFormData,
  isNew,
}: {
  formData: WhitelabelFormData;
  setFormData: (data: WhitelabelFormData) => void;
  isNew: boolean;
}) {
  const moduleOptions = [
    { id: "1", name: "Modul 1: Einführung" },
    { id: "2", name: "Modul 2: Makler §34c" },
    { id: "3", name: "Modul 3: Verwaltung" },
    { id: "4", name: "Modul 4: Gutachten" },
    { id: "5", name: "Modul 5: Prüfung §34i" },
  ];

  const enabledModulesArray = formData.enabledModules.split(",").map((m) => m.trim());

  const toggleModule = (moduleId: string) => {
    const current = enabledModulesArray;
    const updated = current.includes(moduleId)
      ? current.filter((m) => m !== moduleId)
      : [...current, moduleId].sort();
    setFormData({ ...formData, enabledModules: updated.join(",") });
  };

  return (
    <div className="space-y-6 py-4">
      {/* Basic Info */}
      <div className="space-y-4">
        <h3 className="font-semibold text-sm text-slate-700 flex items-center gap-2">
          <Building2 className="h-4 w-4" />
          Grunddaten
        </h3>

        {isNew && (
          <div className="space-y-2">
            <Label htmlFor="slug">Slug (URL-Kennung)</Label>
            <Input
              id="slug"
              placeholder="z.B. immobilien-akademie-berlin"
              value={formData.slug}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""),
                })
              }
            />
            <p className="text-xs text-slate-500">
              Wird als URL-Kennung verwendet. Nur Kleinbuchstaben, Zahlen und Bindestriche.
            </p>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="companyName">Firmenname</Label>
          <Input
            id="companyName"
            placeholder="z.B. Immobilien Akademie Berlin GmbH"
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="contactEmail">Kontakt-E-Mail</Label>
            <Input
              id="contactEmail"
              type="email"
              placeholder="info@beispiel.de"
              value={formData.contactEmail}
              onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactPhone">Telefon</Label>
            <Input
              id="contactPhone"
              placeholder="+49 30 12345678"
              value={formData.contactPhone}
              onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="websiteUrl">Website</Label>
          <Input
            id="websiteUrl"
            type="url"
            placeholder="https://www.beispiel.de"
            value={formData.websiteUrl}
            onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
          />
        </div>
      </div>

      {/* Colors */}
      <div className="space-y-4">
        <h3 className="font-semibold text-sm text-slate-700 flex items-center gap-2">
          <Palette className="h-4 w-4" />
          Farbpalette
        </h3>

        <div className="grid grid-cols-2 gap-4">
          {[
            { key: "primaryColor" as const, label: "Primärfarbe", desc: "Buttons, Links, Highlights" },
            { key: "secondaryColor" as const, label: "Sekundärfarbe", desc: "Hintergründe, Texte" },
            { key: "accentColor" as const, label: "Akzentfarbe", desc: "Badges, Hover-Effekte" },
            { key: "sidebarColor" as const, label: "Sidebar-Farbe", desc: "Seitenleiste Hintergrund" },
          ].map((color) => (
            <div key={color.key} className="space-y-2">
              <Label htmlFor={color.key}>{color.label}</Label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  id={color.key}
                  value={formData[color.key]}
                  onChange={(e) => setFormData({ ...formData, [color.key]: e.target.value })}
                  className="h-10 w-14 rounded border border-slate-200 cursor-pointer"
                />
                <Input
                  value={formData[color.key]}
                  onChange={(e) => setFormData({ ...formData, [color.key]: e.target.value })}
                  className="flex-1 font-mono text-sm"
                  maxLength={7}
                />
              </div>
              <p className="text-xs text-slate-500">{color.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Texts */}
      <div className="space-y-4">
        <h3 className="font-semibold text-sm text-slate-700">Texte</h3>

        <div className="space-y-2">
          <Label htmlFor="welcomeText">Begrüßungstext</Label>
          <Textarea
            id="welcomeText"
            placeholder="Willkommen bei der Immobilien Akademie Berlin..."
            value={formData.welcomeText}
            onChange={(e) => setFormData({ ...formData, welcomeText: e.target.value })}
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="footerText">Footer-Text</Label>
          <Input
            id="footerText"
            placeholder="© 2026 Immobilien Akademie Berlin GmbH"
            value={formData.footerText}
            onChange={(e) => setFormData({ ...formData, footerText: e.target.value })}
          />
        </div>
      </div>

      {/* Module Access */}
      <div className="space-y-4">
        <h3 className="font-semibold text-sm text-slate-700 flex items-center gap-2">
          <Settings className="h-4 w-4" />
          Modulzugang
        </h3>

        <div className="space-y-2">
          {moduleOptions.map((mod) => (
            <div key={mod.id} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-slate-50">
              <span className="text-sm">{mod.name}</span>
              <Switch
                checked={enabledModulesArray.includes(mod.id)}
                onCheckedChange={() => toggleModule(mod.id)}
              />
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <Label htmlFor="maxUsers">Maximale Benutzeranzahl</Label>
          <Input
            id="maxUsers"
            type="number"
            min={1}
            max={10000}
            value={formData.maxUsers}
            onChange={(e) => setFormData({ ...formData, maxUsers: parseInt(e.target.value) || 100 })}
          />
        </div>
      </div>

      {/* AZAV Section */}
      <div className="space-y-4">
        <h3 className="font-semibold text-sm text-slate-700 flex items-center gap-2">
          <Shield className="h-4 w-4" />
          AZAV-Zertifizierung
        </h3>

        <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-purple-50 border border-purple-100">
          <div>
            <span className="text-sm font-medium text-purple-900">AZAV-Modus aktivieren</span>
            <p className="text-xs text-purple-600 mt-0.5">
              Aktiviert AZAV-spezifische Funktionen und Dokumentation
            </p>
          </div>
          <Switch
            checked={formData.azavEnabled}
            onCheckedChange={(checked) => setFormData({ ...formData, azavEnabled: checked })}
          />
        </div>

        {formData.azavEnabled && (
          <div className="space-y-2">
            <Label htmlFor="azavCertNumber">AZAV-Zertifizierungsnummer</Label>
            <Input
              id="azavCertNumber"
              placeholder="z.B. DE-AZAV-2026-12345"
              value={formData.azavCertNumber}
              onChange={(e) => setFormData({ ...formData, azavCertNumber: e.target.value })}
            />
          </div>
        )}
      </div>
    </div>
  );
}
