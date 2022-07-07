(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const postContent = document.getElementById("journalPost");
const form = document.getElementById("form");
const parentDiv = document.getElementById("posts");
const API_Key = "yMYTtCg4jPmk6BxD19dklT7FUUfAMQAD";

///////////// Random Name function

const titleName = [
  "Lord",
  "The Common",
  "King",
  "The Divine",
  "Spectral",
  "CEO",
  "Boss",
  "The Greatest",
  "The Ugly",
  "Warden",
  "General",
  "The Immortal",
  "Hero",
  "Sub",
  "Villian",
  "Mr",
  "Mrs",
  "Miss",
  "Senor",
  "Queen",
  "The Demon",
  "The Possessed",
];
const subName = [
  "Apple",
  "Fish",
  "Salt",
  "Pepper",
  "Rainbow",
  "Rain",
  "Fire",
  "Ice",
  "Night",
  "Kermit",
  "Ash",
  "Steel",
  "Gold",
  "Snow",
  "Ankle",
  "Copper",
  "Ghost",
  "Puppy",
  "Cucumber",
];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function randomNameGenerator() {
  let name = `${titleName[getRandomInt(0, titleName.length)]} ${
    subName[getRandomInt(0, subName.length)]
  }`;

  return name;
}

////////// Loads posts when the DOM is loaded

document.addEventListener("DOMContentLoaded", (e) => {
  loadPosts(e);
});

////// Sending Data to herokuapp

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const postContent = document.getElementById("journalPost");
  if (postContent.value === "") {
    alert("Please input characters!");
  } else {
    const postData = {
      text: e.target.journalPost.value,
      react: [0, 0, 0],
      comments: [],
    };
    const options = {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch("https://small-talk-fp1.herokuapp.com/new", options)
      .then((res) => res.json())
      .then((data) => {
        let test = data.text;
        test = postData.text;
        createPost(e, data.id);
        let postText = document.getElementById(`postInfo-${data.id}`);
        postText.textContent = test;
      })
      .catch(console.warn);
  }
});

//////////// fetches all the posts and loops over each creating a post for each

function loadPosts(e) {
  fetch("https://small-talk-fp1.herokuapp.com/")
    .then((r) => r.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        fetchPost(e, data[i].id);
      }
    });
}

//////////// Creating post for each id in the server json file

function fetchPost(e, id) {
  e.preventDefault();
  createPost(e, id);
  const postText = document.getElementById(`postInfo-${id}`);
  const buttonLikeCounter = document.getElementById(`reaction${id}Counter1`);
  const buttonSmileCounter = document.getElementById(`reaction${id}Counter2`);
  const buttonSadCounter = document.getElementById(`reaction${id}Counter3`);
  fetch(`https://small-talk-fp1.herokuapp.com/${id}`)
    .then((r) => r.json())
    .then((data) => {
      console.log(postText);
      // Setting post text to the text stored in the object.text
      postText.textContent = data.text;
      /// comments
      const commentsArray = data.comments;

      if (data.comments) {
        // TODO::::  Maybe send comment into createComment
        commentsArray.forEach((comment, index) => {
          const result = data.comments[index];
          const newLi = document.createElement("li");
          const commentList = document.getElementById(`comment-${id}`);
          if (!result.includes("https://media")) {
            newLi.textContent = data.comments[index];

            commentList.appendChild(newLi);
          } else {
            const gifimg = document.createElement("img");
            gifimg.className = `gifimg`;
            gifimg.id = `gif-${id}`;
            gifimg.src = data.comments[index];
            newLi.appendChild(gifimg);
            commentList.appendChild(newLi);
          }
          // createComment(id, index);
        });
      }
      console.log();
      /// Fetch Reacts from server
      buttonLikeCounter.textContent = data.react[0];
      buttonSmileCounter.textContent = data.react[1];
      buttonSadCounter.textContent = data.react[2];
    })
    .catch(console.warn);
}

/// creates the elements contained within the post

function createPost(e, id) {
  e.preventDefault();
  const postContainer = document.createElement("div");
  const avatarContainer = document.createElement("div");
  const avatar = document.createElement("img");
  const newPost = document.createElement("div");
  const postText = document.createElement("div");
  const headerContainer = document.createElement("div");
  const postName = document.createElement("h3");
  const postFooter = document.createElement("div");
  const postComment = document.createElement("div");
  const reactionContainer = document.createElement("div");
  const reaction1Counter = document.createElement("div");
  const reaction2Counter = document.createElement("div");
  const reaction3Counter = document.createElement("div");
  const reaction1 = document.createElement("button");
  const reaction2 = document.createElement("button");
  const reaction3 = document.createElement("button");

  const commentContainer = document.createElement("div");
  commentContainer.className = "commentContainer";

  const gifCommentContainer = document.createElement("div");
  gifCommentContainer.className = "gifCommentContainer";
  // reaction1Counter.appendChild(reaction1);
  // reaction2Counter.appendChild(reaction2);
  // reaction3Counter.appendChild(reaction3);

  /// Reaction section

  reactionContainer.append(
    reaction1Counter,
    reaction2Counter,
    reaction3Counter,
    reaction3,
    reaction1,
    reaction2
  );

  reaction1Counter.textContent = "0";
  reaction2Counter.textContent = "0";
  reaction3Counter.textContent = "0";
  reaction1Counter.id = `reaction${id}Counter1`;
  reaction2Counter.id = `reaction${id}Counter2`;
  reaction3Counter.id = `reaction${id}Counter3`;
  reaction1Counter.className = `reactionCounter`;
  reaction2Counter.className = `reactionCounter`;
  reaction3Counter.className = `reactionCounter`;

  // Giphy Section
  const gifBtn = document.createElement("button");
  gifBtn.id = `gif${id}`;
  gifBtn.className = "commentFormBtn";
  gifBtn.textContent = "Lucky Giphy";
  gifBtn.addEventListener("click", (e) => {
    gifReact(e, id);
  });

  // Giphy Search Feature
  const giphySearch = document.createElement("input");
  giphySearch.setAttribute("type", "text");
  giphySearch.maxLength = "20";
  giphySearch.name = "searchGif";
  giphySearch.id = `searchGif-${id}`;
  giphySearch.className = "commentBoxStyle";
  giphySearch.class = "postComments";
  giphySearch.placeholder = "Search for a gif";
  giphySearch.maxLength = "20";
  const giphyPreview = document.createElement("button");
  giphyPreview.id = `previewBtnGif-${id}`;
  giphyPreview.className = "commentFormBtn";
  giphyPreview.textContent = `Preview`;
  giphyPreview.name = "searchGif";
  giphyPreview.addEventListener("click", (e) => {
    previewGif(e, id);
  });
  const giphySubmit = document.createElement("button");
  giphySubmit.id = `searchBtnGif-${id}`;
  giphySubmit.className = "commentFormBtn";
  giphySubmit.textContent = `Send`;
  giphySubmit.name = "searchGif";
  giphySubmit.addEventListener("click", (e) => {
    submitGif(e, id);
  });

  const gifDisplay = document.createElement("div");
  gifDisplay.id = `gifDisplay-${id}`;

  postFooter.append();

  const commentForm = document.createElement("form");
  const commentBar = document.createElement("input");
  const commentButton = document.createElement("input");
  const commentList = document.createElement("ul");
  const commentArea = document.createElement("div");
  const commentTitle = document.createElement("h5");
  commentTitle.className = "commentsHeader";
  commentTitle.textContent = "Comments:";
  postComment.className = "postCommentContainter";

  avatar.src =
    "https://i.pinimg.com/originals/a6/58/32/a65832155622ac173337874f02b218fb.png";
  avatar.alt = "Cartoon Avatar";
  avatarContainer.className = "post_avatar";
  newPost.className = "post_body";
  headerContainer.className = "post_header";
  postName.id = "userName";
  postName.className = "title";
  postText.className = "post_headerDescription";
  postText.id = `postInfo-${id}`;
  postFooter.className = "post_footer";
  postFooter.id = `post_footer-${id}`;

  reaction1.textContent = "sentiment_very_satisfied";
  reaction2.textContent = "sentiment_dissatisfied";
  reaction3.textContent = "thumb_up";
  reaction1.addEventListener("click", (e) => {
    reactCounterSmile(e, id);
  });
  reaction2.addEventListener("click", (e) => {
    reactCounterSad(e, id);
  });
  reaction3.addEventListener("click", (e) => {
    reactCounterLike(e, id);
  });
  reaction2.className = "material-icons";
  reaction3.className = "material-icons";
  reaction1.className = "material-icons";
  reaction3.id = `like-${id}`;
  reaction1.id = `smile-${id}`;
  reaction2.id = `sad-${id}`;
  reactionContainer.className = "reactionContainer";
  postContainer.className = "postFlex";

  commentForm.className = "commentForm";
  commentForm.id = `formInfo-${id}`;
  commentBar.className = "postComments";
  commentBar.className = "commentBoxStyle";
  commentBar.id = `commentTextarea${id}`;
  commentBar.maxLength = "30";
  commentBar.placeholder = "Make a comment";
  commentButton.className = "commentButton";
  commentButton.className = "commentFormBtn";
  commentButton.setAttribute("type", "submit");
  commentForm.addEventListener("submit", (e) => {
    getcommentinput(e, id);
  });
  commentButton.value = "Comment";
  commentButton.id = `commentSubmit-${id}`;
  commentArea.className = "commentArea";
  commentList.className = "commentList";
  commentList.id = `comment-${id}`;

  gifCommentContainer.append(giphySearch, giphyPreview, giphySubmit);
  commentContainer.append(commentBar, commentButton, gifBtn);
  postFooter.appendChild(reactionContainer);
  postFooter.appendChild(commentForm);

  commentForm.append(commentContainer, gifCommentContainer, gifDisplay);
  avatarContainer.appendChild(avatar);
  headerContainer.appendChild(postName);
  headerContainer.appendChild(postText);
  commentArea.appendChild(commentTitle);
  commentArea.appendChild(commentList);
  headerContainer.appendChild(postFooter);
  newPost.appendChild(headerContainer);
  newPost.appendChild(commentArea);
  postComment.appendChild(commentForm);
  newPost.appendChild(postComment);
  postContainer.appendChild(avatarContainer);
  postContainer.appendChild(newPost);

  parentDiv.prepend(postContainer);

  // Clear Input, add randomName

  postContent.value = "";
  const name = randomNameGenerator();
  postName.textContent = name;
}

///////////////////////////// Comments

function getcommentinput(e, id) {
  e.preventDefault();
  const commentContent = document.getElementById(`commentTextarea${id}`);
  if (commentContent.value === "") {
    alert("You haven't added a comment");
  } else {
    const postData = {
      comments: e.target[0].value,
    };

    const options = {
      method: "PATCH",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
      },
    };
    fetch(`https://small-talk-fp1.herokuapp.com/${id}`, options)
      .then((r) => r.json())
      .then((data) => {
        const commentArea = document.getElementById(`comment-${id}`);
        const newLi = document.createElement("li");
        newLi.textContent = postData.comments;
        commentArea.appendChild(newLi);
        const array = data;
        array.push(postData.comments);
      });
    e.target[0].value = "";
  }
}

////////// emoji counter
function reactCounterLike(e, id) {
  e.preventDefault();
  const buttonLikeCounter = document.getElementById(`reaction${id}Counter1`);
  console.log(buttonLikeCounter);
  let counter = parseInt(buttonLikeCounter.textContent);
  counter++;
  console.log(counter);
  // Now we are going to fetch react array and update
  buttonLikeCounter.textContent = counter;

  /// patch the react count to a new route
  const likeData = {
    react: counter,
  };

  const options = {
    method: "PATCH",
    body: JSON.stringify(likeData),
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch(`https://small-talk-fp1.herokuapp.com/react1/${id}`, options)
    .then((r) => r.json())
    .then((data) => {
      console.log("This is from fetch", data);
      data = likeData;
      console.log(data);
    });
}
/////////

function reactCounterSmile(e, id) {
  e.preventDefault();
  const buttonSmileCounter = document.getElementById(`reaction${id}Counter2`);
  console.log(buttonSmileCounter);
  let counter = parseInt(buttonSmileCounter.textContent);
  counter++;
  console.log(counter);
  // Now we are going to fetch react array and update
  buttonSmileCounter.textContent = counter;
  const likeData = {
    react: counter,
  };

  const options = {
    method: "PATCH",
    body: JSON.stringify(likeData),
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch(`https://small-talk-fp1.herokuapp.com/react2/${id}`, options)
    .then((r) => r.json())
    .then((data) => {
      console.log("This is from fetch", data);
      data = likeData;
      console.log(data);
    });
}

function reactCounterSad(e, id) {
  e.preventDefault();
  const buttonSadCounter = document.getElementById(`reaction${id}Counter3`);
  console.log(buttonSadCounter);
  let counter = parseInt(buttonSadCounter.textContent);
  counter++;
  console.log(counter);
  // Now we are going to fetch react array and update
  buttonSadCounter.textContent = counter;
  const likeData = {
    react: counter,
  };

  const options = {
    method: "PATCH",
    body: JSON.stringify(likeData),
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch(`https://small-talk-fp1.herokuapp.com/react3/${id}`, options)
    .then((r) => r.json())
    .then((data) => {
      console.log("This is from fetch", data);
      data = likeData;
      console.log(data);
    });
}

///// Giphy

function gifReact(e, id) {
  e.preventDefault();

  fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${API_Key}`)
    .then((response) => response.json())
    .then((json) => {
      const randomInt = getRandomInt(0, json.data.length);
      const gif_url = json.data[randomInt].images.fixed_height.url;

      const giphyData = {
        url: gif_url,
      };

      const options = {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(giphyData),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*",
        },
      };

      fetch(`https://small-talk-fp1.herokuapp.com/gifs/new`, options)
        .then((r) => r.json())
        .then((data) => {
          const gif_url = data.url;

          const commentArea = document.getElementById(`comment-${id}`);
          const newLi = document.createElement("li");
          const gifimg = document.createElement("img");
          gifimg.className = `gifimg`;
          gifimg.id = `gif-${data.id}`;
          console.log(gifimg.id);
          gifimg.src = gif_url;
          newLi.appendChild(gifimg);
          commentArea.appendChild(newLi);

          const gifData = {
            comments: gif_url,
          };
          const options2 = {
            method: "PATCH",
            body: JSON.stringify(gifData),
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "*",
            },
          };
          fetch(`https://small-talk-fp1.herokuapp.com/${id}`, options2)
            .then((r) => r.json())
            .then((data) => {
              console.log(data);
              const array = data;
              array.push(gifData.comments);
            });
        });
    })
    .catch(console.warn);
}
// https:api.giphy.com/v1/gifs/search?api_key=qjWg9FdUGKToLMDWBaH9DiHGLVAsmTMj&q=${searchTerm}&limit=10&offset=0&rating=g&lang=en

function previewGif(e, id) {
  e.preventDefault();

  const searchQuery = document.getElementById(`searchGif-${id}`);
  const gifDisplay = document.getElementById(`gifDisplay-${id}`);

  if (!gifDisplay.firstChild) {
    if (searchQuery.value == "") {
      alert("We need some ideas from you!");
    } else {
      fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${API_Key}&q=` +
          searchQuery.value.replaceAll(" ", "+").toLowerCase()
      )
        .then((r) => r.json())
        .then((data) => {
          const randomInt = getRandomInt(0, data.data.length);
          const gif_url = data.data[randomInt].images.fixed_height_small.url;
          const gif = document.createElement("img");
          gif.style.width = "100px";
          gif.style.height = "100px";
          gif.src = gif_url;
          gifDisplay.appendChild(gif);
        });
    }
  } else {
    gifDisplay.removeChild(gifDisplay.firstChild);
  }
}

function submitGif(e, id) {
  e.preventDefault();
  const submitdiv = document.getElementById(`gifDisplay-${id}`);

  console.log(submitdiv.firstChild);
  if (submitdiv.firstChild) {
    const gifImg = submitdiv.firstChild.src;
    const gifData = {
      comments: gifImg,
    };
    const options2 = {
      method: "PATCH",
      body: JSON.stringify(gifData),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
      },
    };

    fetch(`https://small-talk-fp1.herokuapp.com/${id}`, options2)
      .then((r) => r.json())
      .then((data) => {
        const gifDisplay = document.getElementById(`gifDisplay-${id}`);
        const commentArea = document.getElementById(`comment-${id}`);
        const newLi = document.createElement("li");
        const gifimg = document.createElement("img");
        gifimg.className = `gifimg`;
        gifimg.src = gifImg;

        newLi.appendChild(gifimg);
        commentArea.appendChild(newLi);

        const array = data;
        array.push(gifImg);
        gifDisplay.removeChild(gifDisplay.firstChild);

        const searchGif = document.getElementById(`searchGif-${id}`);
        console.log(searchGif.textContent);
        searchGif.value = "";
      });
  } else {
    alert("You have not previewed your gif!");
  }
}

module.exports = {
  getRandomInt,
  randomNameGenerator,
  loadPosts,
  fetchPost,
  createPost,
  getcommentinput,
  reactCounterLike,
  reactCounterSmile,
  reactCounterSad,
  gifReact,
  previewGif,
  submitGif,
};

},{}]},{},[1]);
