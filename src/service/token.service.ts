import jwt from 'jsonwebtoken';

class TokenService {
  generateTokens(payload: string) {
    const JWT_SECRET = process.env.JWT_SECRET || 'srevjkrhrijrgjf';
    const token = jwt.sign({ payload }, JWT_SECRET, { expiresIn: '30d' });
    return token;
  }
  validateToken(token: string) {
    try {
      const JWT_SECRET = process.env.JWT_SECRET || 'srevjkrhrijrgjf';
      const userData = jwt.verify(token, JWT_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }
}

export { TokenService };
