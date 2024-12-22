import { player } from "@prisma/client";
import { dataWithSuccess, redirectWithSuccess } from "remix-toast";
import invariant from "tiny-invariant";
import prisma from "../db.server";
import { Route } from "./+types/data.gameStatus.gameId";

export async function action({ request, params }: Route.ActionArgs) {
  let { gameId } = params;
  invariant(gameId, "Must include id to create user");
  switch (request.method) {
    case "DELETE": {
      await prisma.game.update({
        where: { id: parseInt(gameId) },
        data: { ended: new Date() },
      });
      return dataWithSuccess("updated", "Game ended");
    }
    case "PUT": {
      let gameWithPlayers = await prisma.game.findFirstOrThrow({
        where: { id: parseInt(gameId) },
        include: { players: true },
      });

      let newGame = await prisma.game.create({
        data: {
          name: gameWithPlayers.name,
          started: new Date(),
        },
      });

      gameWithPlayers.players.map(async (it: player) => {
        await prisma.player.update({
          where: { id: it.id },
          data: { game: { connect: { id: newGame.id } } },
        });
      });

      return redirectWithSuccess(`/game/${newGame.id}`, "Game copied");
    }
  }
}
