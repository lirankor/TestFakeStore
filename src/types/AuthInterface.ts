export interface User {
    id: number;
    email: string;
    username: string;
    firstName?: string;
    lastName?: string;
    avatar?: string;
    phone?: string;
    address?: {
        city: string;
        street: string;
        number: number;
        zipcode: string;
    };
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoggedIn: boolean;
    login: (user: User) => void;
    logout: () => void;
    updateUser: (userData: Partial<User>) => void;
}

export interface LoginForm {
    username: string;
    password: string;
}

export interface RegisterForm {
    email: string;
    username: string;
    password: string;
}