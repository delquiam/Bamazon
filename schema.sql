drop database if exists bamazon;

create database bamazon;

use bamazon;

create table products(
	item_id int not null auto_increment,
	product_name varchar(30) null,
    department_name varchar(30) null,
    price decimal(10,2) default null,
	stock_quantity int (100) default null,
    primary key(item_id)
);