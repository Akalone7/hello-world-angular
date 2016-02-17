'use strict';

angular.module('hsClefraApp')

    .factory('ListFac', function () {
        var ListConstructor = function () {
            this.list = [];
        };

        ListConstructor.prototype.add = function (item) {
            this.list.push(item);
        };

        /* unused and untested:

         ListConstructor.prototype.remove = function(item) {
         this.list.splice(this.list.indexOf(item), 1);
         };

         ListConstructor.prototype.get = function(index) {
         return this.list[index] || null;
         };

         ListConstructor.prototype.size = function() {
         return this.list.length;
         };
         */


        ListConstructor.prototype.all = function () {
            return this.list;
        };

        return ListConstructor;
    });
