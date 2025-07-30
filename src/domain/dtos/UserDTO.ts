export interface CreateUserDTO {
    name: string;
    email: string;
    password: string;
    photo_url?: string;
    phone?: string;
}

export interface UpdateUserDTO {
    name?: string;
    email?: string;
    password?: string;
    phone?: string;
    photo_url?: string;
}