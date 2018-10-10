import LetterData from  '../../../store/classes/lettterData'

const words :string = "hello world yello green"
const lettersSample = words.split('').map(word => new LetterData(word))

export default class Game {
  index :number;
  letters: LetterData[]
  gameId: number

  constructor(gameId: number) {
    this.letters = lettersSample;
    this.index = 0 ;
    this.gameId=gameId;
  }
}
