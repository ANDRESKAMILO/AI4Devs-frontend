# Componentes para la Interfaz Kanban de Gestión de Candidatos

## Componentes Principales

### PositionKanban.tsx
Componente principal que implementa la vista kanban para una posición específica.

**Funcionalidades**:
- Carga datos de la API (o datos mock en desarrollo)
- Muestra columnas para cada fase del proceso de contratación
- Permite arrastrar y soltar candidatos entre fases
- Actualiza el estado de los candidatos automáticamente
- Proporciona feedback visual durante las interacciones

### CandidateCard.tsx
Componente para mostrar la información de un candidato como una tarjeta.

**Funcionalidades**:
- Muestra el nombre completo del candidato
- Muestra la puntuación media con estrellas
- Implementa la funcionalidad de arrastrar
- Proporciona feedback visual durante el arrastre

## Servicios Relacionados

### positionService.ts
Servicio para interactuar con la API de posiciones y candidatos.

**Funcionalidades**:
- Obtener flujo de entrevistas para una posición
- Obtener candidatos para una posición
- Actualizar el estado de un candidato
- Proporciona datos mock para desarrollo sin backend

## Uso

Para usar estos componentes en la aplicación:

1. Asegúrate de tener las dependencias instaladas:
   ```
   npm install react-dnd react-dnd-html5-backend
   ```

2. El componente `PositionKanban.tsx` se debe usar como página y configurarse en el enrutador:
   ```jsx
   <Route path="/positions/:id" element={<PositionKanban />} />
   ```

3. Para acceder a la página, navega a `/positions/:id` donde `:id` es el ID de la posición.

## Desarrollo

Para añadir nuevas funcionalidades o corregir errores:

1. Asegúrate de mantener la estructura modular
2. Las llamadas a la API deben mantenerse en el servicio
3. La lógica de drag & drop debe mantenerse en los componentes respectivos
4. Sigue las buenas prácticas de React y TypeScript 