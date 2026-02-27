import { router, publicProcedure, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import {
  getAllVideoTutorials,
  getVideoTutorialsByModule,
  getVideoTutorialsByDay,
  getVideoTutorialById,
  createVideoTutorial,
  updateVideoTutorial,
  deleteVideoTutorial,
  getUserVideoProgress,
  updateVideoProgress,
  getAllUserVideoProgress,
} from "./db";
import { TRPCError } from "@trpc/server";

/**
 * Video Tutorial Router
 * Provides video management and progress tracking
 */

// Admin-only middleware (reuse from routers.ts)
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== 'admin') {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'Nur Administratoren haben Zugriff auf diese Funktion.' });
  }
  return next({ ctx });
});

/**
 * Extract video ID and platform from URL
 */
function parseVideoUrl(url: string): { platform: 'youtube' | 'vimeo', videoId: string } | null {
  // YouTube patterns
  const youtubePatterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of youtubePatterns) {
    const match = url.match(pattern);
    if (match) {
      return { platform: 'youtube', videoId: match[1] };
    }
  }

  // Vimeo patterns
  const vimeoPatterns = [
    /vimeo\.com\/(\d+)/,
    /player\.vimeo\.com\/video\/(\d+)/,
  ];

  for (const pattern of vimeoPatterns) {
    const match = url.match(pattern);
    if (match) {
      return { platform: 'vimeo', videoId: match[1] };
    }
  }

  return null;
}

export const videoRouter = router({
  /**
   * Get all video tutorials (public)
   */
  list: publicProcedure.query(async () => {
    return getAllVideoTutorials();
  }),

  /**
   * Get videos by module (public)
   */
  getByModule: publicProcedure
    .input(z.object({ moduleId: z.number().min(1).max(5) }))
    .query(async ({ input }) => {
      return getVideoTutorialsByModule(input.moduleId);
    }),

  /**
   * Get videos by day (public)
   */
  getByDay: publicProcedure
    .input(
      z.object({
        moduleId: z.number().min(1).max(5),
        dayNumber: z.number().min(1).max(220),
      })
    )
    .query(async ({ input }) => {
      return getVideoTutorialsByDay(input.moduleId, input.dayNumber);
    }),

  /**
   * Get video by ID (public)
   */
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const video = await getVideoTutorialById(input.id);
      if (!video) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Video nicht gefunden.' });
      }
      return video;
    }),

  /**
   * Create video tutorial (admin only)
   */
  create: adminProcedure
    .input(
      z.object({
        title: z.string().min(1).max(255),
        description: z.string().optional(),
        videoUrl: z.string().url(),
        moduleId: z.number().min(1).max(5),
        dayNumber: z.number().min(1).max(220),
        displayOrder: z.number().default(0),
        isRequired: z.boolean().default(false),
        durationSeconds: z.number().optional(),
      })
    )
    .mutation(async ({ input }) => {
      // Parse video URL
      const parsed = parseVideoUrl(input.videoUrl);
      if (!parsed) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Ungültige Video-URL. Nur YouTube und Vimeo werden unterstützt.',
        });
      }

      // Generate thumbnail URL
      let thumbnailUrl = '';
      if (parsed.platform === 'youtube') {
        thumbnailUrl = `https://img.youtube.com/vi/${parsed.videoId}/maxresdefault.jpg`;
      } else if (parsed.platform === 'vimeo') {
        // Vimeo thumbnails require API call, use placeholder for now
        thumbnailUrl = `https://vumbnail.com/${parsed.videoId}.jpg`;
      }

      const video = await createVideoTutorial({
        ...input,
        platform: parsed.platform,
        videoId: parsed.videoId,
        thumbnailUrl,
      });

      if (!video) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Fehler beim Erstellen des Videos.',
        });
      }

      return video;
    }),

  /**
   * Update video tutorial (admin only)
   */
  update: adminProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string().min(1).max(255).optional(),
        description: z.string().optional(),
        videoUrl: z.string().url().optional(),
        moduleId: z.number().min(1).max(5).optional(),
        dayNumber: z.number().min(1).max(220).optional(),
        displayOrder: z.number().optional(),
        isRequired: z.boolean().optional(),
        durationSeconds: z.number().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, videoUrl, ...updates } = input;

      let videoData: any = updates;

      // If video URL is being updated, re-parse it
      if (videoUrl) {
        const parsed = parseVideoUrl(videoUrl);
        if (!parsed) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Ungültige Video-URL. Nur YouTube und Vimeo werden unterstützt.',
          });
        }

        let thumbnailUrl = '';
        if (parsed.platform === 'youtube') {
          thumbnailUrl = `https://img.youtube.com/vi/${parsed.videoId}/maxresdefault.jpg`;
        } else if (parsed.platform === 'vimeo') {
          thumbnailUrl = `https://vumbnail.com/${parsed.videoId}.jpg`;
        }

        videoData = {
          ...updates,
          videoUrl,
          platform: parsed.platform,
          videoId: parsed.videoId,
          thumbnailUrl,
        };
      }

      const video = await updateVideoTutorial(id, videoData);
      if (!video) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Video nicht gefunden.',
        });
      }

      return video;
    }),

  /**
   * Delete video tutorial (admin only)
   */
  delete: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const success = await deleteVideoTutorial(input.id);
      if (!success) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Fehler beim Löschen des Videos.',
        });
      }
      return { success: true };
    }),

  /**
   * Get user's progress for a video (protected)
   */
  getProgress: protectedProcedure
    .input(z.object({ videoId: z.number() }))
    .query(async ({ ctx, input }) => {
      return getUserVideoProgress(ctx.user.id, input.videoId);
    }),

  /**
   * Update user's video progress (protected)
   */
  updateProgress: protectedProcedure
    .input(
      z.object({
        videoId: z.number(),
        currentPosition: z.number().min(0),
        percentageWatched: z.number().min(0).max(100),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const progress = await updateVideoProgress(
        ctx.user.id,
        input.videoId,
        input.currentPosition,
        input.percentageWatched
      );

      if (!progress) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Fehler beim Aktualisieren des Fortschritts.',
        });
      }

      return progress;
    }),

  /**
   * Get all user's video progress (protected)
   */
  getAllProgress: protectedProcedure.query(async ({ ctx }) => {
    return getAllUserVideoProgress(ctx.user.id);
  }),
});
