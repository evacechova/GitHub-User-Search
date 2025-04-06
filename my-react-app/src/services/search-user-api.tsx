export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
}

export interface UsersData {
  total_count: number;
  items: GitHubUser[];
}

export const fetchUsers = async (username: string, page: number) => {
  const response = await fetch(
    `https://api.github.com/search/users?q=${username}&page=${page}`
  );

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();

  return data;
};
