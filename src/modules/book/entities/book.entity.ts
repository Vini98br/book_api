import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Author } from "../../author/entities/author.entity";

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: false })
  isbn: string;

  @Column({ nullable: false })
  pages: number;

  @Column({ nullable: false })
  language: string;

  @Column({ nullable: false })
  authorId: number;

  @ManyToOne(() => Author, (author) => author.books, { nullable: false })
  author: Author;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}