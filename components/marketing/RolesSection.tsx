import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

const roles = [
  {
    role: "Frontend Developer",
    company: "Amazon",
    logo: "/covers/amazon.png",
    desc: "Work on world-class user interfaces at massive scale using modern component architecture.",
    tech: ["React", "Next.js", "Tailwind"],
  },
  {
    role: "Product Manager",
    company: "Facebook",
    logo: "/covers/facebook.png",
    desc: "Drive product strategy and execution across social platforms used by billions.",
    tech: ["Agile", "Jira", "Strategy"],
  },
  {
    role: "Backend Engineer",
    company: "Spotify",
    logo: "/covers/spotify.png",
    desc: "Scale high-performance APIs and streaming infrastructure for millions of listeners.",
    tech: ["Node.js", "Python", "Redis"],
  },
];

export function RolesSection() {
  return (
    <section className="main-section py-24 bg-white/[0.02] border-y border-white/5 w-full">
      <div className="max-w-5xl w-full mx-auto">
        <Reveal className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold">
              Recommended <span className="text-gradient">Roles</span>
            </h2>
            <p className="text-light-400 mt-2">Practice for the most in-demand positions in tech</p>
          </div>
          <Link href="/auth/sign-up" className="text-primary-200 hover:underline text-sm font-medium">
            View all roles →
          </Link>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map((job, i) => (
            <Reveal key={job.role} delay={i * 60} className="group">
              <div className="card p-6 border border-white/5 hover:border-primary-200/30 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <div className="size-10 rounded-lg bg-white/5 p-2 flex-center overflow-hidden transition-transform duration-200 ease-out group-hover:scale-105">
                    <Image
                      src={job.logo}
                      alt={job.company}
                      width={32}
                      height={32}
                      className="size-full object-contain"
                    />
                  </div>
                  <div className="flex gap-1">
                    {job.tech.map((t) => (
                      <span
                        key={t}
                        className="px-1.5 py-0.5 rounded-md text-[9px] font-bold bg-white/5 text-light-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-1 text-white">{job.role}</h3>
                <p className="text-xs text-primary-200 mb-3 font-medium">{job.company}</p>
                <p className="text-xs text-light-400 mb-6 leading-relaxed flex-1">{job.desc}</p>
                <Link href="/auth/sign-up" className="btn-secondary w-full text-xs py-2 min-h-0">
                  Prepare for this role
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
