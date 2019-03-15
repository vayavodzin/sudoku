module.exports = function solveSudoku(matrix) {

  let sample = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  function fillCandidates() {
    for (let i = 0; i < 9; i++) {
      matrix[i] = matrix[i].map((v, k) => {
          if (v == 0 || Array.isArray(v)) {
            let row = checkRow(i);
            let col = checkCol(k);
            let square = checkSquare([i, k]);
            return row.concat(col, square);
          }
          return v;
        }
      )
    }
  }

  function checkRow(rowNum) {
    return sample.filter(v => matrix[rowNum].indexOf(v) === -1);
  }

  function checkCol(colNum) {
    let candidates = [];
    for (let i = 0; i < 9; i++) {
      let candidate = matrix[i][colNum];
      if (!Array.isArray(candidate)) {
        candidates.push(candidate);
      }
    }
    return sample.filter(v => candidates.indexOf(v) === -1);
  }

  function checkSquare(position) {
    let start = (position[0] > 5) ? 6 : position[0] > 2 ? 3 : 0;
    let end = position[1] > 5 ? 6 : position[1] > 2 ? 3 : 0;
    let square = matrix.map((v, k) => {
      if (start <= k && k < start + 3) {
        return (v.slice(end, end + 3));
      }
    })
    return sample.filter(v => square.indexOf(v) === -1);
  }

  function checkSingle(position) {
    let rowVal = checkRow(position[0]);
    let colVal = checkCol(position[1]);
    let squareVal = checkSquare(position);

    return rowVal.length == 1 ? rowVal[0] : colVal.length == 1 ? colVal[0] : squareVal.length == 1 ? squareVal[0] : null;
  }

  function fillMatrix() {
    for (let i = 0; i < 9; i++) {
      matrix[i].map((v, k) => {
        if (Array.isArray(v)) {
          let foundValue = checkSingle([i, k]);
          if (foundValue) {
            matrix[i][k] = foundValue;
            fillMatrix();
          }
        }
      })
    }
  }
  fillCandidates();
  fillMatrix();

  return matrix;
}
