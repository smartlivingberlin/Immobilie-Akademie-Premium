import { useInspectMode } from "@/hooks/useInspectMode";

/** True when the user is in inspect/demo mode — UI should not allow writes. */
export function useInspectReadOnly(): { isReadOnly: boolean } {
  const { active } = useInspectMode();
  return { isReadOnly: active };
}
