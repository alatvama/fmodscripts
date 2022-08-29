
// global func makeEvents & add Track names to it
var global = this;
global.size = 3;

global.makeEvents = function(size) {
    var events=[];
    for(var i=0; i<size; i++) {
        event = studio.project.create('Event');
        event.addGroupTrack('hola'+i); // create the default track, i.e. addGroupTrack[0]
        events.push(event);

        //console.log('event id is ---' + arr[i]);
    }
    return events;
}

global.makeDummySounds = function (size) {
    var dummySounds = [];
    for (var i = 0; i < size; i++) {
        dummySounds.push(studio.project.create('SingleSound'));
      }
    return dummySounds;
}

global.getFiles = function(filenames){

    var audiofiles = [];
    for (var i=0; i<filenames.length; i++) {
      audiofiles.push(studio.project.importAudioFile("/Users/huuugeaudiostudio/Downloads/pharaoh-sfx/sfx/"+filenames[i]));
    }
    return audiofiles;
}

//

global.getFileNames = function(){
    var url = '{"version":"1.0","encoding":"UTF-8","feed":{"xmlns":"http://www.w3.org/2005/Atom","xmlns$openSearch":"http://a9.com/-/spec/opensearchrss/1.0/","xmlns$gsx":"http://schemas.google.com/spreadsheets/2006/extended","id":{"$t":"https://spreadsheets.google.com/feeds/list/15pYPWWyDAIHxJkC6xPBYEjP6y4qxdAdrqBGSIszSy6Q/od6/public/values"},"updated":{"$t":"2017-10-02T09:30:40.122Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"Sheet1"},"link":[{"rel":"alternate","type":"application/atom+xml","href":"https://docs.google.com/a/huuugegames.com/spreadsheets/d/15pYPWWyDAIHxJkC6xPBYEjP6y4qxdAdrqBGSIszSy6Q/pubhtml"},{"rel":"http://schemas.google.com/g/2005#feed","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/15pYPWWyDAIHxJkC6xPBYEjP6y4qxdAdrqBGSIszSy6Q/od6/public/values"},{"rel":"http://schemas.google.com/g/2005#post","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/15pYPWWyDAIHxJkC6xPBYEjP6y4qxdAdrqBGSIszSy6Q/od6/public/values"},{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/15pYPWWyDAIHxJkC6xPBYEjP6y4qxdAdrqBGSIszSy6Q/od6/public/values?alt\u003djson"}],"author":[{"name":{"$t":"aki.latvamaki"},"email":{"$t":"aki.latvamaki@gmail.com"}}],"openSearch$totalResults":{"$t":"3"},"openSearch$startIndex":{"$t":"1"},"entry":[{"id":{"$t":"https://spreadsheets.google.com/feeds/list/15pYPWWyDAIHxJkC6xPBYEjP6y4qxdAdrqBGSIszSy6Q/od6/public/values/cokwr"},"updated":{"$t":"2017-10-02T09:30:40.122Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"adding_gems"},"content":{"type":"text","$t":"filename: adding_gems.ogg"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/15pYPWWyDAIHxJkC6xPBYEjP6y4qxdAdrqBGSIszSy6Q/od6/public/values/cokwr"}],"gsx$audioevent":{"$t":"adding_gems"},"gsx$filename":{"$t":"adding_gems.ogg"}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/15pYPWWyDAIHxJkC6xPBYEjP6y4qxdAdrqBGSIszSy6Q/od6/public/values/cpzh4"},"updated":{"$t":"2017-10-02T09:30:40.122Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"auto-spin-hc"},"content":{"type":"text","$t":""},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/15pYPWWyDAIHxJkC6xPBYEjP6y4qxdAdrqBGSIszSy6Q/od6/public/values/cpzh4"}],"gsx$audioevent":{"$t":"auto-spin-hc"},"gsx$filename":{"$t":"auto-spin-hc.wav"}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/15pYPWWyDAIHxJkC6xPBYEjP6y4qxdAdrqBGSIszSy6Q/od6/public/values/cre1l"},"updated":{"$t":"2017-10-02T09:30:40.122Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"auto-spin"},"content":{"type":"text","$t":"filename: auto-spin.ogg"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/15pYPWWyDAIHxJkC6xPBYEjP6y4qxdAdrqBGSIszSy6Q/od6/public/values/cre1l"}],"gsx$audioevent":{"$t":"auto-spin"},"gsx$filename":{"$t":"auto-spin.ogg"}}]}}'

    var stuff = JSON.parse(url).feed.entry;
    filenames = [];
    for (var i = 0; i< stuff.length; i++){
        filenames.push(stuff[i]["gsx$filename"]["$t"]);
    }

    return filenames
}

// actual programme that runs and binds events with sounds
studio.menu.addMenuItem({ name: "bindEventsWithSounds",

    execute: function() {
      var events = global.makeEvents(global.size);
      var dummySounds = global.makeDummySounds(global.size);

      var audiofiles = global.getFiles(global.getFileNames());

      //
      for (var i=0; i<global.size; i++){

      dummySounds[i].audioTrack = events[i].groupTracks[0]; // bind audioTrack to event's 1st groupTracks (created in global.makeEvents)

      dummySounds[i].audioFile  = audiofiles[i];           // bind singleSound to the actual file
      dummySounds[i].parameter  = events[i].timeline;      // other bindings
      dummySounds[i].length     = audiofiles[i].length;    // tune some file properties
      }
    }
})
