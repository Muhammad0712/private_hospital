import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IPatientCreationAttr{
    first_name: string;
    last_name: string;
    gender: string;
    birth_day: Date;
    address: string;
    passport_series: string;
    passport_number: string;
}

@Table({tableName: 'patients', updatedAt: false})
export class Patient extends Model<Patient, IPatientCreationAttr> {

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    declare id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare first_name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare last_name: string;

    @Column({
        type: DataType.ENUM('male', 'female'),
        allowNull: false
    })
    declare gender: string;

    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    declare birth_day: Date;

    @Column({
        type: DataType.TEXT,
        allowNull: false
    })
    declare address: string;

    @Column({
        type: DataType.STRING(2),
        allowNull: false
    })
    declare passport_series: string;

    @Column({
        type: DataType.STRING(7),
        allowNull: false
    })
    declare passport_number: string;
}
