// Returns arr of obj {rangeStart, rangeLength, insertBefore}
export default (oldArr, newArr) => {
  const indexArr = [];
  const resultArr = [];
  for (let i in oldArr) {
    indexArr.push(newArr.indexOf(oldArr[i]));
  }

  const longest = lis(indexArr);
  for (let i in indexArr) {
    if (!longest.includes(indexArr[i])) {
      resultArr.push({
        rangeStart: i,
        rangeLength: 1,
        insertBefore: indexArr[i] + 1,
      });
    }
  }

  return resultArr;
};

function lis(arr) {
  const n = arr.length;
  let longestSub = [];

  for (let i = 0; i < n; i++) {
    let temp_arr = [arr[i]];
    for (let j = i - 1; j > 0; j--) {
      if (arr[j] <= temp_arr[0]) {
        temp_arr.splice(0, 0, arr[j]);
      }
    }

    if (temp_arr.length > longest_sub.length) {
      longestSub = temp_arr;
    }
  }

  return longestSub;
}
