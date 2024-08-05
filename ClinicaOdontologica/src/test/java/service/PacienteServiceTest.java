package service;

import com.digital.ClinicaOdontologica.entity.Odontologo;
import com.digital.ClinicaOdontologica.entity.Paciente;
import com.digital.ClinicaOdontologica.service.PacienteService;
import org.junit.Test;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest
class PacienteServiceTest {

    @Autowired
    PacienteService pacienteService;

    @Test
    @Order(1)
    void guardarPaciente(){

        Paciente pacienteAGuardar= new Paciente("Neira", "Marta", "martica@gmail.com","123456",
                LocalDate.now());
        Paciente pacienteGuardado = pacienteService.guardarPaciente(pacienteAGuardar);
        assertEquals(1L,pacienteGuardado.getId());
    }

    @Test
    @Order(2)
    void buscarPaciente(){
        Long idABuscar=1L;
        Optional<Paciente> pacienteBuscado = pacienteService.buscarPacientePorID(idABuscar);
        assertTrue(pacienteBuscado.isPresent());
    }

    @Test
    @Order(3)
    void actualizarPaciente(){
        Paciente pacienteAActualizar = new Paciente(1L, "Pineda","Marta","martica@gmail.com",
                "123456",LocalDate.now());
        pacienteService.actualizarPaciente(pacienteAActualizar);
        assertEquals("Pineda",pacienteService.buscarPacientePorID(1L).get().getApellido());
    }

    @Test
    @Order(4)
    void listarTodosPacientes(){
        List<Paciente> listaEncontrada = pacienteService.listarPacientes();
        assertEquals(1,listaEncontrada.size());
    }

    @Test
    @Order(5)
    void buscarPacientePorNombre(){
        String nombreABuscar="Marta";
        Optional <Paciente> pacienteBuscado = pacienteService.buscarPacienteXNombre(nombreABuscar);
        assertTrue(pacienteBuscado.isPresent());
    }

    @Test
    @Order(6)
    void eliminarPaciente() {
        Long idAEliminar = 1L;
        pacienteService.eliminarPaciente(idAEliminar);
        Optional <Paciente> pacienteEliminado = pacienteService.buscarPacientePorID(idAEliminar);
        assertFalse(pacienteEliminado.isPresent());
    }
}