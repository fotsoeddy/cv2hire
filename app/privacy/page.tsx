import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import { SiteFooter } from "@/components/marketing/SiteFooter";

export const metadata: Metadata = {
  title: "Privacy Policy - CV2Hire",
  description: "How CV2Hire collects, uses, and protects your data.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="main-section py-16 flex-1">
        <div className="max-w-3xl w-full mx-auto flex flex-col gap-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
            <p className="text-light-400 mt-2 text-sm">Last updated: January 2026</p>
          </div>

          <p className="text-light-100 leading-relaxed">
            CV2Hire (&ldquo;we&rdquo;, &ldquo;us&rdquo;) provides AI-powered CV analysis and voice
            mock interview tools. This policy explains what data we collect when you use the
            platform, why we collect it, and the choices you have.
          </p>

          <section className="flex flex-col gap-3">
            <h2>1. Information We Collect</h2>
            <ul className="flex flex-col gap-2">
              <li>
                <span className="text-white font-medium">Account data</span> — your name, email
                address, and authentication credentials when you sign up.
              </li>
              <li>
                <span className="text-white font-medium">CV and job description content</span> —
                the resume files and optional job descriptions you upload for analysis.
              </li>
              <li>
                <span className="text-white font-medium">Interview audio and transcripts</span> —
                audio captured during voice mock interviews and the resulting transcripts, used to
                generate feedback.
              </li>
              <li>
                <span className="text-white font-medium">Usage data</span> — pages visited,
                features used, and general device/browser information for reliability and
                analytics.
              </li>
            </ul>
          </section>

          <section className="flex flex-col gap-3">
            <h2>2. How We Use Your Data</h2>
            <p>
              We use your CV, job description, and interview data solely to generate the
              analysis, scoring, and feedback you request, and to let you review your history
              inside your own dashboard. We use account and usage data to operate, secure, and
              improve the platform.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2>3. AI Processing</h2>
            <p>
              CV analysis and interview feedback are generated using third-party AI model
              providers. Content you submit is sent to these providers solely to produce your
              results and is not used by CV2Hire to train our own models without your consent.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2>4. Data Sharing</h2>
            <p>
              We do not sell your personal data, CV content, or interview recordings. We share
              data only with the infrastructure and AI providers required to run the service, and
              only to the extent needed to deliver it.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2>5. Data Retention &amp; Deletion</h2>
            <p>
              CVs, job descriptions, and interview history are retained so you can track progress
              over time. You can delete individual analyses or your entire account at any time
              from your dashboard settings, which removes the associated content from our active
              systems.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2>6. Cookies</h2>
            <p>
              We use essential cookies to keep you signed in and to remember basic preferences.
              We do not use third-party advertising trackers.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2>7. Contact</h2>
            <p>
              Questions about this policy or requests to access or delete your data can be sent to{" "}
              <a href="mailto:support@cv2hire.app" className="text-primary-200 hover:underline">
                support@cv2hire.app
              </a>
              .
            </p>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
