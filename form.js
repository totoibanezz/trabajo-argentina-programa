document.addEventListener('DOMContentLoaded', function() {
    
    $('#formularioProceso').validate({
        rules: {
            nombreProceso: 'required',
            telefono: 'required',
            mensaje: 'required'
        },
        messages: {
            nombreProceso: 'Por favor ingrese su nombre',
            telefono: 'Por favor ingrese un numero de telefono',
            mensaje: 'Por favor ingrese un mensaje'
        },
        submitHandler: function(form) {
            
            var nombre = document.getElementById('nombreProceso').value;
            var telefono = document.getElementById('telefono').value;
            var mensaje = document.getElementById('mensaje').value;
            
            var cotizacion = 'Cotización:\n\n' +
                'Nombre: ' + nombre + '\n' +
                'Telefono: ' + telefono + '\n' +
                'Mensaje: ' + mensaje + '\n'

            
            alert(cotizacion);

            
            var pdf = new jsPDF();

            
            pdf.text(cotizacion, 10, 10);

            
            var pdfBlob = pdf.output('blob');

            
            var downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(pdfBlob);
            downloadLink.download = 'resumen_proceso.pdf';
            downloadLink.click();

           
            URL.revokeObjectURL(pdfBlob);
        
        }
    });

    
    $('#formularioContacto').validate({
        rules: {
            name: 'required',
            email: {
                required: true,
                email: true
            },
            message: 'required'
        },
        messages: {
            name: 'Por favor ingrese su nombre',
            email: {
                required: 'Por favor ingrese su dirección de correo electrónico',
                email: 'Por favor ingrese una dirección de correo electrónico válida'
            },
            message: 'Por favor ingrese un mensaje'
        },
        submitHandler: function(form) {
            
            var name = $('#name').val();
            var email = $('#email').val();
            var message = $('#message').val();

            
            $.ajax({
                url: 'https://reqres.in/api/users?page=2', 
                method: 'POST',
                data: {
                    name: name,
                    email: email,
                    message: message
                },
                success: function(response) {
                    
                    console.log('Éxito:', response);
                    
                    alert('¡Su mensaje a sido enviado con éxito!');
                },
                error: function(xhr, status, error) {
                    
                    console.error('Error:', error);
                    
                    alert('Error al enviar el mensaje. Por favor inténtelo nuevamente.');
                }
            });
        }
    });
});