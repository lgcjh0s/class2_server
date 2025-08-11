import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: 'TB_USER' })
export class User {

    @PrimaryColumn('varchar',{ name: 'USER_ID', length: 8, nullable: false })
    userId: string;

    @Column('varchar',{ name: 'PASSWORD', length: 20, nullable: false })
    password: string;

    @Column('varchar',{ name: 'USER_NAME', length: 20, nullable: false })
    userName: string;

    @Column('varchar',{ name: 'REFRESH_TOKEN', length: 100, nullable: true })
    refreshToken: string;
}
