(function (root) {
    var WATER = root.SHRI_ISLANDS.WATER;
    var ISLAND = root.SHRI_ISLANDS.ISLAND;

    /**
     * Бонусное задание.
     * Необходимо взять реализацию функции solution и доработать,
     * добавив функционал, который позволит пошагово визуализировать работу данного алгоритма.
     * Сигнатуру функции можно выбрать наиболее удобную для вашей визуализации
     */

    function visualizeSolution() {
        $(document).ready(function () {

            //Копирование исходного массива
            function clone(existingArray) {
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

            //Визуализация
            function changeStyle(r, c, addClasses, removeClasses) {

                addClasses = addClasses || "";
                removeClasses = removeClasses || "";

                i++;
                setInterval(
                    (function (row, coll) {
                        let elem = $('.outer .map .map__row').eq(row).find('.map__cell').eq(coll);
                        return function () {
                            $(elem).addClass(addClasses);
                            $(elem).removeClass(removeClasses);
                        }
                    })(r, c), 500 * i);
            }

            var arr = clone(root.SHRI_ISLANDS.MAP);
            console.log('Arr', arr);

            //draw map
            for (let i = 0; i < arr.length; i++) {
                $('#mapTable').append('<tr>');
                for (let j = 0; j < arr[0].length; j++) {
                    $('#mapTable tr').eq(i).append('<td>' + arr[i][j] + '</td>');

                }
                $('#mapTable').append('</tr>');
            }


            var rows = arr.length;
            var columns = arr[0].length;
            var i = 1;

            function countIslands(arr) {
                var islandsAmount = 0;

                while (!isNoIslands(arr)) {
                    for (let r = 0; r < rows; r++) {
                        for (let c = 0; c < columns; c++) {


                            if (arr[r][c]) {
                                changeStyle(r, c, 'islandPart border-left border-top border-right border-bottom', '');


                                arr[r][c] = 0;
                                isRow(arr, r, c);
                                isColumn(arr, r, c);


                                islandsAmount++;
                            }
                        }
                    }
                }

                $('.map__res').html('Count: ' + islandsAmount)
                return islandsAmount;


            }

            function isRow(arr, row, col) {
                var r;
                for (r = row + 1; r < rows; r++) {
                    if (arr[r][col]) {
                        changeStyle(r, col, 'islandPart border-left border-right border-bottom border-top-inside', '');
                        changeStyle(r - 1, col, 'border-bottom-inside', 'border-bottom');


                        arr[r][col] = 0;
                        isColumn(arr, r, col);

                    } else
                        break;
                }
                for (r = row - 1; r >= 0; r--) {
                    if (arr[r][col]) {
                        changeStyle(r, col, 'islandPart border-left border-top border-right border-bottom-inside', '');
                        changeStyle(r + 1, col, 'border-top-inside', 'border-top');


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
                        changeStyle(row, c, 'islandPart  border-top border-right border-bottom border-left-inside', '');
                        changeStyle(row, c - 1, 'border-right-inside', 'border-right');


                        arr[row][c] = 0;
                        isRow(arr, row, c);

                    } else
                        break;
                }
                for (c = col - 1; c >= 0; c--) {
                    if (arr[row][c]) {
                        changeStyle(row, c, 'islandPart  border-left border-top border-bottom border-right-inside', '');
                        changeStyle(row, c + 1, 'border-left', 'border-left');


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

        });


    }

    root.SHRI_ISLANDS.visualizeSolution = visualizeSolution;
})(this);
