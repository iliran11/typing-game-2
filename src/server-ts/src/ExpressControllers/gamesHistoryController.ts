import { gameSummaryDb } from '../mongo/GameSummaryDb/GameSummryDb';
import { USER_ID_PARAM } from '../../../constants';
import { GameSummryDBI } from '../../../types/schemasTypes';

export default async function GamesHistoryController(req, res) {
  const searchParamaer = req.query[USER_ID_PARAM];
  if (!searchParamaer) {
    res.send(400);
    return;
  }
  try {
    const result = await gameSummaryDb.getGamesByUserId(searchParamaer);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.send(500);
  }
}
