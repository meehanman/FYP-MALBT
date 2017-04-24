module.exports = function(server) {

    server.stringGen = function(len) {
        var text = "";
        var charset = "abcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < len; i++) {
            text += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        return text;
    }
    //Test image code to be replaced by storing images in the db
    server.upload = function(imageRaw, saveImageCallback) {
        if (imageRaw == undefined || imageRaw == null) {
            return false;
        }

        //If the image submitted is a url, just keep it.
        if(imageRaw.startsWith("http")){
          saveImageCallback(imageRaw);
        }

        var imageBuffer = decodeBase64Image(imageRaw);
        if (imageBuffer.type.split("/")[0] == "image") {
            var filename = server.stringGen(10);
            server.fs.writeFile('/var/www/html/images/' + filename + '.' + imageBuffer.type.split("/")[1], imageBuffer.data, function(err) {
                if (err) {
                    saveImageCallback(false);
                }
                var returnUrl = "http://cloud.dean.technology/images/" + filename + '.' + imageBuffer.type.split("/")[1];
                console.log(returnUrl);
                saveImageCallback(returnUrl);
            });
        }

        function decodeBase64Image(dataString) {
            //TODO: Check this input begins with data: and contains the base64 bit

            var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
                response = {};

            console.log(matches[0], matches[1], matches[2]);

            if (matches.length !== 3) {
                return new Error('Invalid input string');
            }

            response.type = matches[1];
            response.data = new Buffer(matches[2], 'base64');

            return response;
        }
    };

    server.toCamelCase = function(input){
          if(input==undefined||input.length==0){
            return input;
          }
          var wordList = input.split(" ");
          input = "";
          for (var i = 0; i < wordList.length; i++) {
              input += wordList[i].charAt(0).toUpperCase() + wordList[i].substr(1).toLowerCase() + " "
          }
          //-1 as string always will end in a space
          return input.slice(0, -1);
      }
}
