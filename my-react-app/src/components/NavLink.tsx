import { Link } from 'react-router-dom';

interface NavLinkProps {
  query: string;
  page: string;
}

export const NavLink = ({ query, page }: NavLinkProps) => {
  return (
    <Link
      className="gradient-hover f-link-md"
      to={`/?query=${query}&page=${page}`}
      aria-label="Back to search"
    >
      ← Back to Search
    </Link>
  );
};
