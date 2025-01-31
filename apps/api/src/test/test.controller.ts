import { Controller } from '@nestjs/common';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { contract } from '@repo/api-contract'; // Import your API contract
import { TestService } from './test.service';

@Controller()
export class TestController {
  constructor(private readonly testService: TestService) {}

  @TsRestHandler(contract.tests.create)
  async create() {
    return tsRestHandler(contract.tests.create, async ({ body }) => {
      const createdTest = await this.testService.create(body);

      if (!createdTest) {
        return { status: 500, body: { message: 'Failed to create test' } };
      }

      return { status: 201, body: createdTest };
    });
  }

  @TsRestHandler(contract.tests.findAll)
  async findAll() {
    return tsRestHandler(contract.tests.findAll, async ({}) => {
      const tests = await this.testService.findAll();
      if (tests.length === 0) {
        return { status: 404, body: { message: 'No tests found' } };
      }
      return { status: 200, body: tests };
    });
  }

  // @TsRestHandler(contract.tests.update)
  // async update() {
  //   return tsRestHandler(contract.tests.update, async ({ params, body }) => {
  //     const updatedTest = await this.testService.update(params.id, body);
  //     if (!updatedTest) {
  //       return { status: 404, body: { message: 'Test not found' } };
  //     }
  //     return { status: 200, body: updatedTest };
  //   });
  // }

  // @TsRestHandler(contract.tests.delete)
  // async delete() {
  //   return tsRestHandler(contract.tests.delete, async ({ params }) => {
  //     const deleted = await this.testService.remove(params.id);
  //     if (!deleted) {
  //       return { status: 404, body: { message: 'Test not found' } };
  //     }
  //     return { status: 204, body: undefined };
  //   });
  // }
}
