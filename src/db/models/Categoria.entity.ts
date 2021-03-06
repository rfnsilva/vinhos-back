import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToMany,
  JoinColumn,
  ManyToOne
} from 'typeorm';
import Produto from './Produto.entity';
import Fornecedor from './Fornecedor.entity';

@ObjectType()
@Entity({ name: 'categoria' })
export default class Categoria {
  
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  nome: string;

  @Field()
  @Column({ name: 'fornecedor_id' })
  fornecedorId: number;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Field(() => Fornecedor)
  fornecedor: Fornecedor;

  // Associação
  
  @OneToMany(
    () => Produto,
    produto => produto.categoriaConnection,
  )
  produtoConnection: Promise<Produto[]>;
  
  @ManyToOne(
    () => Fornecedor,
    fornecedor => fornecedor.categoriaConnection,
    { primary: true },
  )
  @JoinColumn({ name: 'fornecedor_id' })
  fornecedorConnection: Promise<Fornecedor>;
}