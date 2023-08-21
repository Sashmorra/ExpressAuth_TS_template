import { userModel } from '../models/user.model.js';
import { BadRequest } from '../errors/ApiError.js';
import { TokenService } from './token.service.js';
import bcrypt from 'bcrypt';

const tokenService = new TokenService();

class UserService {
  async registration(email: string, password: string) {
    const candidate = await userModel.findOne({ email: email });
    if (candidate) {
      throw BadRequest(`Пользователь с почтовым адресом ${email} уже существует`);
    }
    const hashPassword = await bcrypt.hash(password, 3);
    await userModel.create({ email, hashPassword: hashPassword });
    const token = tokenService.generateTokens(email);
    return { token, email };
  }
  async login(email: string, password: string) {
    const user = await userModel.findOne({ email });
    if (!user) {
      throw BadRequest('Пользователь с таким email не найден');
    }
    const isPassEquals = await bcrypt.compare(password, user.hashPassword!);
    if (!isPassEquals) {
      throw BadRequest('Неверный пароль');
    }
    const token = tokenService.generateTokens(email);
    return { token, email };
  }
}

export { UserService };
