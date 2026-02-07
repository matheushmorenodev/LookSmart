    export interface UserData {
  id: number;
  nome: string;
  email: string;
  senha: string;
  telefone?: string;
  endereco?:{
    rua: string;
    cidade: string;
    estado: string;
    cep: string;
  }
  avatarUrl?: string; // Opcional para o futuro
}

export const MOCK_USERS: UserData[] = [
  {
    id: 1,
    nome: "Matheus Silva",
    email: "matheus@gmail.com",
    senha: "1234",
    telefone: "(11) 91234-5678",
    endereco: {
        rua: "Rua exemplo, 123",
        cidade: "São Paulo",
        estado: "SP",
        cep: "01000-000"
    }
  },
  {
    id: 2,
    nome: "Ana Paula",
    email: "ana.paula@email.com",
    senha: "5678",
    telefone: "(11) 99012-3456",
    endereco: {
        rua: "Rua exemplo, 456",
        cidade: "Poços de Caldas",
        estado: "MG",
        cep: "01222-010"
    }
  },
  {
    id: 3,
    nome: "Carlos Oliveira",
    email: "carlos.oliveira@email.com",
    senha: "9012",
    telefone: "(35) 98835-7187",
    endereco: {
        rua: "Rua exemplo, 789",
        cidade: "Rio de Janeiro",
        estado: "RJ",
        cep: "37701-143"
    }
  }
];