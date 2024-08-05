package com.digital.ClinicaOdontologica.controller;

import com.digital.ClinicaOdontologica.entity.Odontologo;
import com.digital.ClinicaOdontologica.entity.Paciente;
import com.digital.ClinicaOdontologica.exception.BadRequestException;
import com.digital.ClinicaOdontologica.exception.ResourceNotFoundException;
import com.digital.ClinicaOdontologica.service.PacienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/pacientes")
public class PacienteController {

    private PacienteService pacienteService;
    @Autowired
    public PacienteController(PacienteService pacienteService) {
        this.pacienteService = pacienteService;
    }

    // Post de Guardado de paciente
    @PostMapping
    public ResponseEntity<Paciente> guardarPaciente(@RequestBody Paciente paciente) {
        return ResponseEntity.ok(pacienteService.guardarPaciente(paciente));
    }

    // Get de Listado de Paciente
    @GetMapping("/listar")
    public ResponseEntity<List<Paciente>> listarPacientes() throws BadRequestException {
        List<Paciente> pacientes = pacienteService.listarPacientes();
        if(pacientes.isEmpty()){ //inEmpty verifica si la lista esta vacia
            //return ResponseEntity.badRequest().build();
            throw new BadRequestException("Se ha encontrado vacía la lista");
        }else{
            return ResponseEntity.ok(pacientes);
        }
    }

    // Delete de paciente - se agrega e

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarPaciente(@PathVariable Long id)throws ResourceNotFoundException {
        Optional<Paciente> pacienteBuscado = pacienteService.buscarPacientePorID(id);
        if(pacienteBuscado.isPresent()){
            pacienteService.eliminarPaciente(id);
            return ResponseEntity.ok("El paciente con id: "+ id + " ha sido eliminado corectamente");
        }else {
            //si el paciente no existe
            //arrojamos la exception
            throw new ResourceNotFoundException("Ha ocurrido un error on la eliminación del id: "+id+" no se ha encontrado.");
        }
    }

    //Get de buscar por id
    @GetMapping("/{id}")
    public ResponseEntity<Paciente> buscarPacientePorId(@PathVariable Long id)throws ResourceNotFoundException{
        Optional<Paciente> pacienteBuscado= pacienteService.buscarPacientePorID(id);
        if(pacienteBuscado.isPresent()){
            return ResponseEntity.ok(pacienteBuscado.get());
        }else {
            //return ResponseEntity.notFound().build();
            throw new ResourceNotFoundException("Ha ocurrido un error con la busqueda del id: "+id+" no se ha encontrado.");
        }
    }

    //Actualización paciente
    @PutMapping
    public ResponseEntity<String> actualizarPaciente(@RequestBody Paciente paciente)throws BadRequestException{
        Optional<Paciente> pacienteBuscado = pacienteService.buscarPacientePorID(paciente.getId());
        if(pacienteBuscado.isPresent()){
            pacienteService.actualizarPaciente(paciente);
            return ResponseEntity.ok("El paciente con id: "+paciente.getId()+" y Nombre: "+paciente.getNombre()+ " ha sido actualizado correctamente");
        }else{
            throw new BadRequestException("El paciente con id: "+paciente.getId()+" no se ha encontrado.");
            //return ResponseEntity.badRequest().body("El paciente con id: "+paciente.getId()+" no se ha encontrado.");
        }
    }
    //Get de buscar por id
    @GetMapping("/email/{email}")
    public ResponseEntity<Paciente> buscarPacientePorEmail(@PathVariable String email)throws ResourceNotFoundException{
        Optional<Paciente> pacienteBuscado= pacienteService.buscarPacientePorCorreo(email);
        if(pacienteBuscado.isPresent()){
            return ResponseEntity.ok(pacienteBuscado.get());
        }else {
            throw new ResourceNotFoundException("El email ingresado no se ha encontrado.");
            //return ResponseEntity.notFound().build(); //NOTFOUND = NO LO ENCONTRO
        }
    }
    //Busqueda por nombre del paciente

    @GetMapping("nombre/{nombre}")
    public ResponseEntity<Paciente> buscarPacientePorNombre(@PathVariable String nombre)throws  ResourceNotFoundException{
        Optional<Paciente> pacienteBuscado = pacienteService.buscarPacienteXNombre(nombre);
        if(pacienteBuscado.isPresent()){
            return ResponseEntity.ok(pacienteBuscado.get());
        }else{
            throw new ResourceNotFoundException("El Odontologo buscado por nombre es inexistente");
            //return ResponseEntity.notFound().build();
        }
    }


}
