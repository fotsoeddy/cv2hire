import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export function CtaSection() {
  return (
    <section className="w-full mt-4">
      <Reveal className="main-section">
        <div className="card-cta flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 p-8 md:p-12 text-center md:text-left w-full">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to land your <span className="text-primary-200">Dream Job?</span>
            </h2>
            <p className="text-light-400 text-lg max-w-xl mx-auto md:mx-0">
              Join 10,000+ professionals using CV2Hire to prepare for their next career move.
            </p>
          </div>
          <Link
            href="/dashboard"
            className="btn-primary text-base px-8 py-3 w-full md:w-auto min-h-0 group"
          >
            Start Now
            <ArrowRight className="size-4 ml-1.5 transition-transform duration-150 ease-out group-hover:translate-x-0.5" />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
