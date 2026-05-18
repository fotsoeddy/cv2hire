"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AccordionContextType {
  activeItems: string[];
  toggleItem: (id: string) => void;
  isItemActive: (id: string) => boolean;
}

const AccordionContext = createContext<AccordionContextType | undefined>(undefined);

const useAccordion = () => {
  const context = useContext(AccordionContext);
  if (!context) throw new Error("Accordion components must be used within an Accordion");
  return context;
};

export function Accordion({
  children,
  defaultOpen,
  allowMultiple = false,
  className = "",
}: {
  children: ReactNode;
  defaultOpen?: string;
  allowMultiple?: boolean;
  className?: string;
}) {
  const [activeItems, setActiveItems] = useState<string[]>(defaultOpen ? [defaultOpen] : []);

  const toggleItem = (id: string) => {
    setActiveItems((prev) =>
      allowMultiple
        ? prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        : prev.includes(id) ? [] : [id]
    );
  };

  const isItemActive = (id: string) => activeItems.includes(id);

  return (
    <AccordionContext.Provider value={{ activeItems, toggleItem, isItemActive }}>
      <div className={`space-y-2 ${className}`}>{children}</div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({ id, children, className = "" }: { id: string; children: ReactNode; className?: string }) {
  return <div className={`overflow-hidden border-b border-border ${className}`}>{children}</div>;
}

export function AccordionHeader({ itemId, children, className = "" }: { itemId: string; children: ReactNode; className?: string }) {
  const { toggleItem, isItemActive } = useAccordion();
  const isActive = isItemActive(itemId);

  return (
    <button
      onClick={() => toggleItem(itemId)}
      className={`w-full px-4 py-3 text-left focus:outline-none transition-colors flex items-center justify-between cursor-pointer ${className}`}
    >
      <div className="flex items-center space-x-3">
        <div className="flex-1">{children}</div>
      </div>
      <svg
        className={cn("w-5 h-5 transition-transform duration-200", isActive && "rotate-180")}
        fill="none"
        stroke="#98A2B3"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  );
}

export function AccordionContent({ itemId, children, className = "" }: { itemId: string; children: ReactNode; className?: string }) {
  const { isItemActive } = useAccordion();
  const isActive = isItemActive(itemId);

  return (
    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isActive ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"} ${className}`}>
      <div className="px-4 py-3">{children}</div>
    </div>
  );
}
