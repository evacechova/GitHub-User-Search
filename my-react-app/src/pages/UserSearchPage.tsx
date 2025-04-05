import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { SearchBar } from '../components/SearchBar/SearchBar';
import { fetchUsers, GitHubUser, UsersData } from '../services/search-user-api';
import { UserCard } from '../components/UserCard/UserCard';

export const UserSearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams('');
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const navigate = useNavigate();

  // Update the URL when searchQuery or page changes
  useEffect(() => {
    setSearchParams({ query: query });
  }, [query, setSearchParams]);

  //Debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);
    return () => clearTimeout(handler);
  }, [query]);

  // Search users query
  const {
    data: users,
    isLoading: isUsersLoading,
    isError: isUsersError,
  } = useQuery<UsersData>({
    queryFn: () => fetchUsers(debouncedQuery),
    queryKey: ['users', debouncedQuery],
    enabled: !!debouncedQuery,
  });

  const isLoading = debouncedQuery ? isUsersLoading : false;
  const isError = debouncedQuery ? isUsersError : false;
  const usersList = debouncedQuery ? users : false;

  //Page reset
  const handleReset = () => {
    setQuery('');
    navigate('/');
  };

  return (
    <div>
      <div className="page-section page-section-col">
        <Link to={'/'} onClick={handleReset}>
          <h1 className="gradient-hover">User Search</h1>
        </Link>
        <SearchBar onSearchChange={setQuery} value={query} />

        {/* <p>
          <strong>Total results:</strong> {usersList.total_count}
        </p> */}
      </div>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error loading users!</div>}
      {usersList && usersList.total_count === 0 && <div>No users found.</div>}
      {usersList && usersList.total_count > 0 && (
        <div className="page-section page-section-row">
          {usersList.items.map((user: GitHubUser) => (
            <UserCard
              key={user.id}
              avatar={user.avatar_url}
              username={user.login}
              to={`user-detail/${user.id}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
