import { type RouteConfig, route, index } from "@react-router/dev/routes";

export default [
  index("./routes/_index.tsx"),
  route("data/gameStatus/:gameId", "./routes/data.gameStatus.gameId.ts"),
  route("game/:id", "./routes/game.id.tsx"),
] satisfies RouteConfig;
