module.exports = function(server) {
    var Location = require('../models/location');
    var Event = require('../models/event');
    var User = require('../models/user');
    var Place = require('../models/place');

    server.get('/stats/location/:location', function(req, res) {
        Event.find({
            location: req.params.location
        }).sort({
            starts_at: -1
        }).lean().exec(function(error, events) {
            if (error) {
                res.json({
                    title: "Failed",
                    message: "Could not find location.",
                    error: error
                });
            } else {
              //Get the location these events belong to
                Location.findOne({_id:req.params.location},function(error,location){
                  var stats=[];
                  for(var i=0;i<events.length;i++){
                    var out={};
                    out.eventID = events[i]._id;
                    out.eventName = events[i].name;
                    out.eventStart = events[i].starts_at;
                    out.attendeeCount = events[i].attendees.length;

                    var arr = {
                      "attended":0,
                      "accepted":0,
                      "declined":0,
                      "invited":0
                    };
                    for(var a=0;a<events[i].attendees.length;a++){
                      arr[events[i].attendees[a].status]++;
                    }

                    out.stats = arr;
                    out.locationName = location.name;
                    out.locationMaxPeople = location.max_people;
                    out.inviteUsage = events[i].attendees.length/out.locationMaxPeople;
                    out.attendUsage = arr["attended"]/events[i].attendees.length;

                    stats.push(out);
                  }


                  res.json({"location":location, "stats":stats});
                });
            }
        });
    });
}
