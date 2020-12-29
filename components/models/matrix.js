class Matrix{
    m //矩阵
    constructor(martix) {
        this.m = martix;
    }

    get rowNum(){
        return this.m.length;
    }

    get colsNum(){
        return this.m[0].length;
    }

    transpose(){
       const descArray = [];
        for(let colIndex = 0; colIndex <  this.colsNum;colIndex++){
             descArray[colIndex] = [];
            for(let rowIndex = 0; rowIndex < this.rowNum; rowIndex++){
                descArray[colIndex][rowIndex] = this.m[rowIndex][colIndex];
            }
        }
        return descArray;
    }

}

export {Matrix}