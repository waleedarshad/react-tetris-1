// Closure around a board
// the returned function will set a piece on that board
import key from 'keymaster';
import AppActions from '../actions/app-actions';
import GameStore from '../stores/game-store';
import DetectShift from '../modules/detect-shift';
import BoardStore from '../stores/board-store'
const keyboardMap = {
  down: AppActions.moveDown,
  left: AppActions.moveLeft,
  right: AppActions.moveRight,
  space: AppActions.hardDrop,
  z: AppActions.flipCounterclockwise,
  x: AppActions.flipClockwise,
  p: () => {
      AppActions.pause();
  },
  up: AppActions.flipClockwise,
  c: AppActions.hold,
  shift: AppActions.hold
};

function removeKeyboardEvents() {
  Object.keys(keyboardMap).forEach(k => {
    if (k === 'shift') {
      DetectShift.unbind(keyboardMap[k]);
    } else {
      key.unbind(k);
    }
  });
}

export default function createPieceSetter(board) {
  return function pieceSetter(blocks, position, className) {
    try{
      for (let x = 0; x < blocks[0].length; x++) {
        for (let y = 0; y < blocks[0].length; y++) {
          const block = blocks[y][x];
          if (block) {
            const boardX = position.x + x;
            const boardY = position.y + y;
            /* eslint-disable no-param-reassign */
            board[boardY][boardX] = className;
          }
        }
      }
  }catch(error){
    GameStore.pause()
    return true

    
   }
 }
}
