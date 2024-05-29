import { text } from "stream/consumers";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
