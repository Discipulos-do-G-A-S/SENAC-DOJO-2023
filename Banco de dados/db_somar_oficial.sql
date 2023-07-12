create database DB_somar;
use DB_somar;

create table users (
id_user int not null auto_increment primary key,
nome_user varchar(50) not null,
email_user varchar(50) not null,
cpf_user varchar(11) not null,
password_user varchar(20) not null
);
create table ods (
 id_ods int not null  auto_increment primary key,
 nome_ods varchar(50) not null
);
create table parceiros (
id_parceiro int not null auto_increment primary key,
nome_parceiro varchar(45) not null
);
create table projetos(
id_projeto int not null auto_increment primary key,
nome_projeto varchar(45) not null,
estado_projeto varchar(2) not null,
cidade_projeto varchar(45) not null,
descricao_projeto longtext not null,
objetivo_projeto varchar(45) not null,
user_id int not null,
foreign key (user_id) references users(id_user)
);
create table projetos_com_ods_parceiros(
projeto_id int not null,
ods_id int,
parceiro_id int,
foreign key (projeto_id) references projetos(id_projeto),
foreign key (ods_id) references ods(id_ods),
foreign key (parceiro_id) references parceiros(id_parceiro)
);

insert into users values (null,'lucas pedroso','pedrosolucas1745@gmail.com','12345','teste');

insert into ODs values
                        (null,'Erradicação da pobreza'),
					    (null,'Fome zero e agricultura sustentável'),
                        (null,'Saúde e bem-estar'),
                        (null,'Educação de qualidade'),
                        (null,'Igualdade de gênero'),
                        (null,'Água potável e saneamento'),
                        (null,'Energia limpa e acessível'),
                        (null,'Trabalho decente e crescimento econômico'),
                        (null,'Industria,Inovação e Infrestutura'),
                        (null,'Redução das desigualdades'),
                        (null,'Cidade e comunidades sustentáveis'),
                        (null,'Consumo e produção responsaveis'),
                        (null,'Ação contra a mudança global do clima'),
                        (null,'Vida na água'),
                        (null,'Vida terrestre'),
                        (null,'Paz, justiça e instituições eficazes'),
                        (null,'Parceria e meios de implementação');
                        
insert into parceiros values
                            (null,'ONU'),
							(null,'SENAC'),
                            (null,'SESC');
                            
insert into projetos values (null,'teste','poa','fazer um teste','objetivo',null,1);
insert into projetos_com_ods_parceiros values(1,1,null);
                            
select id_user,cpf_user,password_user from users where cpf_user = '12345' and password_user='teste';

SELECT projetos.*, ods.nome_ods, COALESCE(parceiros.nome_parceiro, 'NULL') AS nome_parceiro
FROM projetos
LEFT JOIN projetos_com_ods_parceiros ON projetos.id_projeto = projetos_com_ods_parceiros.projeto_id
LEFT JOIN ods ON projetos_com_ods_parceiros.ods_id = ods.id_ods
LEFT JOIN parceiros ON projetos_com_ods_parceiros.parceiro_id = parceiros.id_parceiro
WHERE ods.id_ods = 1;

SELECT projetos.*, ods.nome_ods, parceiros.nome_parceiro
FROM projetos
LEFT JOIN projetos_com_ods_parceiros ON projetos.id_projeto = projetos_com_ods_parceiros.projeto_id
LEFT JOIN ods ON projetos_com_ods_parceiros.ods_id = ods.id_ods
LEFT JOIN parceiros ON projetos_com_ods_parceiros.parceiro_id = parceiros.id_parceiro
WHERE id_ods =2;

select * from projetos_com_ods_parceiros;

SELECT projetos.*, ods.*, parceiros.*
FROM projetos_com_ods_parceiros
INNER JOIN parceiros ON projetos_com_ods_parceiros.parceiro_id = parceiros.id_parceiro
INNER JOIN ods ON projetos_com_ods_parceiros.ods_id = ods.id_ods
INNER JOIN projetos ON projetos_com_ods_parceiros.projeto_id = id_projeto;

drop database db_somar;


INSERT INTO projetos (nome_projeto, estado_projeto, cidade_projeto, descricao_projeto, objetivo_projeto, user_id)
VALUES ('Projeto 1', 'SP', 'São Paulo', 'Descrição do Projeto 1', 'Objetivo do Projeto 1', 1);

INSERT INTO projetos (nome_projeto, estado_projeto, cidade_projeto, descricao_projeto, objetivo_projeto, user_id)
VALUES ('Projeto 2', 'RJ', 'Rio de Janeiro', 'Descrição do Projeto 2', 'Objetivo do Projeto 2', 1);

INSERT INTO projetos (nome_projeto, estado_projeto, cidade_projeto, descricao_projeto, objetivo_projeto, user_id)
VALUES ('Projeto 3', 'MG', 'Belo Horizonte', 'Descrição do Projeto 3', 'Objetivo do Projeto 3', 1);

INSERT INTO projetos (nome_projeto, estado_projeto, cidade_projeto, descricao_projeto, objetivo_projeto, user_id)
VALUES ('Projeto 15', 'RS', 'Porto Alegre', 'Descrição do Projeto 15', 'Objetivo do Projeto 15', 1);





