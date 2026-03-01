-- Criando o primeiro usuário Admin (Senha 'admin123')
-- Nota: Em produção usaríamos o BCrypt, aqui é para o seu primeiro acesso
INSERT INTO users (login, password, role) VALUES ('willian', '$2a$10$YourBCryptHashHere', 'ADMIN');

-- Criando alguns equipamentos para o Rhuan testar a tela de locação
INSERT INTO equipamentos (nome, marca, valor_diaria, status) VALUES ('Gerador 50kVA', 'Toyama', 150.00, 'DISPONIVEL');
INSERT INTO equipamentos (nome, marca, valor_diaria, status) VALUES ('Compressor de Ar', 'Schulz', 80.00, 'DISPONIVEL');

-- Criando um veículo para testar a oficina
INSERT INTO veiculos (placa, modelo, km_atual) VALUES ('ABC-1234', 'Volvo FH 540', 150000);