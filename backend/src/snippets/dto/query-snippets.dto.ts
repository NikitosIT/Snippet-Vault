import { Transform, Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

import { SnippetType } from '../enums/snippet-type.enum';

function trimString(value: unknown) {
  return typeof value === 'string' ? value.trim() : value;
}

export class QuerySnippetsDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  limit?: number = 10;

  @IsOptional()
  @Transform(({ value }: { value: unknown }) => trimString(value))
  @IsString()
  q?: string;

  @IsOptional()
  @Transform(({ value }: { value: unknown }) => trimString(value))
  @IsString()
  tag?: string;

  @IsOptional()
  @IsEnum(SnippetType)
  type?: SnippetType;
}
