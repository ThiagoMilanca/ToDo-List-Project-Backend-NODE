import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import dotenv from 'dotenv';

dotenv.config();

const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET || 'default_secret',
};

export const JwtStrategy = new Strategy(options, (payload, done) => {
    try {
        return done(null, payload);
    } catch (error) {
        return done(error, false);
    }
});
