export interface UserSession {
  id: string;
  name: string;
  email: string;
  avatar: string;
  monthlySalary: number;
  totalBalance: number;
  monthlySaving: number;
}

export const DEMO_USER: UserSession = {
  id: "user-demo-123",
  name: "Aditya Sharma",
  email: "aditya@alder.com",
  avatar: "AS",
  monthlySalary: 85000,
  totalBalance: 482500,
  monthlySaving: 33000,
};
