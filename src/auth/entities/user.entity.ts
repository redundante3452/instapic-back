import { Follower } from "src/accounts/entities/followers.entity";
import { Posts } from "src/accounts/entities/posts.entity";
import { Comment } from "src/accounts/entities/comments.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'text',
        unique: true,
    })
    nickname: string;

    @Column('text')
    password: string;

    @Column({
        type: 'text',
        unique: true,
    })
    email: string;

    @Column('text')
    name: string;

    @Column('text')
    last_name: string;

    @Column({type:'date'})
    birth_date: string;

    @Column({type:'date', default:new Date()})
    create_date: string;

    @Column({default:true})
    is_active: boolean

    @ManyToOne(
        () => Posts,
        posts => posts.id_user,
    )
    posts?: Posts[];

    @OneToOne(
        () => Follower,
        follower => follower.id_user
    )
    follower: Follower;

    @OneToOne(
        () => Follower,
        follower => follower.id_user_follower
    )
    user_follower: Follower;

    @ManyToOne(
        () => Comment,
        comment => comment.comment_id_user
    )
    comment_user: Comment;

}
