export const fetchUserDetails = async (username: string) => {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos`
  );

  if (!response.ok) {
    throw new Error(`Network response was not ok`);
  }

  const details = await response.json();

  return details;
};
