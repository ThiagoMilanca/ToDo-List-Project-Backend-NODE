import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { JwtStrategy } from './jwt.strategy';

export class AuthModule {
    static init() {
        return {
            jwtService: new AuthService(),
            jwtGuard: AuthGuard,
            jwtStrategy: JwtStrategy,
        };
    }
}
