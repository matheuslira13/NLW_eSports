import express from "express";
import { PrismaClient } from "@prisma/client";
import { convertTimeToMinutes } from "./utils/time";
import cors from "cors";

const app = express();
app.use(express.json());

const prisma = new PrismaClient();

app.get("/games", async (request, response) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        },
      },
    },
  });

  return response.json(games).status(200);
});

app.get("/games/:id/ads", async (request, response) => {
  const gameId = request.params.id;

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      yearsPlaying: true,
      weekDays: true,
      hourStart: true,
      hourEnd: true,
      useVoiceChannel: true,
    },
    where: {
      gameId,
    },
    orderBy: {
      createAt: "desc",
    },
  });

  return response

    .json(ads.map((ad) => ({ ...ad, weekDays: ad.weekDays.split(",") })))
    .status(200);
});

app.get("/ads/:id/discord", async (request, response) => {
  const adId = request.params.id;

  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adId,
    },
  });

  return response.json({ ad }).status(200);
});

app.post("/games/:id/ads", async (request, response) => {
  const gameId = request.params.id;
  const body: any = request.body;

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(","),
      hourStart: convertTimeToMinutes(body.hourStart),
      hourEnd: convertTimeToMinutes(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel,
    },
  });
  return response.json(ad).status(201);
});

app.listen(3333);