import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { HashTag } from './hashtag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateHashtagDto } from './dto/create-hashtag-dto';

@Injectable()
export class HashtagService {
  constructor(
    @InjectRepository(HashTag)
    private readonly hashtagRepository: Repository<HashTag>,
  ) {}

  public async createHashtag(createHashtagDto: CreateHashtagDto) {
    const hashtag = this.hashtagRepository.create(createHashtagDto);
    return await this.hashtagRepository.save(hashtag);
  }

  public async findHashtag(hashtags: number[]) {
    return await this.hashtagRepository.find({
      where: { id: In(hashtags) },
    });
  }
}
