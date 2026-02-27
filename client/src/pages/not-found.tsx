import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] w-full flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md mx-auto shadow-lg border-gray-200">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 text-red-500 bg-red-100 rounded-full flex items-center justify-center">
            <AlertCircle className="h-6 w-6" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">404 - Seite nicht gefunden</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <p className="text-gray-500">
            Die von Ihnen gesuchte Seite existiert leider nicht oder wurde verschoben.
          </p>
          <Link href="/">
<div className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full bg-blue-600 hover:bg-blue-700 text-white">
              Zurück zur Startseite
            </div>
</Link>
        </CardContent>
      </Card>
    </div>
  );
}
