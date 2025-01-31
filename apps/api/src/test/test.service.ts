import { Inject, Injectable } from '@nestjs/common';
import {
  DATABASE_CONNECTION,
  DrizzleDB,
  entities,
} from '@repo/drizzle-database';
import { TestCreateEntity } from 'api-contract';

@Injectable()
export class TestService {
  constructor(@Inject(DATABASE_CONNECTION) private db: DrizzleDB) {}

  async create(createTestDto: TestCreateEntity) {
    return this.db.insert(entities.tests).values(createTestDto).returning();
  }

  async findAll() {
    return await this.db.select().from(entities.tests);
  }

  findOne(id: number) {
    return `This action returns a #${id} test`;
  }

  update(id: number, updateTestDto: any) {
    return `This action updates a #${id} test ${updateTestDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} test`;
  }
}
