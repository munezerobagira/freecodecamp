import { Link } from "react-router-dom";

const links = [
  {
    text: "Home",
    path: "/",
  },
  {
    text: "Drum",
    path: "/Drum",
  },
  {
    text: "Calculator",
    path: "/calculator",
  },
  {
    text: "Pomodo",
    path: "/pomodo",
  },
];

function Navbar() {
  return (
    <header>
      <div id="logo">Drucal pomodo</div>
      <nav>
        {links.map((link) => (
          <Link to={link.path} key={link.path}>
            {link.text}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export default Navbar;
