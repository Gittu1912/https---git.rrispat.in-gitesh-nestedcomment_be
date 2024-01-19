import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/schemas/users.schemas';
import { CommentModel } from './schemas/comment.schemas';

// import { CommentModel } from './schemas/comment.schemas';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(CommentModel.name) private commentModel: Model<CommentModel>,
  ) {}

  create(createCommentDto: CreateCommentDto) {
    const createdComment = this.commentModel.create({
      text: createCommentDto.text,
      parent: createCommentDto.parentId || null,
      user: createCommentDto.userId,
    });
    return createdComment.then((doc) => {
      return doc.populate(['user', 'parent']);
    });
  }

  findAll() {
    return this.commentModel.find().populate(['user']).exec();
  }

  getToplevelComment() {
    return this.commentModel
      .find({
        parent: null,
      })
      .populate(['user', 'parent'])
      .exec();
  }

  getCommentByParentId(parentId: string) {
    return this.commentModel
      .find({
        parent: parentId,
      })
      .populate(['user', 'parent'])
      .exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
