import type { CVTip } from "@/types";
import { Accordion, AccordionItem, AccordionHeader, AccordionContent } from "@/components/ui/Accordion";
import { ScoreCircle, ScoreBadge } from "@/components/cv/ScoreComponents";
import { CheckCircle, AlertTriangle } from "lucide-react";

interface FeedbackDetailsProps {
  categories: {
    id: string;
    label: string;
    score: number;
    tips: CVTip[];
  }[];
}

export default function FeedbackDetails({ categories }: FeedbackDetailsProps) {
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
                {cat.tips.map((tip, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-xl bg-dark-300"
                  >
                    {tip.type === "good" ? (
                      <CheckCircle className="size-5 text-success-100 mt-0.5 flex-shrink-0" />
                    ) : (
                      <AlertTriangle className="size-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    )}
                    <div>
                      <p className="text-sm font-medium text-white">{tip.tip}</p>
                      {tip.explanation && (
                        <p className="text-sm text-light-400 mt-1">{tip.explanation}</p>
                      )}
                    </div>
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
