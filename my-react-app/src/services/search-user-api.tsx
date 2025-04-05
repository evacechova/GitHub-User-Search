export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
}

export interface UsersData {
  total_count: number;
  items: GitHubUser[];
}

export const fetchUsers = async (username: string) => {
  const response = await fetch(
    `https://api.github.com/search/users?q=${username}`
  );

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};
