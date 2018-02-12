(function (root) {
    var WATER = root.SHRI_ISLANDS.WATER;
    var ISLAND = root.SHRI_ISLANDS.ISLAND;

    /**
     * Функция находит кол-во островов на карте
     * ВАЖНО! Сигнатуру функции изменять нельзя!
     *
     * @param {number[][]} map карта островов представленная двумерной матрицей чисел
     * @returns {number} кол-во островов
     */
    function solution(map) {
        // todo: подсчитать кол-во островов на карте

        function clone (existingArray) {
            var newObj = (existingArray instanceof Array) ? [] : {};
            for (i in existingArray) {
                if (i == 'clone') continue;
                if (existingArray[i] && typeof existingArray[i] == "object") {
                    newObj[i] = clone(existingArray[i]);
                } else {
                    newObj[i] = existingArray[i]
                }
            }
            return newObj;
        }



        var arr = clone(root.SHRI_ISLANDS.MAP);

        console.log(arr);

        var rows = arr.length;
        var columns = arr[0].length;
        var i=1;

        function countIslands(arr) {
            var islandsAmount = 0;


            while (!isNoIslands(arr)) {
                for (let r = 0; r < rows; r++) {
                    for (let c = 0; c < columns; c++) {


                        if (arr[r][c]) {
                            //changeStyle(r, c, 'islandPart border-left border-top border-right border-bottom', '');


                            arr[r][c] = 0;
                            isRow(arr, r, c);
                            isColumn(arr, r, c);

                            islandsAmount++;
                        }
                    }
                }
            }

            return islandsAmount;

        }

        function isRow(arr, row, col) {
            var r;
            for (r = row + 1; r < rows; r++) {
                if (arr[r][col]) {
                    //changeStyle(r, col, 'islandPart border-left border-right border-bottom', '');
                    //changeStyle(r - 1, col, '', 'border-bottom');


                    arr[r][col] = 0;
                    isColumn(arr, r, col);

                } else
                    break;
            }
            for (r = row - 1; r >= 0; r--) {
                if (arr[r][col]) {
                    //changeStyle(r, col, 'islandPart border-left border-top border-right ', '');
                    //changeStyle(r + 1, col, '', 'border-top');


                    arr[r][col] = 0;
                    isColumn(arr, r, col);

                } else
                    break;
            }
        }

        function isColumn(arrt, row, col) {
            var c;
            for (c = col + 1; c < columns; c++) {
                if (arr[row][c]) {
                    //changeStyle(row, c, 'islandPart  border-top border-right border-bottom ', '');
                    //changeStyle(row, c - 1, '', 'border-right');


                    arr[row][c] = 0;
                    isRow(arr, row, c);

                } else
                    break;
            }
            for (c = col - 1; c >= 0; c--) {
                if (arr[row][c]) {
                    //changeStyle(row, c, 'islandPart  border-left border-top border-bottom ', '');
                    //changeStyle(row, c + 1, '', 'border-left');


                    arr[row][c] = 0;
                    isRow(arr, row, c);

                } else
                    break;
            }
        }


        function isNoIslands(arr) {
            var count = 0;

            var r, c;

            for (r = 0; r < rows; r++) {
                for (c = 0; c < columns; c++) {
                    if (arr[r][c]) {
                        count++;
                    }
                }
            }

            if (!count) {
                return true;
            }
            else {
                return false;
            }

        }

        return countIslands(arr);
    }

    root.SHRI_ISLANDS.solution = solution;
})(this);
