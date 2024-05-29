import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login-dto.controller';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService
  ){}

  async create(createUserDto: CreateUserDto) {
    try {
      const {password, ...userData} = createUserDto
      const newUser = this.userRepository.create({
        password: bcryptjs.hashSync(password, 10),
        ...userData
      });
      await this.userRepository.save(newUser)
      const {password:_, ...User} = newUser
      return userData;
    }catch (error) {
      if(error.code === '23505'){
        throw new BadRequestException(`${createUserDto.email} already exists!!`)
      }
      throw new InternalServerErrorException('Something was wrong, please contact with your mother');
    }
  }

  async login(loginDto: LoginDto) {
      const {email, password} = loginDto;
      const user = await this.userRepository.findOneBy({email}) 
      if(!user){
        throw new UnauthorizedException('Not valid credentials')
      }
      if( !bcryptjs.compareSync(password, user.password)){
        throw new UnauthorizedException('Not valid credentials')
      }

      const { password:_, ...rest } = user;
      const token = this.getJwtToken({id:user.id, email: user.email});
      return {
        user: rest,
        token: token
      }
  }



  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  private getJwtToken(payload: JwtPayload){
    const token = this.jwtService.sign(payload);
    return token;

  }
}


  