import { User } from "src/auth/entities/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Posts } from "./posts.entity";


@Entity()
export class Comment{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'text'})
    comment: string;

    @Column({type: 'text'})
    comment_date: string;

    @OneToMany(
        () => User,
        user => user.comment_user
    )
    comment_id_user: User;

    @OneToMany(
        () => Posts,
        post => post.id_user_in_post
    )
    id_post: Posts;
}