import {connect} from 'react-redux'
import ResultPage from './ResultPage'
import {PlayerClient} from '../../types'

const mapStateToProps = (state:any) =>{
  const myId = state.serverStatus.myId;
  const myPlayerData :PlayerClient = state.serverStatus.players.find((player:PlayerClient)=>{
    return player.id===myId
  })
  return {
    mySpeed: Math.round(myPlayerData.score),
    numberOfLetters: state.gameData.letters.length
  }
}
export default connect(mapStateToProps,null)(ResultPage)

