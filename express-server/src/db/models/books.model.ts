import { PrimaryKey, Table, Column, Model, HasMany, DefaultScope, CreatedAt, UpdatedAt, DeletedAt, AutoIncrement } from 'sequelize-typescript';
@Table({
    tableName:'books', 
    timestamps: true,
})
export default class Books extends Model<Books> {
    constructor(values?: any, options?: any) {
        super(values, options);
    }

    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Column
    name: string;

    @Column
    price: number;

    @CreatedAt
    createdAt: Date;
   
    @UpdatedAt
    updatedAt: Date;

    @DeletedAt
    DeletedAt: Date;
}