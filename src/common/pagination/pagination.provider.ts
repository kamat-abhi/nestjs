import { Inject, Injectable } from '@nestjs/common';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import {
  FindManyOptions,
  FindOptionsOrder,
  FindOptionsRelations,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
} from 'typeorm';
import type { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import type { Paginated } from './pagination.interface';

type PaginationOptions<T extends ObjectLiteral> = {
  where?: FindOptionsWhere<T>;
  relations?: FindOptionsRelations<T>;
  order?: FindOptionsOrder<T>;
};

@Injectable()
export class PaginationProvider {
  constructor(@Inject(REQUEST) private readonly request: Request) {}

  public async paginateQuery<T extends ObjectLiteral>(
    paginationQueryDto: PaginationQueryDto,
    repository: Repository<T>,
    options?: PaginationOptions<T>,
  ): Promise<Paginated<T>> {
    const { page, limit } = paginationQueryDto;

    const findOptions: FindManyOptions<T> = {
      where: options?.where,
      relations: options?.relations,
      order: options?.order,
      take: limit,
      skip: (page - 1) * limit,
    };
    const result = await repository.find(findOptions);
    const totalItems = await repository.count();
    const totalPages = Math.ceil(totalItems / limit);
    const currentPage = page;
    const nextPage = currentPage === totalPages ? currentPage : currentPage + 1;
    const prevPage = currentPage === 1 ? currentPage : currentPage - 1;
    const baseUrl = this.request.protocol + '://' + this.request.headers.host;
    const url = new URL(this.request.originalUrl, baseUrl);

    const buildLink = (page: number) => {
      url.searchParams.set('page', page.toString());
      url.searchParams.set('limit', limit.toString());
      return url.toString();
    };

    return {
      data: result,
      meta: {
        itemPerPage: limit,
        totalItems,
        currentPage,
        totalPages,
      },
      links: {
        firstPage: buildLink(1),
        lastPage: buildLink(totalPages),
        currentPage: buildLink(currentPage),
        nextPage: buildLink(nextPage),
        prevPage: buildLink(prevPage),
      },
    };
  }
}
