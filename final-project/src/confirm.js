import Swal from "sweetalert2";

/**
 * @author kwonjiyeong
 * @param confirmProcess : 확인을 눌렀을 때 후처리함수
 * @param dismissProcess: 취소를 눌렀을 때 후처리함수,
 * @역할 게시글 추가버튼을 눌렀을때, 나타나는 confirm 창 렌더링
 * @필수값 confirmProcess : 확인창을 눌렀을 때 후처리함수
 */
const addConfirm = (confirmProcess, dismissProcess) => {
    Swal.fire({
        title: "게시글을 추가하시겠어요?",
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

const deleteAccountConfirm = (confirmProcess, dismissProcess) => {
    Swal.fire({
        title: "정말 계정을 삭제하시겠어요?",
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

const confirm = { deleteConfirm, addConfirm, deleteAccountConfirm };

export default confirm;
