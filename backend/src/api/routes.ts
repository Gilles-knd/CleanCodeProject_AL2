import express from 'express'


export const initRoutes = (app: express.Express) => {
    app.get("/health", (_req, res) => {
        res.status(200).json({ data: "alive" });
    });

};