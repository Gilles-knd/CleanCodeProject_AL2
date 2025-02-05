import express from "express";
import {CardController} from "./controllers/CardController.ts";
import {CardRepository} from "./repositories/CardRepository.ts";
import {UserRepository} from "./repositories/UserRepository.ts";
import {AuthMiddleware} from "./middlewares/authMiddleware.ts";
import {CreateCardUseCase} from "../application/use-cases/CreateCardUseCase.ts";
import {GetCardsUseCase} from "../application/use-cases/GetCardsUseCase.ts";
import {UpdateCardUseCase} from "../application/use-cases/UpdateCardUseCase.ts";
import {DeleteCardUseCase} from "../application/use-cases/DeleteCardUseCase.ts";

export const initRoutes = (app: express.Express) => {
  const cardRepository = new CardRepository();
  const userRepository = new UserRepository();
  const authMiddleware = new AuthMiddleware(userRepository);

  const createCardUseCase = new CreateCardUseCase(cardRepository, userRepository);
  const getCardsUseCase = new GetCardsUseCase(cardRepository);
  const updateCardUseCase = new UpdateCardUseCase(cardRepository);
  const deleteCardUseCase = new DeleteCardUseCase(cardRepository);

  const cardController = new CardController(
      createCardUseCase,
      getCardsUseCase,
      updateCardUseCase,
      deleteCardUseCase
  );

  app.use(authMiddleware.auth());

  app.get("/health", (_req, res) => {
    res.status(200).json({ data: "alive" });
  });

  app.post("/cards", cardController.create.bind(cardController));
  app.get('/cards', cardController.getAll.bind(cardController));
  app.put('/cards/:cardId', cardController.update.bind(cardController));
  app.delete('/cards/:cardId', cardController.delete.bind(cardController));
};