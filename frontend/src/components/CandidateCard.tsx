import React from 'react';
import { Card } from 'react-bootstrap';
import { useDrag } from 'react-dnd';
import { Candidate } from '../services/positionService';

interface CandidateCardProps {
  candidate: Candidate;
  columnId: string;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate, columnId }) => {
  console.log('Renderizando CandidateCard:', candidate.fullName, 'en columna:', columnId);
  
  // Verificamos que candidate.id exista
  if (!candidate.id) {
    console.warn('Advertencia: candidate.id no está definido para', candidate.fullName);
  }
  
  // Configuración de arrastrar y soltar
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'CANDIDATE',
    item: { 
      id: candidate.id, 
      currentColumn: columnId,
      fullName: candidate.fullName 
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }));

  console.log('Estado de arrastre para', candidate.fullName, ':', isDragging ? 'arrastrando' : 'no arrastrando');

  // Función para renderizar las estrellas según la puntuación
  const renderStars = (score: number) => {
    const maxStars = 5;
    const fullStars = Math.floor(score);
    
    return (
      <div className="d-flex align-items-center">
        {[...Array(maxStars)].map((_, index) => (
          <span 
            key={index} 
            className={index < fullStars ? "star-rating" : "star-empty"}
            style={{ fontSize: '16px' }}
          >
            ★
          </span>
        ))}
        <span className="ms-1 text-muted">({score})</span>
      </div>
    );
  };

  return (
    <Card 
      ref={drag} 
      className={`mb-2 shadow-sm border-0 candidate-card ${isDragging ? 'opacity-50' : ''}`}
      style={{ 
        cursor: 'move',
        backgroundColor: 'white'
      }}
    >
      <Card.Body className="p-3">
        <div className="text-center mb-2">
          <Card.Title as="h6" className="mb-0 fw-bold">{candidate.fullName}</Card.Title>
        </div>
        <div className="d-flex justify-content-center">
          {renderStars(candidate.averageScore)}
        </div>
      </Card.Body>
    </Card>
  );
};

export default CandidateCard;
