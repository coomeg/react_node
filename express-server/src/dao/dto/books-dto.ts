import { BaseDto } from "./base-dto";

export default class BooksDto extends BaseDto {
    id: number;
    name: string;
    price: number;
}