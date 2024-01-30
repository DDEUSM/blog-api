type TUserInput = {
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string,
    refreshToken?: string,
    id?: string
}

type TUserDatabase = {
    first_name: string,
    last_name: string,
    email: string,
    password_hash: string,
    refresh_token?: string,
    id: string
}

type TPostInput = {
    ownerId?: string,
    title?: string,
    content?: string,
    id?: string,
    date?: Date
}

type TPostDatabase = {
    owner_id: string,
    title: string,
    content: string,
    id: string,
    date: Date
}