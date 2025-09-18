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

export interface AccountValuePoint {
    date: Date;
    value: string;
}

export interface User {
    id: string
    username: string
}

export type AuthResponse = {
    accessToken: string;
}

export type Page<T> = {
    content: T[];
    pageable: {
        pageNumber: number;
        pageSize: number;
        offset: number;
        paged: boolean;
        unpaged: boolean;
        sort: {
            sorted: boolean;
            unsorted: boolean;
            empty: boolean;
        };
    };
    totalPages: number;
    totalElements: number;
    last: boolean;
    first: boolean;
    number: number;
    numberOfElements: number;
    empty: boolean;
    sort: {
        sorted: boolean;
        unsorted: boolean;
        empty: boolean;
    };
};