/**
 * @역할 카테고리에 사용할 목록
 */

import ausFlag from "../Assets/ausFlag.svg";
import vietFlag from "../Assets/vietFlag.svg";
import usFlag from "../Assets/usFlag.svg";
import canFlag from "../Assets/canFlag.svg";
import ukFlag from "../Assets/ukFlag.svg";

const country = [
    { countryId: 1, countryName: "베트남" },
    { countryId: 2, countryName: "호주" },
    { countryId: 3, countryName: "미국" },
    { countryId: 4, countryName: "캐나다" },
    { countryId: 5, countryName: "영국" },
];

const countrySelectorList = [
    // { id: 0, name: "전체", icon: "🌍" },
    // { id: 3, name: "미국", icon: "🍔" },
    // { id: 5, name: "영국", icon: "🍟" },
    // { id: 2, name: "호주", icon: "🍕" },
    // { id: 1, name: "베트남", icon: "🌭" },
    // { id: 4, name: "캐나다", icon: "🌮" },
    { id: 0, name: "전체", icon: "🌍", engName: "All" },
    { id: 3, name: "미국", icon: "🍔", engName: "the United States" },
    { id: 5, name: "영국", icon: "🍟", engName: "the United Kingdom" },
    { id: 2, name: "호주", icon: "🍕", engName: "Australia" },
    { id: 1, name: "베트남", icon: "🌭", engName: "Vietnam" },
    { id: 4, name: "캐나다", icon: "🌮", engName: "Canada" },
];

const countrySelectorFlagList = [
    { id: 1, name: "베트남", icon: vietFlag },
    { id: 2, name: "호주", icon: ausFlag },
    { id: 3, name: "미국", icon: usFlag },
    { id: 4, name: "캐나다", icon: canFlag },
    { id: 5, name: "영국", icon: ukFlag },
];

const freeCategory = [
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

const univCategory = [
    { categoryId: 0, categoryName: "수업" },
    { categoryId: 1, categoryName: "맛집" },
    { categoryId: 2, categoryName: "스터디" },
    { categoryId: 3, categoryName: "알바" },
    { categoryId: 4, categoryName: "익명" },
    { categoryId: 5, categoryName: "기타" },
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
const univBoardTags = ["수업", "맛집", "스터디", "알바", "익명", "기타"];

const supportList = [
    {
        countryName: "미국",
        list: [
            "New York University",
            "University Of Illinois at Urbana Champaign",
            "University of California, Berkeley",
            "University of Southern California",
            "Columbia University in the City of New York",
            "University of California, Los Angeles",
            "Cornell University",
            "Carnegie Mellon University",
            "University of Pennsylvania",
            "University of Michigan",
            "Duke University",
        ],
    },
    {
        countryName: "호주",
        list: [
            "University of Sydney",
            "University of New South Wales",
            "University of Melbourne",
            "University of Queensland",
            "Queensland University of Technology",
        ],
    },
    {
        countryName: "영국",
        list: [
            "University College London",
            "University of London",
            "University of the Arts London",
            "University of Leeds",
            "King's College London KCL",
        ],
    },
    {
        countryName: "베트남",
        list: [
            "Vietnam National University - Hanoi",
            "Ton Duc Thang University",
            "University of Social Sciences and Humanities Vietnam National University Ho Chi Minh City",
            "Ho Chi Minh City University of Education",
            "RMIT University Vietnam",
        ],
    },
    {
        countryName: "캐나다",
        list: [
            "Waterloo University",
            "University of Toronto",
            "Mcgill University",
            "British Columbia University",
            "University of Alberta",
        ],
    },
];

//카테고리를 작성하시고, 아래의 중괄호 안에 넣어주어야 사용할 수 있어요!
const categories = {
    country,
    freeCategory,
    freeBoardTags,
    univBoardTags,
    univCategory,
    supportList,
    countrySelectorList,
    countrySelectorFlagList,
};

export default categories;
