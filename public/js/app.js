// jshint esversion: 6
let reddit = 'http://www.reddit.com';

function showPic() {
  let theData = JSON.parse(this.responseText).data.children;
  let j = 0;
  for ( let i = 0; i < theData.length; i ++ ) {

    if ( 'preview' in theData[i].data === false || theData[i].data.preview.images[0].source.url.indexOf('gif') > 0 ) {
      j--;
      continue;
    } else {
    let author = theData[i].data.author;
    let upvotes = theData[i].data.score;
    let link = theData[i].data.permalink;
    let thePic = theData[i].data.preview.images[0].source.url;
    let date = moment.unix(theData[i].data.created_utc).fromNow();
    let titleInfo = theData[i].data.title;

    let card = document.createElement('div');
    card.className = 'card-box';
    content.appendChild(card);

    let linkTo = document.createElement('a');
    linkTo.href = `${reddit}${link}`;
    linkTo.target = '_blank';
    linkTo.innerHTML = `<div class='img-box'></div>`;
    card.appendChild(linkTo);

    pic = document.querySelectorAll('.img-box')[i+j];
    pic.style.background = `url(${thePic})`;
    pic.style.backgroundSize = 'cover';

    let title = document.createElement('p');
    title.className = 'card-title';
    title.innerHTML = titleInfo.substr(0, 50);
    card.appendChild(title);

    let info = document.createElement('p');
    info.className = 'card-info';
    info.innerHTML = `by ${author} &#9679; &#8679; ${upvotes} &#9679; posted ${date}`;
    card.appendChild(info);
    }
  }
}

function requestAndAppendNew(url) {
  content.innerHTML = '';
  let newReq = new XMLHttpRequest();
  newReq.addEventListener('load', showPic);
  newReq.open('GET', url);
  newReq.send();
}

document.getElementById('my-boards').addEventListener('click', () => {
  requestAndAppendNew('https://www.reddit.com/r/OwlsWithCatHeads/.json');
});

document.getElementById('get-the-app').addEventListener('click', () => {
  requestAndAppendNew('https://www.reddit.com/r/catloaf/.json');
});

let subArr = ['https://www.reddit.com/r/birdswitharms/.json', 'https://www.reddit.com/r/jellybeantoes/.json', 'https://www.reddit.com/r/creepy/.json', 'https://www.reddit.com/r/Thisismylifemeow/.json', 'https://www.reddit.com/r/catsonglass/.json'];

document.getElementById('random-link').addEventListener('click', () => {
  requestAndAppendNew(subArr[Math.floor(Math.random() * subArr.length)]);
});

requestAndAppendNew('https://www.reddit.com/r/babycorgis/.json');
