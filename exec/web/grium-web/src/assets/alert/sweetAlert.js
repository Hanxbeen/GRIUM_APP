import Swal from "sweetalert2";

function error(text){
    Swal.fire({
        position: 'center',
        icon: 'error',
        text: text,
        confirmButtonColor: '#EAC03A',
      });

}

function success(text){
Swal.fire({
    position: 'center',
    icon: 'success',
    text: text,
    showConfirmButton: false,
    timer: 1500,
  });
}

function info(text){
    Swal.fire({
        position: 'center',
        icon: 'info',
        text: text,
        showConfirmButton: false,
        timer: 1500,
      });
    }

function successButton(text1,text2){
    Swal.fire(
        text1,
        text2,
        'success'
    );
}

async function confirm(text){
    // Swal.fire({
	// 		title : title,
	// 		text : msg,
	// 		type : "warning",
	// 		showCancelButton : true,
	// 		confirmButtonClass : "btn-danger",
	// 		confirmButtonText : "예",
	// 		cancelButtonText : "아니오",
	// 		closeOnConfirm : false,
	// 		closeOnCancel : true
	// 	}, function(isConfirm) {
	// 		if (isConfirm) {
	// 			swal('', '예약이 승인되었습니다.', "success");
	// 		}else{
	// 			swal('', '예약이 거부되었습니다.', "failed");
	// 		}

	// 	});
    let val = false;
    await Swal.fire({
        icon:"warning",
        text: text,
        showDenyButton: true,
        confirmButtonText: `OK`,
        denyButtonText: `NO`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        val = result.isConfirmed;
    })
    return val;
}

export default { error, success,successButton,confirm, info} ;
