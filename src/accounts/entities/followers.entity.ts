import { User } from "src/auth/entities/user.entity";
import { stateRequest } from "src/enums/request-state.enum";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Follower{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "date"})
    request_date: string;

    @Column({type: "date"})
    request_update_date: string;

    @Column({
        type: 'enum',
        enum: [stateRequest.ACEPTED, stateRequest.PENDING, stateRequest.REJECT],
        default: stateRequest.PENDING
    })
    state: stateRequest;

    @OneToOne(
        () => User,
        user => user.follower
    )
    id_user: User;

    @OneToOne(
        () => User,
        user => user.user_follower
    )
    id_user_follower: User;
}