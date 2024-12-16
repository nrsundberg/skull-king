-- CreateEnum
CREATE TYPE "Round" AS ENUM ('ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE', 'TEN');

-- CreateTable
CREATE TABLE "game" (
    "id" SERIAL NOT NULL,
    "started" TIMESTAMP(3) NOT NULL,
    "ended" TIMESTAMP(3) NOT NULL,
    "inProgress" BOOLEAN NOT NULL DEFAULT true,
    "name" TEXT NOT NULL,

    CONSTRAINT "game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "player" (
    "id" SERIAL NOT NULL,
    "started" TIMESTAMP(3) NOT NULL,
    "ended" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "round" (
    "id" SERIAL NOT NULL,
    "roundNumber" "Round" NOT NULL,
    "started" TIMESTAMP(3) NOT NULL,
    "ended" TIMESTAMP(3) NOT NULL,
    "gameId" INTEGER NOT NULL,

    CONSTRAINT "round_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "score" (
    "id" SERIAL NOT NULL,
    "playerId" INTEGER NOT NULL,
    "bid" INTEGER,
    "won" INTEGER,
    "loot" INTEGER NOT NULL,
    "standardFourteen" INTEGER NOT NULL,
    "blackFourteen" INTEGER NOT NULL,
    "pirateMermaidCapture" INTEGER NOT NULL,
    "skullKingPirateCapture" INTEGER NOT NULL,
    "mermaidSkullKingCapture" INTEGER NOT NULL,
    "scoreDelta" INTEGER,
    "roundId" INTEGER NOT NULL,

    CONSTRAINT "score_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_gameToplayer" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_gameToplayer_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "player_name_key" ON "player"("name");

-- CreateIndex
CREATE INDEX "_gameToplayer_B_index" ON "_gameToplayer"("B");

-- AddForeignKey
ALTER TABLE "round" ADD CONSTRAINT "round_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "score" ADD CONSTRAINT "score_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "score" ADD CONSTRAINT "score_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "round"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_gameToplayer" ADD CONSTRAINT "_gameToplayer_A_fkey" FOREIGN KEY ("A") REFERENCES "game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_gameToplayer" ADD CONSTRAINT "_gameToplayer_B_fkey" FOREIGN KEY ("B") REFERENCES "player"("id") ON DELETE CASCADE ON UPDATE CASCADE;
