export interface Expense {
    id: string
    name: string
    amount: string
    date: Date
    category: Category
    account: Account
}

export interface Category {
    id: string
    name: string
    parentId: string
}

export interface Account {
    id: string
    name: string
    balance: string
}

export interface User {
  id: string
  username: string
}

export type AuthResponse = {
    accessToken: string;
}