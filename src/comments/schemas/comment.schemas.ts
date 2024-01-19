import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/users/schemas/users.schemas';

export type CommentDocument = HydratedDocument<CommentModel>;

@Schema({
  timestamps: true,
})
export class CommentModel {
  @Prop()
  text: string;

  @Prop()
  likes: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'CommentModel' })
  parent: CommentModel | null;
}

export const CommentModelSchema = SchemaFactory.createForClass(CommentModel);
