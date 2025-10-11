import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation(); // Pour surligner la page active

  const links = [
    { to: "/", label: "Nouveautés" },
    { to: "/vetements", label: "Vêtements" },
    { to: "/chaussures", label: "Chaussures" },
    { to: "/accessoires", label: "Accessoires" },
    { to: "/voiles", label: "Voiles" },
    { to: "/promotions", label: "Promotions" },
  ];

  return (
    <nav className="bg-[#CBB59C] shadow-sm sticky top-0 z-50">
      <ul className="flex flex-wrap justify-center gap-4 py-2 text-white font-semibold text-xs md:text-sm">
        {links.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              className={`transition-all duration-200 hover:text-[#8B5E3C] ${
                location.pathname === link.to ? "text-[#8B5E3C] underline" : ""
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
