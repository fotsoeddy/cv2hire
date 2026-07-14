import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

interface SectionProps {
  title: React.ReactNode;
  description: string;
  imageSrc: string;
  imageAlt: string;
  reverse?: boolean;
  features?: string[];
  ctaText?: string;
  ctaLink?: string;
}

export default function Section({
  title,
  description,
  imageSrc,
  imageAlt,
  reverse = false,
  features = [],
  ctaText,
  ctaLink,
}: SectionProps) {
  return (
    <section className="main-section py-20 lg:py-32 w-full">
      <div className="max-w-6xl mx-auto w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        
        {/* Text Content */}
        <div className={`flex-1 flex flex-col items-center lg:items-start text-center lg:text-left ${reverse ? 'lg:order-2' : 'lg:order-1'}`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight">
            {title}
          </h2>
          <p className="text-lg text-light-400 mb-8 max-w-xl">
            {description}
          </p>
          
          {features.length > 0 && (
            <div className="flex flex-col gap-4 mb-10 w-full max-w-md">
              {features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3 text-left">
                  <CheckCircle2 className="size-6 text-primary-200 shrink-0" />
                  <span className="text-light-100">{feature}</span>
                </div>
              ))}
            </div>
          )}

          {ctaText && ctaLink && (
            <Link href={ctaLink} className="btn-primary inline-flex items-center gap-2 group">
              {ctaText}
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>

        {/* Image Content */}
        <div className={`flex-1 w-full flex justify-center ${reverse ? 'lg:order-1' : 'lg:order-2'}`}>
          <div className="relative w-full max-w-lg aspect-square lg:aspect-[4/3] rounded-3xl overflow-hidden card-border group">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-200/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
            <div className="absolute inset-0 bg-black/40 z-0" />
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-contain p-4 relative z-0 transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
