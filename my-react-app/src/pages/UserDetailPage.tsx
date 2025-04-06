import { NavLink } from '../components/NavLink';
import { useQuery } from '@tanstack/react-query';
import { useParams, useSearchParams } from 'react-router-dom';
import { fetchUserDetails } from '../services/user-details-api';

export const UserDetailPage = () => {
  const { username } = useParams<{ username: string }>();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';
  const page = searchParams.get('page') ?? '1';

  const {
    data: repos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['userRepos', username],
    queryFn: () => fetchUserDetails(username!),
    enabled: !!username,
  });

  if (isLoading) return <div>Loading user repositories...</div>;
  if (isError) return <div>Error loading repositories.</div>;

  return (
    <div className="page-section page-section-col">
      <NavLink query={query} page={page} />
      <h1>User: {username}</h1>
      <h2>Public repositories:</h2>
      <ul>
        {repos.length > 0 ? (
          repos.map(
            (repo: {
              id: number;
              name: string;
              description: string;
              forks: number;
            }) => (
              <div className="repo-unit" key={repo.id}>
                <h3>{repo.name}</h3>
                <ul>
                  <li>
                    <strong>Description:</strong> {repo.description}
                  </li>
                  <li>
                    <strong>Forks:</strong> {repo.forks}
                  </li>
                </ul>
              </div>
            )
          )
        ) : (
          <p>User has no public repositories.</p>
        )}
      </ul>
    </div>
  );
};
