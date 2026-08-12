import { Link, NavLink } from "react-router-dom";
import { areas } from "@/data/areas";

const SiteHeader = () => (
  <header className="border-b border-border/60 bg-background/80 backdrop-blur sticky top-0 z-40">
    <div className="container flex items-center justify-between gap-6 py-4">
      <Link to="/" className="font-display text-lg tracking-tight">
        Mayowa <span className="text-primary">Soladoye</span>
      </Link>
      <nav className="hidden md:flex items-center gap-5 text-sm text-muted-foreground overflow-x-auto">
        {areas.slice(0, 5).map((a) => (
          <NavLink
            key={a.slug}
            to={`/work/${a.slug}`}
            className={({ isActive }) =>
              `whitespace-nowrap transition-colors hover:text-foreground ${isActive ? "text-foreground" : ""}`
            }
          >
            {a.name}
          </NavLink>
        ))}
        <Link to="/#areas" className="whitespace-nowrap hover:text-foreground">
          All areas
        </Link>
      </nav>
    </div>
  </header>
);

export default SiteHeader;
