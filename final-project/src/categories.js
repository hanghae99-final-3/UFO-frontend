/**
 * @역할 카테고리에 사용할 목록
 */

const country = [
    { countryId: 1, countryName: "베트남" },
    { countryId: 2, countryName: "호주" },
    { countryId: 3, countryName: "미국" },
    { countryId: 4, countryName: "캐나다" },
    { countryId: 5, countryName: "영국" },
];
const freeCategory = [
    { categoryId: "0", categoryName: "질문" },
    { categoryId: 1, categoryName: "정보" },
    { categoryId: 2, categoryName: "주거" },
    { categoryId: 3, categoryName: "취업" },
    { categoryId: 4, categoryName: "연애" },
    { categoryId: 5, categoryName: "게임" },
    { categoryId: 6, categoryName: "유머" },
    { categoryId: 7, categoryName: "코로나" },
    { categoryId: 8, categoryName: "장터" },
    { categoryId: 9, categoryName: "취미" },
    { categoryId: 10, categoryName: "기타" },
];
const freeCategoryForMainPage = [
    { categoryId: 0, categoryName: "질문" },
    { categoryId: 1, categoryName: "정보" },
    { categoryId: 2, categoryName: "주거" },
    { categoryId: 3, categoryName: "취업" },
    { categoryId: 4, categoryName: "연애" },
    { categoryId: 5, categoryName: "게임" },
    { categoryId: 6, categoryName: "유머" },
    { categoryId: 7, categoryName: "코로나" },
    { categoryId: 8, categoryName: "장터" },
    { categoryId: 9, categoryName: "취미" },
    { categoryId: 10, categoryName: "기타" },
];

const freeBoardTags = [
    "질문",
    "정보",
    "주거",
    "취업",
    "연애",
    "게임",
    "유머",
    "코로나",
    "장터",
    "취미",
    "기타",
];
const uniBoardTags = ["수업", "맛집", "스터디", "알바", "익명", "기타"];

//카테고리를 작성하시고, 아래의 중괄호 안에 넣어주어야 사용할 수 있어요!
const categories = {
    country,
    freeCategory,
    freeCategoryForMainPage,
    freeBoardTags,
    uniBoardTags,
};

export default categories;
