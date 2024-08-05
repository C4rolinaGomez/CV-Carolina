package com.digital.ClinicaOdontologica.controller;
import com.digital.ClinicaOdontologica.dto.TurnoDto;
import com.digital.ClinicaOdontologica.entity.Odontologo;
import com.digital.ClinicaOdontologica.entity.Paciente;
import com.digital.ClinicaOdontologica.entity.Turno;
import com.digital.ClinicaOdontologica.exception.BadRequestException;
import com.digital.ClinicaOdontologica.exception.ResourceNotFoundException;
import com.digital.ClinicaOdontologica.service.OdontologoService;
import com.digital.ClinicaOdontologica.service.PacienteService;
import com.digital.ClinicaOdontologica.service.TurnoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/turnos")
public class TurnoController {
    private TurnoService turnoService;
    private OdontologoService odontologoService;
    private PacienteService pacienteService;

    @Autowired
    public TurnoController(TurnoService turnoService, OdontologoService odontologoService, PacienteService pacienteService) {
        this.turnoService = turnoService;
        this.odontologoService = odontologoService;
        this.pacienteService = pacienteService;
    }

    // Resgistro de Turnos
    @PostMapping
    public ResponseEntity<TurnoDto> registrarTurno(@RequestBody Turno turno) throws BadRequestException {
       //ResponseEntity<TurnoDto> response;

        // busca paciente por id
        Optional<Paciente> pacienteBuscado = pacienteService.buscarPacientePorID(turno.getPaciente().getId());
        // busca odontologo por id
        Optional<Odontologo> odontologoBuscado = odontologoService.buscarOdontologoPorId(turno.getOdontologo().getId());

        if (pacienteBuscado.isPresent() && odontologoBuscado.isPresent()) {
            //hace la validacion si existen ambos
            return ResponseEntity.ok(turnoService.guardarTurno(turno));
            //TurnoDto turnoGuardado = turnoService.guardarTurno(turno);
            //response = ResponseEntity.ok(turnoGuardado);
        } else {
            // cuando uno de los dos o ambos no existen
            //response = ResponseEntity.badRequest().build();
            throw new BadRequestException("El paciente o el odontologo son inexistentes");
        }
        //return response;
    }
    // Eliminación de Turnos

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarTurno (@PathVariable Long id) throws ResourceNotFoundException {
        Optional<TurnoDto> turnoBuscado =turnoService.buscarTurnoPorID(id);

       if (turnoBuscado.isPresent()){
           turnoService.eliminarTurno(id);
            return ResponseEntity.ok("el id "+id + " se eliminó correctamente.");

        }else{

           throw new ResourceNotFoundException("La eliminacion del turno con id:  "+id + " ha tenido un error.");
         //return ResponseEntity.badRequest().body("Error al eliminar el turno con id: "+id);
        }

    }
    //Actualización de turnos
   @PutMapping
    public ResponseEntity<String> actualizarTurno (@RequestBody Turno turno)throws BadRequestException{
      Optional<TurnoDto> turnoBuscado= turnoService.buscarTurnoPorID(turno.getId());
      if(turnoBuscado.isPresent()){
          if(odontologoService.buscarOdontologoPorId(turno.getOdontologo().getId()).isPresent() &&
                  pacienteService.buscarPacientePorID(turno.getPaciente().getId()).isPresent()){
            turnoService.actualizarTurno(turno);
               return ResponseEntity.ok("El turno "+ turno.getId()+" se ha actualizado correctamente");
        }else{
              throw new BadRequestException(" Actualización erronea por paciente u odotologo no encontrados");
               //return ResponseEntity.badRequest().body("No se ha actualizo porque paciente o odontologo no se encuentran");
           }
       }else{
            throw new BadRequestException("Error de actualización, turno inexistente");
           //return ResponseEntity.badRequest().body("No se actuliza, no se encuentra el turno");
        }
    }

    // Busqueda por id de turno

    @GetMapping("/{id}")
    public ResponseEntity<TurnoDto> buscarTurnoPorId (@PathVariable Long id)throws ResourceNotFoundException{
       Optional <TurnoDto> turnoBuscado= turnoService.buscarTurnoPorID(id);
        if(turnoBuscado.isPresent()){
            return ResponseEntity.ok(turnoBuscado.get());
        }else{
            throw new ResourceNotFoundException("El turno con id: "+id+" no se ha encontrado e la base de datos");
            //return ResponseEntity.notFound().build();
        }
    }
    // Listado de turnos
    @GetMapping("/listar")
    public ResponseEntity<List<TurnoDto>> traerTodosLosTurnos() {
        return ResponseEntity.ok(turnoService.listarTurnos());
    }

}
