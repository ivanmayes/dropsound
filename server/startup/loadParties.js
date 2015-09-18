Meteor.startup(function() {
    if (Parties.find().count() === 0) {
        var parties = [
            {
                'name': 'Dubstep-Free Zone',
                'description': 'Fast just got faster with Nexus S.',
                'topic': 'Topic',
                'playlist': [],
                'currentVideo': null
            },
            {
                'name': 'All dubstep all the time',
                'description': 'Get it on!',
                'topic': 'My Rope',
                'playlist': [],
                'currentVideo': null
            },
            {
                'name': 'Savage lounging',
                'description': 'Leisure suit required. And only fiercest manners.',
                'topic': 'Yee haw',
                'playlist': [],
                'currentVideo': null
            }
        ];
        for (var i = 0; i < parties.length; i++) {
            Parties.insert({
                name: parties[i].name,
                description: parties[i].description,
                topic: parties[i].topic,
                playlist: parties[i].playlist,
                currentVideo: parties[i].currentVideo
            });
        }
    }
});