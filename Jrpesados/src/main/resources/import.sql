-- Cadastro de Usuários (Senha '123456' criptografada em BCrypt)
-- Table: tb_usuarios
-- IDs must be valid UUID strings
INSERT INTO tb_usuarios (id, email, password, role) VALUES ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'admin@jrpesados.com.br', '$2a$10$e7m6.V.qA.v.A.v.A.v.A.v.A.v.A.v.A.v.A.v.A.v.A.v', 'ADMIN');
INSERT INTO tb_usuarios (id, email, password, role) VALUES ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'cliente@gmail.com', '$2a$10$e7m6.V.qA.v.A.v.A.v.A.v.A.v.A.v.A.v.A.v.A.v.A.v', 'CLIENT');

-- Cadastro de Veículos (Caminhões da Frota)
-- Table: tb_veiculos
-- (Serão auto-cadastrados via SSX)

-- Cadastro de Equipamentos (Locação)
-- Table: tb_equipamentos
INSERT INTO tb_equipamentos (nome, marca, modelo, numero_serie, valor_diaria, status)
VALUES ('Guindaste Articulado', 'Madal Palfinger', 'PK 23500', 'GT-001', 1500.00, 'DISPONIVEL');
INSERT INTO tb_equipamentos (nome, marca, modelo, numero_serie, valor_diaria, status)
VALUES ('Empilhadeira 7ton', 'Hyster', 'H155FT', 'EMP-001', 800.00, 'DISPONIVEL');

-- Criando uma Locação para o Cliente Teste (Apenas equipamentos, sem vínculo de caminhão por enquanto)
-- Table: tb_locacoes
INSERT INTO tb_locacoes (cliente_id, equipamento_id, status, data_devolucao_prevista)
VALUES ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 1, 'ATIVA', '2026-03-30T00:00:00');