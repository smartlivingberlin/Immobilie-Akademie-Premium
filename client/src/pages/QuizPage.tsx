import { useRoute } from "wouter";
import { Quiz } from "@/components/Quiz";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function QuizPage() {
  const [, params] = useRoute("/quiz/:moduleId");
  const moduleId = params?.moduleId ? parseInt(params.moduleId) : 1;

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => window.history.back()}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Zurück
        </Button>

        <Quiz moduleId={moduleId} />
      </div>
    </div>
  );
}
