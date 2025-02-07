import {UserService} from "../../domain/services/UserService.ts";
import {IUserRepository} from "../../domain/repositories/IUserRepository.ts";

export class CheckQuizAvailabilityUseCase {
    constructor(
        private userRepository: IUserRepository
    ) {}

    async execute(userId: number): Promise<boolean> {
        const user = await this.userRepository.findById(userId);

        if (!user) {
            throw new Error('User not found');
        }

        return UserService.canTakeQuizToday(user.lastQuizDate);
    }

    async updateLastQuizDate(userId: number): Promise<void> {
        const user = await this.userRepository.findById(userId);

        if (!user) {
            throw new Error('User not found');
        }

        await this.userRepository.updateLastQuizDate(userId, new Date());
    }
}