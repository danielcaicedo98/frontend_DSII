
import Swal from 'sweetalert2';

export const warningUser = ( title, message, type ) =>{

    Swal.fire({
       title: title,
       text: message,
       icon: type,
       confirmButtonText: 'Aceptar' 
    });

}

export const loading = (  ) => {
     
    let timerInterval
        
    Swal.fire({    
    html: 'Cargando',
    timer: 6000,
    timerProgressBar: true,
    didOpen: () => {
        Swal.showLoading()
        timerInterval = setInterval(() => {
            const content = Swal.getHtmlContainer()
            if (content) {
                const b = content.querySelector('b')
                if (b) {
                    b.textContent = Swal.getTimerLeft()
                }
            }
        }, 100)
    },
    willClose: () => {
        clearInterval(timerInterval)
    }
    }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
            
        }
    })
}