import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Continent, ContinentCreateInput } from "../Entities/Continent.entity";
import ContinentService from "../Services/continents.services";

@Resolver()
export default class ContinentResolver {
  @Query(() => [Continent])
  async listContinents() {
    return await new ContinentService().getContinents();
  }

  @Query(() => Continent)
  async findContinent(@Arg("id") id: number) {
    return await new ContinentService().findById(id);
  }

  @Mutation(() => Continent)
  async createContinent(@Arg("infos") infos: ContinentCreateInput) {
    return await new ContinentService().create({ ...infos });
  }
}
