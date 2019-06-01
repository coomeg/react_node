import { PrimaryKey, Table, Column, Model, HasMany, DefaultScope, CreatedAt, UpdatedAt, DeletedAt, AutoIncrement } from 'sequelize-typescript';
@Table({
    tableName:'test', 
    timestamps: true,
})
export default class Test extends Model<Test> {
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
    testCase: string;

    @CreatedAt
    createdAt: Date;
   
    @UpdatedAt
    updatedAt: Date;

    @DeletedAt
    DeletedAt: Date;
}