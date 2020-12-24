const fi = (function() {
  return {
    libraryMethod: function() {
      return 'Start by reading https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0'
    },

    each: function(array, callback) {
      let collection = Object.values(array)
      for (let i = 0; i < collection.length; i++) {
        callback(collection[i], i, collection)
      }
      return array
    },

    map: function(array, callback) {
      let collection = Object.values(array)
      let newArray = []
      for (let i = 0; i < collection.length; i++) {
        newArray.push(callback(collection[i], i, collection))
      }
      return newArray
    },

    reduce: function(collection, callback, acc = 0) {
      const newColl = collection instanceof Array ? collection.slice() : Object.values(collection)
      let result = !!acc ? acc : newColl[0]
      for (let i = !!acc ? 0 : 1; i < newColl.length; i++) {
        result = callback(result, collection[i], collection)
      }
      return result
    },

    find: function(collection, predicate) {
      for (let i = 0; i < collection.length; i++)
      if (predicate(collection[i])) 
        return collection[i]
    },

    filter: function(collection, predicate) {
      let newArr = []
      for (let i = 0; i < collection.length; i++)
      if (predicate(collection[i]))
      newArr.push(collection[i])
      return newArr
    },

    size: function(collection) {
      return (collection instanceof Array) ? collection.length : Object.keys(collection).length
    },

    first: function(array, n) {
      return n ? array.slice(0, n) : array[0]
    },

    last: function(array, n) {
      return n ? array.slice(array.length-n, array.length) : array[array.length-1]
    },

    compact: function(array) {
      const set = new Set([false, null, 0, "", undefined, NaN])
      return array.filter(e => !set.has(e))
    },

    sortBy: function(array, callback) {
      const newArray = [...array]
      return newArray.sort(function(a, b) {
        return callback(a) - callback(b)
      })
    },

    unpack: function(receiver, array) {
      for (let value of array) {
          receiver.push(value);
      }
    },

    flatten: function(collection, shallow, newArray=[]) {
      if (!Array.isArray(collection)) return newArray.push(collection)

      if (shallow) {
          for (let val of collection)
              Array.isArray(val) ? this.unpack(newArray, val) : newArray.push(val)
      } else {
          for (let val of collection) {
              this.flatten(val, false, newArray)
          }
      }
      return newArray
    },

    uniqSorted: function(collection, iteratee) {
      const sorted = [collection[0]]
      for (let idx = 1; idx < collection.length; idx++) {
        if (sorted[idx-1] !== collection[idx])
          sorted.push(collection[idx])
      }
      return sorted
    },

    uniq: function(collection, sorted=false, iteratee=false) {
      if (sorted) {
        return fi.uniqSorted(collection, iteratee)
      } else if (!iteratee) {
        return Array.from(new Set(collection))
      } else {
        const modifiedVals = new Set()
        const uniqVals = new Set()
        for (let val of collection) {
          const moddedVal = iteratee(val)
          if (!modifiedVals.has(moddedVal)) {
            modifiedVals.add(moddedVal)
            uniqVals.add(val)
          }
        }
        return Array.from(uniqVals)
      }
    },

    keys: function(object) {
      const keys = []
      for (let key in object){
        keys.push(key)
      }
      return keys
    },

    values: function(object){
      const values = []
      for(let key in object) { 
        values.push(object[key])
      }
      return values
    },

    functions: function(obj) {
      const functionNames = []

      for (let key in obj) {
        if (typeof obj[key] === "function"){
          functionNames.push(key)
        }
      }

      return functionNames.sort()
    },



  }
})()

fi.libraryMethod()
