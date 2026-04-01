import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ModelsModule } from './modules/models/models.module';
import { AgentsModule } from './modules/agents/agents.module';
import { ResearchModule } from './modules/research/research.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'nexusai-super-secret-key-change-in-production',
      signOptions: { expiresIn: '15m' },
    }),
    AuthModule,
    UsersModule,
    ModelsModule,
    AgentsModule,
    ResearchModule,
  ],
})
export class AppModule {}