import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { UploadUserProfilePictureController } from './upload-user-profile-picture.controller';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController, UploadUserProfilePictureController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
