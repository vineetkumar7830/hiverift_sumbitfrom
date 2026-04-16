import {
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as nodemailer from 'nodemailer';

import { SubmitFrom, SubmitFromDocument } from './entities/sumbitfrom.entity';
import { CreateSubmitFromDto } from './dto/create-sumbitfrom.dto';

@Injectable() 
export class SubmitFromService {
  constructor(
    @InjectModel(SubmitFrom.name)
    private readonly submitFromModel: Model<SubmitFromDocument>,
  ) {}

  async create(dto: CreateSubmitFromDto) {
    try {
      const savedData = await this.submitFromModel.create(dto);
      await this.sendEmail(dto);

      return {
        success: true,
        message: 'Form submitted successfully',
        data: savedData,
      };
    } catch (error) {
      console.error('SubmitFrom Error:', error);

      throw new InternalServerErrorException(
        error?.message || 'Form submission failed',
      );
    }
  }

  private async sendEmail(data: CreateSubmitFromDto) {
    if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
      throw new Error('Mail credentials missing in environment variables');
    }

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,    
      port: Number(process.env.MAIL_PORT), 
      secure: process.env.MAIL_SECURE === 'true',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.MAIL_FROM, 
      to: process.env.CONTACT_RECEIVER_EMAIL, 
      subject: 'New Quote Request Received',
      html: `
        <div style="background:#f4f6f8; padding:30px; font-family: Arial, Helvetica, sans-serif;">
          <div style="max-width:600px; margin:0 auto; background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.08);">
            
            <!-- Header -->
            <div style="background:#0f172a; padding:20px 25px;">
              <h2 style="margin:0; color:#ffffff; font-size:20px;">
                New Quote Request
              </h2>
              <p style="margin:4px 0 0; color:#c7d2fe; font-size:13px;">
                Submitted from Hiverift Website
              </p>
            </div>

            <!-- Body -->
            <div style="padding:25px;">
              <table style="width:100%; border-collapse:collapse; font-size:14px;">
                <tr>
                  <td style="padding:10px; font-weight:600; color:#555;">Full Name</td>
                  <td style="padding:10px;">${data.fullName}</td>
                </tr>
                <tr style="background:#f9fafb;">
                  <td style="padding:10px; font-weight:600; color:#555;">Email</td>
                  <td style="padding:10px;">${data.email}</td>
                </tr>
                <tr>
                  <td style="padding:10px; font-weight:600; color:#555;">Phone</td>
                  <td style="padding:10px;">${data.phone}</td>
                </tr>
                <tr style="background:#f9fafb;">
                  <td style="padding:10px; font-weight:600; color:#555;">Company</td>
                  <td style="padding:10px;">${data.companyName || 'N/A'}</td>
                </tr>
                <tr>
                  <td style="padding:10px; font-weight:600; color:#555;">Service Interested In</td>
                  <td style="padding:10px;">
                    ${data.serviceInterestedIn || 'Not Selected'}
                  </td>
                </tr>
              </table>

              <div style="margin-top:20px;">
                <p style="margin:0 0 6px; font-weight:600; color:#555;">
                  Project Details
                </p>
                <div style="background:#f8fafc; padding:12px; border-radius:6px;">
                  ${data.projectDetails}
                </div>
              </div>
            </div>

            <!-- Footer -->
            <div style="background:#f1f5f9; padding:15px; text-align:center;">
              <p style="margin:0; font-size:12px; color:#666;">
                This email was automatically generated from the Hiverift website.
              </p>
              <p style="margin:6px 0 0; font-size:12px; color:#666;">
                © ${new Date().getFullYear()} Hiverift. All rights reserved.
              </p>
            </div>

          </div>
        </div>
      `,
    });
  }
}
