import { Field, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryColumn } from "typeorm";

@ObjectType()
@Entity()
export default class WorldEntity {
  @Field(() => String)
  @PrimaryColumn()
  name: string;

  @Field(() => String)
  @Column()
  code: string;

  @Field(() => String)
  @Column()
  emoji: string;

  @Field(() => String)
  @Column()
  continent: string;
}
