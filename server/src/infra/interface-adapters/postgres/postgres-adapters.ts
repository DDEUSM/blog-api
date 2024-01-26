import { UserDto } from "../../../application/dtos/user-dtos/user-dtos";
import InputsCleaner from "../../../utils/cleanInputs";
import { PostDto } from "../../../application/dtos/post-dtos/post-dtos";


export class PostgresUserAdapter
{
    public static toDatabase (user: TUserInput ): any 
    {
        return InputsCleaner.clearInput ({
            first_name: user.firstName,
            last_name: user.lastName,
            email: user.email,
            password_hash: user.passwordHash,
            refresh_token: user.refreshToken,
            id: user.id
        });
    }

    public static toApplication (user: TUserDatabase): UserDto
    {
        return InputsCleaner.clearInput({
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            passwordHash: user.password_hash,
            refreshToken: user.refresh_token,
            id: user.id
        }) as UserDto;
    }
}


export class PostgresPostsAdapter
{
    public static toDatabase (post: TPostInput ): any 
    {
        return InputsCleaner.clearInput ({
            owner_id: post.ownerId,
            title: post.title,
            content: post.content,
            id: post.id
        });
    }

    public static toApplication (post: TPostDatabase): PostDto
    {
        return InputsCleaner.clearInput({
            ownerId: post.owner_id,
            title: post.title,
            content: post.content,
            id: post.id,
            date: post.date 
        }) as PostDto;
    }
}