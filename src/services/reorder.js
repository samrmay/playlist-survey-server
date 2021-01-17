// Returns arr of obj {rangeStart, rangeLength, insertBefore}
export default (oldArr, newArr) => {
  const indexArr = [];
  const resultArr = [];
  for (let i in oldArr) {
    indexArr.push(newArr.indexOf(oldArr[i]));
  }
  let longest = lis(indexArr);
  console.log(indexArr);

  while (longest.length !== indexArr.length) {
    for (let i in indexArr) {
      if (
        !longest.includes(indexArr[i]) &&
        (longest.includes(indexArr[i] + 1) || longest.includes(indexArr[i] - 1))
      ) {
        let target = -1;
        if (
          longest.includes(indexArr[i] + 1) &&
          indexArr.indexOf(indexArr[i] + 1) >= 0
        ) {
          target = indexArr.indexOf(indexArr[i] + 1);
        } else {
          target = indexArr.indexOf(indexArr[i] - 1) + 1;
        }
        resultArr.push({
          rangeStart: i,
          rangeLength: 1,
          insertBefore: target,
        });

        indexArr.splice(target, 0, indexArr[i]);
        let misplacedIndex = indexArr.indexOf(indexArr[target]);
        if (misplacedIndex == target) {
          misplacedIndex = indexArr.indexOf(indexArr[target], target + 1);
        }
        indexArr.splice(misplacedIndex, 1);

        break;
      }
    }
    longest = lis(indexArr);
  }

  return resultArr;
};

function lis(arr) {
  const n = arr.length;
  let longestSub = [];

  for (let i = 0; i < n; i++) {
    let temp_arr = [arr[i]];
    for (let j = i - 1; j >= 0; j--) {
      if (arr[j] <= temp_arr[0]) {
        temp_arr.splice(0, 0, arr[j]);
      }
    }

    if (temp_arr.length > longestSub.length) {
      longestSub = temp_arr;
    }
  }

  return longestSub;
}
