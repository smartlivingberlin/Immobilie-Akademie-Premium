import { createHash, randomUUID } from "crypto";
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "fs";
import { join } from "path";

const JOBS_DIR = join(process.cwd(), "data", "generator-jobs");

export type DayJobResult = {
  dayNumbers: number[];
  markdown: string;
  complete: boolean;
  source: "ai" | "draft" | "retry";
  provider?: string;
  attempts: number;
};

export type PipelineJobState = {
  jobId: string;
  moduleId: number;
  moduleName: string;
  format: string;
  contentHash: string;
  pipelineVersion: string;
  status: "running" | "complete" | "failed";
  totalGroups: number;
  processedGroups: number;
  daysExpected: number;
  daysExtracted: number;
  dayResults: DayJobResult[];
  intro?: string;
  outro?: string;
  reduced?: string;
  error?: string;
  createdAt: string;
  updatedAt: string;
};

export function jobPath(jobId: string): string {
  return join(JOBS_DIR, `${jobId}.json`);
}

export function ensureJobsDir(): void {
  if (!existsSync(JOBS_DIR)) mkdirSync(JOBS_DIR, { recursive: true });
}

export function createJobId(moduleId: number, format: string, contentHash: string): string {
  const hash = createHash("sha256")
    .update(`${moduleId}:${format}:${contentHash}:${Date.now()}`)
    .digest("hex")
    .slice(0, 12);
  return `kb-${moduleId}-${format}-${hash}`;
}

export function loadJob(jobId: string): PipelineJobState | null {
  try {
    const path = jobPath(jobId);
    if (!existsSync(path)) return null;
    return JSON.parse(readFileSync(path, "utf8")) as PipelineJobState;
  } catch {
    return null;
  }
}

export function saveJob(job: PipelineJobState): void {
  ensureJobsDir();
  job.updatedAt = new Date().toISOString();
  writeFileSync(jobPath(job.jobId), JSON.stringify(job, null, 0), "utf8");
}

export function createJob(params: {
  moduleId: number;
  moduleName: string;
  format: string;
  contentHash: string;
  pipelineVersion: string;
  totalGroups: number;
  daysExpected: number;
  daysExtracted: number;
}): PipelineJobState {
  const job: PipelineJobState = {
    jobId: createJobId(params.moduleId, params.format, params.contentHash),
    moduleId: params.moduleId,
    moduleName: params.moduleName,
    format: params.format,
    contentHash: params.contentHash,
    pipelineVersion: params.pipelineVersion,
    status: "running",
    totalGroups: params.totalGroups,
    processedGroups: 0,
    daysExpected: params.daysExpected,
    daysExtracted: params.daysExtracted,
    dayResults: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  saveJob(job);
  return job;
}

export function findRunningJob(
  moduleId: number,
  format: string,
  contentHash: string,
): PipelineJobState | null {
  ensureJobsDir();
  try {
    const files = readdirSync(JOBS_DIR).filter((f) => f.endsWith(".json"));
    for (const file of files) {
      try {
        const job = JSON.parse(readFileSync(join(JOBS_DIR, file), "utf8")) as PipelineJobState;
        if (
          job.status === "running" &&
          job.moduleId === moduleId &&
          job.format === format &&
          job.contentHash === contentHash
        ) {
          return job;
        }
      } catch {
        /* skip corrupt */
      }
    }
  } catch {
    /* no jobs dir */
  }
  return null;
}

export function newEphemeralJobId(): string {
  return `kb-tmp-${randomUUID().slice(0, 8)}`;
}
