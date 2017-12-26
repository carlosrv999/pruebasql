create table prueba(id int primary key, name varchar(20));

insert into prueba (id, name) values (1, 'carlos');

select * from prueba;

select * from curso;

create table prueba_curso (id_prueba int, id_curso int, primary key (id_prueba, id_curso));

alter table prueba_curso add constraint fk_prueba_pruebacurso foreign key(id_prueba) references prueba(id);
alter table prueba_curso add constraint fk_curso_pruebacurso foreign key(id_curso) references curso(id);


-- SCRIPT PARA CGL

create database db_cgl;

create user dev_cgl with password 'lt2M886a7bTAuEK';

GRANT ALL PRIVILEGES ON DATABASE "db_cgl" to dev_cgl;

create table cgl_client (
	"id"				serial primary key,
	"firstName"		varchar(50) not null,
	"lastName"		varchar(50) not null,
	"email"			varchar(50) not null CONSTRAINT proper_email CHECK (email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'),
	"phone1"			varchar(25) not null,
	"phone2"			varchar(25) not null,
	"businessName"	varchar(40) not null,
	"address"			varchar(100) not null,
	"status"			smallint not null default 1,
	"ruc"				varchar(11) not null constraint proper_ruc check (ruc ~* '^\d{11}$'),
	"fax"				varchar(25) not null,
	"fda"				varchar(20) not null,
	"userId"			integer not null,
	"personal"		json not null,
	constraint email_unique UNIQUE(email)
);

create table cgl_user (
	"id"				serial primary key,
	"email"			varchar(50) not null CONSTRAINT proper_email CHECK (email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'),
	"hashPassword"	varchar(64) not null,
	"status"			smallint not null default 1,
	"dateRegister"	DATE not null default current_date,
	"firstName"		varchar(50) not null,
	"lastName"		varchar(50) not null,
	"phone"			varchar(25) not null,
	"roleId"			integer not null,
	constraint email_unique_user UNIQUE(email)
);

create table cgl_role (
	"id"				serial primary key,
	"name"			varchar(50) not null,
	"description"		varchar(100) not null
);

create table cgl_credit (
	"id"				serial primary key,
	"amount"			numeric(14, 2) not null,
	"term"			int not null constraint term_multiple_15 check(term%15 = 0),
	"dateCreated"		date not null default current_date,
	"fromDate"		date not null,
	"toDate"			date not null,
	"status"			smallint not null default 1,
	"exoneration"		boolean not null,
	"currencyId"		integer not null,
	"clientId"		integer not null,
	"creditTypeId"	integer not null
);

create table cgl_currency (
	"id"				serial primary key,
	"name"			varchar(50) not null,
	"symbol"			varchar(5) not null
);

create table cgl_credittype (
	"id"				serial primary key,
	"name"			varchar(50) not null,
	"description"		varchar(100) not null
);

create table cgl_rate (
	"id"				serial primary key,
	"c20st"			numeric(14, 2) not null,
	"c40st"			numeric(14, 2) not null,
	"c40hc"			numeric(14, 2) not null,
	"c40nr"			numeric(14, 2) not null,
	"c20rf"			numeric(14, 2) not null,
	"c40rs"			numeric(14, 2) not null,
	"c40rh"			numeric(14, 2) not null,
	"c200t"			numeric(14, 2) not null,
	"c400t"			numeric(14, 2) not null,
	"c20fr"			numeric(14, 2) not null,
	"c40fr"			numeric(14, 2) not null,
	"c20re"			numeric(14, 2) not null,
	"c20it"			numeric(14, 2) not null,
	"c45hc"			numeric(14, 2) not null,
	"status"			smallint not null default 1,
	"dateCreated"		date not null default current_date,
	"currencyId"		integer not null,
	"portLoadId"		integer not null,
	"portDownloadId"	integer not null,
	"agentId"			integer not null,
	"lineId"			integer not null
);

create table cgl_agent (
	"id"				serial primary key,
	"name"			varchar(50) not null UNIQUE
);

create table cgl_line (
	"id"				serial primary key,
	"name"			varchar(50) not null UNIQUE
);

create table cgl_country (
	"id"				serial primary key,
	"code"			char(2) not null unique,
	"name"			varchar(50) not null,
	"status"			smallint not null default 1,
	"description"		varchar(100) not null
);

create table cgl_port (
	"id"				serial primary key,
	"code"			char(3) not null unique,
	"name"			varchar(50) not null,
	"status"			smallint not null default 1,
	"description"		varchar(100) not null,
	"countryId"		integer not null
);

alter table cgl_client
add constraint fk_client_user foreign key("userId") references cgl_user("id");

alter table cgl_user
add constraint fk_user_role foreign key("roleId") references cgl_role("id");

alter table cgl_credit
add constraint fk_credit_client foreign key("clientId") references cgl_client("id");

alter table cgl_credit
add constraint fk_credit_currency foreign key("currencyId") references cgl_currency("id");

alter table cgl_credit
add constraint fk_credit_credittype foreign key("creditTypeId") references cgl_credittype("id");

alter table cgl_rate
add constraint fk_rate_currency foreign key("currencyId") references cgl_currency("id");

alter table cgl_rate
add constraint fk_rate_portload foreign key("portLoadId") references cgl_port("id");

alter table cgl_rate
add constraint fk_rate_portdownload foreign key("portDownloadId") references cgl_port("id");

alter table cgl_rate
add constraint fk_rate_agent foreign key("agentId") references cgl_agent("id");

alter table cgl_rate
add constraint fk_rate_line foreign key("lineId") references cgl_line("id");

alter table cgl_port
add constraint fk_port_country foreign key("countryId") references cgl_country("id");

CREATE or replace FUNCTION agent_uppercase() RETURNS trigger AS $agent_uppercase$
    BEGIN      
        new.name = upper(new.name);
        RETURN NEW;
    END;
$agent_uppercase$ LANGUAGE plpgsql;


CREATE TRIGGER agent_uppercase BEFORE insert or UPDATE ON cgl_agent
    FOR EACH ROW EXECUTE PROCEDURE agent_uppercase();
    
CREATE or replace FUNCTION line_uppercase() RETURNS trigger AS $line_uppercase$
    BEGIN      
        new.name = upper(new.name);
        RETURN NEW;
    END;
$line_uppercase$ LANGUAGE plpgsql;

CREATE TRIGGER line_uppercase BEFORE insert or UPDATE ON cgl_line
    FOR EACH ROW EXECUTE PROCEDURE line_uppercase();