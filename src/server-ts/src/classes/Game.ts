import LetterData from  '../../../store/classes/lettterData'

export default class Game {
  index :number;
  words: LetterData[]
  constructor(gameId: number, words: string[]) {
    this.words = [sharedCode.default.createGame(gameId,words);]
  }
}
