const products = [
    { id: 1, name: '노트북', price: 1200000, category: '전자기기', description: '온라인 수업과 개발 실습에 사용할 수 있는 노트북이다.' },
    { id: 2, name: '무선 마우스', price: 35000, category: '전자기기', description: '휴대하기 좋은 무선 마우스이다.' },
    { id: 3, name: '기계식 키보드', price: 89000, category: '전자기기', description: '타건감이 좋은 키보드이다.' },
    { id: 4, name: '텀블러', price: 18000, category: '생활용품', description: '따뜻한 음료와 차가운 음료를 담을 수 있다.' },
    { id: 5, name: '노트', price: 3000, category: '문구', description: '수업 내용을 정리하기 좋은 노트이다.' },
    { id: 6, name: '볼펜 세트', price: 5000, category: '문구', description: '여러 색상의 볼펜으로 구성된 세트이다.' }
];

const keywordInput = document.querySelector('#keywordInput');
const categorySelect = document.querySelector('#categorySelect');
const searchButton = document.querySelector('#searchButton');
const resetButton = document.querySelector('#resetButton');
const resultCount = document.querySelector('#resultCount');
const productList = document.querySelector('#productList');

function formatPrice(price) {
    // toLocaleString()은 숫자를 지역 형식에 맞는 문자열로 변환한다.
    return price.toLocaleString('ko-KR') + '원';
}

function createProductCard(product) {
    const card = document.createElement('article');
    card.classList.add('product-card');

    // TODO 1.
    // product 정보를 사용해 card.innerHTML을 완성한다.
    // 출력할 내용:
    // - 상품명
    // - 카테고리
    // - 가격: formatPrice(product.price) 사용
    // - 설명
    card.innerHTML = `
        <h2>${product.name}</h2>
        <p>카테고리: ${product.category}</p>
        <p>가격: ${formatPrice(product.price)}</p>
        <p>${product.description}</p>
    `;

    return card;
}

function renderProducts(productArray) {
    // 이전 검색 결과를 지우고 다시 그린다.
    productList.innerHTML = '';
    resultCount.textContent = `검색 결과: ${productArray.length}개`;

    if (productArray.length === 0) {
        productList.innerHTML = '<p class="empty-message">조건에 맞는 상품이 없다.</p>';
        return;
    }

    for (const product of productArray) {
        const card = createProductCard(product);
        productList.append(card);
    }
}

function searchProducts() {
    const keyword = keywordInput.value.trim().toLowerCase();
    const category = categorySelect.value;

    // TODO 2.
    // filter()를 사용해 검색어와 카테고리 조건을 모두 만족하는 상품만 남긴다.
    // 검색어 조건:
    // - 상품명에 keyword가 포함되어 있는가?
    //
    // 카테고리 조건:
    // - category가 'all'이면 전체 상품을 허용한다.
    // - 그렇지 않으면 product.category와 category가 같은 상품만 허용한다.
    const filteredProducts = products.filter(product => {
        const isKeywordMatched = product.name.toLowerCase().includes(keyword);
        const isCategoryMatched = category === 'all' || product.category === category;

        return isKeywordMatched && isCategoryMatched;
    });

    renderProducts(filteredProducts);
}

function resetSearch() {
    keywordInput.value = '';
    categorySelect.value = 'all';
    renderProducts(products);
    keywordInput.focus();
}

// TODO 3.
// 아래 기능이 동작하도록 이벤트를 등록한다.
// - 검색 버튼 클릭 시 searchProducts 실행
// - 초기화 버튼 클릭 시 resetSearch 실행
// - 검색어 입력창에서 Enter 키를 누르면 searchProducts 실행
// - 카테고리를 변경하면 searchProducts 실행
searchButton.addEventListener('click', searchProducts);
resetButton.addEventListener('click', resetSearch);

keywordInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        searchProducts();
    }
});

categorySelect.addEventListener('change', searchProducts);

renderProducts(products);