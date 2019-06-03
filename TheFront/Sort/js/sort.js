
//比较次数
var compareTimes=0;
//交换次数
var changeTimes=0;
//排序时间
var sortTime=0;
//空间占有量
var spaceTimes=0;
//冒泡排序
function bubbleSort(arr) {
    spaceTimes=arr.length;
    var len = arr.length;
    for (var i = 0; i < len - 1; i++) {
        for (var j = 0; j < len - 1 - i; j++) {
            if (less(arr[j+1],arr[j])) {        // 相邻元素两两对比
                exch(arr,j+1,j);
            }
        }
    }
    return arr;
}

//选择排序
function selectionSort(arr) {
    var len = arr.length;
    spaceTimes=len+4;
    var minIndex;
    for (var i = 0; i < len - 1; i++) {
        minIndex = i;
        for (var j = i + 1; j < len; j++) {
            if (less(arr[j],arr[minIndex])) {     // 寻找最小的数
                minIndex = j;                 // 将最小数的索引保存
            }
        }
        exch(arr,i,minIndex);
    }
    return arr;
} 

//插入排序
function insertionSort(arr) {
    var len = arr.length;
    spaceTimes=len+4;
    var preIndex, current;
    for (var i = 1; i < len; i++) {
        preIndex = i - 1;
        current = arr[i];
        while (0<=preIndex && less(current,arr[preIndex])) {
            arr[preIndex + 1] = arr[preIndex];
            changeTimes++;
            preIndex--;
        }
        arr[preIndex + 1] = current;
        changeTimes++;
    }
    return arr;
}

//希尔排序
function shellSort(arr) {
    var len = arr.length;
    spaceTimes=len+2;
    for (var gap = Math.floor(len / 2); gap > 0; gap = Math.floor(gap / 2)) {
        for (var i = gap; i < len; i++) {
            var j = i;
            var current = arr[i];
            spaceTimes+=2;
            changeTimes++;
            while (j - gap >= 0 && less(current,arr[j - gap])) {
                 arr[j] = arr[j - gap];
                 changeTimes++;
                 j = j - gap;
            }
            arr[j] = current;
            changeTimes++;
        }
    }
    return arr;
}

//快速排序
function quickSort(arr, left, right) {
    var len = arr.length,
        partitionIndex,
        left = typeof left != 'number' ? 0 : left,
        right = typeof right != 'number' ? len - 1 : right;
 
        spaceTimes+=4;
    if (left < right) {
        partitionIndex = partition(arr, left, right);
        quickSort(arr, left, partitionIndex-1);
        quickSort(arr, partitionIndex+1, right);
    }
    return arr;
}
 
function partition(arr, left ,right) {     // 分区操作
    var pivot = left,                      // 设定基准值（pivot）
        index = pivot + 1;
    spaceTimes+=3;
    
    for (var i = index; i <= right; i++) {
        if (less(arr[i],arr[pivot])) {
            exch(arr, i, index);
            index++;
        }       
    }
    exch(arr, pivot, index - 1);
    return index-1;
}

//计数排序
function countingSort(arr) {
    var maxValue=Math.max.apply(null,arr);
    var bucket = new Array(maxValue + 1);
        sortedIndex = 0;
        arrLen = arr.length,
        bucketLen = maxValue + 1;
    spaceTimes+=arrLen+maxValue+7;
    
 
    for (var i = 0; i < arrLen; i++) {
        if (!bucket[arr[i]]) {
            bucket[arr[i]] = 0;
            changeTimes++;
        }
        bucket[arr[i]]++; 
        changeTimes++;
    }
 
    
    for (var j = 0; j < bucketLen; j++) {
        while(less(0,bucket[j])) {
            arr[sortedIndex++] = j;
            changeTimes++;
            bucket[j]--;
        }
    }
    return arr;
}

//交换两个元素
function exch(arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
    changeTimes+=3;
    spaceTimes++;
}

function less(a,b){
    compareTimes++;
    return a<b;
}
function randArr(n){
    var rnd=new Array;
    for(var i=0;i<n;i++){
        rnd[i]=Math.round(Math.random()*1000);
    }
    return rnd;
}

var arr=randArr(20000);
sortTime=new Date();
arr=quickSort(arr);
sortTime=new Date()-sortTime;
document.write(arr);
document.write("  "+compareTimes)
document.write("  "+changeTimes)
document.write("  "+sortTime)
document.write(" "+spaceTimes)




