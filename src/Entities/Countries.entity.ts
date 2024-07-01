import { Field, ID, InputType, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Continent } from "./Continent.entity";

@ObjectType()
@Entity()
export class Country {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  code: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  emoji: string;

  @Field(() => Continent)
  @ManyToOne(() => Continent, (cont) => cont.countries, {
    onDelete: "CASCADE",
  })
  continent: Continent;
}

@InputType()
export class PartialContinentInput {
  @Field()
  id: number;
}

@InputType()
export class CountryCreateInput {
  @Field()
  code: string;

  @Field()
  name: string;

  @Field()
  emoji: string;

  @Field({ nullable: true })
  continent: PartialContinentInput;
}
