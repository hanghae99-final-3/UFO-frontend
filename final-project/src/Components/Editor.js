import React from "react";
import styled from "styled-components";
import mixin from "../styles/Mixin";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";

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

//파이어베이스
import { firebase } from "../firebase";

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
            file =>
                new Promise((resolve, reject) => {
                    console.log(file);
                    console.log("firebase", firebase);
                    let storageRef = firebase.storage().ref("images/");
                    let uploadTask = storageRef.child(file.name).put(file);
                    console.log(uploadTask);
                    uploadTask.on(
                        firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
                        function (snapshot) {
                            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                            var progress =
                                (snapshot.bytesTransferred /
                                    snapshot.totalBytes) *
                                100;
                            console.log("Upload is " + progress + "% done");
                            switch (snapshot.state) {
                                case firebase.storage.TaskState.PAUSED: // or 'paused'
                                    console.log("Upload is paused");
                                    break;
                                case firebase.storage.TaskState.RUNNING: // or 'running'
                                    console.log("Upload is running");
                                    break;
                            }
                        },
                        function (error) {
                            // A full list of error codes is available at
                            // https://firebase.google.com/docs/storage/web/handle-errors
                            // eslint-disable-next-line default-case
                            switch (error.code) {
                                case "storage/unauthorized":
                                    reject(
                                        " User doesn't have permission to access the object",
                                    );
                                    break;

                                case "storage/canceled":
                                    reject("User canceled the upload");
                                    break;

                                case "storage/unknown":
                                    reject(
                                        "Unknown error occurred, inspect error.serverResponse",
                                    );
                                    break;
                            }
                        },
                        function () {
                            // Upload completed successfully, now we can get the download URL
                            uploadTask.snapshot.ref
                                .getDownloadURL()
                                .then(function (downloadURL) {
                                    console.log(
                                        "File available at",
                                        downloadURL,
                                    );
                                    resolve({
                                        default: downloadURL,
                                    });
                                });
                        },
                    );
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
