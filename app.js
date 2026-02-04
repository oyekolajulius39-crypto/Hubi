let tutorials = [
  {
    title: "HTML Crash Course",
    category: "Web Development",
    video: "https://www.youtube.com/embed/UB1O30fR-EE",
    text: "Step 1: Create index.html\nStep 2: Add HTML structure\nStep 3: Add headings, paragraphs, links\nStep 4: Open in browser"
  },
  {
    title: "JavaScript Beginner Intro",
    category: "Programming",
    video: "https://www.youtube.com/embed/qoSksQ4s_hg",
    text: "Step 1: Link script.js\nStep 2: Use console.log()\nStep 3: Learn variables and functions\nStep 4: Practice DOM manipulation"
  }
];

let currentTutorial = null;

/* TAB SYSTEM */
function showTab(tabId) {
  document.querySelectorAll(".tab-section").forEach(sec => sec.classList.remove("active"));
  document.querySelectorAll(".tab").forEach(btn => btn.classList.remove("active"));

  document.getElementById(tabId).classList.add("active");
  event.target.classList.add("active");
}

/* LOAD TUTORIAL CARDS */
function loadTutorials() {
  let list = document.getElementById("tutorialList");
  list.innerHTML = "";

  tutorials.forEach((tut, index) => {
    let card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${tut.title}</h3>
      <p>${tut.category}</p>
    `;
    card.onclick = () => openTutorial(index);
    list.appendChild(card);
  });
}

/* OPEN TUTORIAL */
function openTutorial(index) {
  currentTutorial = tutorials[index];

  document.getElementById("tutorialView").classList.remove("hidden");

  document.getElementById("viewTitle").innerText = currentTutorial.title;
  document.getElementById("viewVideo").src = currentTutorial.video;
  document.getElementById("viewText").innerText = currentTutorial.text;

  loadComments();
}

/* COMMENTS */
function postComment() {
  let input = document.getElementById("commentInput");
  let text = input.value.trim();
  if (!text) return;

  let key = "comments_" + currentTutorial.title;
  let comments = JSON.parse(localStorage.getItem(key)) || [];

  comments.push(text);
  localStorage.setItem(key, JSON.stringify(comments));

  input.value = "";
  loadComments();
}

function loadComments() {
  let key = "comments_" + currentTutorial.title;
  let comments = JSON.parse(localStorage.getItem(key)) || [];

  let list = document.getElementById("commentList");
  list.innerHTML = "";

  comments.forEach(c => {
    let div = document.createElement("div");
    div.className = "comment";
    div.innerText = c;
    list.appendChild(div);
  });
}

/* ADD NEW TUTORIAL */
document.getElementById("tutorialForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let newTut = {
    title: document.getElementById("newTitle").value,
    category: document.getElementById("newCategory").value,
    video: document.getElementById("newVideo").value,
    text: document.getElementById("newText").value
  };

  tutorials.push(newTut);
  loadTutorials();

  alert("Tutorial Added Successfully!");

  this.reset();
});

/* INIT */
loadTutorials();
