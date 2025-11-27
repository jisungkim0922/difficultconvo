import NoStars from "@/app/components/NoStars";
import "./stars-nuke.css";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  // Wrap all blog pages so we can target .blog-root in CSS
  return <div className="blog-root">{children}</div>;
      <NoStars />
}
