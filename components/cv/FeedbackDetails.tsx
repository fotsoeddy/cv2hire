import type { CVAnalysisFeedbackItem } from "@/types/cv";
import { Accordion, AccordionItem, AccordionHeader, AccordionContent } from "@/components/ui/Accordion";
import { ScoreCircle, ScoreBadge } from "@/components/cv/ScoreComponents";
import { cn } from "@/lib/utils";

interface FeedbackDetailsProps {
  items: CVAnalysisFeedbackItem[];
}

const CATEGORY_LABELS: Record<string, string> = {
  formatting: "Formatting",
  keywords: "Keywords",
  experience: "Experience",
  projects: "Projects",
  skills: "Skills",
  education: "Education",
};

const PRIORITY_STYLES: Record<string, string> = {
  high: "bg-red-500/10 text-red-500",
  medium: "bg-yellow-500/10 text-yellow-500",
  low: "bg-success-100/10 text-success-100",
};

export default function FeedbackDetails({ items }: FeedbackDetailsProps) {
  const grouped = new Map<string, CVAnalysisFeedbackItem[]>();
  for (const item of items) {
    const list = grouped.get(item.category) ?? [];
    list.push(item);
    grouped.set(item.category, list);
  }

  const categories = Array.from(grouped.entries()).map(([category, categoryItems]) => ({
    id: category,
    label: CATEGORY_LABELS[category] ?? category,
    score: Math.round(
      categoryItems.reduce((sum, i) => sum + i.score, 0) / categoryItems.length
    ),
    items: categoryItems,
  }));

  if (categories.length === 0) {
    return <p className="text-sm text-light-400">No detailed feedback available for this analysis.</p>;
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <Accordion allowMultiple>
        {categories.map((cat) => (
          <AccordionItem key={cat.id} id={cat.id}>
            <AccordionHeader itemId={cat.id}>
              <div className="flex items-center gap-4 w-full">
                <ScoreCircle score={cat.score} />
                <div className="flex flex-col gap-1 flex-1 min-w-0">
                  <h4 className="font-semibold text-white text-base">{cat.label}</h4>
                  <ScoreBadge score={cat.score} />
                </div>
              </div>
            </AccordionHeader>
            <AccordionContent itemId={cat.id}>
              <div className="flex flex-col gap-3 pl-2">
                {cat.items.map((item) => (
                  <div key={item.id} className="flex items-start gap-3 p-3 rounded-xl bg-dark-300">
                    <span
                      className={cn(
                        "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase mt-0.5 flex-shrink-0",
                        PRIORITY_STYLES[item.priority]
                      )}
                    >
                      {item.priority}
                    </span>
                    <p className="text-sm text-white">{item.feedback}</p>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
