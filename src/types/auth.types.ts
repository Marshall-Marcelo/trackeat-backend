export interface UserRow {
  user_id: string;
  email: string;
  password: string;
  username: string;
}

export interface User {
  userId: string | undefined;
  email: string | undefined;
  username: string | undefined;
}
