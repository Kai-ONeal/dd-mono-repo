import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { DrizzleDatabaseModule } from '@repo/drizzle-database';

@Module({
  imports: [DrizzleDatabaseModule],
  controllers: [TestController],
  providers: [TestService],
})
export class TestModule {}
