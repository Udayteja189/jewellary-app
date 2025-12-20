export interface User {
  id: string;
  name?: string;
  email?: string;
  roles?: string[];
}

export type AuthState = {
  user: User | null;
  email: string | null;
};

export interface UserState {
    user: string | null;
    email: string | null;
}
