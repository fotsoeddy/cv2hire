import { Check } from "lucide-react";
import Link from "next/link";

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
    cta: "Current Plan",
    highlighted: false,
    disabled: true,
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
    cta: "Upgrade to Pro",
    highlighted: true,
    disabled: false,
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
    highlighted: false,
    disabled: false,
  },
];

export default function PricingPage() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="text-center">
        <h2>Pricing</h2>
        <p className="text-light-400 mt-2">
          Choose the plan that fits your job search needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`card p-8 rounded-2xl flex flex-col gap-6 relative ${
              plan.highlighted ? "ring-2 ring-primary-200" : ""
            }`}
          >
            {plan.highlighted && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 primary-gradient rounded-full text-xs font-bold text-dark-100">
                Most Popular
              </div>
            )}

            <div>
              <h3 className="text-xl font-bold text-white">{plan.name}</h3>
              <p className="text-light-400 text-sm mt-1">{plan.description}</p>
            </div>

            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-white">
                {plan.price}
              </span>
              <span className="text-light-400">{plan.period}</span>
            </div>

            <ul className="flex flex-col gap-3 flex-1">
              {plan.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-2 text-sm text-light-100"
                >
                  <Check className="size-4 text-success-100 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            <button
              className={
                plan.highlighted
                  ? "auth-button"
                  : plan.disabled
                  ? "btn-secondary w-full py-3 opacity-60 cursor-not-allowed"
                  : "btn-secondary w-full py-3"
              }
              disabled={plan.disabled}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
