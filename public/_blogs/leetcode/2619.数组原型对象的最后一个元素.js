Array.prototype.last = function () {
    return this.length ? this[this.length - 1] : -1;
};

Array.prototype.last = function () {
    return this[this.length - 1] ?? -1;
};

// 空值合并运算符（??）
// 空值合并运算符（??）是一个逻辑运算符，当左侧的操作数为 null 或者 undefined 时，返回其右侧操作数，否则返回左侧操作数。

// 与逻辑或运算符（||）不同，逻辑或运算符会在左侧操作数为假值时返回右侧操作数。也就是说，如果使用 || 来为某些变量设置默认值，可能会遇到意料之外的行为。比如为假值（例如，'' 或 0）时。