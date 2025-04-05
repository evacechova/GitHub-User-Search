import { Link } from 'react-router-dom';
import { SearchBar } from '../components/SearchBar';

//Page reset
const handleReset = () => {
  // setQuery('');
  // setPage(1);
  // navigate('/');
};

export const UserSearchPage = () => {
  return (
    <>
      <Link to={'/'} onClick={handleReset}>
        <h1>User Search</h1>
      </Link>
      <SearchBar
      // onSearchChange={setQuery} value={query}
      />
      <Link to="user-detail/1">Go to user detail</Link>
    </>
  );
};
