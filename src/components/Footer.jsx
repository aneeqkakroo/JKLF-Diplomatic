import { Link } from "react-router-dom";

import { MAIN_SITE, socialLinks } from "../data/bureau";
import Logo from "./Logo";
import SocialIcon from "./SocialIcon";
import { Container } from "./ui";

const links = [
  ["Our Position", "/position"],
  ["The Bureau", "/bureau"],
  ["Statements", "/statements"],
  ["Documents", "/documents"],
  ["Contact", "/contact"],
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <Container>
        <div className="site-footer__main">
          <div className="site-footer__brand">
            <Logo size={52} />
            <h2>JKLF Diplomatic Bureau</h2>
            <p>
              The international wing of the Jammu Kashmir Liberation Front,
              reporting to the Central Committee.
            </p>
            <a className="site-footer__main-link" href={MAIN_SITE}>
              Visit jklf.org
            </a>
          </div>

          <nav className="site-footer__links" aria-label="Footer">
            {links.map(([label, to]) => (
              <Link key={to} to={to}>
                {label}
              </Link>
            ))}
          </nav>

          <ul className="site-footer__social">
            {socialLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`JKLF on ${link.name}`}
                  title={link.name}
                >
                  <SocialIcon id={link.id} size={18} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="site-footer__bottom">
          © {new Date().getFullYear()} Jammu Kashmir Liberation Front
        </div>
      </Container>
    </footer>
  );
}
