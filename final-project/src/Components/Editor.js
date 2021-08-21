import React, { useState } from "react";
import styled from "styled-components";
import mixin from "../styles/Mixin";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import axios from "axios";
import Swal from "sweetalert2";

//플러그인
import Heading from "@ckeditor/ckeditor5-heading/src/heading.js";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph.js";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold.js";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic.js";
import Strikethrough from "@ckeditor/ckeditor5-basic-styles/src/strikethrough.js";
import Underline from "@ckeditor/ckeditor5-basic-styles/src/underline.js";

import FontColor from "@ckeditor/ckeditor5-font/src/fontcolor.js";
import FontBackgroundColor from "@ckeditor/ckeditor5-font/src/fontbackgroundcolor";

import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials.js"; //undo

import BlockQuote from "@ckeditor/ckeditor5-block-quote/src/blockquote.js";
import Link from "@ckeditor/ckeditor5-link/src/link.js";
import PasteFromOffice from "@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice";
import Image from "@ckeditor/ckeditor5-image/src/image";
import ImageUpload from "@ckeditor/ckeditor5-image/src/imageupload";

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
        BlockQuote,
        Bold,
        Essentials,
        FontColor,
        FontBackgroundColor,
        Heading,
        Image,
        ImageUpload,
        Italic,
        Link,
        Paragraph,
        PasteFromOffice,
        Strikethrough,
        Underline,
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
        "link",
        "blockQuote",
        "imageUpload",
        "|",
        "undo",
        "redo",
    ],

    image: {
        resizeUnit: "px",
        type: ["JPEG", "JPG", "GIF", "PNG"],
    },

    placeholder: "글을 입력해보세요!",
};

const Editor = ({ getContentFromEditor, originContent }) => {
    const [isLoading, setIsloading] = useState(false);
    console.log(isLoading);
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

    .ck.ck-toolbar.ck-toolbar_grouping {
        padding: 10px;
        border: none;
        background-color: ${({ theme }) => theme.color.white};
        ${mixin.outline("1px solid", "gray3", "bottom")};
    }
    .ck-content {
        min-height: 500px;
        padding: 30px;
        border: none;
        ${mixin.outline("1px solid", "gray3", "bottom")};
        transition: all 0.7s ease;
    }
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
