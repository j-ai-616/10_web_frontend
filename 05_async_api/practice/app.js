const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

const loadPostsButton = document.querySelector('#loadPostsButton');
const statusMessage = document.querySelector('#statusMessage');
const postList = document.querySelector('#postList');
const postDetail = document.querySelector('#postDetail');
const commentList = document.querySelector('#commentList');
const postForm = document.querySelector('#postForm');
const titleInput = document.querySelector('#titleInput');
const bodyInput = document.querySelector('#bodyInput');
const submitResult = document.querySelector('#submitResult');

function setStatus(message, type = '') {
    statusMessage.textContent = message;
    statusMessage.className = 'status-message';

    if (type !== '') {
        statusMessage.classList.add(type);
    }
}

function createPostCard(post) {
    const card = document.createElement('article');
    card.classList.add('post-card');
    card.dataset.postId = post.id;

    card.innerHTML = `
        <h3>${post.id}. ${post.title}</h3>
        <p>${post.body}</p>
    `;

    card.addEventListener('click', () => {
        renderPostDetail(post);
        loadComments(post.id);
    });

    return card;
}

async function fetchPosts() {
    // TODO 1.
    // fetch를 사용해 게시글 목록을 요청한다.
    // 확인할 내용:
    // - await fetch(`${API_BASE_URL}/posts`)
    // - response.ok가 false이면 에러 발생
    // - await response.json()으로 JSON 문자열을 JavaScript 값으로 변환
    // - 화면이 너무 길어지지 않도록 일부 데이터만 사용
    try {
        setStatus('게시글 목록을 불러오는 중이다.');
        postList.innerHTML = '<p class="empty-box">게시글 목록을 불러오는 중이다.</p>';

        const response = await fetch(`${API_BASE_URL}/posts`);

        if (!response.ok) {
            throw new Error('게시글 목록 요청에 실패했다.');
        }

        const posts = await response.json();
        const slicedPosts = posts.slice(0, 10);

        renderPosts(slicedPosts);
        setStatus(`게시글 ${slicedPosts.length}개를 불러왔다.`, 'success');
    } catch (error) {
        postList.innerHTML = '<p class="empty-box">게시글 목록을 불러오지 못했다.</p>';
        setStatus(error.message, 'error');
    }
}

function renderPosts(posts) {
    // TODO 2.
    // 게시글 배열을 화면에 렌더링한다.
    // 확인할 내용:
    // - 기존 목록 비우기
    // - posts 배열을 반복하면서 createPostCard(post) 호출
    // - 생성된 카드를 postList에 추가
    postList.innerHTML = '';

    if (posts.length === 0) {
        postList.innerHTML = '<p class="empty-box">표시할 게시글이 없다.</p>';
        return;
    }

    for (const post of posts) {
        const card = createPostCard(post);
        postList.append(card);
    }
}

function renderPostDetail(post) {
    postDetail.classList.remove('empty-box');
    postDetail.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
    `;
}

async function loadComments(postId) {
    // TODO 3.
    // axios.get()과 params 옵션을 사용해 선택한 게시글의 댓글을 요청한다.
    // 확인할 내용:
    // - axios는 응답 데이터가 response.data에 들어 있다.
    // - params 옵션은 query string을 객체 형태로 전달할 수 있게 해준다.
    try {
        commentList.innerHTML = '<li class="empty-box">댓글을 불러오는 중이다.</li>';

        const response = await axios.get(`${API_BASE_URL}/comments`, {
            params: {
                postId: postId
            }
        });

        renderComments(response.data);
    } catch (error) {
        commentList.innerHTML = '<li class="empty-box">댓글을 불러오지 못했다.</li>';
        setStatus('댓글 목록 요청에 실패했다.', 'error');
    }
}

function renderComments(comments) {
    commentList.innerHTML = '';

    if (comments.length === 0) {
        commentList.innerHTML = '<li class="empty-box">표시할 댓글이 없다.</li>';
        return;
    }

    for (const comment of comments) {
        const item = document.createElement('li');
        item.classList.add('comment-item');

        item.innerHTML = `
            <strong>${comment.name}</strong>
            <span>${comment.email}</span>
            <p>${comment.body}</p>
        `;

        commentList.append(item);
    }
}

async function createPost(event) {
    event.preventDefault();

    const title = titleInput.value.trim();
    const body = bodyInput.value.trim();

    if (title === '' || body === '') {
        submitResult.textContent = '제목과 내용을 모두 입력해야 한다.';
        titleInput.focus();
        return;
    }

    // TODO 4.
    // axios.post()를 사용해 새 게시글 작성 요청을 보낸다.
    // 확인할 내용:
    // - 두 번째 인자로 요청 본문 데이터를 전달한다.
    // - 성공 응답 데이터는 response.data로 확인한다.
    // - JSONPlaceholder는 실제 저장은 하지 않고 성공 응답만 반환한다.
    try {
        submitResult.textContent = '작성 요청을 보내는 중이다.';

        const response = await axios.post(`${API_BASE_URL}/posts`, {
            title: title,
            body: body,
            userId: 1
        });

        submitResult.textContent = JSON.stringify(response.data, null, 2);
        postForm.reset();
        titleInput.focus();
    } catch (error) {
        submitResult.textContent = '게시글 작성 요청에 실패했다.';
    }
}

// TODO 5.
// 아래 기능이 동작하도록 이벤트를 등록한다.
// - 게시글 불러오기 버튼 클릭 시 fetchPosts 실행
// - 게시글 작성 form submit 시 createPost 실행
loadPostsButton.addEventListener('click', fetchPosts);
postForm.addEventListener('submit', createPost);