# PRD (Product Requirements Document)

## Título del Proyecto
Interfaz Kanban para Gestión de Candidatos por Posición

## Resumen
Implementar una interfaz tipo kanban que permita visualizar y gestionar los diferentes candidatos de una posición específica, mostrándolos como tarjetas en diferentes columnas que representan las fases del proceso de contratación.

## Objetivos
- Crear una interfaz intuitiva para gestionar candidatos por posición
- Permitir visualizar candidatos en diferentes etapas del proceso de contratación
- Facilitar la actualización del estado de los candidatos mediante funcionalidad drag & drop
- Garantizar una experiencia responsive para dispositivos móviles

## Requerimientos Funcionales

1. **Visualización de Posición**
   - Mostrar el título de la posición en la parte superior
   - Incluir una flecha de navegación para volver al listado de posiciones

2. **Visualización Kanban**
   - Mostrar columnas correspondientes a cada fase del proceso de contratación
   - Obtener las fases desde la API `/positions/:id/interviewFlow`
   - Ordenar columnas según el orden lógico del proceso

3. **Tarjetas de Candidatos**
   - Mostrar tarjetas de candidatos en sus respectivas columnas/fases
   - Cada tarjeta debe incluir:
     - Nombre completo del candidato
     - Puntuación media
   - Obtener datos de candidatos desde la API `/positions/:id/candidatos`

4. **Funcionalidad Drag & Drop**
   - Permitir arrastrar candidatos entre columnas
   - Al soltar, actualizar el estado del candidato mediante API PUT
   - Mostrar feedback visual durante el arrastre y actualización

5. **Diseño Responsive**
   - Adaptación a dispositivos móviles mostrando columnas en vertical
   - Mantener usabilidad en todas las resoluciones

## Requerimientos No Funcionales

1. **Rendimiento**
   - Tiempo de carga inicial < 2 segundos
   - Actualización instantánea al mover candidatos

2. **Usabilidad**
   - Interfaz intuitiva y fácil de usar
   - Feedback visual para todas las acciones

3. **Mantenibilidad**
   - Código organizado siguiendo buenas prácticas
   - Componentes modulares y reutilizables

## Especificaciones Técnicas

1. **Tecnologías**
   - React como framework principal
   - React Bootstrap para componentes UI
   - React DnD o similar para funcionalidad drag & drop

2. **Integración API**
   - Consumir endpoints existentes:
     - GET `/positions/:id/interviewFlow`
     - GET `/positions/:id/candidatos`
     - PUT `/candidatos/:id/escenario`

3. **Estructura de Archivos**
   - Seguir la arquitectura existente
   - Separar componentes, servicios y estilos

## Criterio de Aceptación
- La interfaz muestra correctamente todas las fases del proceso
- Los candidatos aparecen en las columnas correspondientes
- Se puede arrastrar y soltar candidatos entre columnas
- La actualización del estado se refleja correctamente en el backend
- La interfaz se adapta a diferentes tamaños de pantalla

---

# Tickets de Desarrollo

## Ticket 1: Configuración inicial y estructura de componentes
**Descripción:** Crear la estructura base para la página de posición con vista kanban.

**Tareas:**
- Crear archivo PositionKanban.tsx en /src/components
- Definir estructura base del componente
- Configurar rutas en App.tsx para acceder a la nueva página
- Implementar navegación desde la página de posiciones

**Criterio de Aceptación:**
- Estructura de archivos creada
- Componente base implementado
- Navegación funcional desde listado de posiciones

**Prioridad:** Alta
**Estimación:** 2 horas

## Ticket 2: Integración con API para obtener fases del proceso
**Descripción:** Implementar la obtención de datos de fases de entrevista desde la API.

**Tareas:**
- Crear servicio para obtener datos del flujo de entrevistas
- Implementar llamada a GET `/positions/:id/interviewFlow`
- Manejar estados de carga y error
- Visualizar las fases como columnas en el kanban

**Criterio de Aceptación:**
- Servicio implementado correctamente
- Columnas generadas dinámicamente según las fases
- Manejo adecuado de estados de carga y error

**Prioridad:** Alta
**Estimación:** 3 horas

## Ticket 3: Integración con API para obtener candidatos
**Descripción:** Implementar la obtención de candidatos para una posición específica.

**Tareas:**
- Crear servicio para obtener candidatos
- Implementar llamada a GET `/positions/:id/candidatos`
- Manejar estados de carga y error
- Distribuir candidatos en sus respectivas columnas según currentInterviewStep

**Criterio de Aceptación:**
- Servicio implementado correctamente
- Candidatos mostrados en sus respectivas columnas
- Manejo adecuado de estados de carga y error

**Prioridad:** Alta
**Estimación:** 3 horas

## Ticket 4: Implementación de tarjetas de candidatos
**Descripción:** Crear el componente de tarjeta para visualizar la información de cada candidato.

**Tareas:**
- Crear componente CandidateCard
- Diseñar tarjeta con la información requerida
- Implementar visualización de nombre y puntuación
- Aplicar estilos consistentes con el diseño general

**Criterio de Aceptación:**
- Tarjetas con diseño visual atractivo
- Información de candidato correctamente mostrada
- Consistencia visual con el resto de la aplicación

**Prioridad:** Media
**Estimación:** 2 horas

## Ticket 5: Implementación de funcionalidad drag & drop
**Descripción:** Implementar la funcionalidad para arrastrar y soltar candidatos entre columnas.

**Tareas:**
- Integrar biblioteca de drag & drop
- Configurar columnas como zonas de destino
- Implementar lógica de arrastrar y soltar
- Añadir feedback visual durante el arrastre

**Criterio de Aceptación:**
- Funcionalidad drag & drop operativa
- Feedback visual adecuado durante el arrastre
- Experiencia de usuario fluida y sin errores

**Prioridad:** Alta
**Estimación:** 4 horas

## Ticket 6: Actualización del estado del candidato
**Descripción:** Implementar la actualización del estado del candidato al moverlo entre columnas.

**Tareas:**
- Crear servicio para actualizar el estado del candidato
- Implementar llamada a PUT `/candidatos/:id/escenario`
- Manejar respuesta y actualización local de estado
- Añadir feedback de éxito/error

**Criterio de Aceptación:**
- Actualización correcta del estado en el backend
- Actualización visual inmediata en el frontend
- Manejo adecuado de errores

**Prioridad:** Alta
**Estimación:** 3 horas

## Ticket 7: Diseño responsive
**Descripción:** Adaptar la interfaz para dispositivos móviles.

**Tareas:**
- Implementar diseño responsive con Media Queries
- Ajustar layout para mostrar columnas en vertical en dispositivos pequeños
- Probar y ajustar interacciones táctiles para drag & drop

**Criterio de Aceptación:**
- Interfaz usable en dispositivos móviles
- Columnas visualizadas correctamente en vertical
- Interacciones táctiles funcionando adecuadamente

**Prioridad:** Media
**Estimación:** 3 horas

## Ticket 8: Testing y depuración
**Descripción:** Realizar pruebas y corregir problemas encontrados.

**Tareas:**
- Implementar tests unitarios para componentes clave
- Realizar pruebas de integración
- Corregir bugs identificados
- Optimizar rendimiento si es necesario

**Criterio de Aceptación:**
- Tests pasando correctamente
- No hay bugs críticos
- Rendimiento satisfactorio

**Prioridad:** Media
**Estimación:** 4 horas
