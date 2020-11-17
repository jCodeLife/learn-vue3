# Vue3 Tree-shaking

vue3一个比较大的显著的区别就是，当你用一个bundler的时候，比如webpack或者rollup，webpack和rollup都是有tree shaking功能，但是Tree shaking的前提是所有的东西都必须用ES6 module的import来写。

而vue3 在浏览器里的时候依然会由一个全局的vue对象，但是当你用了一个bundler时（比如webpack），它就没有default export，你就不能import vue，然后把vue本身当一个对象去操作。所有的这些API全部要用import的方式import进来，这样的结果就是使得一些可能不会用到的一些功能就可以被tree shaking掉。比如说v-model、<transition>这些功能，如果你不用的话，就不会引用到最后的包里。

Tree-shaking某种程度上来讲，也是通过编译器去实现的。举例来说

6