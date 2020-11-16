import { createApp, createRenderer } from 'vue'
import App from './App.vue'
import './index.css'
import CanvasApp from './components/CanvasApp.vue'

createApp(App).mount('#app')

// 自定义渲染器
let ctx,canvas
// createRenderer()：接受一个options
const nodeOps = {
    createElement(tag, isSVG, is) {
        // 创建元素的逻辑
        //创建元素时由于没有需要创建的dom元素，只需要返回当前元素数据对象
        return { tag }
    },
    insert(child, parent, anchor) {
        // 处理元素的插入逻辑
        // 0.如果是子元素，非真实dom元素，那么此时只需要将数据保存到前面的虚拟对象上即可
        child.parent = parent;
        if (!parent.childs) {
            parent.childs = [child]
        } else {
            parent.childs.push(child)
        }
        // 1.如果传递进来的元素是一个真实的dom元素，在这里会是canvas，需要绘制
        if(parent.nodeType == 1){
            // 说明是元素canvas
            draw(child);
            if(child.onClick){
                canvas.addEventListener('click',()=>{
                    child.onClick();
                    setTimeout(() => {
                        draw();
                    }, 0);
                })
            }
        }

    },
    remove: child => { },
    createText: text => { },
    createComment: text => { },
    setText: (node, text) => { },
    setElementText: (el, text) => { },
    parentNode: node => { },
    nextsibling: node => { },
    querySlector: selector => { },
    setScopeId(el, id) { },
    cloneNode(el) { },
    insertStaticContent(content, parent, anchor, isSVG) { },
    patchProp(el, key, prevValue, nextValue) {
        // 处理属性的更新
        el[key] = nextValue;
    }
}
const renderer = createRenderer(nodeOps);

// 绘制逻辑
const draw = (el,noClear)=>{
    // el:每次要绘制的子元素
    if(!noClear){
        ctx.clearRect(0,0,canvas.width,canvas.height)
    }
    if(el.tag == 'piechart'){
        let {data,r,x,y} = el;
        let total =  data.reduce((memo,current)=>memo+current.count)//reduce还需要接受第二个参数
        let start = 0,end=0;
        data.forEach(item => {
            end += item.count/total * 360;
            drawPiechart(start,end,item.color,x,y,r);
            drawPieChartText(item.name,(start+end)/2,x,y,r);
            start = end;
        });
    }
    el.childs && el.childs.forEach(child=>draw(child,true))
}
const d2a = (n)=>{
    return n* Math.PI/180;
}
const drawPiechart=(start,end,color,cx,cy,r)=>{
    let x = cx + Math.cos(d2a(start))*r;
    let y = cy + Math.sin(d2a(start))*r;
    ctx.beginPath();
    ctx.moveTo(cx,cy);
    ctx.lineTo(x,y);
    ctx.arc(cx,cy,r,d2a(start),d2a(end),false);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}
const drawPieChartText=(value,position,cx,cy,r)=>{
    ctx.beginPath();
    let x = cx + Math.cos(d2a(position))*r/1.25 -20;
    let y = cy + Math.sin(d2a(position))*r/1.25;
    ctx.fillStyle = '#000';
    ctx.font = '20px 微软雅黑';
    // ctx.fillText(val,x,y);
    ctx.closePath();
}

// 扩展mount:创建画布元素
function createCanvasApp(App){
    const app = renderer.createApp(App);
    const mount = app.mount;
    app.mount = function(selector){
        // 创建并且插入画布
        canvas = document.createElement('canvas');
        ctx = canvas.getContext('2d');
        // 设置画布基础属性
        canvas.width = 600;
        canvas.height = 600;
        document.querySelector(selector).appendChild(canvas);
        // 挂载
        mount(canvas)
    }
    return app;
}
createCanvasApp(CanvasApp).mount("#demo")