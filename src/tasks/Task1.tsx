import React, { useState } from "react";

// --- TYPESCRIPT DEFINITIONS ---

// Describes the structure for a single pricing tier (e.g., monthly or annually)
type PlanDetails = {
  price: string;
  priceSuffix: string; // e.g., "/ month" or "/ year"
  features: string[];
  badge?: string; // Optional badge like "Save 20%"
};

// Describes the overall structure for a pricing plan
type Plan = {
  plan: string;
  options: {
    monthly: PlanDetails;
    annually: PlanDetails;
  };
  isFeatured?: boolean;
};

// Props for the PricingCard component
type PricingCardProps = {
  plan: string;
  details: PlanDetails;
  isFeatured?: boolean;
  onSubscribe: (plan: string) => void;
};

// --- DATA ---

const plans: Plan[] = [
  {
    plan: "Standard",
    options: {
      monthly: {
        price: "$29",
        priceSuffix: "/ month",
        features: ["50,000 Requests", "4 Contributors", "3 GB Storage"],
      },
      annually: {
        price: "$290",
        priceSuffix: "/ year",
        features: ["50,000 Requests", "4 Contributors", "3 GB Storage"],
        badge: "2 months free",
      },
    },
  },
  {
    plan: "Pro",
    options: {
      monthly: {
        price: "$79",
        priceSuffix: "/ month",
        features: ["100,000 Requests", "7 Contributors", "6 GB Storage"],
      },
      annually: {
        price: "$790",
        priceSuffix: "/ year",
        features: ["100,000 Requests", "7 Contributors", "6 GB Storage"],
        badge: "2 months free",
      },
    },
    isFeatured: true,
  },
  {
    plan: "Expert",
    options: {
      monthly: {
        price: "$149",
        priceSuffix: "/ month",
        features: ["200,000 Requests", "11 Contributors", "10 GB Storage"],
      },
      annually: {
        price: "$1490",
        priceSuffix: "/ year",
        features: ["200,000 Requests", "11 Contributors", "10 GB Storage"],
        badge: "2 months free",
      },
    },
  },
];

// --- COMPONENTS ---

export const PricingCard: React.FC<PricingCardProps> = ({
  plan,
  details,
  isFeatured = false,
  onSubscribe,
}) => {
  // Base classes for the card
  const cardClasses = [
    "flex flex-col items-center justify-between",
    "w-full max-w-xs mx-auto rounded-lg bg-white shadow-md transition",
    "outline-none focus-visible:ring-4 focus-visible:ring-blue-400",
    "hover:shadow-2xl hover:-translate-y-1 duration-200",
    isFeatured
      ? "bg-blue-900 text-white shadow-xl scale-105 z-10"
      : "text-gray-800",
  ].join(" ");

  // Classes for the button, conditional on the `isFeatured` prop
  const buttonClasses = [
    "w-full py-3 text-center font-semibold uppercase tracking-wide",
    "rounded-b-lg transition focus-visible:outline-none",
    "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400",
    isFeatured
      ? "bg-white text-blue-900 hover:bg-blue-100"
      : "bg-gray-800 text-white hover:bg-gray-700",
  ].join(" ");

  return (
    <div tabIndex={0} className={cardClasses} aria-label={`${plan} plan`}>
      {/* --- Card Header --- */}
      <div className="flex flex-col items-center w-full px-8 py-8">
        <div className="relative w-full text-center">
          <span
            className={`text-lg font-semibold mb-2 ${
              isFeatured ? "text-white" : "text-gray-700"
            }`}
          >
            {plan}
          </span>
          {details.badge && (
            <span className="absolute -top-4 -right-4 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {details.badge}
            </span>
          )}
        </div>
        <div className="flex items-baseline mb-4">
          <span className="text-5xl font-bold">{details.price}</span>
          <span className="ml-1 text-lg text-gray-400">
            {details.priceSuffix}
          </span>
        </div>
        <div className="w-full border-t border-gray-200 mb-4" />

        {/* --- Features List --- */}
        <ul className="w-full mb-8 space-y-4">
          {details.features.map((feature, idx) => (
            <li
              key={idx}
              className={`text-center text-base ${
                isFeatured ? "text-gray-200" : "text-gray-700"
              }`}
            >
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* --- Subscribe Button --- */}
      <button onClick={() => onSubscribe(plan)} className={buttonClasses}>
        Subscribe
      </button>
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---

const Task: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">(
    "monthly"
  );

  const handleSubscribe = (planName: string) => {
    alert(`You've subscribed to the ${planName} (${billingCycle}) plan!`);
    // In a real app, you would handle the subscription logic here.
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-6 text-center">
        Flexible Pricing
      </h1>

      {/* --- Billing Cycle Toggle --- */}
      <div className="flex items-center justify-center space-x-4 mb-12">
        <span
          className={`font-medium ${
            billingCycle === "monthly" ? "text-white" : "text-gray-400"
          }`}
        >
          Monthly
        </span>
        <button
          onClick={() =>
            setBillingCycle(billingCycle === "monthly" ? "annually" : "monthly")
          }
          className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-700 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          role="switch"
          aria-checked={billingCycle === "annually"}
        >
          <span
            className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
              billingCycle === "annually" ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
        <span
          className={`font-medium ${
            billingCycle === "annually" ? "text-white" : "text-gray-400"
          }`}
        >
          Annually
        </span>
      </div>

      {/* --- Pricing Cards Container --- */}
      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-5xl justify-center items-center">
        {plans.map((p) => (
          <PricingCard
            key={p.plan}
            plan={p.plan}
            details={p.options[billingCycle]}
            isFeatured={p.isFeatured}
            onSubscribe={handleSubscribe}
          />
        ))}
      </div>
    </div>
  );
};

export default Task;
