import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Country, CountryCreateInput } from "../Entities/Countries.entity";
import CountryService from "../Services/countries.services";

@Resolver()
export default class CountriesResolver {
  @Query(() => [Country])
  async listCountries() {
    return await new CountryService().getCountries();
  }

  @Query(() => Country)
  async findCOuntry(@Arg("code") code: string) {
    return await new CountryService().findCountryByCode(code);
  }

  @Mutation(() => Country)
  async createCountry(@Arg("infos") infos: CountryCreateInput) {
    return await new CountryService().createCountry(infos);
  }
}
