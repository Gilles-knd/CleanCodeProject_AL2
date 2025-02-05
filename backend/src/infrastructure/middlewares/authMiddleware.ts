import { Request, Response, NextFunction } from 'express';
import { IUserRepository } from '../../domain/repositories/IUserRepository';

export class AuthMiddleware {
    constructor(private userRepository: IUserRepository) {}

    auth() {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                    const email = req.headers['x-user-email'] as string;

                if (!email) {
                     res.status(401).json({ error: 'Unauthorized' });
                     return;
                }

                let user = await this.userRepository.findByEmail(email);

                if (!user || user.id === undefined) {
                    res.status(401).json({ error: 'Unauthorized' });
                    return;
                }
                req.user = user;

            } catch (error) {
                res.status(401).json({ error: 'Unauthorized' });
                return;
            }
            next();
        };
    }
}