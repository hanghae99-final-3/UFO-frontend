import React, { useState } from "react";
import styled from "styled-components";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";

//플러그인
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import Underline from "@ckeditor/ckeditor5-basic-styles/src/underline";
import Strikethrough from "@ckeditor/ckeditor5-basic-styles/src/strikethrough";
import BlockQuote from "@ckeditor/ckeditor5-block-quote/src/blockquote";
import Link from "@ckeditor/ckeditor5-link/src/link";
import PasteFromOffice from "@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice";
import Heading from "@ckeditor/ckeditor5-heading/src/heading";
import Font from "@ckeditor/ckeditor5-font/src/font";
import Image from "@ckeditor/ckeditor5-image/src/image";
import ImageStyle from "@ckeditor/ckeditor5-image/src/imagestyle";
import ImageToolbar from "@ckeditor/ckeditor5-image/src/imagetoolbar";
import ImageUpload from "@ckeditor/ckeditor5-image/src/imageupload";
import ImageResize from "@ckeditor/ckeditor5-image/src/imageresize";
import List from "@ckeditor/ckeditor5-list/src/list";
import Alignment from "@ckeditor/ckeditor5-alignment/src/alignment";
import Table from "@ckeditor/ckeditor5-table/src/table";
import TableToolbar from "@ckeditor/ckeditor5-table/src/tabletoolbar";
import TextTransformation from "@ckeditor/ckeditor5-typing/src/texttransformation";
import Indent from "@ckeditor/ckeditor5-indent/src/indent";
import IndentBlock from "@ckeditor/ckeditor5-indent/src/indentblock";
import TableProperties from "@ckeditor/ckeditor5-table/src/tableproperties";
import TableCellProperties from "@ckeditor/ckeditor5-table/src/tablecellproperties";
import Base64UploadAdapter from "@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter";

//파이어베이스
import { firebase } from "../firebase";

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
        Essentials,
        Paragraph,
        Bold,
        Italic,
        Heading,
        Indent,
        IndentBlock,
        Underline,
        Strikethrough,
        BlockQuote,
        Font,
        Alignment,
        List,
        Link,
        PasteFromOffice,
        Image,
        ImageStyle,
        ImageToolbar,
        ImageUpload,
        ImageResize,
        Base64UploadAdapter,
        Table,
        TableToolbar,
        TableProperties,
        TableCellProperties,
        TextTransformation,
    ],
    extraPlgins: [],
    toolbar: [
        "heading",
        "|",
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "|",
        "fontSize",
        "fontColor",
        "fontBackgroundColor",
        "|",
        "alignment",
        "outdent",
        "indent",
        "bulletedList",
        "numberedList",
        "blockQuote",
        "|",
        "link",
        "insertTable",
        "imageUpload",
        "|",
        "undo",
        "redo",
    ],
    fontSize: {
        options: [
            14,
            15,
            16,
            17,
            18,
            19,
            "default",
            21,
            22,
            23,
            24,
            25,
            26,
            27,
            28,
            29,
            30,
        ],
    },
    alignment: {
        options: ["justify", "left", "center", "right"],
    },
    table: {
        contentToolbar: [
            "tableColumn",
            "tableRow",
            "mergeTableCells",
            "tableProperties",
            "tableCellProperties",
        ],
    },
    image: {
        resizeUnit: "px",
        toolbar: [
            "imageStyle:alignLeft",
            "imageStyle:alignRight",
            "|",
            "imageTextAlternative",
        ],
        styles: ["alignLeft", "alignRight"],
        type: ["JPEG", "JPG", "GIF", "PNG"],
    },
    typing: {
        transformations: {
            remove: [
                "enDash",
                "emDash",
                "oneHalf",
                "oneThird",
                "twoThirds",
                "oneForth",
                "threeQuarters",
            ],
        },
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
    padding: 10px;
    .ck-toolbar {
        padding: 10px;
        border-radius: 10px 10px 0 0 !important;
    }
    .ck-content {
        border-radius: 0 0 10px 10px !important;
    }
`;

Editor.defaultProps = {
    getContentFromEditor: () => {},
    originContent: null,
};

export default Editor;
