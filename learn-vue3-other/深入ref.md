## 深入理解Vue3 ref

关于ref，官方的解释是：

> 接受一个内部值并返回一个响应式且可变的 ref 对象

https://www.vue3js.cn/docs/zh/api/refs-api.html#ref

为了方便理解，下文中将`内部值`都称为`原始数据`（orgin）

简单来说ref就是：原始数据=>响应式数据 的过程

但有几个问题得搞明白

1. ref接受的原始数据是什么类型？是原始值还是引用值，还是都行？
2. 返回的响应式数据具体是什么？根据传递的数据类型不同，返回的响应式对象是否不同？
3. 响应式数据改变会触发界面更新，按原始数据改变会触发界面更新吗？即原始数据和返回的响应式数据是否有关联

示例代码1：

```javascript
let origin = 0; //原始数据为原始值
let count = ref(origin);
function add() {
  count.value++;
}
```

示例代码2：

```javascript
let origin = { val: 0 };//原始数据为对象
let count = ref(origin);
function add() {
  count.value.val++;
}
```

经测试，我们发现：**传递的元素数据orgin可以是原始值也可以是引用值**，但是需要注意，如果传递的是原始值，指向原始数据的那个值保存在返回的响应式数据的.value中，如上count.value；如果传递的一个对象，返回的响应式数据的.value中对应有指向原始数据的属性，如上count.value.val

为了测试第二个问题，我们将上述示例中的count打出来，看返回的具体是什么

```javascript
console.log(count)
```







1. 当响应式数据改变，相应界面UI会自动更新，但不影响原始数据（上述所说的内部值）
2. 但当原始值改变的时候，不影响响应式数据，所以响应式数据对应的界面UI也不会自动更新



