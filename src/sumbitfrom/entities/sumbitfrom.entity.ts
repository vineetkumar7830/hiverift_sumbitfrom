import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SubmitFromDocument = SubmitFrom & Document;

@Schema({ timestamps: true })
export class SubmitFrom {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  position: string;

  @Prop({ required: true })
  resume: string; // File path

  @Prop({ required: false })
  portfolio?: string;

  @Prop({ required: true })
  coverLetter: string;
}

export const SubmitFromSchema =
  SchemaFactory.createForClass(SubmitFrom);
