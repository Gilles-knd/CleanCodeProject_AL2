import {IUserRepository} from "../../domain/repositories/IUserRepository.ts";
import {User} from "../../domain/entities/User.ts";
import db from "../db/prisma.ts";

export class UserRepository implements IUserRepository {
    async findByEmail(email: string): Promise<User | null> {
        const user = await db.user.findUnique({ where: { email } });
        return user ? new User(user.id, user.email, user.createdAt) : null;
    }

    async save(user: User): Promise<User> {
        const newUser = await db.user.create({
            data: {
                email: user.email,
                createdAt: user.createdAt
            }
        });
        return new User(newUser.id, newUser.email, newUser.createdAt);
    }

    async findById(id: number): Promise<User | null> {
        const user = await db.user.findUnique({ where: { id } });
        return user ? new User(user.id, user.email, user.createdAt) : null;
    }
    async updateLastQuizDate(userId: number, date: Date): Promise<User> {
        const updatedUser = await db.user.update({
            where: { id: userId },
            data: { lastQuizDate: date }
        });

        return new User(
            updatedUser.id,
            updatedUser.email,
            updatedUser.createdAt,
            updatedUser.lastQuizDate
        );
    }
}