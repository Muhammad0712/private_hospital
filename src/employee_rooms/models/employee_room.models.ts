import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Employee } from "../../employees/models/employee.models";
import { Room } from "../../rooms/models/room.model";

interface IEmployeeRoomCreationAttr {
    employeeId: number;
    roomId: number;
}

@Table({tableName: 'employee_rooms', timestamps: false})
export class EmployeeRoom extends Model<EmployeeRoom, IEmployeeRoomCreationAttr> {

    @ForeignKey(() => Employee)
    @Column({
        type: DataType.INTEGER
    })
    declare employeeId: number

    @ForeignKey(() => Room)
    @Column({
        type: DataType.INTEGER
    })
    declare roomId: number

    @BelongsTo(() => Employee)
    employee: Employee;

    @BelongsTo(() => Room)
    room: Room;
}
