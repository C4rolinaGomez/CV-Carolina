package com.digital.ClinicaOdontologica.controller;
import com.digital.ClinicaOdontologica.entity.Odontologo;
import com.digital.ClinicaOdontologica.exception.BadRequestException;
import com.digital.ClinicaOdontologica.exception.ResourceNotFoundException;
import com.digital.ClinicaOdontologica.service.OdontologoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/odontologos")
public class OdontologoController {
    @Autowired
    private OdontologoService odontologoService;

    //Post de Guardar Odontologo
    @PostMapping
    public ResponseEntity<Odontologo> guardarOdontologo(@RequestBody Odontologo odontologo) {
        Odontologo odontologoCreado= odontologoService.guardarOdontologo(odontologo);
        return  ResponseEntity.ok(odontologoCreado);
    }

    // Get de listar
    @GetMapping("/listar")
    public ResponseEntity <List<Odontologo>> listarOdontologos()throws BadRequestException {
        List<Odontologo> odontologos = odontologoService.listarOdontologos();
        if(odontologos.isEmpty()){
            throw new BadRequestException("No se puede se ha podido realizar el listado de odontologos, no se han encontrado los datos");
            //return ResponseEntity.badRequest().build();
        }else{
            return ResponseEntity.ok(odontologos);
        }
    }

    //Get de Buscar por id
    @GetMapping("/{id}")
    public ResponseEntity<Odontologo> buscarOdontologoPorID (@PathVariable Long id)throws ResourceNotFoundException{
        Optional<Odontologo> odontologoBuscado = odontologoService.buscarOdontologoPorId(id);
        if(odontologoBuscado.isPresent()){
            return ResponseEntity.ok(odontologoBuscado.get());
        }else{
            throw new ResourceNotFoundException("El id: "+id+" no se ha encontrado en la base de datos");
            //return ResponseEntity.notFound().build();
        }
    }

    //Delete de Odontologo
    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarOdontologo(@PathVariable Long id)throws ResourceNotFoundException {
        Optional<Odontologo> odontologoBuscado = odontologoService.buscarOdontologoPorId(id);
        if(odontologoBuscado.isPresent()){
            odontologoService.eliminarOdontologo(id);
            return ResponseEntity.ok("El Odontologo con id: "+ id+" ha sido eliminado correctamente");
        }else {
            throw new ResourceNotFoundException("La eliminación del odontologo con id: "+id+" no se  ha podido realizar" +
                    " correctamente, pues no se encuentra registrado.");
            //return ResponseEntity.badRequest().body("La eliminación del odontologo con id: "+id+" nno se  ha podido realizar" +
            //                    " correctamente, pues no se encuentra registrado.");
        }
    }

    //Actualización de Odontologos
    @PutMapping
    public ResponseEntity<String> actualizarOdontologo(@RequestBody Odontologo odontologo)throws BadRequestException{
        Optional<Odontologo> odontologoBuscado = odontologoService.buscarOdontologoPorId(odontologo.getId());
        if(odontologoBuscado.isPresent()){
            odontologoService.actualizarOdontologo(odontologo);
            return ResponseEntity.ok("El odontologo con id: "+ odontologo.getId()+ " ha sido actualizado correctamente.");
        }else {
            throw new BadRequestException("La modificación del odontologo con id: "+odontologo.getId()+" no se  ha podido realizar" +
                    "correctamente, pues no se ha encontrado.");
            //return ResponseEntity.badRequest().body("La modificación del odontologo con id: "+odontologo.getId()+" no se  ha podido realizar" +
            //                    "correctamente, pues no se ha encontrado.");

        }
    }
    //Búsqueda por nombre de Odontologos

    @GetMapping("nombre/{nombre}")
    public ResponseEntity<Odontologo> buscarOdontologoPorNombre(@PathVariable String nombre)throws  ResourceNotFoundException{
        Optional<Odontologo> odontologoBuscado = odontologoService.buscarOdontologoPorNombre(nombre);
        if(odontologoBuscado.isPresent()){
            return ResponseEntity.ok(odontologoBuscado.get());
        }else{
            throw new ResourceNotFoundException("El odontologo buscado por nombre es inexistente");
            //return ResponseEntity.notFound().build();
        }
    }
}
