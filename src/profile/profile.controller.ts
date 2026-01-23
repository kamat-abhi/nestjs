import { Controller, Delete, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  getAllProfile() {
    return this.profileService.getAllProfiles();
  }
  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.profileService.deleteUser(id);
  }
}
