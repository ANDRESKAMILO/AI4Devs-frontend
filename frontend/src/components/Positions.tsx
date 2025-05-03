import React from 'react';
import { Card, Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { House } from 'react-bootstrap-icons';

type Position = {
    id?: number;
    title: string;
    manager: string;
    deadline: string;
    status: 'Abierto' | 'Contratado' | 'Cerrado' | 'Borrador';
};

const mockPositions: Position[] = [
    { id: 1, title: 'Ingeniero Senior de Backend', manager: 'John Doe', deadline: '2024-12-31', status: 'Abierto' },
    { id: 2, title: 'Ingeniero Junior de Android', manager: 'Jane Smith', deadline: '2024-11-15', status: 'Contratado' },
    { id: 3, title: 'Gerente de Producto', manager: 'Alex Jones', deadline: '2024-07-31', status: 'Borrador' }
];

const Positions: React.FC = () => {
    const navigate = useNavigate();

    console.log('Renderizando componente Positions');

    const handleViewProcess = (positionId: number | undefined) => {
        if (positionId) {
            console.log('Navegando a la posición con ID:', positionId);
            const path = `/positions/${positionId}`;
            console.log('Ruta de navegación:', path);
            navigate(path);
        } else {
            console.error('Se intentó navegar a una posición sin ID');
        }
    };

    return (
        <Container className="mt-5">
            <div className="d-flex align-items-center mb-4">
                <button 
                    onClick={() => navigate('/')} 
                    className="btn btn-link text-decoration-none me-3"
                    style={{ color: '#0d6efd' }}
                    title="Ir al inicio"
                >
                    <House size={22} />
                </button>
                <h2 className="mb-0 flex-grow-1 text-center">Posiciones</h2>
            </div>
            <Row className="mb-4">
                <Col md={3}>
                    <Form.Control type="text" placeholder="Buscar por título" />
                </Col>
                <Col md={3}>
                    <Form.Control type="date" placeholder="Buscar por fecha" />
                </Col>
                <Col md={3}>
                    <Form.Control as="select">
                        <option value="">Estado</option>
                        <option value="open">Abierto</option>
                        <option value="filled">Contratado</option>
                        <option value="closed">Cerrado</option>
                        <option value="draft">Borrador</option>
                    </Form.Control>
                </Col>
                <Col md={3}>
                    <Form.Control as="select">
                        <option value="">Manager</option>
                        <option value="john_doe">John Doe</option>
                        <option value="jane_smith">Jane Smith</option>
                        <option value="alex_jones">Alex Jones</option>
                    </Form.Control>
                </Col>
            </Row>
            <Row>
                {mockPositions.map((position, index) => (
                    <Col md={4} key={index} className="mb-4">
                        <Card className="shadow-sm">
                            <Card.Body>
                                <Card.Title>{position.title}</Card.Title>
                                <Card.Text>
                                    <strong>Manager:</strong> {position.manager}<br />
                                    <strong>Deadline:</strong> {position.deadline}
                                </Card.Text>
                                <span className={`badge ${position.status === 'Abierto' ? 'bg-warning' : position.status === 'Contratado' ? 'bg-success' : position.status === 'Borrador' ? 'bg-secondary' : 'bg-warning'} text-white`}>
                                    {position.status}
                                </span>
                                <div className="d-flex justify-content-between mt-3">
                                    <Button 
                                        variant="primary" 
                                        onClick={() => handleViewProcess(position.id)}
                                    >
                                        Ver proceso
                                    </Button>
                                    <Button variant="secondary">Editar</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Positions;