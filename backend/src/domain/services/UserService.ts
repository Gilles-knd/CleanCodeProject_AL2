export class UserService {
    static canTakeQuizToday(lastQuizDate: Date | null): boolean {
        if (!lastQuizDate) return true;

        const today = new Date();
        const lastQuiz = new Date(lastQuizDate);

        today.setHours(0, 0, 0, 0);
        lastQuiz.setHours(0, 0, 0, 0);

        return lastQuiz < today;
    }
}