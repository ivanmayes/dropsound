Meteor.publish("parties", function() {
    return Parties.find({
        $or: [
            {
                $and: [
                    {
                        "public": true
                    },
                    {
                        "public": {
                            $exists: true
                        }
                    }
                ]
            },
            {
                $and: [
                    {
                        owner: this.userId
                    },
                    {
                        owner: {
                            $exists: true
                        }
                    }
                ]
            }
        ]
    });
});

var timers = {};

// Wait for playlists to change
Parties.find().observe({
    changed: function(newDocument, oldDocument, index) {
        console.log('changed', newDocument);

        if (newDocument.playlist && !newDocument.currentVideo) {
            newDocument.currentVideo = newDocument.playlist[0];
            newDocument.playlist.splice(0, 1);

            Parties.update({
                _id: newDocument._id
            }, newDocument);
        }

         startVideoTimer(newDocument, newDocument.currentVideo);

    }
});

function startVideoTimer(party, currentVideo) {
    console.log('starting video timer for ', currentVideo.durationSeconds);
    Meteor.setTimeout(function() {
        console.log('Switching video for', party.name);
        party.currentVideo = party.playlist[1];
        party.playlist.splice(0, 1);

        Parties.update({
            _id: party._id
        }, party);

    }, currentVideo.durationSeconds*1000);
}