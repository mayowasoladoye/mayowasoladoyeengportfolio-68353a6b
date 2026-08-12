import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import ProjectCard from "@/components/ProjectCard";
import Hero from "@/components/Hero";
import { areas } from "@/data/areas";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const { data: featured = [] } = useQuery({
    queryKey: ["featured-projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("featured", true)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <Hero />

        <section className="container py-16 md:py-20">
          <p className="text-sm uppercase tracking-[0.3em] text-accent">Multidisciplinary portfolio</p>
          <h2 className="mt-4 max-w-3xl text-3xl md:text-5xl leading-[1.05]">
            Engineering rigour, data craft and creative work in one place.
          </h2>
          <p className="mt-6 max-w-2xl text-muted-foreground">
            3rd-year Chemical Engineering student at Covenant University, based in Abuja, Nigeria.
            I build process engineering tools, analytics and data platforms, and produce video, music and
            photography. Each discipline lives in its own sub-portfolio below.
          </p>
        </section>

        <section id="areas" className="container pb-20">
          <h2 className="text-2xl mb-6">Sub-portfolios</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {areas.map((area) => (
              <Link
                key={area.slug}
                to={`/work/${area.slug}`}
                className="group rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary/60"
              >
                <h3 className="flex items-center justify-between text-lg">
                  {area.name}
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{area.tagline}</p>
              </Link>
            ))}
          </div>
        </section>

        {featured.length > 0 && (
          <section className="container pb-24">
            <h2 className="text-2xl mb-6">Featured work</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </section>
        )}

        <section id="skills" className="container pb-24">
          <h2 className="text-2xl mb-6">Skills</h2>
          <ul className="flex flex-wrap gap-3 text-sm">
            {[
              "AutoCAD",
              "Fusion 360",
              "Python",
              "MATLAB",
              "Simulink",
              "Microsoft Excel",
              "Microsoft Word",
              "ASPEN HYSYS",
            ].map((skill) => (
              <li
                key={skill}
                className="rounded-full border border-border bg-card px-4 py-2 text-muted-foreground"
              >
                {skill}
              </li>
            ))}
          </ul>
        </section>
      </main>
      <footer className="border-t border-border/60 py-8">
        <div className="container flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
          <span>© {new Date().getFullYear()} Mayowa Soladoye</span>
          <div className="flex flex-wrap gap-5">
            <a className="hover:text-foreground" href="mailto:mayowasoladoye720@gmail.com">
              Email
            </a>
            <a
              className="hover:text-foreground"
              href="https://www.linkedin.com/in/mayowa-soladoye-1536682a7"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a
              className="hover:text-foreground"
              href="https://github.com/mayowasoladoye"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
