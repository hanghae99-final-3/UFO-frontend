import Swal from "sweetalert2";

/**
 * @author kwonjiyeong
 * @param confirmProcess : 확인을 눌렀을 때 후처리함수
 * @param dismissProcess: 취소를 눌렀을 때 후처리함수,
 * @역할 게시글 추가버튼을 눌렀을때, 나타나는 confirm 창 렌더링
 * @필수값 confirmProcess : 확인창을 눌렀을 때 후처리함수
 */
const addEditConfirm = (confirmProcess, dismissProcess) => {
    Swal.fire({
        title: "정말 등록하시겠어요?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "네",
        cancelButtonText: "아니오",
    }).then(result => {
        if (result.isConfirmed) {
            confirmProcess();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            if (dismissProcess) dismissProcess();
        }
    });
};

/**
 * @author kwonjiyeong
 * @param confirmProcess : 확인을 눌렀을 때 후처리함수
 * @param dismissProcess: 취소를 눌렀을 때 후처리함수,
 * @역할 삭제버튼을 눌렀을때, 나타나는 confirm 창 렌더링
 * @필수값 confirmProcess : 확인창을 눌렀을 때 후처리함수
 */
const deleteConfirm = (confirmProcess, dismissProcess) => {
    Swal.fire({
        title: "정말 삭제하시겠어요?",
        text: "삭제를 하면 되돌릴 수 없어요!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "네",
        cancelButtonText: "아니오",
    }).then(result => {
        if (result.isConfirmed) {
            confirmProcess();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            if (dismissProcess) dismissProcess();
        }
    });
};

/**
 * @author kwonjiyeong
 * @param editProcess : 수정을 눌렀을 때 후처리함수
 * @param deleteProcess: 삭제를 눌렀을 때 후처리함수,
 * @역할 수정, 삭제버튼에 따라 유저가 원하는 작업을 하게 한다.
 * @필수값 editProcess, deleteProcess
 */
//모바일에서 편집버튼을 누르면 유저가 수정/삭제를 선택할 수 있게끔하는 confirm모달입니다.
const mobileEditConfirm = (editProcess, deleteProcess) => {
    Swal.fire({
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "수정",
        cancelButtonText: "삭제",
        showCloseButton: true,
    }).then(result => {
        if (result.isConfirmed) {
            editProcess();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            deleteProcess();
        }
    });
};

const confirm = { deleteConfirm, addEditConfirm, mobileEditConfirm };

export default confirm;
