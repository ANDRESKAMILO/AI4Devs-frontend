import axios from 'axios';

const API_URL = 'http://localhost:3010';

// Tipo para los datos de la API de entrevista
export interface InterviewStep {
  id: number;
  interviewFlowId: number;
  interviewTypeId: number;
  name: string;
  orderIndex: number;
}

export interface InterviewFlow {
  id: number;
  description: string;
  interviewSteps: InterviewStep[];
}

export interface PositionFlow {
  positionName: string;
  interviewFlow: InterviewFlow;
}

// Tipo para los datos de la API de candidatos
export interface Candidate {
  fullName: string;
  currentInterviewStep: string;
  averageScore: number;
  id?: number; // Asumimos que tiene un ID para actualizar
}

// Interfaces para la estructura de datos mock
export interface PositionData {
  flow: PositionFlow;
  candidates: Candidate[];
}

// Tipo de datos para las posiciones mock
type MockPositionsDataType = Record<string, PositionData>;

// Datos mock para desarrollo sin backend - Múltiples posiciones
const mockPositionsData: MockPositionsDataType = {
  "1": {
    flow: {
      positionName: "Ingeniero Senior de Backend",
      interviewFlow: {
        id: 1,
        description: "Standard development interview process",
        interviewSteps: [
          {
            id: 1,
            interviewFlowId: 1,
            interviewTypeId: 1,
            name: "Llamada telefónica",
            orderIndex: 1
          },
          {
            id: 2,
            interviewFlowId: 1,
            interviewTypeId: 2,
            name: "Entrevista técnica",
            orderIndex: 2
          },
          {
            id: 3,
            interviewFlowId: 1,
            interviewTypeId: 3,
            name: "Entrevista Cultural",
            orderIndex: 3
          },
          {
            id: 4,
            interviewFlowId: 1,
            interviewTypeId: 4,
            name: "Entrevista manager",
            orderIndex: 4
          }
        ]
      }
    },
    candidates: [
      {
        id: 1,
        fullName: "Carlos García",
        currentInterviewStep: "Llamada telefónica",
        averageScore: 0
      },
      {
        id: 2,
        fullName: "Ana Martínez",
        currentInterviewStep: "Llamada telefónica",
        averageScore: 3
      },
      {
        id: 3,
        fullName: "Jane Smith",
        currentInterviewStep: "Entrevista técnica",
        averageScore: 4
      },
      {
        id: 4,
        fullName: "Maria Johnson",
        currentInterviewStep: "Entrevista técnica",
        averageScore: 2
      },
      {
        id: 5,
        fullName: "Juan Fulano",
        currentInterviewStep: "Entrevista Cultural",
        averageScore: 5
      }
    ]
  },
  "2": {
    flow: {
      positionName: "Ingeniero Junior de Android",
      interviewFlow: {
        id: 2,
        description: "Mobile development interview process",
        interviewSteps: [
          {
            id: 4,
            interviewFlowId: 2,
            interviewTypeId: 1,
            name: "Llamada telefónica",
            orderIndex: 1
          },
          {
            id: 5,
            interviewFlowId: 2,
            interviewTypeId: 2,
            name: "Entrevista técnica",
            orderIndex: 2
          },
          {
            id: 6,
            interviewFlowId: 2,
            interviewTypeId: 3,
            name: "Entrevista Cultural",
            orderIndex: 3
          },
          {
            id: 10,
            interviewFlowId: 2,
            interviewTypeId: 4,
            name: "Entrevista manager",
            orderIndex: 4
          }
        ]
      }
    },
    candidates: [
      {
        id: 6,
        fullName: "Pedro López",
        currentInterviewStep: "Llamada telefónica",
        averageScore: 2
      },
      {
        id: 7,
        fullName: "Sophie Turner",
        currentInterviewStep: "Entrevista técnica",
        averageScore: 4
      },
      {
        id: 8,
        fullName: "Roberto Gómez",
        currentInterviewStep: "Entrevista Cultural",
        averageScore: 5
      }
    ]
  },
  "3": {
    flow: {
      positionName: "Gerente de Producto",
      interviewFlow: {
        id: 3,
        description: "Product management interview process",
        interviewSteps: [
          {
            id: 7,
            interviewFlowId: 3,
            interviewTypeId: 1,
            name: "Llamada telefónica",
            orderIndex: 1
          },
          {
            id: 8,
            interviewFlowId: 3,
            interviewTypeId: 2,
            name: "Entrevista técnica",
            orderIndex: 2
          },
          {
            id: 9,
            interviewFlowId: 3,
            interviewTypeId: 3,
            name: "Entrevista Cultural",
            orderIndex: 3
          },
          {
            id: 11,
            interviewFlowId: 3,
            interviewTypeId: 4,
            name: "Entrevista manager",
            orderIndex: 4
          }
        ]
      }
    },
    candidates: [
      {
        id: 9,
        fullName: "Laura Sánchez",
        currentInterviewStep: "Llamada telefónica",
        averageScore: 3
      },
      {
        id: 10,
        fullName: "Marcos Rodríguez",
        currentInterviewStep: "Entrevista técnica",
        averageScore: 3
      },
      {
        id: 11,
        fullName: "Elena Martín",
        currentInterviewStep: "Entrevista Cultural",
        averageScore: 4
      }
    ]
  }
};

// Bandera para usar datos mock en desarrollo
const USE_MOCK_DATA = true;

// Obtener datos del flujo de entrevistas para una posición
export const getPositionInterviewFlow = async (positionId: string): Promise<PositionFlow> => {
  if (USE_MOCK_DATA) {
    return new Promise((resolve) => {
      // Verificar si existe la posición en los datos mock
      if (mockPositionsData[positionId]) {
        setTimeout(() => resolve(mockPositionsData[positionId].flow), 800); // Simular delay de red
      } else {
        // Si no existe, devolver la primera posición como fallback
        console.warn(`Posición con ID ${positionId} no encontrada, usando datos de fallback`);
        setTimeout(() => resolve(mockPositionsData["1"].flow), 800);
      }
    });
  }
  
  try {
    const response = await axios.get(`${API_URL}/positions/${positionId}/interviewFlow`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener el flujo de entrevistas:', error);
    throw error;
  }
};

// Obtener candidatos para una posición
export const getPositionCandidates = async (positionId: string): Promise<Candidate[]> => {
  if (USE_MOCK_DATA) {
    return new Promise((resolve) => {
      // Verificar si existe la posición en los datos mock
      if (mockPositionsData[positionId]) {
        setTimeout(() => resolve(mockPositionsData[positionId].candidates), 1000); // Simular delay de red
      } else {
        // Si no existe, devolver candidatos de la primera posición como fallback
        console.warn(`Posición con ID ${positionId} no encontrada, usando datos de fallback`);
        setTimeout(() => resolve(mockPositionsData["1"].candidates), 1000);
      }
    });
  }
  
  try {
    const response = await axios.get(`${API_URL}/positions/${positionId}/candidatos`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener candidatos:', error);
    throw error;
  }
};

// Actualizar el estado de un candidato
export const updateCandidateStage = async (candidateId: string, applicationId: string, newStageId: string): Promise<any> => {
  if (USE_MOCK_DATA) {
    return new Promise((resolve) => {
      // Buscamos el candidato en todas las posiciones
      let candidateFound = false;
      
      Object.keys(mockPositionsData).forEach((positionId: string) => {
        const position = mockPositionsData[positionId];
        const candidateIndex = position.candidates.findIndex((c: Candidate) => c.id === parseInt(candidateId));
        
        if (candidateIndex >= 0) {
          candidateFound = true;
          
          // Encontrar el nombre del paso usando el ID
          let stepName = '';
          position.flow.interviewFlow.interviewSteps.forEach((step: InterviewStep) => {
            if (step.id === parseInt(newStageId)) {
              stepName = step.name;
            }
          });
          
          // Actualizar el paso del candidato
          if (stepName) {
            position.candidates[candidateIndex].currentInterviewStep = stepName;
          }
        }
      });
      
      if (!candidateFound) {
        console.warn(`Candidato con ID ${candidateId} no encontrado en ninguna posición`);
      }
      
      setTimeout(() => resolve({
        message: "Candidate stage updated successfully",
        data: {
          id: parseInt(candidateId),
          positionId: 1,
          candidateId: parseInt(candidateId),
          applicationDate: new Date().toISOString(),
          currentInterviewStep: parseInt(newStageId),
          notes: null,
          interviews: []
        }
      }), 500); // Simular delay de red
    });
  }
  
  try {
    const response = await axios.put(`${API_URL}/candidatos/${candidateId}/escenario`, {
      applicationId,
      currentInterviewStep: newStageId
    });
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el estado del candidato:', error);
    throw error;
  }
};
