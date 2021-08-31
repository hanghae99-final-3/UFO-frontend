import React from "react";
import styled from "styled-components";
import mixin from "../../Styles/Mixin";
import theme from "../../Styles/theme";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import axios from "axios";
import Swal from "sweetalert2";

//플러그인
import Heading from "@ckeditor/ckeditor5-heading/src/heading";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold.js";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic.js";
import Strikethrough from "@ckeditor/ckeditor5-basic-styles/src/strikethrough.js";
import Underline from "@ckeditor/ckeditor5-basic-styles/src/underline.js";
import FontColor from "@ckeditor/ckeditor5-font/src/fontcolor.js";
import FontBackgroundColor from "@ckeditor/ckeditor5-font/src/fontbackgroundcolor";
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials.js"; //undo
import BlockQuote from "@ckeditor/ckeditor5-block-quote/src/blockquote.js";
import PasteFromOffice from "@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice";

import Image from "@ckeditor/ckeditor5-image/src/image";
import ImageUpload from "@ckeditor/ckeditor5-image/src/imageupload";
import ImageResize from "@ckeditor/ckeditor5-image/src/imageresize";

/**
 * @author jiyeong
 * @param  getContentFromEditor:부모컴포넌트로 content 값을 올려보내주는 함수, originContent:원본content값
 * @returns CK에디터
 * @역할 CK에디터를 렌더링하여 작성, 수정을 가능케 함. 유저가 이미지를 업로드하면 firebase storage에 업로드하고, 그 url을 서버에게 반환.
 * @필수값 getContentFromEditor, originContent, firebase
 */

class MyUploadAdapter {
    constructor(loader) {
        this.loader = loader;
    }
    // Starts the upload process.
    upload() {
        return this.loader.file.then(
            // file은 파일객체이다.
            file =>
                new Promise((resolve, reject) => {
                    //----사용할 데이터를 정리하고, 서버에 데이터(이미지 객체)를 전달하고 url을 얻어서 post에 저장한다.
                    const req = { img: file };

                    //multer를 사용하려면 formData 안에 request들을 넣어주어야 한다
                    let formData = new FormData();
                    for (let entry of Object.entries(req)) {
                        formData.append(entry[0], entry[1]);
                    }

                    //통신헤더설정
                    const config = {
                        header: { "content-type": "multipart/form-data" },
                    };

                    async function sendImg() {
                        //서버에 파일 객체를 보내서 imgUrl을 얻어온다.
                        try {
                            const response = await axios.post(
                                "https://yzkim9501.site/util/image",
                                formData,
                                config,
                            );
                            if (response.data.ok) {
                                const downloadURL = `https://yzkim9501.site/${response.data.result}`;
                                resolve({
                                    default: downloadURL,
                                });
                            }
                        } catch (err) {
                            Swal.fire(
                                "에러",
                                "이미지를 등록할 수 없습니다. 다시 시도해주세요!",
                                "error",
                            );
                        }
                    }
                    sendImg();
                }),
        );
    }
}

const editorConfiguration = {
    language: "ko",
    plugins: [
        Heading,
        Paragraph,
        Bold,
        Italic,
        Strikethrough,
        Underline,
        FontColor,
        FontBackgroundColor,

        BlockQuote,
        PasteFromOffice,
        Essentials,
        Image,
        ImageUpload,
        ImageResize,
    ],
    toolbar: {
        items: [
            "heading",
            "|",
            "fontColor",
            "fontBackgroundColor",
            "|",
            "bold",
            "italic",
            "strikethrough",
            "underline",
            "|",
            "blockQuote",
            "imageUpload",
            "|",
            "undo",
            "redo",
        ],
    },
    heading: {
        options: [
            {
                model: "paragraph",
                title: "Paragraph",
                class: "ck-heading_paragraph",
            },
            {
                model: "heading1",
                view: "h1",
                title: "Heading 1",
                class: "ck-heading_heading1",
            },
            {
                model: "heading2",
                view: "h2",
                title: "Heading 2",
                class: "ck-heading_heading2",
            },
        ],
    },

    image: {
        resizeUnit: "px",
        type: ["JPEG", "JPG", "GIF", "PNG"],
    },
};

const Editor = ({ getContentFromEditor, originContent, isDarkTheme }) => {
    //수정모드
    if (originContent)
        return (
            <StyledEditor isDarkTheme={isDarkTheme}>
                <CKEditor
                    editor={ClassicEditor}
                    config={editorConfiguration}
                    data={originContent}
                    onChange={(event, editor) => {
                        if (editor.getData()) {
                            //입력값이 있으면
                            const data = editor.getData();
                            getContentFromEditor(data);
                        } else {
                            //입력값이 없으면(""이면)
                            getContentFromEditor({}); //CKEditor는 값이 없으면 객체로 처리해야되는 것 같음.
                        }
                    }}
                    onReady={editor => {
                        if (editor?.plugins) {
                            editor.plugins.get(
                                "FileRepository",
                            ).createUploadAdapter = loader => {
                                return new MyUploadAdapter(loader);
                            };
                        }
                    }}
                />
            </StyledEditor>
        );

    return (
        //작성모드
        <StyledEditor isDarkTheme={isDarkTheme}>
            <CKEditor
                editor={ClassicEditor}
                config={editorConfiguration}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    getContentFromEditor(data);
                }}
                onReady={editor => {
                    if (editor?.plugins) {
                        editor.plugins.get(
                            "FileRepository",
                        ).createUploadAdapter = loader => {
                            return new MyUploadAdapter(loader);
                        };
                    }
                }}
            />
        </StyledEditor>
    );
};

const StyledEditor = styled.div`
    ${props =>
        mixin.outline(
            "1px solid",
            props.isDarkTheme ? "black" : "gray4",
            "bottom",
        )};

    /* 스티키툴바 스타일링 */
    .ck-sticky-panel__content.ck-sticky-panel__content_sticky {
        top: 28px;
        height: 50px;
        background: ${({ theme }) => theme.color.mainBlue};
        @media ${({ theme }) => theme.mobile} {
            height: 48px;
            top: 0;
        }
    }

    /* 툴바 스타일링 */
    .ck.ck-toolbar.ck-toolbar_grouping {
        position: relative; //툴바를 기준으로 드롭다운이 재정렬 되기 위해 설정하였습니다.
        border: none;
        background-color: ${props =>
            props.isDarkTheme
                ? props.theme.color.black
                : props.theme.color.white};
        z-index: 0 !important;

        /* 툴바 버튼스타일 */
        .ck-button {
            color: ${props =>
                props.isDarkTheme
                    ? props.theme.color.gray2
                    : props.theme.color.gray1};
            cursor: pointer;
            :hover {
                background: ${props =>
                    props.isDarkTheme && props.theme.color.black};
                color: ${props =>
                    props.isDarkTheme && props.theme.color.mainGray};
            }
        }

        /* 드롭다운툴바 버튼 스타일링 */
        .ck-dropdown {
            position: static; //ck는 버튼을 기준으로 드롭다운이 되고있어서, 제거해주었음!
            .ck-dropdown__button {
                background: ${props =>
                    props.isDarkTheme
                        ? props.theme.color.black
                        : props.theme.color.white};
                .ck-dropdown__arrow {
                    transition: all 0.5s ease;
                }
                &.ck-on {
                    .ck-dropdown__arrow {
                        color: ${({ theme }) => theme.color.mainMint};
                    }
                }
            }
        }

        .ck-heading-dropdown {
            .ck-list {
                //헤딩 드롭다운 스타일지정
                padding: ${theme.calRem(20)} 0;
                border-radius: 0 20px 20px 20px;
                background: ${({ theme }) => theme.color.mainBlue};
                @media ${({ theme }) => theme.mobile} {
                    padding: ${theme.calRem(16)} 0;
                }

                .ck-list__item {
                    .ck-button {
                        background: transparent;
                        .ck-button__label {
                            color: ${({ theme }) => theme.color.blue3};
                            line-height: 1;
                        }
                        &.ck-on {
                            .ck-button__label {
                                color: ${({ theme }) => theme.color.mainMint};
                            }
                        }
                    }

                    //헤딩 폰트사이즈 설정
                    .ck-heading_paragraph {
                        ${mixin.textProps(20, "regular", "blue3")}
                        @media ${({ theme }) => theme.mobile} {
                            ${mixin.textProps(16, "regular", "blue3")}
                        }
                    }
                    .ck-heading_heading1 {
                        ${mixin.textProps(40, "semiBold", "blue3")}
                        @media ${({ theme }) => theme.mobile} {
                            ${mixin.textProps(28, "semiBold", "blue3")}
                        }
                    }
                    .ck-heading_heading2 {
                        ${mixin.textProps(30, "semiBold", "blue3")}
                        @media ${({ theme }) => theme.mobile} {
                            ${mixin.textProps(22, "semiBold", "blue3")}
                        }
                    }
                }
            }
        }

        //드롭다운박스 설정
        .ck-dropdown__panel {
            border-radius: 0 20px 20px 20px;
            transition: all 0.5s ease;
            min-width: auto;
            left: 0;
            transform: translateX(0);
            border: none;
            ${props =>
                props.isDarkTheme && `background:${props.theme.color.black};`};
            //이클립스 툴바 설정
            .ck-toolbar {
                border-radius: 0 20px 20px 20px;
                background: transparent;
                .ck-toolbar__items {
                    border-radius: 0 20px 20px 20px;
                    background: transparent;
                }
            }
        }

        //컬러드롭다운박스 설정
        .ck-color-grid {
            display: flex;
            flex-wrap: wrap;
            ${props => props.isDarkTheme && props.theme.color.black};
        }
    }

    /* 콘텐츠 안쪽영역 스타일링 */
    .ck-content {
        min-height: ${theme.calRem(530)};
        padding: ${theme.calRem(30)} ${theme.calRem(10)};
        border: none;
        ${props =>
            props.isDarkTheme &&
            `background:${props.theme.color.black} !important;`};
        transition: all 0.7s ease;
        @media ${({ theme }) => theme.mobile} {
            min-height: ${theme.calRem(414)};
            padding: ${theme.calRem(24)} ${theme.calRem(10)};
        }

        //에디터 글쓰는 란이 포커싱되면 위의 플러그인툴바가 스티키되기때문에, 콘텐츠 란의 padding을 조정한다!
        &.ck-focused {
            @media ${({ theme }) => theme.mobile} {
                padding: ${theme.calRem(40)} ${theme.calRem(10)};
            }
        }
    }

    .ck-sticky-panel__content_sticky {
        .ck-content {
        }
    }

    /* 콘텐츠 바깥영역 스타일링 */
    .ck-content.ck-editor__editable.ck-rounded-corners.ck-editor__editable_inline.ck-focused {
        border: none;
        box-shadow: none;
    }
`;

Editor.defaultProps = {
    getContentFromEditor: () => {},
    originContent: null,
};

export default Editor;
