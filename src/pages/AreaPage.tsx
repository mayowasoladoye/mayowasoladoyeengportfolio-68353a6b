import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import SiteHeader from "@/components/SiteHeader";
import ProjectCard from "@/components/ProjectCard";
import { getArea } from "@/data/areas";
import { supabase } from "@/integrations/supabase/client";

const AreaPage = () => {
  const { areaSlug } = useParams();
  const area = getArea(areaSlug);

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["projects", areaSlug],
    enabled: !!areaSlug,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("area", areaSlug!)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  if (!area) {
    return (
      <div className="min-h-screen">
        <SiteHeader />
        <main className="container py-24">
          <h1 className="text-3xl">Area not found</h1>
          <Link to="/" className="mt-4 inline-block text-primary">Back home</Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="container py-16">
        <p className="text-sm uppercase tracking-[0.3em] text-accent">Sub-portfolio</p>
        <h1 className="mt-3 text-4xl">{area.name}</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">{area.tagline}</p>

        <div className="mt-10">
          {isLoading ? (
            <p className="text-muted-foreground">Loading projects…</p>
          ) : projects.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border p-10 text-center text-muted-foreground">
              No projects published in this area yet.
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AreaPage;
