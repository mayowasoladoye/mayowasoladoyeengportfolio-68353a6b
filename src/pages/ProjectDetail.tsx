import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import SiteHeader from "@/components/SiteHeader";
import { supabase } from "@/integrations/supabase/client";

const ProjectDetail = () => {
  const { slug } = useParams();

  const { data: project, isLoading } = useQuery({
    queryKey: ["project", slug],
    enabled: !!slug,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("slug", slug!)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="container py-16">
        {isLoading ? (
          <p className="text-muted-foreground">Loading…</p>
        ) : !project ? (
          <>
            <h1 className="text-3xl">Project not found</h1>
            <Link to="/" className="mt-4 inline-block text-primary">Back home</Link>
          </>
        ) : (
          <article className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.3em] text-accent">{project.category}</p>
            <h1 className="mt-3 text-4xl">{project.title}</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {[project.year, project.location].filter(Boolean).join(" · ")}
            </p>
            {project.image_url && (
              <img
                src={project.image_url}
                alt={`${project.title} preview`}
                loading="lazy"
                className="mt-8 w-full rounded-lg border border-border object-cover"
              />
            )}
            <p className="mt-8 text-lg">{project.description}</p>
            {project.long_description && (
              <p className="mt-4 whitespace-pre-line text-muted-foreground">{project.long_description}</p>
            )}
            <div className="mt-6 flex flex-wrap gap-2">
              {(project.technologies ?? []).map((t) => (
                <span key={t} className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">
                  {t}
                </span>
              ))}
            </div>
            {project.external_url && (
              <a
                href={project.external_url}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-block rounded-md bg-primary px-5 py-2.5 text-primary-foreground"
              >
                View project
              </a>
            )}
          </article>
        )}
      </main>
    </div>
  );
};

export default ProjectDetail;
