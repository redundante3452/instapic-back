import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { Follower } from 'src/accounts/entities/followers.entity';
import { Posts } from 'src/accounts/entities/posts.entity';
import { Comment } from 'src/accounts/entities/comments.entity';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([
      User,
      Comment,
      Follower,
      Posts
    ]),
    JwtModule.register({
      global:true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '10h' }
    })
  ]
})
export class AuthModule {}
