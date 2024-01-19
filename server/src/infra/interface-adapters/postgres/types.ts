type TUserInput = {
    firstName?: string,
    lastName?: string,
    email?: string,
    passwordHash?: string,
    refreshToken?: string,
    id?: number
}

type TUserDatabase = {
    first_name: string,
    last_name: string,
    email: string,
    password_hash: string,
    refresh_token?: string,
    id: number
}

type TPostInput = {
    ownerId?: number,
    title?: string,
    content?: string,
    id?: number,
    date?: Date
}

type TPostDatabase = {
    owner_id: number,
    title: string,
    content: string,
    id: number,
    date: Date
}