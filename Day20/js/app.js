import { client } from "./client.js";

const postsEl = document.querySelector(".posts");
let order = "desc";
let sort = "id";
let keyword = "";
const postsPerPage = 2;
let currentPage = 1;
let isLoading = false;
const loadDelay = 3000; // 1-second delay between loads

// Ngẵn chặn lỗi XSS
const stripHtml = (html) => {
  return html.replace(/(<([^>]+)>)/gi, "");
};

const render = (posts) => {
  const postHtml = posts
    .map(
      ({
        title,
        img,
        image,
        category,
        content1,
        content2,
        content3,
        content4,
        content5,
        content6,
        content7,
        dogImage,
      }) => `
    <a> <img src="${stripHtml(
      img
    )}" alt="#" class="rounded-circle" style="width: 34px; height: 34px" /></a>
    <span class="text-white" style="font-size: 24px">Hoàn An</span>
    <div style="display: flex; row-gap: 10px; column-gap: 10px">
        <a href="#" class="text-success border border-success p-1 rounded text-decoration-none mt-2"># popular</a>
        <a href="#" class="text-success border border-success p-1 rounded text-decoration-none mt-2"> # trending</a>
    </div>
    <div>
    <h2 style="color: white" class="mt-3">${stripHtml(title)}</h2>
    <figure class="image align-center mt-5px" contenteditable="false">
          <img src="${stripHtml(image)}"/>
          <figcaption> <p class="text-white"> Tổng thống Volodymyr Zelensky (Ảnh: Reuters).</p> </figcaption>
     </figure>
    <p class="text-white">${stripHtml(content1)}</p>
    <p class="text-white">${stripHtml(content2)}</p>
    <p class="text-white">${stripHtml(content3)}</p>
    <p class="text-white">${stripHtml(content4)}</p>
    <p class="text-white">${stripHtml(content5)}</p>
    <p class="text-white">${stripHtml(content6)}</p>
    <p class="text-white">${stripHtml(content7)}</p>
    </div>
    <img src="${dogImage}"/>
    <p class="text-white">Category: ${category}</p>
    <hr style="background-color: white; height: 4px;">
  `
    )
    .join("");
  postsEl.innerHTML += `<section>${postHtml}</section>`;
};

const getPosts = async (page, limit, query = {}) => {
  const queryParams = {
    ...query,
    _sort: sort,
    _order: order,
    _page: page,
    _limit: limit,
  };
  const queryString = new URLSearchParams(queryParams).toString(); // Return a string
  // Sử dụng try catch để xử lỗi trong quá trình lấy bài viết
  try {
    const { data: posts } = await client.get("/posts?" + queryString);
    render(posts);
  } catch (error) {
    console.log("Error fetching posts:", error);
  }
};

// Ẩn hiện loadding
const showLoadingMessage = () => {
  document.getElementById("loading-message").style.display = "block";
};
const hideLoadingMessage = () => {
  document.getElementById("loading-message").style.display = "none";
};

const loadMorePosts = async () => {
  if (isLoading) {
    return;
  }
  isLoading = true;
  // Hiện thông báo
  showLoadingMessage();
  currentPage++; // Mỗi lần loadd trang tăng lên 1 page
  await getPosts(currentPage, postsPerPage);
  // Ẩn thông báo
  hideLoadingMessage();
  setTimeout(() => {
    isLoading = false;
  }, loadDelay);
};

// Xây dựng tính năng scroll bar
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 200 &&
    !isLoading
  ) {
    loadMorePosts();
  }
});
getPosts(currentPage, postsPerPage);
