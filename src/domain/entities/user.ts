export type User = {
  id: string;
  name: string;
  nickname: string;
  email: string;
  password: string;
  country: string;
  role: Role;
  ranking: Ranking;
};

type Role = {
  id: string;
  name: string;
  description: string;
  permissions: Array<Permission>;
};

type Permission = {
  id: string;
  name: string;
  description: string;
};

type Ranking = {
  id: string;
  level: number;
  exp: number;
};
