import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App Component', () => {
    it('renders the main application', () => {
        render(<App />);
        // Check for navigation tabs
        expect(screen.getByRole('heading', { name: /Linha do Tempo/i })).toBeInTheDocument();
        expect(screen.getByText(/Apresentação/i)).toBeInTheDocument();
    });

    it('renders the Timeline tab by default', () => {
        render(<App />);
        // "Bioética: Uma Evolução Histórica" is in the TimelineSection
        // Note: The text is split in span, so we check for part of it or use a custom matcher if needed.
        // But "Bioética" and "Uma Evolução Histórica" are separate elements/nodes potentially.
        // Let's check for the button "Filtrar Eventos" which is in TimelineSection
        expect(screen.getByText(/Mostrar Filtros/i)).toBeInTheDocument();
    });
});
