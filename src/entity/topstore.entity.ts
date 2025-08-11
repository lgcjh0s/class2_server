import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity({ name: 'TB_TOP_STORE' })
export class TopStore {

    @PrimaryColumn('int', { name: 'SEQ', nullable: false })
    seq?: number;

    @Column('int', { name: 'DRW_NO', nullable: false })
    drwNo: number;

    @Column('varchar', { name: 'STORE_CODE', length: 12 })
    storeCode: string;

    @Column('varchar', { name: 'STORE_NAME', length: 40 })
    storeName: string;

    @Column('varchar', { name: 'ADDR', length: 120 })
    addr: string;

    @Column('varchar', { name: 'LAT', length: 14 })
    lat: string;

    @Column('varchar', { name: 'LON', length: 14 })
    lon: string;

    @Column('varchar', { name: 'TEL_NO', length: 20 })
    telNo: string;

    dist?: number;
}
