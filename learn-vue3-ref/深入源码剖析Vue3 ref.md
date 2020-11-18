## 深入源码剖析Vue3 ref

关于ref，官方的解释是：

> 接受一个内部值并返回一个响应式且可变的 ref 对象

https://www.vue3js.cn/docs/zh/api/refs-api.html#ref

为了方便理解，下文中将`内部值`都称为`原始数据`（orgin）

简单来说ref就是：原始数据=>响应式数据 的过程

但有几个问题得搞明白

1. ref接受的原始数据是什么类型？是原始值还是引用值，还是都行？
2. 返回的响应式数据具体是什么？根据传递的数据类型不同，返回的响应式对象是否不同？
3. 响应式数据改变会触发界面更新，那原始数据改变会触发界面更新吗？即原始数据和返回的响应式数据是否有关联

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

经测试，我们发现：**传递的原始数据orgin可以是原始值也可以是引用值**，但是需要注意，如果传递的是原始值，指向原始数据的那个值保存在返回的响应式数据的.value中，如上count.value；如果传递的一个对象，返回的响应式数据的.value中对应有指向原始数据的属性，如上count.value.val

为了测试第二个问题，我们将上述示例中的count打出来，看返回的具体是什么

```javascript
console.log(count)
console.log(count.constructor)
```

首先，如果传入的是原始值数据，返回的结果如下：

![](C:\Users\Administrator\Desktop\learn-vue3\learn-vue3-ref\1.原始值ref后的结果.png)

然后，如果传入的是对象，返回结果如下：

![image-20201118084115469](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20201118084115469.png)

**对比发现，不管传递数据类型的数据给ref，无论是原始值还是引用值，返回的响应式数据对象本质都是由RefImpl类构造出来的对象**。但不同的是里头的value，一个是原始值，一个是Proxy对象

到这里，不妨来读一下RefImpl类的源码

目录：vue-next\packages\reactivity\src\ref.ts

```typescript
class RefImpl<T> {
  private _value: T
  public readonly __v_isRef = true
  constructor(private _rawValue: T, private readonly _shallow = false) {
    this._value = _shallow ? _rawValue : convert(_rawValue)
  }
  get value() {
    track(toRaw(this), TrackOpTypes.GET, 'value')
    return this._value
  }
  set value(newVal) {
    if (hasChanged(toRaw(newVal), this._rawValue)) {
      this._rawValue = newVal
      this._value = this._shallow ? newVal : convert(newVal)
      trigger(toRaw(this), TriggerOpTypes.SET, 'value', newVal)
    }
  }
}
```

可以看见RefImpl class传递了一个泛型类型T，里头具体包含：

1. 有个私有属性_value，类型为T，有个公开只读属性__v_isRef值为true

2. 有两个方法，get value(){}和set value(){}，分别对应私有属性的读写操作，用于供外界操作value

3. 有个构造函数constructor，用于构造对象。构造函数接受两个参数：

   - 第一个参数_rawValue，要求是T类型
   - 第二个参数_shallow，默认值为true

   当通过它构建对象时，会给对象的`_value`属性赋值为` _rawValue`或者`convert(_rawValue)`

   再看convert源码如下：

```typescript
const convert = <T extends unknown>(val: T): T =>
  isObject(val) ? reactive(val) : val
```

通过源码我们发现，最终，Vue会根据传入的数据是不是对象isObject(val)，如果是对象本质调用的是reactive，否则返回原始数据

下面再来验证最后一个问题就是：通过ref包装的结果，当原始数据改变时会触发界面更新吗？即原始数据和返回的响应式数据是否有关联？

示例代码3

```javascript
let origin = 0; //原始值
let count = ref(origin);
function add() {
  origin++
  console.log(count.value)
}
```

示例代码4

```javascript
let origin = { val: 0 }; //引用值
let count = ref(origin);
function add() {
  origin++
  console.log(count.value.val)
}
```

发现，**无论传入给ref的原始数据是原始值还是引用值，当原始数据发生修改时，并不会影响响应式数据，更不会触发界面UI的更新**

但如果响应式数据发生改变，对应界面UI是会自动更新的。注意不影响原始数据

实例代码5

```javascript
let origin = 0; 
let count = ref(origin);
function add() {
  count.value++
  console.log(origin)
}
```

上述代码，无论count修改多少次，origin一直是0

以上就是ref的使用！

小结一下：

1. ref本质是将一个数据变成一个对象，这个对象具有响应式特点
2. ref接受的原始数据可以是原始值也可以是引用值，返回的对象本质都是RefImpl类的实例
3. 无论传入的原始数据时什么类型，当原始数据发生改变时，并不会影响响应数据，更不会触发UI的更新。但当响应式数据发生改变，对应界面UI是会自动更新的，注意不影响原始数据。所以ref中，原始数据和经过ref包装后的响应式数据是无关联的



