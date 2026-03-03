-- Cadastro de Usuários (Senha '123456' criptografada em BCrypt)
-- Role 0 = ADMIN, Role 1 = USER
INSERT INTO tb_users (nome, email, senha, role) VALUES ('Willian Pai', 'admin@jrpesados.com.br', '$2a$10$e7m6.V.qA.v.A.v.A.v.A.v.A.v.A.v.A.v.A.v.A.v.A.v', 0);
INSERT INTO tb_users (nome, email, senha, role) VALUES ('Cliente Teste', 'cliente@gmail.com', '$2a$10$e7m6.V.qA.v.A.v.A.v.A.v.A.v.A.v.A.v.A.v.A.v.A.v', 1);

-- Cadastro de Veículos (Caminhões da Frota)
INSERT INTO tb_veiculos (placa, modelo, latitude, longitude, status_carga, previsao_chegada, descricao_carga, peso_carga)
VALUES ('ABC-1234', 'Scania R450', -23.4456, -46.9123, 1, '18:00', 'Bobinas de Aço', 25.5);

-- Cadastro de Equipamentos (Locação)
INSERT INTO tb_equipamentos (nome, marca, categoria, preco_diaria)
VALUES ('Guindaste Articulado', 'Madal Palfinger', 'Elevação', 1500.00);
INSERT INTO tb_equipamentos (nome, marca, categoria, preco_diaria)
VALUES ('Empilhadeira 7ton', 'Hyster', 'Logística', 800.00);

-- Criando uma Locação para o Cliente Teste ver no Perfil dele
-- Vincula o Cliente (ID 2) ao Veículo (ID 1) e Equipamento (ID 1)
INSERT INTO tb_locacoes (cliente_id, veiculo_id, equipamento_id, status, data_devolucao_prevista)
VALUES (2, 1, 1, 0, '2026-03-10');