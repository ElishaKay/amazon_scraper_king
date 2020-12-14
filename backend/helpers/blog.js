exports.smartTrim = (str, length, delim, appendix) => {
    if (str.length <= length) return str;

    var trimmedStr = str.substr(0, length + delim.length);

    var lastDelimIndex = trimmedStr.lastIndexOf(delim);
    if (lastDelimIndex >= 0) trimmedStr = trimmedStr.substr(0, lastDelimIndex);

    if (trimmedStr) trimmedStr += appendix;
    return trimmedStr;
};

exports.enlargePhoto = (imgurl) => {

	if (typeof imgurl !== 'undefined')
	{
		console.log(imgurl);
  		imgurl = imgurl.split('_');
  	}
	else
	{
		console.log("imgurl is undefined");
  		imgurl = ['undefined'];
	}

  return ''.concat(imgurl[0],'jpg');
}