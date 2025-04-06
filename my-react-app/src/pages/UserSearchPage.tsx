import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { SearchBar } from '../components/SearchBar/SearchBar';
import { fetchUsers, GitHubUser, UsersData } from '../services/search-user-api';
import { UserCard } from '../components/UserCard/UserCard';
import { Pagination } from '../components/Pagination/Pagination';

export const UserSearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams('');
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [page, setPage] = useState(Number(searchParams.get('page') || 1));
  const navigate = useNavigate();

  // Update the URL when searchQuery or page changes
  useEffect(() => {
    setSearchParams({ query: query, page: page.toString() });
  }, [query, page, setSearchParams]);

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
    queryFn: () => fetchUsers(debouncedQuery, page),
    queryKey: ['users', debouncedQuery, page],
    enabled: !!debouncedQuery,
  });

  const isLoading = debouncedQuery ? isUsersLoading : false;
  const isError = debouncedQuery ? isUsersError : false;
  const usersList = debouncedQuery ? users : false;

  //Page reset
  const handleReset = () => {
    setQuery('');
    setPage(1);
    navigate('/');
  };

  return (
    <div>
      <div className="page-section page-section-col">
        <Link to={'/'} onClick={handleReset}>
          <h1 className="gradient-hover">User Search</h1>
        </Link>
        <SearchBar onSearchChange={setQuery} value={query} />
      </div>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error loading users!</div>}
      {usersList && usersList.total_count === 0 && <div>No users found.</div>}
      {usersList && usersList.total_count > 0 && (
        <>
          <Pagination
            currentPage={page}
            onPageChange={setPage}
            totalResults={usersList.total_count}
            totalPages={Math.ceil(usersList.total_count / 30)}
          />
          <div className="page-section page-section-row">
            {usersList.items.map((user: GitHubUser) => (
              <UserCard
                key={user.id}
                avatar={user.avatar_url}
                username={user.login}
                to={`user-detail/${user.login}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
