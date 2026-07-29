import type { LucideIcon } from "lucide-react";

interface ComingSoonProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

/**
 * Honest "not available yet" state for sections that have no backing API
 * endpoint yet, instead of faking data or a successful save.
 */
export function ComingSoon({ icon: Icon, title, description }: ComingSoonProps) {
  return (
    <div className="card-border">
      <div className="card p-10 flex flex-col items-center text-center gap-3">
        <div className="size-12 rounded-full bg-primary-200/10 flex-center">
          <Icon className="size-6 text-primary-200" />
        </div>
        <h4 className="text-base font-semibold text-white">{title}</h4>
        <p className="text-sm text-light-400 max-w-md">{description}</p>
      </div>
    </div>
  );
}
