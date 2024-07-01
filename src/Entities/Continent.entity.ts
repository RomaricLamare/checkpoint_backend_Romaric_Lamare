import { Field, ID, InputType, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Country } from "./Countries.entity";

@ObjectType()
@Entity()
export class Continent {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => [Country], { nullable: true })
  @OneToMany(() => Country, (cntr) => cntr.continent, { nullable: true })
  countries: Country[];
}

@InputType()
export class ContinentCreateInput {
  @Field()
  name: string;
}
