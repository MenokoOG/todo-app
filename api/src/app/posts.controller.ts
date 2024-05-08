import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Put,
  } from '@nestjs/common';
  import { PostsService } from './posts.service';
  
  @Controller('posts')
  export class PostsController {
    constructor(private readonly postsService: PostsService) {}
  
    @Post()
    create(@Body() createPostDto: any) {
      return this.postsService.create(createPostDto);
    }
  
    @Get()
    findAll() {
      return this.postsService.findAll();
    }
  
    @Delete(':id')
    delete(@Param('id') id: string) {
      return this.postsService.delete(id);
    }
  
    @Put(':id')
    update(@Param('id') id: string, @Body() updatePostDto: any) {
      return this.postsService.update(id, updatePostDto);
    }
  }
  