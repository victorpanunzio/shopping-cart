exports.getExt =  (mime) => {
    var ext = "";
    console.log(mime);
    switch (mime) {
        case "image/jpeg":
        case "image/jpg":
            ext = ".jpg";
            break;
        case "image/png":
            ext = ".png";
            break;
        case "image/gif":
            ext = ".gif";
            break;
        case "audio/mp3":
            ext = ".mp3";
            break;
            case "audio/x-m4a":
            ext = ".m4a";
            break;
        case "video/mp4":
            ext = ".mp4";
            break;
    }

    return ext;
};