import Link from "next/link";
import { Check, Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Get started with basic features",
    features: [
      "3 CV analyses per month",
      "1 mock interview per month",
      "Basic feedback",
      "Standard AI model",
    ],
    cta: "Get Started Free",
    href: "/auth/sign-up",
    popular: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "/month",
    description: "For active job seekers",
    features: [
      "Unlimited CV analyses",
      "10 mock interviews per month",
      "Advanced AI feedback",
      "Job description matching",
      "Interview recordings",
      "Priority support",
    ],
    cta: "Start Pro Trial",
    href: "/auth/sign-up",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$49",
    period: "/month",
    description: "For teams and recruiters",
    features: [
      "Everything in Pro",
      "Unlimited mock interviews",
      "Team management",
      "Custom AI prompts",
      "API access",
      "Dedicated support",
      "Analytics dashboard",
    ],
    cta: "Contact Sales",
    href: "mailto:support@cv2hire.app",
    popular: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="main-section py-24 w-full">
      <div className="max-w-5xl w-full mx-auto flex flex-col gap-14">
        <Reveal className="flex flex-col items-center text-center gap-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            Simple, <span className="text-gradient">transparent</span> pricing
          </h2>
          <p className="text-light-400 max-w-xl">
            Start for free. Upgrade when you&apos;re ready to interview more, or
            need your whole team job-ready.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 80} className="h-full">
              <div
                className={cn(
                  "card p-8 rounded-2xl flex flex-col gap-6 relative h-full md:mt-0",
                  plan.popular && "card-pricing-popular md:-mt-4 md:mb-4"
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 px-4 py-1 primary-gradient rounded-full text-xs font-bold text-dark-100">
                    <Crown className="size-3.5" />
                    Most Popular
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                  <p className="text-light-400 text-sm mt-1">{plan.description}</p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-light-400 text-sm">{plan.period}</span>
                </div>

                <Link
                  href={plan.href}
                  className={plan.popular ? "auth-button" : "btn-secondary w-full py-3"}
                >
                  {plan.cta}
                </Link>

                <ul className="flex flex-col gap-3 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-light-100">
                      <Check className="size-4 text-success-100 shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
