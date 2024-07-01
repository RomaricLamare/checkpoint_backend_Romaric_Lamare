import { Repository } from "typeorm";
import { Continent, ContinentCreateInput } from "../Entities/Continent.entity";
import datasource from "../lib/datasource";

class ContinentService {
  db: Repository<Continent>;
  constructor() {
    this.db = datasource.getRepository(Continent);
  }

  async getContinents() {
    return await this.db.find({ relations: { countries: true } });
  }

  async findById(id: number) {
    const continent = await this.db.findOne({
      where: { id },
    });
    if (!continent) {
      throw new Error("Continent not found");
    }
    return continent;
  }

  async create(data: ContinentCreateInput) {
    const continent = await this.db.findOne({
      where: { name: data.name },
    });
    if (continent) {
      throw new Error("Continent already exists");
    }

    const newContinent = this.db.create(data);
    return await this.db.save(newContinent);
  }
}
export default ContinentService;
