

//  BUBBLE SORT ANIMATION GENERATOR........

export function getBubbleSortAnimation(array) {
  let animation = [];
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        let temp = array[j];
        animation.push([j, j + 1]);
        animation.push([j, j + 1]);
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
  }
  return animation;
}
// ============================================================================================


// INSERTION SORT ANIMATION GENERATOR..... 

export function getInsertionSortAnimation(array) {
  let animation = [];
  for (let i = 1; i < array.length; i++) {
    let j = i - 1;
    let temp = array[i];
    while (temp < array[j] && j >= 0) {
      array[j + 1] = array[j];
      animation.push([j + 1, j]);
      animation.push([j + 1, j]);
      j--;
    }

    array[j + 1] = temp;
  }
  return animation;
}

//========================================================================

// SELECTION SORT ANIMATION GENERATOR..... 

export function getSelectionSortAnimation(array) {
  let animation = [];
  for (let i = 0; i < array.length - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[minIdx]) {
        minIdx = j;
      }
    }
    animation.push([i, minIdx]);
    animation.push([i, minIdx]);
    let temp = array[minIdx];
    array[minIdx] = array[i];
    array[i] = temp;
  }
  return animation;
}

//=======================================================================

// QUICK SORT ANIMATION GENERATOR..... 

export function getQuickSortAnimation(array) {
  let animation = [];
  return quickSort(array, 0, array.length - 1, animation);
  
}

function quickSort(array, left, right , animation) {
  let index;
  if (array.length > 1) {
    index = partition(array, left, right, animation);

    if (left < index - 1) {
      quickSort(array, left, index - 1 , animation);
    }

    if (index < right) {
      quickSort(array, index, right, animation);
    }
  }
   return animation;
}

function partition(array, left, right, animation) {
  let pivotIdx = Math.floor((left + right) / 2);
  let pivot = array[pivotIdx] , i = left, j = right;
  while (i <= j) {
    while (array[i] < pivot) 
      i++;

    while (array[j] > pivot)
      j--;

    if (i <= j) {
      animation.push([pivotIdx, i, j]);
      animation.push([pivotIdx, i, j]);
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
      i++;
      j--;
    }
  }
  return i;
}

//======================================================================


// MERGE SORT ANIMATION GENERATOR..... 

export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    animations.push([i, j]);
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    animations.push([i, i]);
    animations.push([i, i]);
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    animations.push([j, j]);
    animations.push([j, j]);
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}

// =============================================================================