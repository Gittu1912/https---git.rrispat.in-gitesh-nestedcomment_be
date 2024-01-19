import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentModel, CommentModelSchema } from './schemas/comment.schemas';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService],
  imports: [
    MongooseModule.forFeature([
      { name: CommentModel.name, schema: CommentModelSchema },
    ]),
  ],
})
export class CommentsModule {}
