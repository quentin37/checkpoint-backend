import { Resolver, Query, Mutation, Arg } from "type-graphql";
import WorldEntity from "../entity/worldEntity";
import { AppDataSource } from "../data-source";

@Resolver()
export class WorldResolver {
  @Query(() => [WorldEntity])
  async getAllCountry(): Promise<WorldEntity[]> {
    return await AppDataSource.manager.find(WorldEntity);
  }

  @Query(() => WorldEntity)
  async getCountryCode(@Arg("code") code: string): Promise<WorldEntity> {
    const country = await AppDataSource.manager
      .getRepository(WorldEntity)
      .findOneBy({ code });
    if (country != null) {
      return country;
    } else {
      throw new Error("Country not found...");
    }
  }

  @Mutation(() => WorldEntity)
  async createCountry(
    @Arg("name") name: string,
    @Arg("code") code: string,
    @Arg("emoji") emoji: string,
    @Arg("continent") continent: string
  ): Promise<WorldEntity> {
    const newCountry = new WorldEntity();
    newCountry.name = name;
    newCountry.code = code.toUpperCase();
    newCountry.emoji = emoji;
    newCountry.continent = continent;
    const saveCountry = await AppDataSource.manager.save(
      WorldEntity,
      newCountry
    );
    return saveCountry;
  }
}
