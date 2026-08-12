import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import ProjectCard from "@/components/ProjectCard";
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
        <section className="container py-20 md:py-28">
          <p className="text-sm uppercase tracking-[0.3em] text-accent">Multidisciplinary portfolio</p>
          <h1 className="mt-4 max-w-3xl text-4xl md:text-6xl leading-[1.05]">
            Engineering rigour, data craft and creative work in one place.
          </h1>
          <p className="mt-6 max-w-2xl text-muted-foreground">
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
      </main>
      <footer className="border-t border-border/60 py-8">
        <div className="container text-sm text-muted-foreground">
          © {new Date().getFullYear()} Mayowa Soladoye
        </div>
      </footer>
    </div>
  );
};

export default Index;
