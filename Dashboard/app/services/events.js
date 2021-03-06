app.factory('Events', ['$rootScope', '$http', function($rootScope, $http) {
    var get = function(callback) {
        $http.get('https://cloud.dean.technology/event/all').then(function(events) {
            events = events.data;
            callback(events);
        }, function(fail) {
            console.log("Failed to get Events", fail);
            callback(fail);
        });
    }

    var getOne = function(id, callback) {
        $http.get('https://cloud.dean.technology/event/' + id).then(function(events) {
            callback(events);
        }, function(fail) {
            console.log("Failed to get Events", fail);
            callback(fail);
        });
    }

    var getUsers = function(callback) {
        $http.get('https://cloud.dean.technology/event').then(function(events) {
            events = events.data;
            callback(events);
        }, function(fail) {
            console.log("Failed to get Events", fail);
            callback(fail);
        });
    }

    var getUpcoming = function(callback) {
        $http.get('https://cloud.dean.technology/event/upcoming').then(function(events) {
            callback(events);
        }, function(fail) {
            console.log("Failed to get Events", fail);
            callback(fail);
        });
    }

    var getPrevious = function(callback) {
        $http.get('https://cloud.dean.technology/event/previous').then(function(events) {
            callback(events);
        }, function(fail) {
            console.log("Failed to get Events", fail);
            callback(fail);
        });
    }

    var add = function(eventObject, callback) {
        //String attendees to array of userID's
        var temp = [];
        for (var i = 0; i < eventObject.attendees.length; i++) {
            temp.push(eventObject.attendees[i].id);
        }
        eventObject.attendees = JSON.stringify(temp);
        eventObject.starts_at = new Date(eventObject.starts_at).toJSON();
        eventObject.ends_at = new Date(eventObject.ends_at).toJSON();
        $http({
            method: 'POST',
            url: 'https://cloud.dean.technology/event',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            transformRequest: function(obj) {
                var str = [];
                for (var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            data: eventObject
        }).then(function(data) {
            callback(data);
        }, function(fail) {
            console.log("Failed to add user", fail);
            callback(fail);
        });
    }

    var del = function(id, callback) {
        $http.delete('https://cloud.dean.technology/event/' + id).then(function(success) {
            callback(success);
        }, function(fail) {
            callback(fail);
        });
    }

    var updateStatus = function(id, status, callback) {
        $http.put('https://cloud.dean.technology/event/' + id + '/' + status).then(function(success) {
            callback(success);
        }, function(fail) {
            callback(fail);
        });
    }


    var edit = function(eventObject, callback) {
        //String attendees to array of userID's
        var attendeesArr=[];
        for(var i=0;i<eventObject.attendees.length;i++){
            attendeesArr.push(eventObject.attendees[i].user._id)
        }
        eventObject.attendees = JSON.stringify(attendeesArr);
        eventObject.location = eventObject.location._id;
        $http({
            method: 'PUT',
            url: 'https://cloud.dean.technology/event/'+eventObject._id,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            transformRequest: function(obj) {
                var str = [];
                for (var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            data: eventObject
        }).then(function(data) {
            callback(data);
        }, function(fail) {
            console.log("Failed to add user", fail);
            callback(fail);
        });
    }

    return {
        get:get,
        getUsers:getUsers,
        getOne:getOne,
        add:add,
        del:del,
        getUpcoming:getUpcoming,
        getPrevious:getPrevious,
        updateStatus:updateStatus,
        edit:edit
    }

}]);
