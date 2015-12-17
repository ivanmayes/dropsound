/*global define*/

define(function() {
    'use strict';

    function ctrl($scope, $stateParams, $rootScope, SearchService, RoomService) {
        $scope.addVideo = addVideo;
        $scope.hideSearch = hideSearch;
        $scope.clearSearch = clearSearch;
        $scope.search = {
            q: '',
            // Old api terms
            maxResults: 10,
            part: 'snippet,contentDetails', //'snippet',
            type: 'video',
            videoEmbeddable: true,
        }
        $scope.searchVideos = searchVideos;
        $scope.videos = [];
        $scope.predefinedVideos = {};

        function addVideo(video, inPlaylist) {
            if(!inPlaylist) {
                console.log('adding video', video, inPlaylist);
                RoomService.addVideoToPlaylist(video);
            }
        }

        function searchVideos() {
            SearchService.searchVideos($scope.search.q)
                .then(function(items) {
                    console.log(items);
                    $scope.videos = items;
                }, function(error) {
                        console.log('searchVideos error', error);
                    })
        }

        function clearSearch() {
            $scope.videos = [];
            $scope.search.q = '';
        }

        function hideSearch() {
            console.log('HIDE');
            $scope.search.showSearchPage = false;
        }

        $scope.predefinedVideos = {
            "nice": [
                {
                    "kind": "youtube#searchResult",
                    "etag": "\"3WIcRE7IJ70nCYemJJIi1L7dYAg/T8yc1U5OGFPHpoA3KzDwKgk0SGE\"",
                    "id": {
                        "kind": "youtube#video",
                        "videoId": "_nLiQBV6A7c"
                    },
                    "snippet": {
                        "publishedAt": "2007-08-19T14:21:12.000Z",
                        "channelId": "UC_k643_JSloMo_Gjy3RQ93Q",
                        "title": "LYNDSAY BUCKINGHAM - HOLIDAY ROAD",
                        "description": "Yes it's that song from National Lampoons Vacation!!.........Great!",
                        "thumbnails": {
                            "default": {
                                "url": "https://i.ytimg.com/vi/_nLiQBV6A7c/default.jpg"
                            },
                            "medium": {
                                "url": "https://i.ytimg.com/vi/_nLiQBV6A7c/mqdefault.jpg"
                            },
                            "high": {
                                "url": "https://i.ytimg.com/vi/_nLiQBV6A7c/hqdefault.jpg"
                            }
                        },
                        "channelTitle": "Retrovidz",
                        "liveBroadcastContent": "none"
                    },
                    "durationString": "2:12",
                    "durationSeconds": 132,
                    "$$hashKey": "02V"
                },
                {
                    "kind": "youtube#searchResult",
                    "etag": "\"3WIcRE7IJ70nCYemJJIi1L7dYAg/Q7kb6kMrk6zN8dxxjQagq5cCpew\"",
                    "id": {
                        "kind": "youtube#video",
                        "videoId": "hjKpi02HtUQ"
                    },
                    "snippet": {
                        "publishedAt": "2010-11-23T11:45:52.000Z",
                        "channelId": "UCnARPDOOC8hKoPN2RBio3aA",
                        "title": "Please Come Home for Christmas--by--Willie Nelson--",
                        "description": "It's a sad song..........Not everyone Will be there for Christmas Some never come back \"Text\" Bells will be ringing The glad, glad news Oh, what a Christmas To ...",
                        "thumbnails": {
                            "default": {
                                "url": "https://i.ytimg.com/vi/hjKpi02HtUQ/default.jpg"
                            },
                            "medium": {
                                "url": "https://i.ytimg.com/vi/hjKpi02HtUQ/mqdefault.jpg"
                            },
                            "high": {
                                "url": "https://i.ytimg.com/vi/hjKpi02HtUQ/hqdefault.jpg"
                            }
                        },
                        "channelTitle": "CatBallouCountrygirl",
                        "liveBroadcastContent": "none"
                    },
                    "durationString": "3:20",
                    "durationSeconds": 200,
                    "$$hashKey": "04L"
                },
                {
                    "kind": "youtube#searchResult",
                    "etag": "\"3WIcRE7IJ70nCYemJJIi1L7dYAg/7froNW8_vWffVfpnVdwzzFDvHYY\"",
                    "id": {
                        "kind": "youtube#video",
                        "videoId": "zPm52ntFG6I"
                    },
                    "snippet": {
                        "publishedAt": "2012-10-29T00:13:49.000Z",
                        "channelId": "UCFnzfBlcwIY1M9pdIA0Aakw",
                        "title": "Faster Pussycat   Run Rudolph Run",
                        "description": "I DO NOT OWN THE RIGHTS.",
                        "thumbnails": {
                            "default": {
                                "url": "https://i.ytimg.com/vi/zPm52ntFG6I/default.jpg"
                            },
                            "medium": {
                                "url": "https://i.ytimg.com/vi/zPm52ntFG6I/mqdefault.jpg"
                            },
                            "high": {
                                "url": "https://i.ytimg.com/vi/zPm52ntFG6I/hqdefault.jpg"
                            }
                        },
                        "channelTitle": "theatino1",
                        "liveBroadcastContent": "none"
                    },
                    "durationString": "3:10",
                    "durationSeconds": 190,
                    "$$hashKey": "05Z"
                },
                {
                    "kind": "youtube#searchResult",
                    "etag": "\"3WIcRE7IJ70nCYemJJIi1L7dYAg/xxzPoKg_t_YdJAtXR19S15ZZdqc\"",
                    "id": {
                        "kind": "youtube#video",
                        "videoId": "Rahymu_7vIg"
                    },
                    "snippet": {
                        "publishedAt": "2012-12-11T08:00:23.000Z",
                        "channelId": "UCg96HsuBlr-YN09V8IAog2Q",
                        "title": "AgesandAges - We Need A Little Christmas",
                        "description": "Music video by AgesandAges performing We Need A Little Christmas. (C) 2012 MPL Communications Inc. and StarCon, LLC d/b/a Hear Music™",
                        "thumbnails": {
                            "default": {
                                "url": "https://i.ytimg.com/vi/Rahymu_7vIg/default.jpg"
                            },
                            "medium": {
                                "url": "https://i.ytimg.com/vi/Rahymu_7vIg/mqdefault.jpg"
                            },
                            "high": {
                                "url": "https://i.ytimg.com/vi/Rahymu_7vIg/hqdefault.jpg"
                            }
                        },
                        "channelTitle": "AgesandAgesVEVO",
                        "liveBroadcastContent": "none"
                    },
                    "durationString": "3:18",
                    "durationSeconds": 198,
                    "$$hashKey": "074"
                },
                {
                    "kind": "youtube#searchResult",
                    "etag": "\"3WIcRE7IJ70nCYemJJIi1L7dYAg/UsD2vsml8O37b6L8iflGgkskZck\"",
                    "id": {
                        "kind": "youtube#video",
                        "videoId": "UWLIgjB9gGw"
                    },
                    "snippet": {
                        "publishedAt": "2011-06-09T02:18:10.000Z",
                        "channelId": "UCn8caPoYEUCkJ3zxAIquxQA",
                        "title": "Celebrate Good Times... Come on!!!",
                        "description": "",
                        "thumbnails": {
                            "default": {
                                "url": "https://i.ytimg.com/vi/UWLIgjB9gGw/default.jpg"
                            },
                            "medium": {
                                "url": "https://i.ytimg.com/vi/UWLIgjB9gGw/mqdefault.jpg"
                            },
                            "high": {
                                "url": "https://i.ytimg.com/vi/UWLIgjB9gGw/hqdefault.jpg"
                            }
                        },
                        "channelTitle": "bocadecassapa",
                        "liveBroadcastContent": "none"
                    },
                    "durationString": "2:33",
                    "durationSeconds": 153,
                    "$$hashKey": "08T"
                },
                {
                    "kind": "youtube#searchResult",
                    "etag": "\"3WIcRE7IJ70nCYemJJIi1L7dYAg/vyDPXg4FbigK5-bYZt2BYBTOMCI\"",
                    "id": {
                        "kind": "youtube#video",
                        "videoId": "nEjLFpU2pJ4"
                    },
                    "snippet": {
                        "publishedAt": "2011-10-10T00:55:22.000Z",
                        "channelId": "UCo0PRWkc9j54AL-JhrlQdhw",
                        "title": "The Isley Brothers - Shout",
                        "description": "The Isley Brothers are a highly influential, successful and long-running American music group consisting of different line-ups of six brothers, and a brother-in-law ...",
                        "thumbnails": {
                            "default": {
                                "url": "https://i.ytimg.com/vi/nEjLFpU2pJ4/default.jpg"
                            },
                            "medium": {
                                "url": "https://i.ytimg.com/vi/nEjLFpU2pJ4/mqdefault.jpg"
                            },
                            "high": {
                                "url": "https://i.ytimg.com/vi/nEjLFpU2pJ4/hqdefault.jpg"
                            }
                        },
                        "channelTitle": "GreatOldiesDJ",
                        "liveBroadcastContent": "none"
                    },
                    "durationString": "4:19",
                    "durationSeconds": 259,
                    "$$hashKey": "00C"
                },
                {
                    "kind": "youtube#searchResult",
                    "etag": "\"3WIcRE7IJ70nCYemJJIi1L7dYAg/8flkYEOVfV2UTsQgWmFGZBsEJ1A\"",
                    "id": {
                        "kind": "youtube#video",
                        "videoId": "CdqoNKCCt7A"
                    },
                    "snippet": {
                        "publishedAt": "2010-12-03T20:32:09.000Z",
                        "channelId": "UCvKbr7LAMi2Xqyensk7i5Ng",
                        "title": "Simple Minds - Don't You (Forget About Me)",
                        "description": "Music video by Simple Minds performing Don't You (Forget About Me). (P) (C) 2010 Virgin Records America, Inc.. All rights reserved. Unauthorized reproduction ...",
                        "thumbnails": {
                            "default": {
                                "url": "https://i.ytimg.com/vi/CdqoNKCCt7A/default.jpg"
                            },
                            "medium": {
                                "url": "https://i.ytimg.com/vi/CdqoNKCCt7A/mqdefault.jpg"
                            },
                            "high": {
                                "url": "https://i.ytimg.com/vi/CdqoNKCCt7A/hqdefault.jpg"
                            }
                        },
                        "channelTitle": "SimpleMindsVEVO",
                        "liveBroadcastContent": "none"
                    },
                    "durationString": "4:20",
                    "durationSeconds": 260,
                    "$$hashKey": "00C"
                },
                {
                    "kind": "youtube#searchResult",
                    "etag": "\"3WIcRE7IJ70nCYemJJIi1L7dYAg/na0OQthvjLCcau8EB9ROL6cOhK0\"",
                    "id": {
                        "kind": "youtube#video",
                        "videoId": "1rCZduGdax8"
                    },
                    "snippet": {
                        "publishedAt": "2010-11-10T16:15:58.000Z",
                        "channelId": "UC1MqD8xRlrGqD6sDA9pkcnQ",
                        "title": "Susan Boyle auld lang syne",
                        "description": "Susan Boyle auld lang syne.",
                        "thumbnails": {
                            "default": {
                                "url": "https://i.ytimg.com/vi/1rCZduGdax8/default.jpg"
                            },
                            "medium": {
                                "url": "https://i.ytimg.com/vi/1rCZduGdax8/mqdefault.jpg"
                            },
                            "high": {
                                "url": "https://i.ytimg.com/vi/1rCZduGdax8/hqdefault.jpg"
                            }
                        },
                        "channelTitle": "gabychest",
                        "liveBroadcastContent": "none"
                    },
                    "durationString": "2:58",
                    "durationSeconds": 178,
                    "$$hashKey": "021"
                },
                {
                    "kind": "youtube#searchResult",
                    "etag": "\"3WIcRE7IJ70nCYemJJIi1L7dYAg/zPBAbnndqeILDGKAIHdKcj36MNA\"",
                    "id": {
                        "kind": "youtube#video",
                        "videoId": "_6xNuUEnh2g"
                    },
                    "snippet": {
                        "publishedAt": "2009-01-05T17:26:14.000Z",
                        "channelId": "UCMsstyixvVd_fJL104YI5jw",
                        "title": "BRENDA LEE - ROCKIN AROUND THE CHRISTMAS TREE",
                        "description": "BRENDA LEE - ROCKIN AROUND THE CHRISTMAS TREE.",
                        "thumbnails": {
                            "default": {
                                "url": "https://i.ytimg.com/vi/_6xNuUEnh2g/default.jpg"
                            },
                            "medium": {
                                "url": "https://i.ytimg.com/vi/_6xNuUEnh2g/mqdefault.jpg"
                            },
                            "high": {
                                "url": "https://i.ytimg.com/vi/_6xNuUEnh2g/hqdefault.jpg"
                            }
                        },
                        "channelTitle": "icezbridy",
                        "liveBroadcastContent": "none"
                    },
                    "durationString": "2:04",
                    "durationSeconds": 124,
                    "$$hashKey": "03O"
                },
                {
                    "kind": "youtube#searchResult",
                    "etag": "\"3WIcRE7IJ70nCYemJJIi1L7dYAg/fVJWUkR6hV5maCEB_KH9GshdYmc\"",
                    "id": {
                        "kind": "youtube#video",
                        "videoId": "GJSUT8Inl14"
                    },
                    "snippet": {
                        "publishedAt": "2010-11-18T20:59:37.000Z",
                        "channelId": "UCNzw4AM3okSr5vqgMpSIUPA",
                        "title": "WHITE CHRISTMAS - Bing Crosby",
                        "description": "Sung by Bing Crosby in his 1954 musical film \"White Christmas\" featuring the songs of Irving Berlin including White Christmas. Starring Bing Crosby himself and ...",
                        "thumbnails": {
                            "default": {
                                "url": "https://i.ytimg.com/vi/GJSUT8Inl14/default.jpg"
                            },
                            "medium": {
                                "url": "https://i.ytimg.com/vi/GJSUT8Inl14/mqdefault.jpg"
                            },
                            "high": {
                                "url": "https://i.ytimg.com/vi/GJSUT8Inl14/hqdefault.jpg"
                            }
                        },
                        "channelTitle": "christmas123100",
                        "liveBroadcastContent": "none"
                    },
                    "durationString": "3:03",
                    "durationSeconds": 183,
                    "$$hashKey": "071"
                },
                {
                    "kind": "youtube#searchResult",
                    "etag": "\"3WIcRE7IJ70nCYemJJIi1L7dYAg/NNVIxBA90HDq8FdG6D4d566pIBA\"",
                    "id": {
                        "kind": "youtube#video",
                        "videoId": "4PzetPqepXA"
                    },
                    "snippet": {
                        "publishedAt": "2012-12-04T08:01:14.000Z",
                        "channelId": "UCGRXhgTAT-ozbpVf0WhktqQ",
                        "title": "Vince Guaraldi Trio - Christmas Time Is Here (Vocal)",
                        "description": "Music video by Vince Guaraldi Trio performing Christmas Time Is Here. (C) 2012 Concord Music Group, Inc.",
                        "thumbnails": {
                            "default": {
                                "url": "https://i.ytimg.com/vi/4PzetPqepXA/default.jpg"
                            },
                            "medium": {
                                "url": "https://i.ytimg.com/vi/4PzetPqepXA/mqdefault.jpg"
                            },
                            "high": {
                                "url": "https://i.ytimg.com/vi/4PzetPqepXA/hqdefault.jpg"
                            }
                        },
                        "channelTitle": "VinceGuaraldiVEVO",
                        "liveBroadcastContent": "none"
                    },
                    "durationString": "2:46",
                    "durationSeconds": 166,
                    "$$hashKey": "0M6"
                },
                {
                    "kind": "youtube#searchResult",
                    "etag": "\"3WIcRE7IJ70nCYemJJIi1L7dYAg/4QltsEja00shu4e5efe2WN4h4y4\"",
                    "id": {
                        "kind": "youtube#video",
                        "videoId": "DQ9cxfumEOo"
                    },
                    "snippet": {
                        "publishedAt": "2012-12-02T16:33:14.000Z",
                        "channelId": "UC7wiP0KnqF8_RrOYlzWSodw",
                        "title": "White Christmas   Snow",
                        "description": "(c) Paramount pictures.",
                        "thumbnails": {
                            "default": {
                                "url": "https://i.ytimg.com/vi/DQ9cxfumEOo/default.jpg"
                            },
                            "medium": {
                                "url": "https://i.ytimg.com/vi/DQ9cxfumEOo/mqdefault.jpg"
                            },
                            "high": {
                                "url": "https://i.ytimg.com/vi/DQ9cxfumEOo/hqdefault.jpg"
                            }
                        },
                        "channelTitle": "tantecarla",
                        "liveBroadcastContent": "none"
                    },
                    "durationString": "1:59",
                    "durationSeconds": 119,
                    "$$hashKey": "0PE"
                },
                {
                    "kind": "youtube#searchResult",
                    "etag": "\"3WIcRE7IJ70nCYemJJIi1L7dYAg/lvjhm8bsKyL1jjeyIxGFL4jm0CU\"",
                    "id": {
                        "kind": "youtube#video",
                        "videoId": "h3xY1IOILBg"
                    },
                    "snippet": {
                        "publishedAt": "2013-04-05T22:11:25.000Z",
                        "channelId": "UC-IHcwo3LjiDgAliMk3mvPA",
                        "title": "Johnny Cash - Silent Night",
                        "description": "Music video by Johnny Cash performing Silent Night. (C) 2009 Sony Music Entertainment.",
                        "thumbnails": {
                            "default": {
                                "url": "https://i.ytimg.com/vi/h3xY1IOILBg/default.jpg"
                            },
                            "medium": {
                                "url": "https://i.ytimg.com/vi/h3xY1IOILBg/mqdefault.jpg"
                            },
                            "high": {
                                "url": "https://i.ytimg.com/vi/h3xY1IOILBg/hqdefault.jpg"
                            }
                        },
                        "channelTitle": "LegacyRecordingsVEVO",
                        "liveBroadcastContent": "none"
                    },
                    "durationString": "2:03",
                    "durationSeconds": 123,
                    "$$hashKey": "0UK"
                },
                {
                    "kind": "youtube#searchResult",
                    "etag": "\"3WIcRE7IJ70nCYemJJIi1L7dYAg/fLT8iES4CwOS9WEvE5dwF9vyRo4\"",
                    "id": {
                        "kind": "youtube#video",
                        "videoId": "3qFK5YFvTYE"
                    },
                    "snippet": {
                        "publishedAt": "2012-12-05T14:12:05.000Z",
                        "channelId": "UCTxqoioo8obdPl11SY4BxlQ",
                        "title": "Baby its Cold Outside - Dean Martin",
                        "description": "Available NOW on iTunes: http://bit.ly/R7mYEg Check out our website http://heroeslegendsicons.com/ Dean Martin sings 'Baby its Cold Outside', as part of our ...",
                        "thumbnails": {
                            "default": {
                                "url": "https://i.ytimg.com/vi/3qFK5YFvTYE/default.jpg"
                            },
                            "medium": {
                                "url": "https://i.ytimg.com/vi/3qFK5YFvTYE/mqdefault.jpg"
                            },
                            "high": {
                                "url": "https://i.ytimg.com/vi/3qFK5YFvTYE/hqdefault.jpg"
                            }
                        },
                        "channelTitle": "HeroesLegendsIcons",
                        "liveBroadcastContent": "none"
                    },
                    "durationString": "2:22",
                    "durationSeconds": 142,
                    "$$hashKey": "0ZQ"
                },
                {
                    "kind": "youtube#searchResult",
                    "etag": "\"3WIcRE7IJ70nCYemJJIi1L7dYAg/TDf6by5_HmVqU6Apxo4yWrNSUvM\"",
                    "id": {
                        "kind": "youtube#video",
                        "videoId": "33UJn1fDp3g"
                    },
                    "snippet": {
                        "publishedAt": "2012-11-30T16:30:15.000Z",
                        "channelId": "UCVJ1-IrWcB57N4QUs1Xzqgg",
                        "title": "Cee Lo Green - All I Need Is Love (ft. The Muppets) (Full HQ)",
                        "description": "I DO NOT OWN THIS. ALL COPYRIGHT BELONGS TO CEE LO GREEN & HIS MANAGEMENT! \"Ladies and gentleman May I introduce to you Who? Ceeeeeee ...",
                        "thumbnails": {
                            "default": {
                                "url": "https://i.ytimg.com/vi/33UJn1fDp3g/default.jpg"
                            },
                            "medium": {
                                "url": "https://i.ytimg.com/vi/33UJn1fDp3g/mqdefault.jpg"
                            },
                            "high": {
                                "url": "https://i.ytimg.com/vi/33UJn1fDp3g/hqdefault.jpg"
                            }
                        },
                        "channelTitle": "whenulookmeontheline",
                        "liveBroadcastContent": "none"
                    },
                    "durationString": "3:46",
                    "durationSeconds": 226,
                    "$$hashKey": "0ZV"
                },
                {
                    "kind": "youtube#searchResult",
                    "etag": "\"3WIcRE7IJ70nCYemJJIi1L7dYAg/IDZxnXq9HPGVLAcsyaLGSZ2wS30\"",
                    "id": {
                        "kind": "youtube#video",
                        "videoId": "s0NoalRsk5w"
                    },
                    "snippet": {
                        "publishedAt": "2011-12-16T19:34:31.000Z",
                        "channelId": "UCnDf-bvZby0e_27CM70An1g",
                        "title": "Clarence Carter - Back Door Santa (1968)",
                        "description": "\"Back Door Santa\" is a song written by Clarence Carter in collaboration with Marcus Daniel, and originally performed by Carter. It was released on a compilation ...",
                        "thumbnails": {
                            "default": {
                                "url": "https://i.ytimg.com/vi/s0NoalRsk5w/default.jpg"
                            },
                            "medium": {
                                "url": "https://i.ytimg.com/vi/s0NoalRsk5w/mqdefault.jpg"
                            },
                            "high": {
                                "url": "https://i.ytimg.com/vi/s0NoalRsk5w/hqdefault.jpg"
                            }
                        },
                        "channelTitle": "JBtheModManchester",
                        "liveBroadcastContent": "none"
                    },
                    "durationString": "2:06",
                    "durationSeconds": 126
                },
                {
                    "kind": "youtube#searchResult",
                    "etag": "\"3WIcRE7IJ70nCYemJJIi1L7dYAg/0AXWhM9OxjUIoN04khET8uJor3A\"",
                    "id": {
                        "kind": "youtube#video",
                        "videoId": "yXQViqx6GMY"
                    },
                    "snippet": {
                        "publishedAt": "2009-11-24T06:21:35.000Z",
                        "channelId": "UClS0wn3LPs9jdX_yt2g1k8w",
                        "title": "Mariah Carey - All I Want For Christmas Is You",
                        "description": "Mariah Carey's official music video for 'All I Want For Christmas Is You'. Click to listen to Mariah Carey and more Christmas songs on Spotify: ...",
                        "thumbnails": {
                            "default": {
                                "url": "https://i.ytimg.com/vi/yXQViqx6GMY/default.jpg"
                            },
                            "medium": {
                                "url": "https://i.ytimg.com/vi/yXQViqx6GMY/mqdefault.jpg"
                            },
                            "high": {
                                "url": "https://i.ytimg.com/vi/yXQViqx6GMY/hqdefault.jpg"
                            }
                        },
                        "channelTitle": "MariahCareyVEVO",
                        "liveBroadcastContent": "none"
                    },
                    "durationString": "3:56",
                    "durationSeconds": 236
                },
                {
                    "kind": "youtube#searchResult",
                    "etag": "\"3WIcRE7IJ70nCYemJJIi1L7dYAg/TGPpq04iQ5s1X6tFpWbwAsjUIqs\"",
                    "id": {
                        "kind": "youtube#video",
                        "videoId": "zvJvKyKBh-Q"
                    },
                    "snippet": {
                        "publishedAt": "2006-11-26T14:54:15.000Z",
                        "channelId": "UCLpHr94Jv9vITTfELH_7Tjg",
                        "title": "All I Want For Christmas is You - My Chemical Romance",
                        "description": "My Chemical Romance performing All I Want For Christmas is You, edited to various video clips. (Original by Mariah Carey)",
                        "thumbnails": {
                            "default": {
                                "url": "https://i.ytimg.com/vi/zvJvKyKBh-Q/default.jpg"
                            },
                            "medium": {
                                "url": "https://i.ytimg.com/vi/zvJvKyKBh-Q/mqdefault.jpg"
                            },
                            "high": {
                                "url": "https://i.ytimg.com/vi/zvJvKyKBh-Q/hqdefault.jpg"
                            }
                        },
                        "channelTitle": "xRainbowsmilex",
                        "liveBroadcastContent": "none"
                    },
                    "durationString": "3:52",
                    "durationSeconds": 232
                },
                {
                    "kind": "youtube#searchResult",
                    "etag": "\"3WIcRE7IJ70nCYemJJIi1L7dYAg/lG9PFP2enAgLllEFg_gvLKvaNGA\"",
                    "id": {
                        "kind": "youtube#video",
                        "videoId": "iQ5vD-Yj9rw"
                    },
                    "snippet": {
                        "publishedAt": "2013-05-19T20:23:42.000Z",
                        "channelId": "UCVd0L5lUdEAqCKWmETJc9BQ",
                        "title": "The Nightmare Before Christmas - What's This (Danny Elfman)",
                        "description": "Iscriviti al canale: http://www.youtube.com/subscription_center?add_user=TheMrSoundtracks \"Mi piace\" su FB: http://adf.ly/acR7w **I don't own any rights to the ...",
                        "thumbnails": {
                            "default": {
                                "url": "https://i.ytimg.com/vi/iQ5vD-Yj9rw/default.jpg"
                            },
                            "medium": {
                                "url": "https://i.ytimg.com/vi/iQ5vD-Yj9rw/mqdefault.jpg"
                            },
                            "high": {
                                "url": "https://i.ytimg.com/vi/iQ5vD-Yj9rw/hqdefault.jpg"
                            }
                        },
                        "channelTitle": "TheMrSoundtracks",
                        "liveBroadcastContent": "none"
                    },
                    "durationString": "3:04",
                    "durationSeconds": 184
                },
                {
                    "kind": "youtube#searchResult",
                    "etag": "\"3WIcRE7IJ70nCYemJJIi1L7dYAg/TaG1DAVV2aMEfpdPuR5cmlSEc4Y\"",
                    "id": {
                        "kind": "youtube#video",
                        "videoId": "rFdfrdgB4XE"
                    },
                    "snippet": {
                        "publishedAt": "2008-11-13T16:43:10.000Z",
                        "channelId": "UCJ75tCsDhXDh9gA8xyRUuqg",
                        "title": "Jingle Bells - Brian Setzer Orchestra",
                        "description": "Marry axemas!!",
                        "thumbnails": {
                            "default": {
                                "url": "https://i.ytimg.com/vi/rFdfrdgB4XE/default.jpg"
                            },
                            "medium": {
                                "url": "https://i.ytimg.com/vi/rFdfrdgB4XE/mqdefault.jpg"
                            },
                            "high": {
                                "url": "https://i.ytimg.com/vi/rFdfrdgB4XE/hqdefault.jpg"
                            }
                        },
                        "channelTitle": "Cybrocker",
                        "liveBroadcastContent": "none"
                    },
                    "durationString": "2:20",
                    "durationSeconds": 140
                },
                {
                    "kind": "youtube#searchResult",
                    "etag": "\"3WIcRE7IJ70nCYemJJIi1L7dYAg/YAZ3pXdm35QrAwp3Yallai-ZKiY\"",
                    "id": {
                        "kind": "youtube#video",
                        "videoId": "OR07r0ZMFb8"
                    },
                    "snippet": {
                        "publishedAt": "2009-10-25T08:36:28.000Z",
                        "channelId": "UC-QezoqJgvxadJqhJbP199A",
                        "title": "RUN-DMC - Christmas In Hollis",
                        "description": "Run-DMC's official music video for 'Christmas In Hollis'. Click to listen to more Christmas Songs on Spotify: http://smarturl.it/FiltrXmas As featured on Run-DMC: ...",
                        "thumbnails": {
                            "default": {
                                "url": "https://i.ytimg.com/vi/OR07r0ZMFb8/default.jpg"
                            },
                            "medium": {
                                "url": "https://i.ytimg.com/vi/OR07r0ZMFb8/mqdefault.jpg"
                            },
                            "high": {
                                "url": "https://i.ytimg.com/vi/OR07r0ZMFb8/hqdefault.jpg"
                            }
                        },
                        "channelTitle": "RUNDMCVEVO",
                        "liveBroadcastContent": "none"
                    },
                    "durationString": "4:03",
                    "durationSeconds": 243
                },
                {
                    "kind": "youtube#searchResult",
                    "etag": "\"3WIcRE7IJ70nCYemJJIi1L7dYAg/w8suvBb2LrucFy_OZb1jlsdgz6Y\"",
                    "id": {
                        "kind": "youtube#video",
                        "videoId": "ARq6uYSsUq0"
                    },
                    "snippet": {
                        "publishedAt": "2010-11-29T23:55:17.000Z",
                        "channelId": "UCCcpjnzUKFCg0Z3cvUTxrrw",
                        "title": "Waitresses Christmas Wrapping FULL VERSION + Lyrics",
                        "description": "From http://www.ChristmasSongsArchive.org - One of my all-time favorite Christmas songs. Here's the complete version of \"Christmas Wrapping\" by The ...",
                        "thumbnails": {
                            "default": {
                                "url": "https://i.ytimg.com/vi/ARq6uYSsUq0/default.jpg"
                            },
                            "medium": {
                                "url": "https://i.ytimg.com/vi/ARq6uYSsUq0/mqdefault.jpg"
                            },
                            "high": {
                                "url": "https://i.ytimg.com/vi/ARq6uYSsUq0/hqdefault.jpg"
                            }
                        },
                        "channelTitle": "peel4me",
                        "liveBroadcastContent": "none"
                    },
                    "durationString": "5:24",
                    "durationSeconds": 324
                },
                {
                    "kind": "youtube#searchResult",
                    "etag": "\"3WIcRE7IJ70nCYemJJIi1L7dYAg/2aOjRDBN06KeCSltbedCO5q2u9c\"",
                    "id": {
                        "kind": "youtube#video",
                        "videoId": "1gCd23Jrc0M"
                    },
                    "snippet": {
                        "publishedAt": "2011-10-24T11:53:24.000Z",
                        "channelId": "UCTtBzw25jBCEaAxYfINT_yw",
                        "title": "Rockin' Around The Christmas Tree - She & Him",
                        "description": "\" A Very She & Him Christmas\" http://www.sheandhim.com/#/splash.",
                        "thumbnails": {
                            "default": {
                                "url": "https://i.ytimg.com/vi/1gCd23Jrc0M/default.jpg"
                            },
                            "medium": {
                                "url": "https://i.ytimg.com/vi/1gCd23Jrc0M/mqdefault.jpg"
                            },
                            "high": {
                                "url": "https://i.ytimg.com/vi/1gCd23Jrc0M/hqdefault.jpg"
                            }
                        },
                        "channelTitle": "carlitopappas",
                        "liveBroadcastContent": "none"
                    },
                    "durationString": "2:02",
                    "durationSeconds": 122
                },
                {
                    "kind": "youtube#searchResult",
                    "etag": "\"3WIcRE7IJ70nCYemJJIi1L7dYAg/cnriEiLhhUJ-Z_rm7_T4l1MjrGs\"",
                    "id": {
                        "kind": "youtube#video",
                        "videoId": "jYeHC6iyftg"
                    },
                    "snippet": {
                        "publishedAt": "2008-12-13T19:01:33.000Z",
                        "channelId": "UCZ_8TEWgc96phLAQcS3nZZA",
                        "title": "Derek B. - Chillin With Santa",
                        "description": "Tis The Season!",
                        "thumbnails": {
                            "default": {
                                "url": "https://i.ytimg.com/vi/jYeHC6iyftg/default.jpg"
                            },
                            "medium": {
                                "url": "https://i.ytimg.com/vi/jYeHC6iyftg/mqdefault.jpg"
                            },
                            "high": {
                                "url": "https://i.ytimg.com/vi/jYeHC6iyftg/hqdefault.jpg"
                            }
                        },
                        "channelTitle": "FunkmassaVip",
                        "liveBroadcastContent": "none"
                    },
                    "durationString": "4:51",
                    "durationSeconds": 291
                },
                {
                    "kind": "youtube#searchResult",
                    "etag": "\"3WIcRE7IJ70nCYemJJIi1L7dYAg/uIHCqYAPu387IuI4nW7_Zz3ZqGA\"",
                    "id": {
                        "kind": "youtube#video",
                        "videoId": "s2Q2csuodko"
                    },
                    "snippet": {
                        "publishedAt": "2009-01-21T16:02:42.000Z",
                        "channelId": "UCclMquX-5-zBwgyFtn78hew",
                        "title": "Busta Rhymes - Grinch ft Jim Carey",
                        "description": "Busta Rhymes - Grinch ft Jim Carrey.",
                        "thumbnails": {
                            "default": {
                                "url": "https://i.ytimg.com/vi/s2Q2csuodko/default.jpg"
                            },
                            "medium": {
                                "url": "https://i.ytimg.com/vi/s2Q2csuodko/mqdefault.jpg"
                            },
                            "high": {
                                "url": "https://i.ytimg.com/vi/s2Q2csuodko/hqdefault.jpg"
                            }
                        },
                        "channelTitle": "sareckaa",
                        "liveBroadcastContent": "none"
                    },
                    "durationString": "3:44",
                    "durationSeconds": 224
                },
                {
                    "kind": "youtube#searchResult",
                    "etag": "\"3WIcRE7IJ70nCYemJJIi1L7dYAg/QfuVH-2z-U5NnCjsWchwLv4gtlw\"",
                    "id": {
                        "kind": "youtube#video",
                        "videoId": "_0TEVm2sri8"
                    },
                    "snippet": {
                        "publishedAt": "2013-12-11T16:26:53.000Z",
                        "channelId": "UCX9eqGgIJSDcYl3SxAwCNsg",
                        "title": "Helix - Sock It To Me Santa",
                        "description": "I do not own the (well, of course I bought the cd) music and there is no copyright infringement intended. For entertainment purposes only. Enjoy the music!",
                        "thumbnails": {
                            "default": {
                                "url": "https://i.ytimg.com/vi/_0TEVm2sri8/default.jpg"
                            },
                            "medium": {
                                "url": "https://i.ytimg.com/vi/_0TEVm2sri8/mqdefault.jpg"
                            },
                            "high": {
                                "url": "https://i.ytimg.com/vi/_0TEVm2sri8/hqdefault.jpg"
                            }
                        },
                        "channelTitle": "dymondav",
                        "liveBroadcastContent": "none"
                    },
                    "durationString": "2:18",
                    "durationSeconds": 138
                },
                {
                    "kind": "youtube#searchResult",
                    "etag": "\"3WIcRE7IJ70nCYemJJIi1L7dYAg/PL4EQiZtyNjPeC6Pkzt-nsYzvYo\"",
                    "id": {
                        "kind": "youtube#video",
                        "videoId": "H3BdGIrZQU0"
                    },
                    "snippet": {
                        "publishedAt": "2012-12-14T00:02:29.000Z",
                        "channelId": "UCNBHesKE8sQa9cF-8l6HH4A",
                        "title": "The Smithereens Rudolph The Red Nosed Reindeer",
                        "description": "The Smithereens Rudolph the Red Nosed Reindeer (uploaded with permission from Pat DiNizio)",
                        "thumbnails": {
                            "default": {
                                "url": "https://i.ytimg.com/vi/H3BdGIrZQU0/default.jpg"
                            },
                            "medium": {
                                "url": "https://i.ytimg.com/vi/H3BdGIrZQU0/mqdefault.jpg"
                            },
                            "high": {
                                "url": "https://i.ytimg.com/vi/H3BdGIrZQU0/hqdefault.jpg"
                            }
                        },
                        "channelTitle": "eaglesfool",
                        "liveBroadcastContent": "none"
                    },
                    "durationString": "3:06",
                    "durationSeconds": 186
                },
                {
                    "kind": "youtube#searchResult",
                    "etag": "\"3WIcRE7IJ70nCYemJJIi1L7dYAg/8l4RRkCAeGcB3Gy3gL88RVFiydc\"",
                    "id": {
                        "kind": "youtube#video",
                        "videoId": "vraoiVCDdaM"
                    },
                    "snippet": {
                        "publishedAt": "2010-05-27T18:49:53.000Z",
                        "channelId": "UCTTBHIoKPIWLAxxTNTiQ9vA",
                        "title": "Vampire Weekend - 'Holiday' (official video)",
                        "description": "The third video from Vampire Weekend's album \"Contra\". Buy \"Contra\": http://itunes.apple.com/us/album/contra-bonus-track-version/id340465551 Directed by ...",
                        "thumbnails": {
                            "default": {
                                "url": "https://i.ytimg.com/vi/vraoiVCDdaM/default.jpg"
                            },
                            "medium": {
                                "url": "https://i.ytimg.com/vi/vraoiVCDdaM/mqdefault.jpg"
                            },
                            "high": {
                                "url": "https://i.ytimg.com/vi/vraoiVCDdaM/hqdefault.jpg"
                            }
                        },
                        "channelTitle": "XLRecordings",
                        "liveBroadcastContent": "none"
                    },
                    "durationString": "2:19",
                    "durationSeconds": 139
                },
                {
                    "kind": "youtube#searchResult",
                    "etag": "\"3WIcRE7IJ70nCYemJJIi1L7dYAg/dnZYBIip-KCRs0Y_XebbXGAu9eU\"",
                    "id": {
                        "kind": "youtube#video",
                        "videoId": "J5dVCPH8f5Q"
                    },
                    "snippet": {
                        "publishedAt": "2014-07-14T16:33:14.000Z",
                        "channelId": "UCWEtnEiVwUy7mwFeshyAWLA",
                        "title": "The Darkness - Christmas Time (Don't Let The Bells End) (Official Music Video)",
                        "description": "Watch the official music video for The Darkness - Christmas Time iTunes: http://smarturl.it/TheDarknessiT Amazon: http://smarturl.it/TheDarknessAmzn More The ...",
                        "thumbnails": {
                            "default": {
                                "url": "https://i.ytimg.com/vi/J5dVCPH8f5Q/default.jpg"
                            },
                            "medium": {
                                "url": "https://i.ytimg.com/vi/J5dVCPH8f5Q/mqdefault.jpg"
                            },
                            "high": {
                                "url": "https://i.ytimg.com/vi/J5dVCPH8f5Q/hqdefault.jpg"
                            }
                        },
                        "channelTitle": "RhinoEntertainment",
                        "liveBroadcastContent": "none"
                    },
                    "durationString": "3:58",
                    "durationSeconds": 238
                },
                {
                    "kind": "youtube#searchResult",
                    "etag": "\"3WIcRE7IJ70nCYemJJIi1L7dYAg/KA5AwCRqW_loYt1rfTFONEFItI0\"",
                    "id": {
                        "kind": "youtube#video",
                        "videoId": "9IBqwAKv8b8"
                    },
                    "snippet": {
                        "publishedAt": "2012-12-11T08:00:22.000Z",
                        "channelId": "UC6kUoMWSO3oQWAJQrHYqwbA",
                        "title": "The Shins - Wonderful Christmastime",
                        "description": "Music video by The Shins performing Wonderful Christmastime. (C) 2012 MPL Communications Inc. and StarCon, LLC d/b/a Hear Music™",
                        "thumbnails": {
                            "default": {
                                "url": "https://i.ytimg.com/vi/9IBqwAKv8b8/default.jpg"
                            },
                            "medium": {
                                "url": "https://i.ytimg.com/vi/9IBqwAKv8b8/mqdefault.jpg"
                            },
                            "high": {
                                "url": "https://i.ytimg.com/vi/9IBqwAKv8b8/hqdefault.jpg"
                            }
                        },
                        "channelTitle": "TheShinsVEVO",
                        "liveBroadcastContent": "none"
                    },
                    "durationString": "2:30",
                    "durationSeconds": 150
                },
                {
                    "kind": "youtube#searchResult",
                    "etag": "\"3WIcRE7IJ70nCYemJJIi1L7dYAg/ianmdL1-r8fucLuoeG3D9BDx7k4\"",
                    "id": {
                        "kind": "youtube#video",
                        "videoId": "x6zypc_LhnM"
                    },
                    "snippet": {
                        "publishedAt": "2012-12-04T08:01:14.000Z",
                        "channelId": "UCGRXhgTAT-ozbpVf0WhktqQ",
                        "title": "Vince Guaraldi Trio - Linus And Lucy",
                        "description": "Music video by Vince Guaraldi Trio performing Linus And Lucy. (C) 2012 Concord Music Group, Inc.",
                        "thumbnails": {
                            "default": {
                                "url": "https://i.ytimg.com/vi/x6zypc_LhnM/default.jpg"
                            },
                            "medium": {
                                "url": "https://i.ytimg.com/vi/x6zypc_LhnM/mqdefault.jpg"
                            },
                            "high": {
                                "url": "https://i.ytimg.com/vi/x6zypc_LhnM/hqdefault.jpg"
                            }
                        },
                        "channelTitle": "VinceGuaraldiVEVO",
                        "liveBroadcastContent": "none"
                    },
                    "durationString": "3:05",
                    "durationSeconds": 185
                },
                {
                    "kind": "youtube#searchResult",
                    "etag": "\"3WIcRE7IJ70nCYemJJIi1L7dYAg/DKtlFdPl7QkEPJs1g7kucabidfM\"",
                    "id": {
                        "kind": "youtube#video",
                        "videoId": "BfV23haC6dw"
                    },
                    "snippet": {
                        "publishedAt": "2012-12-21T14:05:53.000Z",
                        "channelId": "UCvGnJy9RnXX0kGSnDPKCZzQ",
                        "title": "'The Christmas Song (Chestnuts Roasting On An Open Fire)' - PaulMcCartney.com Track of the Week",
                        "description": "http://www.PaulMcCartney.com This week's track of the week is a live version of 'The Christmas Song (Chestnuts Roasting On An Open Fire)', taken from Paul's ...",
                        "thumbnails": {
                            "default": {
                                "url": "https://i.ytimg.com/vi/BfV23haC6dw/default.jpg"
                            },
                            "medium": {
                                "url": "https://i.ytimg.com/vi/BfV23haC6dw/mqdefault.jpg"
                            },
                            "high": {
                                "url": "https://i.ytimg.com/vi/BfV23haC6dw/hqdefault.jpg"
                            }
                        },
                        "channelTitle": "PAULMCCARTNEY",
                        "liveBroadcastContent": "none"
                    },
                    "durationString": "3:40",
                    "durationSeconds": 220
                },
                {
                    "kind": "youtube#searchResult",
                    "etag": "\"3WIcRE7IJ70nCYemJJIi1L7dYAg/fHX716gChRn1I4XCQGwBbb8c8gw\"",
                    "id": {
                        "kind": "youtube#video",
                        "videoId": "2fxBYQH0WmQ"
                    },
                    "snippet": {
                        "publishedAt": "2008-12-20T22:11:12.000Z",
                        "channelId": "UCCzW1oSLoTDxK4SGWmIgFPw",
                        "title": "The Yeah Yeah Yeahs - All I Want for Christmas",
                        "description": "This song came out maybe a few weeks ago. Just decided to upload it to get in the spirit.",
                        "thumbnails": {
                            "default": {
                                "url": "https://i.ytimg.com/vi/2fxBYQH0WmQ/default.jpg"
                            },
                            "medium": {
                                "url": "https://i.ytimg.com/vi/2fxBYQH0WmQ/mqdefault.jpg"
                            },
                            "high": {
                                "url": "https://i.ytimg.com/vi/2fxBYQH0WmQ/hqdefault.jpg"
                            }
                        },
                        "channelTitle": "SourNotHardcore",
                        "liveBroadcastContent": "none"
                    },
                    "durationString": "3:24",
                    "durationSeconds": 204
                },
                {
                    "kind": "youtube#searchResult",
                    "etag": "\"3WIcRE7IJ70nCYemJJIi1L7dYAg/DBM4Le3qp7xyFdMQC5e8upXNpWs\"",
                    "id": {
                        "kind": "youtube#video",
                        "videoId": "tN2NNwZ1op8"
                    },
                    "snippet": {
                        "publishedAt": "2010-04-26T08:37:23.000Z",
                        "channelId": "UCia3sM3GMVzQhau9GcO7i6w",
                        "title": "Ramones - Merry Christmas (I Don't Want To Fight Tonight)",
                        "description": "Merry Christmas (I Don't Want To Fight Tonight) by Ramones.",
                        "thumbnails": {
                            "default": {
                                "url": "https://i.ytimg.com/vi/tN2NNwZ1op8/default.jpg"
                            },
                            "medium": {
                                "url": "https://i.ytimg.com/vi/tN2NNwZ1op8/mqdefault.jpg"
                            },
                            "high": {
                                "url": "https://i.ytimg.com/vi/tN2NNwZ1op8/hqdefault.jpg"
                            }
                        },
                        "channelTitle": "AllRamonesMusic",
                        "liveBroadcastContent": "none"
                    },
                    "durationString": "2:05",
                    "durationSeconds": 125
                },
                {
                    "kind": "youtube#searchResult",
                    "etag": "\"3WIcRE7IJ70nCYemJJIi1L7dYAg/zVi23MYkrwCLG_G2Rz1MfgP9Bx4\"",
                    "id": {
                        "kind": "youtube#video",
                        "videoId": "RzwSgY_Qcww"
                    },
                    "snippet": {
                        "publishedAt": "2013-12-01T16:00:02.000Z",
                        "channelId": "UC0qjdO0gW5xpvjlOJVyZU8A",
                        "title": "Weezer - O Holy Night",
                        "description": "Truly he taught us to love one another. His law is love and his gospel is peace.",
                        "thumbnails": {
                            "default": {
                                "url": "https://i.ytimg.com/vi/RzwSgY_Qcww/default.jpg"
                            },
                            "medium": {
                                "url": "https://i.ytimg.com/vi/RzwSgY_Qcww/mqdefault.jpg"
                            },
                            "high": {
                                "url": "https://i.ytimg.com/vi/RzwSgY_Qcww/hqdefault.jpg"
                            }
                        },
                        "channelTitle": "keithcox92024",
                        "liveBroadcastContent": "none"
                    },
                    "durationString": "4:07",
                    "durationSeconds": 247
                },
                {
                    "kind": "youtube#searchResult",
                    "etag": "\"3WIcRE7IJ70nCYemJJIi1L7dYAg/dLVyGayP7yIcIljECXzrJkrKnUI\"",
                    "id": {
                        "kind": "youtube#video",
                        "videoId": "kFuPuet6msw"
                    },
                    "snippet": {
                        "publishedAt": "2011-12-09T21:09:51.000Z",
                        "channelId": "UCSd3RpVRwasGKFuwAtj6HVw",
                        "title": "Bing Crosby - Let It Snow, Let It Snow, Let It Snow",
                        "description": "Let It Snow, Let It Snow, Let It Snow, Let It Snow, Let It Snow, Let It Snow.",
                        "thumbnails": {
                            "default": {
                                "url": "https://i.ytimg.com/vi/kFuPuet6msw/default.jpg"
                            },
                            "medium": {
                                "url": "https://i.ytimg.com/vi/kFuPuet6msw/mqdefault.jpg"
                            },
                            "high": {
                                "url": "https://i.ytimg.com/vi/kFuPuet6msw/hqdefault.jpg"
                            }
                        },
                        "channelTitle": "mygospel101",
                        "liveBroadcastContent": "none"
                    },
                    "durationString": "2:01",
                    "durationSeconds": 121
                },
                {
                    "kind": "youtube#searchResult",
                    "etag": "\"3WIcRE7IJ70nCYemJJIi1L7dYAg/XdNeoZCwvDpoe_0tf-P2ulDYqpo\"",
                    "id": {
                        "kind": "youtube#video",
                        "videoId": "jLqG3BqMC8E"
                    },
                    "snippet": {
                        "publishedAt": "2010-12-07T15:46:18.000Z",
                        "channelId": "UC2kFfOMm7Kpp-WWXHb8UzDQ",
                        "title": "Barenaked Ladies- \"Hanukkah, O Hanukkah\"",
                        "description": "\"Hanukkah, O Hanukkah\" from Barenaked For The Holidays album, 2004.",
                        "thumbnails": {
                            "default": {
                                "url": "https://i.ytimg.com/vi/jLqG3BqMC8E/default.jpg"
                            },
                            "medium": {
                                "url": "https://i.ytimg.com/vi/jLqG3BqMC8E/mqdefault.jpg"
                            },
                            "high": {
                                "url": "https://i.ytimg.com/vi/jLqG3BqMC8E/hqdefault.jpg"
                            }
                        },
                        "channelTitle": "motlevi",
                        "liveBroadcastContent": "none"
                    },
                    "durationString": "2:14",
                    "durationSeconds": 134
                },
                {
                    "kind": "youtube#searchResult",
                    "etag": "\"3WIcRE7IJ70nCYemJJIi1L7dYAg/f655CpqP_LteRIZvED2W_QlBqoM\"",
                    "id": {
                        "kind": "youtube#video",
                        "videoId": "8eB4PkCo4Lo"
                    },
                    "snippet": {
                        "publishedAt": "2013-12-02T21:30:16.000Z",
                        "channelId": "UCimY-W7AlbtwdH5BODMoIhA",
                        "title": "Adam Sandler - The Hanukkah Song",
                        "description": "https://www.youtube.com/watch?v=XOvSqYsBZkY Thanksgiving song.",
                        "thumbnails": {
                            "default": {
                                "url": "https://i.ytimg.com/vi/8eB4PkCo4Lo/default.jpg"
                            },
                            "medium": {
                                "url": "https://i.ytimg.com/vi/8eB4PkCo4Lo/mqdefault.jpg"
                            },
                            "high": {
                                "url": "https://i.ytimg.com/vi/8eB4PkCo4Lo/hqdefault.jpg"
                            }
                        },
                        "channelTitle": "yao581",
                        "liveBroadcastContent": "none"
                    },
                    "durationString": "3:46",
                    "durationSeconds": 226
                }
            ],
            "naughty": [
                {
                    "kind": "youtube#searchResult",
                    "etag": "\"3WIcRE7IJ70nCYemJJIi1L7dYAg/0TXtNm_tXhC7OqrSjBbxf69IGbA\"",
                    "id": {
                        "kind": "youtube#video",
                        "videoId": "I-iFsxSNN2c"
                    },
                    "snippet": {
                        "publishedAt": "2012-11-24T20:48:19.000Z",
                        "channelId": "UCOUuAVP6P4bHWnwuYeCWbBg",
                        "title": "Spike Jone & His City Slickers - All I Want For Christmas (Is My Two Front Teeth) 1948",
                        "description": "Spike Jones & His City Slickers - All I Want For Christmas (Is My Two Front Teeth) 1948.",
                        "thumbnails": {
                            "default": {
                                "url": "https://i.ytimg.com/vi/I-iFsxSNN2c/default.jpg"
                            },
                            "medium": {
                                "url": "https://i.ytimg.com/vi/I-iFsxSNN2c/mqdefault.jpg"
                            },
                            "high": {
                                "url": "https://i.ytimg.com/vi/I-iFsxSNN2c/hqdefault.jpg"
                            }
                        },
                        "channelTitle": "ScrambledEggs1969",
                        "liveBroadcastContent": "none"
                    },
                    "durationString": "3:12",
                    "durationSeconds": 192
                },
                {
                    "kind": "youtube#searchResult",
                    "etag": "\"3WIcRE7IJ70nCYemJJIi1L7dYAg/BArGAD8KPDuABeBBwPcKRSONfYg\"",
                    "id": {
                        "kind": "youtube#video",
                        "videoId": "76K5UU0ihow"
                    },
                    "snippet": {
                        "publishedAt": "2012-12-05T16:53:45.000Z",
                        "channelId": "UCTxqoioo8obdPl11SY4BxlQ",
                        "title": "I saw Mommy kissing Santa Claus - Jimmy Boyd",
                        "description": "Available NOW on iTunes: http://bit.ly/Yzjyxg Check out our website http://heroeslegendsicons.com/ Jimmy Boyd sings 'I Saw Mommy Kissing Santa Claus' , as ...",
                        "thumbnails": {
                            "default": {
                                "url": "https://i.ytimg.com/vi/76K5UU0ihow/default.jpg"
                            },
                            "medium": {
                                "url": "https://i.ytimg.com/vi/76K5UU0ihow/mqdefault.jpg"
                            },
                            "high": {
                                "url": "https://i.ytimg.com/vi/76K5UU0ihow/hqdefault.jpg"
                            }
                        },
                        "channelTitle": "HeroesLegendsIcons",
                        "liveBroadcastContent": "none"
                    },
                    "durationString": "2:31",
                    "durationSeconds": 151
                },
                {
                    "kind": "youtube#searchResult",
                    "etag": "\"3WIcRE7IJ70nCYemJJIi1L7dYAg/gvuI_AUYsC-ukcD5nWRjqc2YlHg\"",
                    "id": {
                        "kind": "youtube#video",
                        "videoId": "LUjn3RpkcKY"
                    },
                    "snippet": {
                        "publishedAt": "2011-10-18T23:54:00.000Z",
                        "channelId": "UCHkj014U2CQ2Nv0UZeYpE_A",
                        "title": "Justin Bieber - Mistletoe",
                        "description": "Music video by Justin Bieber performing Mistletoe. (C) 2011 The Island Def Jam Music Group Buy on iTunes - http://idj.to/qQNYau #VEVOCertified on March 2, ...",
                        "thumbnails": {
                            "default": {
                                "url": "https://i.ytimg.com/vi/LUjn3RpkcKY/default.jpg"
                            },
                            "medium": {
                                "url": "https://i.ytimg.com/vi/LUjn3RpkcKY/mqdefault.jpg"
                            },
                            "high": {
                                "url": "https://i.ytimg.com/vi/LUjn3RpkcKY/hqdefault.jpg"
                            }
                        },
                        "channelTitle": "JustinBieberVEVO",
                        "liveBroadcastContent": "none"
                    },
                    "durationString": "3:11",
                    "durationSeconds": 191
                },
                {
                    "kind": "youtube#searchResult",
                    "etag": "\"3WIcRE7IJ70nCYemJJIi1L7dYAg/NN2MGTWWtG9fsF63lKdbt978_cY\"",
                    "id": {
                        "kind": "youtube#video",
                        "videoId": "1i9G60wvH7Y"
                    },
                    "snippet": {
                        "publishedAt": "2008-07-20T17:04:51.000Z",
                        "channelId": "UCmwTkhI-tN_TZ6Ya_H_eaeQ",
                        "title": "The Christmas Shoes by Alabama plus lyrics",
                        "description": "lyrics to The Christmas Shoes by NewSong or Alabama.",
                        "thumbnails": {
                            "default": {
                                "url": "https://i.ytimg.com/vi/1i9G60wvH7Y/default.jpg"
                            },
                            "medium": {
                                "url": "https://i.ytimg.com/vi/1i9G60wvH7Y/mqdefault.jpg"
                            },
                            "high": {
                                "url": "https://i.ytimg.com/vi/1i9G60wvH7Y/hqdefault.jpg"
                            }
                        },
                        "channelTitle": "redneckgurl4eva",
                        "liveBroadcastContent": "none"
                    },
                    "durationString": "4:49",
                    "durationSeconds": 289
                },
                {
                    "kind": "youtube#searchResult",
                    "etag": "\"3WIcRE7IJ70nCYemJJIi1L7dYAg/PBsv6G9QLqsNR2yt8Nlp6tun5qc\"",
                    "id": {
                        "kind": "youtube#video",
                        "videoId": "atkuIIeV_gM"
                    },
                    "snippet": {
                        "publishedAt": "2012-07-28T03:17:35.000Z",
                        "channelId": "UCmAbfa_ktz3gjcJtHKL2JMw",
                        "title": "NKOTB  -funky-funky-xmas.",
                        "description": "https://www.facebook.com/#!/linda.knightperu.",
                        "thumbnails": {
                            "default": {
                                "url": "https://i.ytimg.com/vi/atkuIIeV_gM/default.jpg"
                            },
                            "medium": {
                                "url": "https://i.ytimg.com/vi/atkuIIeV_gM/mqdefault.jpg"
                            },
                            "high": {
                                "url": "https://i.ytimg.com/vi/atkuIIeV_gM/hqdefault.jpg"
                            }
                        },
                        "channelTitle": "MrsElizabethKnight",
                        "liveBroadcastContent": "none"
                    },
                    "durationString": "5:08",
                    "durationSeconds": 308
                },
                {
                    "kind": "youtube#searchResult",
                    "etag": "\"3WIcRE7IJ70nCYemJJIi1L7dYAg/9y3STTWBHK3e0l0sSPSiss1vh0I\"",
                    "id": {
                        "kind": "youtube#video",
                        "videoId": "XwRIBpw7EwU"
                    },
                    "snippet": {
                        "publishedAt": "2012-12-22T03:18:09.000Z",
                        "channelId": "UCTB4kmm5e2TbLdhXqbsKvKA",
                        "title": "Jose Feliciano - Feliz Navidad (1,970)",
                        "description": "Mis mejores deseos para esta Navidad, que el espíritu navideño llegue a cada una de las familias, para que esta noche de paz sea tan solo el comienzo de un ...",
                        "thumbnails": {
                            "default": {
                                "url": "https://i.ytimg.com/vi/XwRIBpw7EwU/default.jpg"
                            },
                            "medium": {
                                "url": "https://i.ytimg.com/vi/XwRIBpw7EwU/mqdefault.jpg"
                            },
                            "high": {
                                "url": "https://i.ytimg.com/vi/XwRIBpw7EwU/hqdefault.jpg"
                            }
                        },
                        "channelTitle": "estrellavirgo1",
                        "liveBroadcastContent": "none"
                    },
                    "durationString": "3:07",
                    "durationSeconds": 187
                },
                {
                    "kind": "youtube#searchResult",
                    "etag": "\"3WIcRE7IJ70nCYemJJIi1L7dYAg/gYolub6F3jiRrpitMCBWSUisokA\"",
                    "id": {
                        "kind": "youtube#video",
                        "videoId": "MgIwLeASnkw"
                    },
                    "snippet": {
                        "publishedAt": "2011-08-12T21:21:22.000Z",
                        "channelId": "UCnmVK81jqbIzt5bXG9MJyTA",
                        "title": "Elmo & Patsy - Grandma Got Run over by a Reindeer",
                        "description": "Elmo & Patsy's official music video for 'Grandma Got Run Over By A Reindeer'. Click to listen to Elmo & Patsy on Spotify: http://smarturl.it/EPSpot?IQid=EPGR As ...",
                        "thumbnails": {
                            "default": {
                                "url": "https://i.ytimg.com/vi/MgIwLeASnkw/default.jpg"
                            },
                            "medium": {
                                "url": "https://i.ytimg.com/vi/MgIwLeASnkw/mqdefault.jpg"
                            },
                            "high": {
                                "url": "https://i.ytimg.com/vi/MgIwLeASnkw/hqdefault.jpg"
                            }
                        },
                        "channelTitle": "ElmoPatsyVEVO",
                        "liveBroadcastContent": "none"
                    },
                    "durationString": "3:25",
                    "durationSeconds": 205
                },
                {
                    "kind": "youtube#searchResult",
                    "etag": "\"3WIcRE7IJ70nCYemJJIi1L7dYAg/ntQ6HKscpv2n0NGfaiisBm3DvEM\"",
                    "id": {
                        "kind": "youtube#video",
                        "videoId": "AG0PG0O5Jcs"
                    },
                    "snippet": {
                        "publishedAt": "2009-12-23T10:04:29.000Z",
                        "channelId": "UCLmXWz96-EGn2a99lFOVAmg",
                        "title": "Winter Wonderland - The Eurythmics",
                        "description": "A great song by Annie and Dave. The beautiful photos were taken by Marika this morning.",
                        "thumbnails": {
                            "default": {
                                "url": "https://i.ytimg.com/vi/AG0PG0O5Jcs/default.jpg"
                            },
                            "medium": {
                                "url": "https://i.ytimg.com/vi/AG0PG0O5Jcs/mqdefault.jpg"
                            },
                            "high": {
                                "url": "https://i.ytimg.com/vi/AG0PG0O5Jcs/hqdefault.jpg"
                            }
                        },
                        "channelTitle": "DreamsILive",
                        "liveBroadcastContent": "none"
                    },
                    "durationString": "3:36",
                    "durationSeconds": 216
                },
                {
                    "kind": "youtube#searchResult",
                    "etag": "\"3WIcRE7IJ70nCYemJJIi1L7dYAg/JNpF8EMp0M7pioyFwlxjOigRr_g\"",
                    "id": {
                        "kind": "youtube#video",
                        "videoId": "49LAPkV9xJg"
                    },
                    "snippet": {
                        "publishedAt": "2010-12-16T03:44:47.000Z",
                        "channelId": "UC39eO1mUsC_eNc7iqbdGGXQ",
                        "title": "I want a Hippopotamus For Christmas - Gayla Peevey - Lyrics On Screen",
                        "description": "If you have a Request please leave a comment or pm me with the name and artist and i will do my best :)",
                        "thumbnails": {
                            "default": {
                                "url": "https://i.ytimg.com/vi/49LAPkV9xJg/default.jpg"
                            },
                            "medium": {
                                "url": "https://i.ytimg.com/vi/49LAPkV9xJg/mqdefault.jpg"
                            },
                            "high": {
                                "url": "https://i.ytimg.com/vi/49LAPkV9xJg/hqdefault.jpg"
                            }
                        },
                        "channelTitle": "x2XLyricsX2x",
                        "liveBroadcastContent": "none"
                    },
                    "durationString": "2:35",
                    "durationSeconds": 155
                },
                {
                    "kind": "youtube#searchResult",
                    "etag": "\"3WIcRE7IJ70nCYemJJIi1L7dYAg/YEgzcymeKkebibUYleqGZrRQpSM\"",
                    "id": {
                        "kind": "youtube#video",
                        "videoId": "Pe2LuoU72Ss"
                    },
                    "snippet": {
                        "publishedAt": "2010-12-23T14:24:04.000Z",
                        "channelId": "UCnbADdlSSJWk0WtNFQMIJJw",
                        "title": "SANTA BABY - TAYLOR SWIFT - LYRICS",
                        "description": "megan here. i did this quickly, i am on break, but we hadn't had much videos for a while. merry christmas :)",
                        "thumbnails": {
                            "default": {
                                "url": "https://i.ytimg.com/vi/Pe2LuoU72Ss/default.jpg"
                            },
                            "medium": {
                                "url": "https://i.ytimg.com/vi/Pe2LuoU72Ss/mqdefault.jpg"
                            },
                            "high": {
                                "url": "https://i.ytimg.com/vi/Pe2LuoU72Ss/hqdefault.jpg"
                            }
                        },
                        "channelTitle": "LemonxLyrics",
                        "liveBroadcastContent": "none"
                    },
                    "durationString": "2:38",
                    "durationSeconds": 158
                },
                {
                    "kind": "youtube#searchResult",
                    "etag": "\"3WIcRE7IJ70nCYemJJIi1L7dYAg/xl3BO4EK28xuQMsMHZc1WQwxPvg\"",
                    "id": {
                        "kind": "youtube#video",
                        "videoId": "APl_R6gGMAM"
                    },
                    "snippet": {
                        "publishedAt": "2009-11-20T20:36:38.000Z",
                        "channelId": "UCQoUmJPja36EzFUc7jeZVEw",
                        "title": "Christmas (Baby Please Come Home) - Mariah Carey - \"Merry Christmas\" Album",
                        "description": "Merry Christmas!",
                        "thumbnails": {
                            "default": {
                                "url": "https://i.ytimg.com/vi/APl_R6gGMAM/default.jpg"
                            },
                            "medium": {
                                "url": "https://i.ytimg.com/vi/APl_R6gGMAM/mqdefault.jpg"
                            },
                            "high": {
                                "url": "https://i.ytimg.com/vi/APl_R6gGMAM/hqdefault.jpg"
                            }
                        },
                        "channelTitle": "MrAtanaz",
                        "liveBroadcastContent": "none"
                    },
                    "durationString": "6:05",
                    "durationSeconds": 365
                },
                {
                    "kind": "youtube#searchResult",
                    "etag": "\"3WIcRE7IJ70nCYemJJIi1L7dYAg/L2kxCaNGVX96ZVxfsfcxXqymm00\"",
                    "id": {
                        "kind": "youtube#video",
                        "videoId": "hYlvfX3nwlc"
                    },
                    "snippet": {
                        "publishedAt": "2008-12-14T13:44:30.000Z",
                        "channelId": "UCpg0G3Qlr3wE339YlPDw8aw",
                        "title": "dominick the donkey",
                        "description": "cool song.",
                        "thumbnails": {
                            "default": {
                                "url": "https://i.ytimg.com/vi/hYlvfX3nwlc/default.jpg"
                            },
                            "medium": {
                                "url": "https://i.ytimg.com/vi/hYlvfX3nwlc/mqdefault.jpg"
                            },
                            "high": {
                                "url": "https://i.ytimg.com/vi/hYlvfX3nwlc/hqdefault.jpg"
                            }
                        },
                        "channelTitle": "iamwright01",
                        "liveBroadcastContent": "none"
                    },
                    "durationString": "2:30",
                    "durationSeconds": 150
                },
                {
                    "kind": "youtube#searchResult",
                    "etag": "\"3WIcRE7IJ70nCYemJJIi1L7dYAg/ZH_HqSlHzaD9nqP_0N9F7THaXT8\"",
                    "id": {
                        "kind": "youtube#video",
                        "videoId": "8bNmZlBSfY8"
                    },
                    "snippet": {
                        "publishedAt": "2013-12-12T23:25:46.000Z",
                        "channelId": "UCyW1QEq10GPvPs508ZbX6PA",
                        "title": "Crash Test Dummies - The First Noel (1992)",
                        "description": "Brad: The first Noel, the angels did say Unto certain poor shephards in fields where they lay In fields where they lay keeping their sheep On a cold winter's night ...",
                        "thumbnails": {
                            "default": {
                                "url": "https://i.ytimg.com/vi/8bNmZlBSfY8/default.jpg"
                            },
                            "medium": {
                                "url": "https://i.ytimg.com/vi/8bNmZlBSfY8/mqdefault.jpg"
                            },
                            "high": {
                                "url": "https://i.ytimg.com/vi/8bNmZlBSfY8/hqdefault.jpg"
                            }
                        },
                        "channelTitle": "adamtrng",
                        "liveBroadcastContent": "none"
                    },
                    "durationString": "3:43",
                    "durationSeconds": 223
                },
                {
                    "kind": "youtube#searchResult",
                    "etag": "\"3WIcRE7IJ70nCYemJJIi1L7dYAg/p3pm72xImtJ9SHDtySK4ArrB8mw\"",
                    "id": {
                        "kind": "youtube#video",
                        "videoId": "au3OvJiPIig"
                    },
                    "snippet": {
                        "publishedAt": "2012-11-30T14:35:15.000Z",
                        "channelId": "UCU6mAWmcCajyUez5mgnuuNA",
                        "title": "Merry Christmas With Love - Clay Aiken (CD Version)",
                        "description": "From the Christmas CD, Merry Christmas With Love.",
                        "thumbnails": {
                            "default": {
                                "url": "https://i.ytimg.com/vi/au3OvJiPIig/default.jpg"
                            },
                            "medium": {
                                "url": "https://i.ytimg.com/vi/au3OvJiPIig/mqdefault.jpg"
                            },
                            "high": {
                                "url": "https://i.ytimg.com/vi/au3OvJiPIig/hqdefault.jpg"
                            }
                        },
                        "channelTitle": "bavigna",
                        "liveBroadcastContent": "none"
                    },
                    "durationString": "4:05",
                    "durationSeconds": 245
                },
                {
                    "kind": "youtube#searchResult",
                    "etag": "\"3WIcRE7IJ70nCYemJJIi1L7dYAg/CWmIyDITQJoeGNRcijb5eIuin88\"",
                    "id": {
                        "kind": "youtube#video",
                        "videoId": "K1W1Z10zA7w"
                    },
                    "snippet": {
                        "publishedAt": "2012-09-09T00:26:45.000Z",
                        "channelId": "UC6yPBNaRL5U1AOdAd52Hl4w",
                        "title": "Miley Cyrus - Santa Claus Is Coming To Town (HQ)",
                        "description": "Lyrics Oh you better watch out You better not cry You better not pout I'm telling you why Santa Claus is comming to town Santa claus is comming to town Santa ...",
                        "thumbnails": {
                            "default": {
                                "url": "https://i.ytimg.com/vi/K1W1Z10zA7w/default.jpg"
                            },
                            "medium": {
                                "url": "https://i.ytimg.com/vi/K1W1Z10zA7w/mqdefault.jpg"
                            },
                            "high": {
                                "url": "https://i.ytimg.com/vi/K1W1Z10zA7w/hqdefault.jpg"
                            }
                        },
                        "channelTitle": "BRLibertyWalk",
                        "liveBroadcastContent": "none"
                    },
                    "durationString": "2:28",
                    "durationSeconds": 148
                },
                {
                    "kind": "youtube#searchResult",
                    "etag": "\"3WIcRE7IJ70nCYemJJIi1L7dYAg/LzmgxaljhyVWdXmtjK9nip9-V9Y\"",
                    "id": {
                        "kind": "youtube#video",
                        "videoId": "oHnGmiT2fDQ"
                    },
                    "snippet": {
                        "publishedAt": "2014-11-06T18:17:52.000Z",
                        "channelId": "UC431v0fGu8A6v0EKN-HghGg",
                        "title": "A Marshmallow World",
                        "description": "Provided to YouTube by Universal Music Group International A Marshmallow World · Seth MacFarlane Holiday For Swing! ℗ 2014 Universal Republic Records, ...",
                        "thumbnails": {
                            "default": {
                                "url": "https://i.ytimg.com/vi/oHnGmiT2fDQ/default.jpg"
                            },
                            "medium": {
                                "url": "https://i.ytimg.com/vi/oHnGmiT2fDQ/mqdefault.jpg"
                            },
                            "high": {
                                "url": "https://i.ytimg.com/vi/oHnGmiT2fDQ/hqdefault.jpg"
                            }
                        },
                        "channelTitle": "",
                        "liveBroadcastContent": "none"
                    },
                    "durationString": "2:15",
                    "durationSeconds": 135
                },
                {
                    "kind": "youtube#searchResult",
                    "etag": "\"3WIcRE7IJ70nCYemJJIi1L7dYAg/JP3X7wgNz-zR1FXMiZ0z1fYka6w\"",
                    "id": {
                        "kind": "youtube#video",
                        "videoId": "VUIAkGLbSNc"
                    },
                    "snippet": {
                        "publishedAt": "2009-12-19T00:49:15.000Z",
                        "channelId": "UCqbzEVOZWIBgggC-8XcVQUQ",
                        "title": "christmas don't be late (original)- alvin and the chipmunks",
                        "description": "alvin and the chipmunks- chirstmas don't be late original version lyrics are here (Dave:)Alright you Chipmunks, Ready to sing your song? (Alvin:)I'd say we are ...",
                        "thumbnails": {
                            "default": {
                                "url": "https://i.ytimg.com/vi/VUIAkGLbSNc/default.jpg"
                            },
                            "medium": {
                                "url": "https://i.ytimg.com/vi/VUIAkGLbSNc/mqdefault.jpg"
                            },
                            "high": {
                                "url": "https://i.ytimg.com/vi/VUIAkGLbSNc/hqdefault.jpg"
                            }
                        },
                        "channelTitle": "SMILEYFACE12324",
                        "liveBroadcastContent": "none"
                    },
                    "durationString": "2:31",
                    "durationSeconds": 151
                },
                {
                    "kind": "youtube#searchResult",
                    "etag": "\"3WIcRE7IJ70nCYemJJIi1L7dYAg/05-4C99LHQ1TSGUgJ-c3ueXUkCM\"",
                    "id": {
                        "kind": "youtube#video",
                        "videoId": "xam01uaj6Vg"
                    },
                    "snippet": {
                        "publishedAt": "2008-12-06T02:23:22.000Z",
                        "channelId": "UCZZhJjpXDOk-EiJ-HF2dftA",
                        "title": "Barking Dogs - Jingle Bells",
                        "description": "If you love dogs on christmas, this video is best for you! Merry Christmas and Happy new year! Video created and edited by Alexander Panglima.",
                        "thumbnails": {
                            "default": {
                                "url": "https://i.ytimg.com/vi/xam01uaj6Vg/default.jpg"
                            },
                            "medium": {
                                "url": "https://i.ytimg.com/vi/xam01uaj6Vg/mqdefault.jpg"
                            },
                            "high": {
                                "url": "https://i.ytimg.com/vi/xam01uaj6Vg/hqdefault.jpg"
                            }
                        },
                        "channelTitle": "uploaderXZ",
                        "liveBroadcastContent": "none"
                    },
                    "durationString": "1:45",
                    "durationSeconds": 105
                },
                {
                    "kind": "youtube#searchResult",
                    "etag": "\"3WIcRE7IJ70nCYemJJIi1L7dYAg/tei4Mc649hgV_4GpS2GqJfKIUDQ\"",
                    "id": {
                        "kind": "youtube#video",
                        "videoId": "d9LqRl7tqf4"
                    },
                    "snippet": {
                        "publishedAt": "2008-11-23T03:58:37.000Z",
                        "channelId": "UCYXPrB3DLrEtBt_j8tCtilw",
                        "title": "Jingle Cats Silent Night",
                        "description": "Thanks for SUBSCRIBING!!! 'Silent Night' by the original world famous Jingle Cats. Thanks for Subscribing!!! The DVD is on sale right now, but not for long...",
                        "thumbnails": {
                            "default": {
                                "url": "https://i.ytimg.com/vi/d9LqRl7tqf4/default.jpg"
                            },
                            "medium": {
                                "url": "https://i.ytimg.com/vi/d9LqRl7tqf4/mqdefault.jpg"
                            },
                            "high": {
                                "url": "https://i.ytimg.com/vi/d9LqRl7tqf4/hqdefault.jpg"
                            }
                        },
                        "channelTitle": "meowychristmas",
                        "liveBroadcastContent": "none"
                    },
                    "durationString": "1:55",
                    "durationSeconds": 115
                },
                {
                    "kind": "youtube#searchResult",
                    "etag": "\"3WIcRE7IJ70nCYemJJIi1L7dYAg/eNDSdWhVffOdWnLx5Q4dxoa8ewU\"",
                    "id": {
                        "kind": "youtube#video",
                        "videoId": "Mk4woNRD7NQ"
                    },
                    "snippet": {
                        "publishedAt": "2007-08-18T07:12:58.000Z",
                        "channelId": "UCm8caU2AZIuB7xaJ_sE8GMg",
                        "title": "O Holy Night  worst rendition ever  FUNNIEST SONG ON EARTH",
                        "description": "NEWSFLASH! THE SINGER, STEVE MAULDIN HAS BEEN FOUND! Just google Steve Mauldin Video and you'll find him demonstrating how and why he did ...",
                        "thumbnails": {
                            "default": {
                                "url": "https://i.ytimg.com/vi/Mk4woNRD7NQ/default.jpg"
                            },
                            "medium": {
                                "url": "https://i.ytimg.com/vi/Mk4woNRD7NQ/mqdefault.jpg"
                            },
                            "high": {
                                "url": "https://i.ytimg.com/vi/Mk4woNRD7NQ/hqdefault.jpg"
                            }
                        },
                        "channelTitle": "noveltysongs",
                        "liveBroadcastContent": "none"
                    },
                    "durationString": "3:40",
                    "durationSeconds": 220
                },
                {
                    "kind": "youtube#searchResult",
                    "etag": "\"3WIcRE7IJ70nCYemJJIi1L7dYAg/CpYrIli24e59wKxE2rZplaxCufA\"",
                    "id": {
                        "kind": "youtube#video",
                        "videoId": "fv-GUPMviso"
                    },
                    "snippet": {
                        "publishedAt": "2010-09-07T18:26:15.000Z",
                        "channelId": "UCrLn46crPwOVGLF-9cNKfcQ",
                        "title": "Belle & Sebastian - Are You Coming Over For Christmas?",
                        "description": "2007 Christmas single by Belle & Sebastian Are you coming over for Christmas? Leave your friends, I don't think they'll miss you much It's not that you aren't ...",
                        "thumbnails": {
                            "default": {
                                "url": "https://i.ytimg.com/vi/fv-GUPMviso/default.jpg"
                            },
                            "medium": {
                                "url": "https://i.ytimg.com/vi/fv-GUPMviso/mqdefault.jpg"
                            },
                            "high": {
                                "url": "https://i.ytimg.com/vi/fv-GUPMviso/hqdefault.jpg"
                            }
                        },
                        "channelTitle": "CanOnlyHappenToMe",
                        "liveBroadcastContent": "none"
                    },
                    "durationString": "3:41",
                    "durationSeconds": 221
                },
                {
                    "kind": "youtube#searchResult",
                    "etag": "\"3WIcRE7IJ70nCYemJJIi1L7dYAg/4VitsXvw_oj3at4PtyPOZIuUUWU\"",
                    "id": {
                        "kind": "youtube#video",
                        "videoId": "2PU_-FzOchU"
                    },
                    "snippet": {
                        "publishedAt": "2011-12-23T01:09:30.000Z",
                        "channelId": "UCXKoCG0jVQ_bSOuMUYOiJ4w",
                        "title": "Richard Cheese - Christmas in Las Vegas",
                        "description": "Uploaded for the Holidays. Merry Christmas & Happy Hanukkah.",
                        "thumbnails": {
                            "default": {
                                "url": "https://i.ytimg.com/vi/2PU_-FzOchU/default.jpg"
                            },
                            "medium": {
                                "url": "https://i.ytimg.com/vi/2PU_-FzOchU/mqdefault.jpg"
                            },
                            "high": {
                                "url": "https://i.ytimg.com/vi/2PU_-FzOchU/hqdefault.jpg"
                            }
                        },
                        "channelTitle": "ImNoFgt",
                        "liveBroadcastContent": "none"
                    },
                    "durationString": "2:09",
                    "durationSeconds": 129
                },
                {
                    "kind": "youtube#searchResult",
                    "etag": "\"3WIcRE7IJ70nCYemJJIi1L7dYAg/DRJDNtaY9hFcRJRpvrSvSBQsSOs\"",
                    "id": {
                        "kind": "youtube#video",
                        "videoId": "qu4AuQA50pg"
                    },
                    "snippet": {
                        "publishedAt": "2007-06-29T18:44:35.000Z",
                        "channelId": "UCtTujnGMCgB_rK278f5IUOA",
                        "title": "Mr Hanky the christmas poo",
                        "description": "Newest version click here! http://www.youtube.com/watch?v=2kSq2hQJVBw Sped up version of this video ...",
                        "thumbnails": {
                            "default": {
                                "url": "https://i.ytimg.com/vi/qu4AuQA50pg/default.jpg"
                            },
                            "medium": {
                                "url": "https://i.ytimg.com/vi/qu4AuQA50pg/mqdefault.jpg"
                            },
                            "high": {
                                "url": "https://i.ytimg.com/vi/qu4AuQA50pg/hqdefault.jpg"
                            }
                        },
                        "channelTitle": "Evertonian94",
                        "liveBroadcastContent": "none"
                    },
                    "durationString": "2:17",
                    "durationSeconds": 137
                },
                {
                    "kind": "youtube#searchResult",
                    "etag": "\"3WIcRE7IJ70nCYemJJIi1L7dYAg/8LslBhSYqvzWcZpW9gR5zRRui9M\"",
                    "id": {
                        "kind": "youtube#video",
                        "videoId": "_6TA98FSBkk"
                    },
                    "snippet": {
                        "publishedAt": "2010-11-10T18:29:59.000Z",
                        "channelId": "UCQFVfm9stpidUOQVTRCvhgw",
                        "title": "Techno Christmas  - Jingle Bells Club Remix",
                        "description": "Download: http://www24.zippyshare.com/v/42960316/file.html Techno Christmas - Jingle Bells Club Remix.",
                        "thumbnails": {
                            "default": {
                                "url": "https://i.ytimg.com/vi/_6TA98FSBkk/default.jpg"
                            },
                            "medium": {
                                "url": "https://i.ytimg.com/vi/_6TA98FSBkk/mqdefault.jpg"
                            },
                            "high": {
                                "url": "https://i.ytimg.com/vi/_6TA98FSBkk/hqdefault.jpg"
                            }
                        },
                        "channelTitle": "BeauGosse68",
                        "liveBroadcastContent": "none"
                    },
                    "durationString": "3:32",
                    "durationSeconds": 212
                },
                {
                    "kind": "youtube#searchResult",
                    "etag": "\"3WIcRE7IJ70nCYemJJIi1L7dYAg/UbTsj9aQLnXKuitbnf6gpm-FTyE\"",
                    "id": {
                        "kind": "youtube#video",
                        "videoId": "HMUDVMiITOU"
                    },
                    "snippet": {
                        "publishedAt": "2014-03-14T01:16:45.000Z",
                        "channelId": "UCGkSXL5saM8y3VvJD_PdMFQ",
                        "title": "DJ Snake, Lil Jon - Turn Down for What",
                        "description": "Download the single on iTunes: http://smarturl.it/TD4W Director- Daniels Producer- Judy Craig Co Producer- Jonathan Wang Executive Producer- Candice ...",
                        "thumbnails": {
                            "default": {
                                "url": "https://i.ytimg.com/vi/HMUDVMiITOU/default.jpg"
                            },
                            "medium": {
                                "url": "https://i.ytimg.com/vi/HMUDVMiITOU/mqdefault.jpg"
                            },
                            "high": {
                                "url": "https://i.ytimg.com/vi/HMUDVMiITOU/hqdefault.jpg"
                            }
                        },
                        "channelTitle": "DJSnakeVEVO",
                        "liveBroadcastContent": "none"
                    },
                    "durationString": "3:37",
                    "durationSeconds": 217
                },
                {
                    "kind": "youtube#searchResult",
                    "etag": "\"3WIcRE7IJ70nCYemJJIi1L7dYAg/uSElApj2JyH2-gN_2se-eerbhfw\"",
                    "id": {
                        "kind": "youtube#video",
                        "videoId": "IM_H4CAAYxc"
                    },
                    "snippet": {
                        "publishedAt": "2012-11-26T16:56:32.000Z",
                        "channelId": "UCVhgDmaHZB57gjuFQ1_FOxA",
                        "title": "Wizzard ~ I Wish It Could Be Christmas Everyday",
                        "description": "Released 1973.",
                        "thumbnails": {
                            "default": {
                                "url": "https://i.ytimg.com/vi/IM_H4CAAYxc/default.jpg"
                            },
                            "medium": {
                                "url": "https://i.ytimg.com/vi/IM_H4CAAYxc/mqdefault.jpg"
                            },
                            "high": {
                                "url": "https://i.ytimg.com/vi/IM_H4CAAYxc/hqdefault.jpg"
                            }
                        },
                        "channelTitle": "stardustdays",
                        "liveBroadcastContent": "none"
                    },
                    "durationString": "4:41",
                    "durationSeconds": 281
                }
            ]
        };

    }

    ctrl.$inject = ['$scope', '$stateParams', '$rootScope', 'SearchService', 'RoomService'];
    return ctrl;

});
