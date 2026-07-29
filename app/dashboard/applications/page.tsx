import { Send } from "lucide-react";
import { ComingSoon } from "@/components/ui/ComingSoon";

export default function ApplicationsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2>Applications</h2>
        <p className="text-light-400 mt-1">Track the roles you&apos;ve applied to.</p>
      </div>
      <ComingSoon
        icon={Send}
        title="Application tracking is coming soon"
        description="There's no Application model or endpoint on the backend yet — nothing to record or fetch. Once that API exists, applications you submit will show up here automatically."
      />
    </div>
  );
}
