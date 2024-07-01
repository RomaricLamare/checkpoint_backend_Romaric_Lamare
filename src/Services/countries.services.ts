import { Repository } from "typeorm";
import { Country, CountryCreateInput } from "../Entities/Countries.entity";
import datasource from "../lib/datasource";
import ContinentService from "./continents.services";

class CountryService {
  db: Repository<Country>;

  constructor() {
    this.db = datasource.getRepository(Country);
  }

  async getCountries() {
    return await this.db.find();
  }

  async findCountryByCode(code: string) {
    const country = await this.db.findOne({
      where: { code },
    });
    if (!country) {
      throw new Error("Country not found");
    }
    return country;
  }

  async createCountry(data: CountryCreateInput) {
    const country = await this.db.findOne({
      where: { code: data.code },
    });
    if (country) {
      throw new Error("Country already exists");
    }
    const continent = await new ContinentService().findById(data.continent.id);
    const newCountry = this.db.create({ ...data, continent });
    return await this.db.save(newCountry);
  }
}

export default CountryService;
