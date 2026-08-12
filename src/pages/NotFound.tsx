import { Link } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";

const NotFound = () => (
  <div className="min-h-screen">
    <SiteHeader />
    <main className="container py-24 text-center">
      <h1 className="text-5xl">404</h1>
      <p className="mt-3 text-muted-foreground">This page doesn't exist.</p>
      <Link to="/" className="mt-6 inline-block text-primary">Return home</Link>
    </main>
  </div>
);

export default NotFound;
