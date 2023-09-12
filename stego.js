function clearbits(colorval) {
  //compute the same color value with the low bits zeroed
  var x=Math.floor(colorval/16) * 16;
  return x; }

function setbits(colorval){
    var x=(colorval % 16) * 16;
    return x;
}
function chop2extract(image) {
  //for each pixel in the image
  for(var px of image.values()){
    //clear lower bits of red
    px.setRed(setbits(px.getRed()));
    //clear lower bits of green
    px.setGreen(setbits(px.getGreen()));
    //clear lower bits of blue
    px.setBlue(setbits(px.getBlue()));
  }
  return image;
}

function chop2hide(image) {
  //for each pixel in the image
  for(var px of image.values()){
    //clear lower bits of red
    px.setRed(clearbits(px.getRed()));
    //clear lower bits of green
    px.setGreen(clearbits(px.getGreen()));
    //clear lower bits of blue
    px.setBlue(clearbits(px.getBlue()));
  }
  return image;
}
function shift(image){
    //for each pixel in the image
    for(var px of image.values()){
        //shifts the red bits over
        px.setRed(px.getRed()/16);
        //shifts the green bits over
        px.setGreen(px.getGreen()/16);
        //shifts the blue bits over
        px.setBlue(px.getBlue()/16);
    }
    return image;
}

function combine(show,hide){
    //make new image
    var answer= new SimpleImage(show.getWidth(),show.getHeight());
    //for each pixel in answer
    for(var px of answer.values()){
        //get the x and y of that pixel
        var x=px.getX();
        var y=px.getY();
        //get the pixel in the same place from show
        var showpx=show.getPixel(x,y);
        //get the pixel in the same place from hide
        var hidepx=hide.getPixel(x,y);
        //set red pixel as showpx red + hidepx red
        px.setRed(showpx.getRed()+hidepx.getRed());
        //set green pixel as showpx green + hidepx green
        px.setGreen(showpx.getGreen()+hidepx.getGreen());
        //set blue pixel as showpx blue + hidepx blue
        px.setBlue(showpx.getBlue()+hidepx.getBlue());
    }
    return answer;
}


var start=new SimpleImage("myImage.png");
var hide=new SimpleImage("download.jpg");

var h_start=chop2hide(start);
var h_hide=shift(hide);
var ans= combine(h_start,h_hide);
print("Image2 is hidden in Image1");
print(ans);

hide=chop2extract(hide);
start=shift(start);
var ans2=combine(start,hide);
print("Image2 is extracted from Image1");
print(ans2);