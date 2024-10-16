// Load catagories
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then(res => res.json())
    .then(data => displayCategories(data.categories))
    .catch(error => console.log(error));
}


const loadVideos = (searchText = "") => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then(res => res.json())
    .then(data => displayVideos(data.videos))
    .catch(error => console.log(error));
}

const loadDetails = async (videoId) =>{
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  const res = await fetch (url);
  const data = await res.json();
  displayDetails(data.video);
}


// Display details
const displayDetails = (video) =>{
  const modalContainer = document.getElementById("modal-content");
  modalContainer.innerHTML=`
   <img class="rounded-lg h-full w-full object-cover" src="${video.thumbnail}"/>
   <p>${video.description}</P>
  `
  document.getElementById("customModal").showModal();
}

// Remove active class
const removeActiveClass = () => {
  const buttons = document.getElementsByClassName("category-btn")
  for (let btn of buttons) {
    btn.classList.remove("active");
  }
}

// Load category videos
const loadCategoryVideos = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then(res => res.json())
    .then(data => {
      removeActiveClass();
      const activeButton = document.getElementById(`btn-${id}`);
      activeButton.classList.add("active");
      displayVideos(data.category);
    })
    .catch(error => console.log(error))
}

// Display categories
const displayCategories = (categories) => {
  const categoriesContainer = document.getElementById('categories');
  categories.forEach((items) => {
    const buttonContainer = document.createElement("div")
    buttonContainer.innerHTML =
      `
     <button id="btn-${items.category_id}" onclick="loadCategoryVideos(${items.category_id})" class="btn category-btn">
      ${items.category}
     </button>
    `
    categoriesContainer.append(buttonContainer);
  });
}

// Show time
function getTimeString(time) {
  const hour = parseInt(time / 3600);
  let remainingSeconds = time % 3600;
  const minute = parseInt(remainingSeconds / 60);
  remainingSeconds = remainingSeconds % 60;
  return `${hour} hour ${minute} minute ${remainingSeconds} ago`
}


const cardDemo = {
  category_id: "1001",
  video_id: "aaaa",
  thumbnail: "https://i.ibb.co/L1b6xSq/shape.jpg",
  title: "Shape of You",
  authors: [
    {
      profile_picture: "https://i.ibb.co/D9wWRM6/olivia.jpg",
      profile_name: "Olivia Mitchell",
      verified: ""
    }
  ],
  others: {
    views: "100K",
    posted_date: "16278"
  },
  description: "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
}

// Display videos
const displayVideos = (videos) => {
  const videosContainer = document.getElementById('videos');
  videosContainer.innerHTML = "";
  if (videos.length === 0) {
    videosContainer.classList.remove("grid");
    videosContainer.innerHTML = `
     <div class="min-h-[300px] flex flex-col items-center justify-center gap-5">
      <img src="assets/icon.png">
      <h2 class="text-center text-2xl font-bold">
       No Content Here In This Category
      </h2>
     </div>
    `
    return
  }
  else {
    videosContainer.classList.add("grid");
  }
  videos.forEach(video => {
    console.log(video);
    const card = document.createElement('div');
    card.classList = "card card-compact";
    card.innerHTML = `
      <figure class="h-[200px] relative">
      <img
      src=${video.thumbnail}
      class="h-full w-full object-cover"
      alt="Shoes" />
      ${video.others.posted_date?.length === 0
        ? ""
        : `<span class="absolute right-2 bottom-2 text-sm text-white bg-black rounded p-1">
        ${getTimeString(video.others.posted_date)}
       </span>`
      }
      </figure>
      <div class="px-0 py-2 flex gap-2">
        <div>
         <img class="h-10 w-10 rounded-full object-cover" src=${video.authors[0].profile_picture}/>
        </div>
        <div>
         <h2 class="font-bold">${video.title}</h2>
         <div class="flex items-center gap-2">
          <p class="text-gray-400">${video.authors[0].profile_name}</P>
          ${video.authors[0].verified === true ? `<img class="w-5 object-cover" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png"/>` : ""}

         </div>
         <P><button onclick="loadDetails('${video.video_id}')" class="btn btn-sm btn-error">Details</button></P>
        </div>
      </div>
  `;
    videosContainer.append(card);
  })
}


// Search functionality
document.getElementById("search-input").addEventListener("keyup", (e)=>{
  loadVideos(e.target.value)
})

loadCategories();
loadVideos();