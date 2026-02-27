import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  CheckCircle2,
  Clock,
  ExternalLink
} from "lucide-react";
import { trpc } from "@/lib/trpc";

interface VideoPlayerProps {
  videoId: number;
  title: string;
  description?: string;
  platform: 'youtube' | 'vimeo';
  videoEmbedId: string;
  durationSeconds?: number;
  isRequired?: boolean;
  onComplete?: () => void;
}

export function VideoPlayer({
  videoId,
  title,
  description,
  platform,
  videoEmbedId,
  durationSeconds,
  isRequired = false,
  onComplete,
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [percentageWatched, setPercentageWatched] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Get user's progress for this video
  const { data: progress } = trpc.videos.getProgress.useQuery(
    { videoId },
    { enabled: !!videoId }
  );

  // Update progress mutation
  const updateProgressMutation = trpc.videos.updateProgress.useMutation();

  // Load saved progress
  useEffect(() => {
    if (progress) {
      setCurrentTime(progress.currentPosition);
      setPercentageWatched(progress.percentageWatched);
      setIsCompleted(progress.isCompleted);
    }
  }, [progress]);

  // Simulate progress tracking (in real implementation, use YouTube/Vimeo API)
  useEffect(() => {
    if (isPlaying && durationSeconds) {
      progressIntervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          const newTime = prev + 1;
          const newPercentage = Math.min(100, Math.round((newTime / durationSeconds) * 100));
          setPercentageWatched(newPercentage);

          // Save progress every 5 seconds
          if (newTime % 5 === 0) {
            updateProgressMutation.mutate({
              videoId,
              currentPosition: newTime,
              percentageWatched: newPercentage,
            });
          }

          // Mark as completed at 90%
          if (newPercentage >= 90 && !isCompleted) {
            setIsCompleted(true);
            if (onComplete) onComplete();
          }

          return newTime >= durationSeconds ? durationSeconds : newTime;
        });
      }, 1000);
    } else {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
    }

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [isPlaying, durationSeconds, videoId, isCompleted, onComplete, updateProgressMutation]);

  // Format time (seconds to MM:SS)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Generate embed URL
  const getEmbedUrl = () => {
    if (platform === 'youtube') {
      return `https://www.youtube.com/embed/${videoEmbedId}?enablejsapi=1&rel=0`;
    } else if (platform === 'vimeo') {
      return `https://player.vimeo.com/video/${videoEmbedId}?api=1`;
    }
    return '';
  };

  // Generate watch URL
  const getWatchUrl = () => {
    if (platform === 'youtube') {
      return `https://www.youtube.com/watch?v=${videoEmbedId}`;
    } else if (platform === 'vimeo') {
      return `https://vimeo.com/${videoEmbedId}`;
    }
    return '';
  };

  return (
    <Card className="border-slate-200">
      <CardHeader className="border-b bg-slate-50/50">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-xl flex items-center gap-2">
              {title}
              {isRequired && (
                <Badge variant="destructive" className="text-xs">
                  Pflicht
                </Badge>
              )}
              {isCompleted && (
                <Badge variant="default" className="text-xs bg-green-600">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Abgeschlossen
                </Badge>
              )}
            </CardTitle>
            {description && (
              <CardDescription className="mt-2">{description}</CardDescription>
            )}
          </div>
          <a
            href={getWatchUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-slate-700"
          >
            <ExternalLink className="h-5 w-5" />
          </a>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {/* Video Embed */}
        <div className="relative aspect-video bg-slate-900">
          <iframe
            ref={iframeRef}
            src={getEmbedUrl()}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={title}
          />
        </div>

        {/* Progress Bar */}
        {durationSeconds && (
          <div className="p-4 space-y-3">
            <div className="flex justify-between text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>
                  {formatTime(currentTime)} / {formatTime(durationSeconds)}
                </span>
              </div>
              <span className="font-medium">{percentageWatched}% angesehen</span>
            </div>
            <Progress value={percentageWatched} className="h-2" />
          </div>
        )}

        {/* Video Info */}
        <div className="px-4 pb-4">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Badge variant="outline" className="text-xs">
              {platform === 'youtube' ? 'YouTube' : 'Vimeo'}
            </Badge>
            {durationSeconds && (
              <span>• {Math.ceil(durationSeconds / 60)} Minuten</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Video List Component
 * Displays multiple videos for a day
 */
interface VideoListProps {
  moduleId: number;
  dayNumber: number;
}

export function VideoList({ moduleId, dayNumber }: VideoListProps) {
  const { data: videos, isLoading } = trpc.videos.getByDay.useQuery({
    moduleId,
    dayNumber,
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-64 bg-slate-100 animate-pulse rounded-lg" />
        <div className="h-64 bg-slate-100 animate-pulse rounded-lg" />
      </div>
    );
  }

  if (!videos || videos.length === 0) {
    return (
      <Card className="border-slate-200">
        <CardContent className="p-8 text-center">
          <Play className="h-12 w-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500">
            Noch keine Videos für diesen Tag verfügbar.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {videos.map((video) => (
        <VideoPlayer
          key={video.id}
          videoId={video.id}
          title={video.title}
          description={video.description || undefined}
          platform={video.platform}
          videoEmbedId={video.videoId}
          durationSeconds={video.durationSeconds || undefined}
          isRequired={video.isRequired}
        />
      ))}
    </div>
  );
}
