import express from "express";
import { CardController } from "./controllers/CardController";
import { CreateCardUseCase } from "../application/use-cases/CreateCardUseCase";
import { CardRepository } from "./repositories/CardRepository";

export const initRoutes = (app: express.Express) => {
  const cardRepository = new CardRepository();
  const createCardUseCase = new CreateCardUseCase(cardRepository);
  const cardController = new CardController(createCardUseCase);

  app.get("/health", (_req, res) => {
    res.status(200).json({ data: "alive" });
  });

  app.post("/cards", cardController.create.bind(cardController));
};
