package service;

import com.digital.ClinicaOdontologica.entity.Odontologo;
import com.digital.ClinicaOdontologica.service.OdontologoService;
import org.junit.Test;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest
class OdontologoServiceTest {
    @Autowired
    OdontologoService odontologoService;

    @Test
    @Order(1)
    void guardarOdontologo (){
        Odontologo odontologoAGuardar = new Odontologo("SCGN08","Carolina","Gómez");
        Odontologo odontologoGuardado = odontologoService.guardarOdontologo(odontologoAGuardar);
        assertEquals(1L,odontologoGuardado.getId());
    }

    @Test
    @Order(2)
    void buscarOdontologo(){
        Long idABuscar=1L;
        Optional <Odontologo> odontologoBuscado = odontologoService.buscarOdontologoPorId(idABuscar);
        assertTrue(odontologoBuscado.isPresent());
    }


    @Test
    @Order(3)
    void actualizarodontologo(){
        Odontologo odontologoAActualizar = new Odontologo(1L,"SCGN08","Sandra","Carolina");
        odontologoService.actualizarOdontologo(odontologoAActualizar);
        assertEquals("Sandra",odontologoService.buscarOdontologoPorId(1L).get().getApellido());
    }

    @Test
    @Order(4)
    void listarTodosOdontologos(){
        List<Odontologo> listaEncontrada = odontologoService.listarOdontologos();
        assertEquals(1,listaEncontrada.size());
    }


    @Test
    @Order(5)
    void buscarOdontologoPorNombre(){
        String nombreABuscar="Sandra";
        Optional <Odontologo> odontologoBuscado = odontologoService.buscarOdontologoPorNombre(nombreABuscar);
        assertTrue(odontologoBuscado.isPresent());
    }


    @Test
    @Order(6)
    void eliminarOdontollogo() {
        Long idAEliminar = 1L;
        odontologoService.eliminarOdontologo(idAEliminar);
        Optional <Odontologo> odontologoEliminado = odontologoService.buscarOdontologoPorId(idAEliminar);
        assertFalse(odontologoEliminado.isPresent());
    }

}