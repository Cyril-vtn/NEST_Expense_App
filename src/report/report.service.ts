/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { ReportType, data } from 'src/data';
import { v4 as uuid } from 'uuid';
import { ReportResponseDto } from 'src/dtos/report.dto';

interface Report {
  amount: number;
  source: string;
}

interface UpdateReport {
  amount?: number;
  source?: string;
}

@Injectable()
export class ReportService {
  getAllReports(type: ReportType): ReportResponseDto[] {
    return data.report
      .filter((report) => report.type === type)
      .map((report) => {
        return new ReportResponseDto(report);
      });
  }

  getReportById(type: ReportType, id: string): ReportResponseDto {
    const report = data.report
      .filter((report) => report.type === type)
      .find((report) => report._id === id);

    if (!report) return;

    return new ReportResponseDto(report);
  }

  createReport(type: ReportType, { amount, source }: Report) {
    const newReport = {
      _id: uuid(),
      source,
      amount,
      createdAt: new Date(),
      updateAt: new Date(),
      type,
    };
    data.report.push(newReport);
    return new ReportResponseDto(newReport);
  }

  updatereport(
    type: ReportType,
    id: string,
    body: UpdateReport,
  ): ReportResponseDto {
    const reportToUpdate = data.report
      .filter((report) => report.type === type)
      .find((report) => report._id === id);
    if (!reportToUpdate) return;
    const reportIndex = data.report.findIndex(
      (report) => report._id === reportToUpdate._id,
    );
    data.report[reportIndex] = {
      ...data.report[reportIndex],
      ...body,
      updateAt: new Date(),
    };
    return new ReportResponseDto(data.report[reportIndex]);
  }

  deleteReport(id: string) {
    const reportIndex = data.report.findIndex((report) => report._id === id);
    if (reportIndex === -1) return;
    data.report.splice(reportIndex, 1);
  }
}
