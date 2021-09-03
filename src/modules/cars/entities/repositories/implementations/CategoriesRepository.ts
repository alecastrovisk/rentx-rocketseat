import { getRepository, Repository } from 'typeorm';

import { 
  ICreateCategoryDTO,
  ICategoriesRepository
 } from '../ICategoriesRepository';

 import { Category } from '../../Category';

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async create({ description, name }: ICreateCategoryDTO): Promise<void> {
    try {
      const category = this.repository.create({
        description,
        name
      });
  
      await this.repository.save(category);
    } catch (error) {
      console.log('erro');
    }
  }
  async list(): Promise<Category[]> {
    const categories = this.repository.find();
    return categories;
  }
  async findByName(name: string): Promise<Category> {
    const category = this.repository.findOne({ name });
    return category;
  }
 }

 export { CategoriesRepository };