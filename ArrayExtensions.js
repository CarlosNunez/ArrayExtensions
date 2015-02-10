(function() {
    "use strict";

    var extensionMethod,

        is_array = function(value) {
            return Object.prototype.toString.apply(value) === '[object Array]';
        },

        is_function = function(value) {
            return typeof value === "function";
        },

        defaultFunc = function(x) {
            return x;
        },

        arrayExtension = {

            each: function(callback) {
                var len = this.length,
                    i;

                if( !callback || !is_function(callback) ) {
                    throw new TypeError('method "each" requires a function'); 
                }    

                for ( i = 0; i < len; i += 1 ) {
                    callback.call(this, this[i], i, this);
                }

                return this;
            },

            where: function(spec) {
                var len = this.length,
                    buffer = [],
                    value,
                    i;

                if( !spec || !is_function(spec) ) {
                    throw new TypeError('method "where" requires a function'); 
                }    

                for (i = 0; i < len; i += 1) {
                    value = this[i];

                    if ( spec.call(this, value) ) {
                        buffer.push(value);
                    }
                }

                return buffer;
            },

            any: function(spec) {
                var len = this.length,
                    value,
                    i;

                if (!is_function(spec)) {
                    for (i = 0; i < len; i += 1) {
                        value = this[i];
                        if (spec === value) {
                            return true;
                        }
                    }
                    return false;

                }

                for (i = 0; i < len; i += 1) {
                    value = this[i];

                    if ( spec.call(this, value) ) {
                        return true;
                    }
                }

                return false;

            },

            select: function(spec) {
                var len = this.length,
                    buffer = [],
                    value,
                    result,
                    i;

                for (i = 0; i < len; i += 1) {
                    value = this[i];
                    result = spec.call(this, value);

                    buffer.push(result);

                }

                return buffer;
            },

            take: function(howMany, spec) {
                var len = this.length,
                    buffer = [],
                    value,
                    i;

                if ( !is_function(spec) ) {
                    spec = defaultFunc;
                }

                for (i = 0; i < len; i += 1) {
                    if ( spec.call(this, this[i]) ) {
                        buffer.push(this[i]);

                        if ( buffer.length >= howMany ) {
                            return buffer;
                        }
                    }
                }
                return buffer;
            },

            skip: function(howMany) {
                var skipped = [];

                skipped = this.slice();
                skipped.splice(0, howMany);

                return skipped;
            },

            first: function(spec) {
                var len = this.length,
                    value,
                    i;

                if ( !is_function(spec) ) {
                    spec = defaultFunc;
                }

                for ( i = 0; i < len; i += 1 ) {
                    value = this[i];
                    if ( spec.call(this, value) ) {
                        return value;
                    }
                }
                return null;
            },

            last: function(spec) {
                var value,
                    i;

                if ( !is_function(spec) ) {
                    spec = defaultFunc;
                }

                for (i = this.length - 1; i > 0; i -= 1) {

                    value = this[i];
                    if ( spec.call(this, value) ) {
                        return value;
                    }
                }
            },

            count: function(spec) {
                var len = this.length,
                    counter = 0,
                    value,
                    i;

                if ( !is_function(spec) ) {
                    return this.length;
                }

                for (i = 0; i < len; i += 1) {
                    value = this[i];
                    if ( spec.call(this, value) ) {
                        counter += 1;
                    }
                }

                return counter;
            },

            index: function(spec) {
                var len = this.length,
                    buffer = [],
                    value,
                    i;

                if ( !is_function(spec) ) {
                    for ( i = 0; i < len; i += 1 ) {
                        value = this[i];
                        if ( spec === value ) {
                            return i;
                        }
                    }
                    return -1;
                }

                for (i = 0; i < len; i += 1) {
                    value = this[i];
                    if (spec.call( this, value )) {
                        return i;
                    }
                }

                return -1;
            },

            pluck : function(property) {
                var len = this.length,
                    buffer = [],
                    value,
                    i;

                for (i = 0; i < len; i += 1) {
                    value = this[i];
                    if ( value[property] ) {
                        buffer.push(value[property]);
                    }
                }

                return buffer;
            },

            sum : function(spec) {
                var len = this.length,
                    i,
                    result,
                    sum = null;

                if ( !is_function(spec) ) {
                    spec = defaultFunc;
                }

                for ( i = 0; i < len; i += 1 ) {
                    result = spec.call(this, this[i]);
                    sum += result;
                }

                return sum;
            },

            max : function(comparer) {
                var result,
                    len = this.length;

                if (len <= 0) {
                    return null;
                }

                if (!is_function(comparer)) {
                    comparer = function(a, b) {
                        return a - b;
                    };
                }

                result = this.reduce(function (a, b) {
                    if (comparer.call(this, a, b) >= 0) {
                        return a;
                    }
                    return b;
                });

                return result;

            },

            min : function(comparer) {
                var result,
                    len = this.length;

                if (len <= 0) {
                    return null;
                }

                if (!is_function(comparer)) {
                    comparer = function(a, b) {
                        return a - b;
                    };
                }

                result = this.reduce(function (a, b) {
                    if (comparer.call(this, a, b) <= 0) {
                        return a;
                    }
                    return b;
                });

                return result;
            },

            flatten: function() {
                var flat = [],
                    len = this.length,
                    i,
                    j,
                    temp,
                    tempLen,
                    item;

                for ( i = 0; i < len; i += 1 ) {
                    item = this[i];

                    if ( !is_array(item) ) {
                        flat.push(item);
                    } else {
                        temp = item.flatten();
                        tempLen = temp.length;
                        for (j = 0; j < tempLen; j += 1) {
                            flat.push(temp[j]);
                        }
                    }
                }

                return flat;
            }
        };

    for ( extensionMethod in arrayExtension ) {
        if ( arrayExtension.hasOwnProperty(extensionMethod) ) {
            if ( !is_function(Array.prototype[extensionMethod]) ) {
                Array.prototype[extensionMethod] = arrayExtension[extensionMethod];
            }
        }
    }

})(exports || this);