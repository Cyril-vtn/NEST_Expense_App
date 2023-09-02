import {
  IsNumber,
  IsString,
  IsPositive,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { ReportType } from 'src/data';

export class CreateReportDto {
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsString()
  @IsNotEmpty()
  source: string;
}

export class UpdateReportDto {
  @IsNumber()
  @IsPositive()
  @IsOptional()
  amount: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  source: string;
}

export class ReportResponseDto {
  id: string;
  source: string;
  type: ReportType;
  amount: number;

  @Expose({
    name: 'createdAt',
  })
  transformedCreatedAt(): string {
    return this.created_at.toISOString();
  }

  @Exclude()
  created_at: Date;

  @Exclude()
  updated_at: Date;

  constructor(partial: Partial<ReportResponseDto>) {
    Object.assign(this, partial);
  }
}
