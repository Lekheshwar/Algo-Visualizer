
//========================LINEAR SEARCH ANIMATOIN GENERATOR=======================//

export function getLinerSearchAnimation(array, key){
    let animation = [];
    for(let i = 0; i < array.length; i++){
        animation.push([i, false]);
        animation.push([i, false]);
        if(array[i] === key){
            animation.push([i, true]);
            break;
        }
    }
    return animation;
}

//============================BINARY SEARCH ANIMATION GENERATOR===================//

export function getBinarySearchAnimation(array, key){
    let animation = [];
    let left = 0;
    let right = array.length-1;
    let mid = Math.floor((left+right) / 2);
    while(left <= right){
        mid = Math.floor((left+right) / 2);
        animation.push([mid, false, left, right]);
        animation.push([mid, false, left, right]);
        if(array[mid] === key){
            animation.push([mid, true, mid, mid]);
            console.log(mid);
            break;
        }
        else if(array[mid] > key){
            right = mid - 1;
        }
        else{
            left = mid + 1;
        }
    }
    return animation;
}

// ============================JUMP SEARCH ANIMATION GENERATOR===================//

export function getJumpSearchAnimation(array, key){
    const animation = [];
    let jump = 3;
    let prev = 0;
    // here 12 is the size of the array......(static)......
    while(array[Math.min(jump, 12) - 1] < key){
        animation.push([prev, jump-1,false]);
        animation.push([prev, jump-1,false]);
        prev = jump;
        jump += 3;
        if(prev >= 12)
            return animation;
    }

    while(array[prev] < key){
        animation.push([prev,prev, false]);
        animation.push([prev,prev, false]);
        prev++;
        if(prev === Math.min(jump, 12))
            return animation;
    }
    if(array[prev] === key){
        animation.push([prev, prev, true]);
         return animation;
    }
    else{
        animation.push([prev, prev, false]);
        animation.push([prev, prev, false]);
    }
    return animation;
}