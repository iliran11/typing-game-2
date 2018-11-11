import {connect} from 'react-redux'
import ResultPage from './ResultPage'
import {PlayerClient} from '../../types'

const mapStateToProps = (state:any) =>{
  const myId = state.serverStatus.myId;
  const myPlayerData :PlayerClient = state.serverStatus.players.find((player:PlayerClient)=>{
    return player.id===myId
  })
  console.log(state.serverStatus.players)
  const rankings = state.serverStatus.players.sort(sortPlayersRanking)
  const myRanking = rankings.findIndex((player:PlayerClient)=>{
    return player.id === myId
  })
  return {
    mySpeed: Math.round(myPlayerData.score),
    numberOfLetters: state.gameData.letters.length,
    gameDuration: myPlayerData.gameDuration,
    myRanking
  }
}
export default connect(mapStateToProps,null)(ResultPage)

export function sortPlayersRanking(a:PlayerClient,b:PlayerClient) {
 if(a.gameDuration && !b.gameDuration) {
   // a wins
   return -1
 }
 if(!a.gameDuration && b.gameDuration) {
  // b wins 
  return 1
 }
 if(!a.gameDuration && !b.gameDuration) {
   // they are both undefined. we don't care about the order.
   return 0;
 }
 if(a.gameDuration<b.gameDuration) {
   // a finished faster - he wins
   return -1
 } else {
   return 1;
 }
}

