create table prueba(id int primary key, name varchar(20));

insert into prueba (id, name) values (1, 'carlos');

select * from prueba;

select * from curso;

create table prueba_curso (id_prueba int, id_curso int, primary key (id_prueba, id_curso));

alter table prueba_curso add constraint fk_prueba_pruebacurso foreign key(id_prueba) references prueba(id);
alter table prueba_curso add constraint fk_curso_pruebacurso foreign key(id_curso) references curso(id);