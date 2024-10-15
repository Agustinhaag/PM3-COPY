import swal from "sweetalert";

export const handleCancel = (cancelAppoint,turn) => {
  const now = new Date();
  const appointmentDate = new Date(turn.date);

  const timeDifference = appointmentDate.getTime() - now.getTime();

  const twentyFourHoursInMilliseconds = 24 * 60 * 60 * 1000;

  if (timeDifference < twentyFourHoursInMilliseconds) {
    swal({
      title: "Error",
      text: "No se puede cancelar el turno con menos de 24 horas de anticipación",
      icon: "error",
    });
    return;
  }



  swal({
    title: "¿Esta seguro/a de cancelar su turno?",
    text: "Si cancela debera iniciar la gestión nuevamente",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      cancelAppoint();
      swal("Turno cancelado exitosamente!", {
        icon: "success",
      });
    } else {
      swal("Su turno aún sigue disponible!");
    }
  });
};

export const handleDelete = (deleteAppoint) => {
  swal({
    title: "¿Esta seguro/a de eliminar su turno?",
    text: "Si lo elimina no tendra registro de su atención",
    icon: "error",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      deleteAppoint();
      swal("Turno eliminado exitosamente!", {
        icon: "success",
      });
    }
  });
};
