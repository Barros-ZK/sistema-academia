CREATE TABLE tb_assinantes (
  ass_id int NOT NULL AUTO_INCREMENT,
  ass_cpf varchar(11),
  ass_nome varchar(100),
  ass_telefone varchar(20),
  PRIMARY KEY (ass_id)
); 

create table tb_avaliacoes (
	ava_id int primary key auto_increment,
    ass_id int,
    ava_data datetime,
    ava_pdf mediumblob,
    
    constraint fk_assinantes_avaliacoes FOREIGN key (ass_id) references tb_assinantes (ass_id)
);

CREATE TABLE tb_exercicios (
  exe_id int NOT NULL AUTO_INCREMENT,
  exe_nome varchar(100),
  exe_musculo enum('Bíceps', 'Tríceps', 'Antebraço', 'Ombro', 'Peito', 'Costa', 'Abdômen', 'Perna', 'Glúteo', 'Panturrilha', 'Miscelânea'),
  exe_imagem mediumblob,
  PRIMARY KEY (exe_id)
); 

create table tb_planilhas (
	pla_id int primary key auto_increment,
    ass_id int,
    pla_domingo json,
    pla_segunda json,
    pla_terca json,
    pla_quarta json,
    pla_quinta json,
    pla_sexta json,
    pla_sabado json,
    
    constraint fk_assinantes_planilhas FOREIGN key (ass_id) references tb_assinantes (ass_id)
);

CREATE TABLE tb_planilhasseries (
  plaseries_id int primary key auto_increment,
  pla_id int,
  plaseries_series int,
  plaseries_repeticoes int,
  
  constraint fk_planilhas_planilhasseries FOREIGN key (pla_id) references tb_planilhas (pla_id)
); 

CREATE TABLE tb_funcionarios (
  fun_id int NOT NULL AUTO_INCREMENT,
  fun_cpf varchar(11),
  fun_nome varchar(100),
  fun_telefone varchar(20),
  fun_senha varchar(100),
  fun_cargo enum('Dono', 'Instrutor'),
  fun_ativo enum('S', 'N'),
  PRIMARY KEY (fun_id)
); 

insert into tb_funcionarios (fun_cpf, fun_nome, fun_telefone, fun_senha, fun_cargo, fun_ativo) values ('12345678909', 'Admin', '11123456789', 'admin', 'Dono', 'S');
insert into tb_funcionarios (fun_cpf, fun_nome, fun_telefone, fun_senha, fun_cargo, fun_ativo) values ('12345678909', 'Ex-Admin', '12345678999', 'exadmin', 'Dono', 'N');