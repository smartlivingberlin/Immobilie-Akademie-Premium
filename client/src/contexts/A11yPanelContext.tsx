import { createContext, useContext, useState, type ReactNode } from "react";

type A11yPanelContextValue = {
  openPanel: () => void;
  closePanel: () => void;
  isOpen: boolean;
};

const A11yPanelContext = createContext<A11yPanelContextValue | null>(null);

export function A11yPanelProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <A11yPanelContext.Provider
      value={{
        isOpen,
        openPanel: () => setIsOpen(true),
        closePanel: () => setIsOpen(false),
      }}
    >
      {children}
    </A11yPanelContext.Provider>
  );
}

export function useA11yPanel() {
  const ctx = useContext(A11yPanelContext);
  if (!ctx) throw new Error("useA11yPanel requires A11yPanelProvider");
  return ctx;
}
