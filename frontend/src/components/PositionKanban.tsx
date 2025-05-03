import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert, Card, Toast } from 'react-bootstrap';
import { ArrowLeft, House } from 'react-bootstrap-icons';
import { useParams, useNavigate } from 'react-router-dom';
import { DndProvider, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import CandidateCard from './CandidateCard';
import { 
  getPositionInterviewFlow, 
  getPositionCandidates,
  updateCandidateStage,
  InterviewStep,
  Candidate
} from '../services/positionService';

const PositionKanban: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [positionName, setPositionName] = useState<string>('');
  const [interviewSteps, setInterviewSteps] = useState<InterviewStep[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');

  console.log('Renderizando PositionKanban con ID:', id);

  // Cargar datos iniciales
  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        console.error('No se proporcionó ID de posición');
        setError('ID de posición no encontrado en la URL');
        setLoading(false);
        return;
      }
      
      try {
        console.log('Iniciando carga de datos para posición ID:', id);
        setLoading(true);
        
        // Obtener datos del flujo de entrevistas
        const flowData = await getPositionInterviewFlow(id);
        console.log('Datos de flujo recibidos:', flowData);
        setPositionName(flowData.positionName);
        
        // Ordenar los pasos por orderIndex
        const sortedSteps = [...flowData.interviewFlow.interviewSteps].sort(
          (a, b) => a.orderIndex - b.orderIndex
        );
        console.log('Pasos ordenados:', sortedSteps);
        setInterviewSteps(sortedSteps);
        
        // Obtener candidatos para esta posición
        const candidatesData = await getPositionCandidates(id);
        console.log('Candidatos recibidos:', candidatesData);
        setCandidates(candidatesData);
        
        setLoading(false);
      } catch (err) {
        console.error('Error al cargar los datos:', err);
        setError('Error al cargar los datos. Por favor, intente nuevamente.');
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Manejar el cambio de etapa de un candidato
  const handleCandidateMove = async (candidateId: string, newStageId: string) => {
    // Guardar el estado original para posible restauración
    const originalCandidates = [...candidates];
    
    try {
      // Actualizar la vista localmente primero (optimistic update)
      const updatedCandidates = candidates.map(candidate => 
        candidate.id === parseInt(candidateId) 
          ? { ...candidate, currentInterviewStep: interviewSteps.find(step => step.id === parseInt(newStageId))?.name || '' }
          : candidate
      );
      setCandidates(updatedCandidates);
      
      // Luego enviar la actualización al servidor
      await updateCandidateStage(candidateId, "1", newStageId);
      
      // Mostrar mensaje de éxito
      setToastMessage('Candidato actualizado con éxito');
      setShowToast(true);
      
    } catch (err) {
      // Revertir a los datos originales sin hacer una nueva llamada API
      setCandidates(originalCandidates);
      
      // Mostrar mensaje de error
      setToastMessage('Error al actualizar el estado del candidato');
      setShowToast(true);
      
      console.error('Error:', err);
    }
  };

  // Componente de columna de kanban
  const KanbanColumn = ({ step }: { step: InterviewStep }) => {
    // Configuración para soltar candidatos en esta columna
    const [{ isOver }, drop] = useDrop(() => ({
      accept: 'CANDIDATE',
      drop: (item: { id: string }) => {
        handleCandidateMove(item.id.toString(), step.id.toString());
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver()
      })
    }));

    // Filtrar candidatos para esta columna
    const columnCandidates = candidates.filter(
      candidate => candidate.currentInterviewStep === step.name
    );

    return (
      <Col lg={true} className="mb-4 kanban-column">
        <Card 
          ref={drop} 
          className={`border-0 h-100 ${isOver ? 'bg-light' : ''}`}
          style={{ minHeight: '300px' }}
        >
          <Card.Header className="text-center text-white" style={{ backgroundColor: '#0d6efd' }}>
            {step.name} ({columnCandidates.length})
          </Card.Header>
          <Card.Body className="p-2" style={{ backgroundColor: '#f8f9fa' }}>
            {columnCandidates.map((candidate, index) => (
              <CandidateCard 
                key={index} 
                candidate={candidate} 
                columnId={step.id.toString()} 
              />
            ))}
          </Card.Body>
        </Card>
      </Col>
    );
  };

  // Página de carga
  if (loading) {
    console.log('Mostrando estado de carga');
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </Container>
    );
  }

  // Página de error
  if (error) {
    console.log('Mostrando mensaje de error:', error);
    return (
      <Container className="my-5">
        <Alert variant="danger">{error}</Alert>
        <button onClick={() => navigate('/positions')} className="btn btn-primary">
          Volver a Posiciones
        </button>
      </Container>
    );
  }

  console.log('Renderizando kanban con', interviewSteps.length, 'columnas y', candidates.length, 'candidatos');
  
  return (
    <DndProvider backend={HTML5Backend}>
      <Container fluid className="p-4 kanban-board">
        <div className="d-flex align-items-center mb-4">
          <button 
            onClick={() => navigate('/positions')} 
            className="btn btn-link text-decoration-none me-2"
            style={{ color: '#0d6efd' }}
            title="Volver a posiciones"
          >
            <ArrowLeft size={24} />
          </button>
          
          <button 
            onClick={() => navigate('/')} 
            className="btn btn-link text-decoration-none me-3"
            style={{ color: '#0d6efd' }}
            title="Ir al inicio"
          >
            <House size={22} />
          </button>
          
          <h2 className="mb-0 ms-1 fw-bold">{positionName}</h2>
        </div>
        
        <Row className="g-4 kanban-row">
          {interviewSteps.map(step => (
            <KanbanColumn key={step.id} step={step} />
          ))}
        </Row>
        
        {/* Toast para notificaciones */}
        <Toast 
          show={showToast} 
          onClose={() => setShowToast(false)} 
          delay={3000} 
          autohide
          className="notification-toast"
        >
          <Toast.Header>
            <strong className="me-auto">Notificación</strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </Container>
    </DndProvider>
  );
};

export default PositionKanban;
