import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export class AuthService {
    private secretKey = process.env.JWT_SECRET || 'default_secret';

    generateToken(payload: object): string {
        return jwt.sign(payload, this.secretKey, { expiresIn: '1h' });
    }

    verifyToken(token: string): any {
        try {
            return jwt.verify(token, this.secretKey);
        } catch (error) {
            throw new Error('Invalid token');
        }
    }
}
