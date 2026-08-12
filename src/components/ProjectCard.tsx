import { Link } from "react-router-dom";
import type { Tables } from "@/integrations/supabase/types";

const ProjectCard = ({ project }: { project: Tables<"projects"> }) => (
  <Link
    to={`/project/${project.slug}`}
    className="group rounded-lg border border-border bg-card overflow-hidden transition-colors hover:border-primary/60"
  >
    {project.image_url && (
      <img
        src={project.image_url}
        alt={`${project.title} project cover`}
        loading="lazy"
        className="h-44 w-full object-cover"
      />
    )}
    <div className="p-5 space-y-2">
      <p className="text-xs uppercase tracking-widest text-primary">{project.category}</p>
      <h3 className="text-lg leading-snug group-hover:text-primary transition-colors">{project.title}</h3>
      {project.description && (
        <p className="text-sm text-muted-foreground line-clamp-3">{project.description}</p>
      )}
      <div className="flex flex-wrap gap-2 pt-1">
        {(project.technologies ?? []).map((t) => (
          <span key={t} className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
            {t}
          </span>
        ))}
      </div>
    </div>
  </Link>
);

export default ProjectCard;
