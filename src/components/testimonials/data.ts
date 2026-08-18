export interface Testimonial {
  name: string;
  role: string;
  company: string;
  text: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Carlos Mendoza',
    role: 'Director de Operaciones',
    company: 'Importadora Metalúrgica del Norte',
    text: 'Trabajar con GreyLion Maritime ha transformado nuestra cadena de suministro. La eficiencia en el fletamento marítimo y la gestión aduanera nos ahorra semanas de retrasos portuarios innecesarios.',
  },
  {
    name: 'Valeria Santos',
    role: 'Gerente de Logística',
    company: 'Agroexportadora del Sur',
    text: 'Exportamos frutas frescas y la cadena de frío es vital. GreyLion nos asegura contenedores reefer confiables y espacio con las mejores navieras incluso en temporada alta.',
  },
  {
    name: 'Alejandro Ruiz',
    role: 'Director de Infraestructura',
    company: 'Constructora Andina S.A.',
    text: 'La coordinación de maquinaria especializada y materiales para nuestros proyectos viales ha sido impecable. Siempre recibimos información clara y soluciones oportunas.',
  },
  {
    name: 'Marcus Vance',
    role: 'Especialista en Adquisición',
    company: 'Reciclajes Metálicos Globales',
    text: 'El comercio de materiales metálicos para reciclaje fluye sin contratiempos. Sus servicios de embalaje y almacenamiento portuario temporal son de primer nivel.',
  },
];

export interface OperationStat {
  value: string;
  label: string;
}

export const OPERATION_STATS: OperationStat[] = [
  { value: '120+', label: 'Rutas activas' },
  { value: '24/7', label: 'Seguimiento humano' },
  { value: '98%', label: 'Entregas a tiempo' },
];
