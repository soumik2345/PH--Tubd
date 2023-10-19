const url = "https://openapi.programming-hero.com/api/videos";

let catId = 1000;

const category = async () => {
  const res = await fetch(`${url}/categories`);
  const data = await res.json();
  const dataName = data.data;
  // console.log(dataName);
  const categoryItem = document.getElementById("category");
  dataName.forEach((data) => {
    // console.log(data.category);
    const div = document.createElement("div");

    div.innerHTML = `
        <button onclick =" handleLoadsVideos ('${data.category_id}')" type="button" class="text-black bg-slate-200 hover:bg-red-500 
        hover:text-white px-6 py-4 rounded-lg">${data.category}</button>
      `;
    categoryItem.appendChild(div);
  });
};

//videos seection
const handleLoadsVideos = async (categoryID) => {
  catId = categoryID;
  const response = await fetch(`${url}/category/${categoryID}`);

  const data = await response.json();
  const videosItem = document.getElementById("categoryOfVideos");

  const dataName = data.data;
  videosItem.innerHTML = "";

  dataName.length !== 0
    ? dataName.forEach((data) => {
        Videos(data);
      })
    : noVideos();
};

const handleSortVideos = async () => {
  const response = await fetch(`${url}/category/${catId}`);

  const data = await response.json();
  const videosItem = document.getElementById("categoryOfVideos");

  const dataName = data.data;
  videosItem.innerHTML = "";

  dataName.sort((a, b) => {
    return parseFloat(b.others.views) - parseFloat(a.others.views);
  });

  dataName.length !== 0
    ? dataName.forEach((data) => {
        Videos(data);
      })
    : noVideos();
};

function noVideos() {
  const videosItem = document.getElementById("categoryOfVideos");
  const div = document.createElement("div");
  div.innerHTML = `<div class="">


  <img src="image/Icon.png" alt="no video">
  <h1 class="text-6xl text-gray-500 dark:text-gray-400">No Data Found!</h1>


</div>`;

  return videosItem.appendChild(div);
}

function Videos(data) {
  const div = document.createElement("div");
  let author;
  const authorsName = data.authors;
  authorsName.forEach((data) => {
    author = data;
  });
  const videosItem = document.getElementById("categoryOfVideos");
  div.innerHTML = `
    <div class="card  bg-base-100 shadow-xl ">
     <div class="relative">
 <figure class="rounded-lg"><img class="w-[312px] h-52" src="${
   data.thumbnail
 }"></figure>
 <div class="bg-black text-white  absolute -mt-10 ml-40 text-center rounded-md ">

 
 ${
   data.others.posted_date
     ? `${durationToTime(data.others.posted_date)} ago`
     : ""
 } 
 </div>
</div>

    <div class="card-body">
    <div class="flex space-x-4 items-center justify-center">
       <img class="h-10 w-10 rounded-full" src="${
         author?.profile_picture
       }" alt="">
       <p class="font-bold text-xs">${data.title}</p>
   </div>
  <div class="space-y-4 ml-14">

    <p class="text-xs font-normal">${author.profile_name} ${author.verified}</p>
    <p class="text-xs font-normal">${
      data.others.views
    } <span class="text-xs font-normal">views</span></p>
  </div>
 </div>
    </div>
  
 `;

  return videosItem.appendChild(div);
}

// time convart

function durationToTime(seconds) {
  seconds = Number(seconds);
  var d = Math.floor(seconds / (3600 * 24));
  var h = Math.floor((seconds % (3600 * 24)) / 3600);
  var m = Math.floor((seconds % 3600) / 60);

  var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
  var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " min, " : " mins, ") : "";

  return dDisplay + hDisplay + mDisplay;
}

handleLoadsVideos(catId);

category();
