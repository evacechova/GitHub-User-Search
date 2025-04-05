import styles from './UserCard.module.css';
import { Link } from 'react-router-dom';

interface UserCardProps {
  avatar: string;
  username: string;
  to: string;
}

export const UserCard = ({ avatar, username, to }: UserCardProps) => {
  return (
    <div className={styles.userCard}>
      <Link to={to}>
        <img
          className={styles.userAvatar}
          src={avatar}
          alt={`User avatar for ${username}`}
        />
      </Link>
      <h2>{username}</h2>
    </div>
  );
};
