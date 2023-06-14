import { Person } from "./person.dto";
import { IsString, IsNotEmpty, IsDate } from 'class-validator';


export class CreateUsersDto {
  //TODO: see why its not validating
  @IsNotEmpty()
  candidates: Person[];
  @IsNotEmpty()
  user: Person;
}



