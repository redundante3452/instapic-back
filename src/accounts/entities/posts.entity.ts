import { User } from "src/auth/entities/user.entity";
import { Comment } from "./comments.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Posts{
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({type: "text"})
    uri_source: string;

    @Column({type:'date'})
    post_date: string;

    @Column({type:'date'})
    title: string;
//  Inicio de mis relaciones
    @OneToMany(
        () => User,
        user => user.posts
    )
    id_user: User;

    @ManyToOne(
        () => Comment,
        comment => comment.id_post
    )
    id_user_in_post: Comment;

}