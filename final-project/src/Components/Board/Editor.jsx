import React from "react";
import styled from "styled-components";
import mixin from "../../Styles/Mixin";

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
                                "http://3.36.90.60/util/image",
                                formData,
                                config,
                            );
                            if (response.data.ok) {
                                const downloadURL = `http://3.36.90.60/${response.data.result}`;
                                resolve({
                                    default: downloadURL,
                                });
                            }
                        } catch (err) {
                            Swal.fire(
                                "에러",
                                "이미지를 등록할 수 없습니다.",
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
    extraPlgins: [],
    toolbar: [
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

    placeholder: "글을 입력해보세요!",
};

const Editor = ({ getContentFromEditor, originContent }) => {
    //수정모드
    if (originContent)
        return (
            <StyledEditor>
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
        <StyledEditor>
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
    min-height: 100px;

    /* 툴바 스타일링 */
    .ck.ck-toolbar.ck-toolbar_grouping {
        padding: 10px;
        border: none;
        background-color: ${({ theme }) => theme.color.white};

        /* 툴바 버튼스타일 */
        .ck-button {
            ${mixin.textProps(18, "regular", "gray1")}
            cursor: pointer;
        }

        /* 툴바 폰트조절 셀렉터 스타일링 */
        .ck-dropdown__button {
            background: white;
            .ck-dropdown__arrow {
                transition: all 0.5s ease;
            }
            &.ck-on {
                .ck-dropdown__arrow {
                    color: ${({ theme }) => theme.color.mainMint};
                }
            }
        }

        .ck-dropdown__panel {
            border-radius: 0 20px 20px 20px;
            transition: all 0.5s ease;

            .ck-list {
                padding: 20px 0;
                border-radius: 0 20px 20px 20px;
                background: ${({ theme }) => theme.color.mainBlue};
                .ck-list__item {
                    :not(:last-child) {
                        padding-bottom: 10px;
                        height: max-content;
                    }
                    .ck-button {
                        background: transparent;
                        .ck-button__label {
                            color: ${({ theme }) => theme.color.mainGray};
                            line-height: 1;
                        }
                        &.ck-on {
                            .ck-button__label {
                                color: ${({ theme }) => theme.color.mainMint};
                            }
                        }
                    }
                    .ck-heading_paragraph {
                        ${mixin.textProps(20, "regular", "gray1")}
                    }
                    .ck-heading_heading1 {
                        ${mixin.textProps(40, "semiBold", "gray1")}
                    }
                    .ck-heading_heading2 {
                        ${mixin.textProps(30, "semiBold", "gray1")}
                    }
                }
            }
        }

        ${mixin.outline("1px solid", "gray4", "bottom")};
    }

    /* 콘텐츠 안쪽영역 스타일링 */
    .ck-content {
        min-height: 530px;
        padding: 30px 0;
        border: none;
        ${mixin.outline("1px solid", "gray3", "bottom")};
        transition: all 0.7s ease;
    }

    /* 콘텐츠 바깥영역 스타일링 */
    .ck-content.ck-editor__editable.ck-rounded-corners.ck-editor__editable_inline.ck-focused {
        border: none;
        ${mixin.outline("1px solid", "gray3", "bottom")};
        /* box-shadow : 오른쪽 위쪽 블러 분사 */
        box-shadow: inset 0px -15px 8px -6px #ededed;
    }
`;

Editor.defaultProps = {
    getContentFromEditor: () => {},
    originContent: null,
};

export default Editor;
