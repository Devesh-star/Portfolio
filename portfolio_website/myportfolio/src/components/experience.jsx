import React, { useState } from "react";

// ── Sample data – replace with your real certifications ──────────────────────
const certifications = [
  {
    id: 1,
    title: "AI Infrastructure & Operational Fundamentals",
    issuer: "Nvidia / Coursera",
    date: "Feb 2026",
    credentialId: "LJNP4N49B2MG",
    credentialUrl: "https://www.coursera.org/account/accomplishments/verify/LJNP4N49B2MG",
    img: "https://s3.amazonaws.com/cms.ipressroom.com/219/files/202512/692f50553d6332b453bbc5c2_nvidia-logo-vert-blk/nvidia-logo-vert-blk_thmb.png",
    category: "AI / ML",
    skills: ["AI infrastructure architecture" , "GPU computing" , "AI data center design"],
    color: "#FF9900",
  },
  {
    id: 2,
    title: "Hands On Mastery Of React Hooks",
    issuer: "Msit / Devtown",
    date: "Jan 2026",
    credentialId: "Z2ieX4q",
    credentialUrl: "https://www.cert.devtown.in/verify/Z2ieX4q",
    img: "https://media.licdn.com/dms/image/v2/D4D0BAQH30Q9PosWRsQ/company-logo_200_200/company-logo_200_200/0/1693388532934?e=2147483647&v=beta&t=mdVez_wOP4vD-p7owYp3lCIghpF-5x7tLnNMmVBHaWM",
    category: "Web Dev",
    skills: ["React Hooks", "React States"],
    color: "#4285F4",
  },
  {
    id: 3,
    title: "Programming With Java",
    issuer: "Aws / Coursera",
    date: "Oct 2025",
    credentialId: "TYFB7G8W4UHD",
    credentialUrl: "https://www.coursera.org/account/accomplishments/verify/TYFB7G8W4UHD",
    img: "https://www.inovex.de/wp-content/uploads/Amazon_Web_Services_Logo-kl.png",
    category: "Java",
    skills: ["Java"],
    color: "#0081FB",
  }
];

const CATEGORIES = ["All", ...new Set(certifications.map((c) => c.category))];

// ── Component ─────────────────────────────────────────────────────────────────
const Certifications = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredId, setHoveredId] = useState(null);

  const filtered =
    activeCategory === "All"
      ? certifications
      : certifications.filter((c) => c.category === activeCategory);

  return (
    <section
      id="certifications"
      className="py-24 px-[12vw] md:px-[7vw] lg:px-[16vw] font-sans bg-skills-gradient clip-path-custom2"
    >
      {/* ── Section Header ── */}
      <div className="text-center mb-12">
        <h2 className="text-4xl sm:text-4xl text-white font-bold">
          Certifications
        </h2>
        <div className="w-32 h-1 bg-[#8245ec] mx-auto mt-3 mb-4 rounded-full" />
        <p className="text-gray-300 text-base sm:text-lg font-medium max-w-2xl mx-auto leading-relaxed">
          Credentials I've earned through rigorous coursework, hands-on exams,
          and professional training programs across cloud, AI, and web development.
        </p>
      </div>

      {/* ── Category Filter Pills ── */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-300 ${
              activeCategory === cat
                ? "bg-[#8245ec] border-[#8245ec] text-white shadow-[0_0_16px_rgba(130,69,236,0.6)]"
                : "bg-transparent border-gray-600 text-gray-400 hover:border-[#8245ec] hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── Certification Cards Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((cert) => (
          <div
            key={cert.id}
            onMouseEnter={() => setHoveredId(cert.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="relative rounded-2xl border border-white/10 bg-gray-900/70 backdrop-blur-md overflow-hidden
                       transition-transform duration-300 hover:scale-105
                       shadow-[0_0_20px_1px_rgba(130,69,236,0.2)]
                       hover:shadow-[0_0_32px_4px_rgba(130,69,236,0.45)]"
          >
            {/* Glow accent bar */}
            <div
              className="h-1 w-full"
              style={{ background: cert.color }}
            />

            <div className="p-6 flex flex-col h-full">
              {/* Issuer logo + meta */}
              <div className="flex items-center gap-4 mb-5">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center bg-white/10 border border-white/20 shrink-0 overflow-hidden p-2"
                >
                  <img
                    src={cert.img}
                    alt={cert.issuer}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="text-white font-bold text-sm sm:text-base leading-snug line-clamp-2">
                    {cert.title}
                  </h3>
                  <p className="text-gray-400 text-xs mt-0.5">{cert.issuer}</p>
                </div>
              </div>

              {/* Date + Category badge */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-gray-500 text-xs">📅 {cert.date}</span>
                <span
                  className="ml-auto text-xs px-2.5 py-0.5 rounded-full font-semibold border"
                  style={{
                    color: cert.color,
                    borderColor: cert.color + "55",
                    background: cert.color + "18",
                  }}
                >
                  {cert.category}
                </span>
              </div>

              {/* Credential ID */}
              <div className="mb-4 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-0.5">
                  Credential ID
                </p>
                <p className="text-gray-300 text-xs font-mono">{cert.credentialId}</p>
              </div>

              {/* Skills */}
              <div className="mb-5">
                <p className="text-white text-xs font-semibold mb-2 uppercase tracking-wider">
                  Skills Validated
                </p>
                <ul className="flex flex-wrap gap-1.5">
                  {cert.skills.map((skill, i) => (
                    <li
                      key={i}
                      className="text-gray-300 text-xs px-3 py-1 rounded-lg border border-gray-700 bg-gray-800/60"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Verify button */}
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto flex items-center justify-center gap-2 w-full py-2.5 rounded-xl
                           border border-[#8245ec] text-[#c084fc] text-sm font-semibold
                           hover:bg-[#8245ec] hover:text-white transition-all duration-300
                           shadow-[0_0_0_rgba(130,69,236,0)] hover:shadow-[0_0_14px_rgba(130,69,236,0.5)]"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
                Verify Credential
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* ── Stats Bar ── */}
      <div className="mt-16 grid grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/10 bg-gray-900/40 backdrop-blur-md overflow-hidden">
        {[
          { label: "Certifications", value: certifications.length + "+" },
          { label: "Issuing Bodies", value: new Set(certifications.map((c) => c.issuer)).size + "+" },
          { label: "Domains Covered", value: CATEGORIES.length - 1 },
        ].map((stat) => (
          <div key={stat.label} className="flex flex-col items-center py-6 px-4">
            <span className="text-3xl font-bold text-[#c084fc]">{stat.value}</span>
            <span className="text-gray-400 text-xs mt-1 text-center">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Certifications;
