// components/cell/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        cell: Object,
        rowIndex:Number,
        colIndex:Number
    },

    /**
     * 组件的初始数据
     */
    data: {},

    /**
     * 组件的方法列表
     */
    methods: {
        onTap(event) {
            this.triggerEvent('celltap',{
                cell:this.properties.cell,
                rowIndex: this.properties.rowIndex,
                colIndex: this.properties.colIndex,
            },{
                bubbles:true,
                composed:true
            })
        }
    }
})
