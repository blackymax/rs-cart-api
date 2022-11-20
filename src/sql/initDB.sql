-- public.users definition

-- Drop table

-- DROP TABLE public.users;

CREATE TABLE public.users (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	"name" text NULL,
	"password" text NULL,
	email text NULL,
	CONSTRAINT users_pkey PRIMARY KEY (id)
);


-- public.cart_items definition

-- Drop table

-- DROP TABLE public.cart_items;

CREATE TABLE public.cart_items (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	cart_id uuid NULL,
	product_id uuid NULL,
	count int4 NULL
);


-- public.carts definition

-- Drop table

-- DROP TABLE public.carts;

CREATE TABLE public.carts (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	user_id uuid NULL,
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT carts_pkey PRIMARY KEY (id)
);


-- public.orders definition

-- Drop table

-- DROP TABLE public.orders;

CREATE TABLE public.orders (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	user_id uuid NULL,
	cart_id uuid NULL,
	payment json NULL,
	delievery json NULL,
	"comments" text NULL,
	status text NULL,
	total int4 NULL,
	CONSTRAINT orders_pkey PRIMARY KEY (id)
);


-- public.cart_items foreign keys

-- public.carts foreign keys

-- public.orders foreign keys

ALTER TABLE public.orders ADD CONSTRAINT orders_cart_id_fkey FOREIGN KEY (cart_id) REFERENCES public.carts(id) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE public.orders ADD CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE ON UPDATE CASCADE;


INSERT INTO public.carts (id,user_id,created_at,updated_at) VALUES
	 ('91321d03-7452-4856-b93e-2b282ea9a5e4','9c074dae-3595-4b59-b40f-c5f8196d4abc','2022-11-20 08:39:58.931538','2022-11-20 08:39:58.931538');


INSERT INTO public.cart_items (id,cart_id,product_id,count) VALUES
	 ('f9a0df7a-380f-4509-b5ec-faa957ec12ac','91321d03-7452-4856-b93e-2b282ea9a5e4','42249185-e2a7-43e3-ae69-b78b4c5c37cb',1),
	 ('9aa86ea0-9758-40c2-94f3-91514daa06ab','91321d03-7452-4856-b93e-2b282ea9a5e4','b7fe9856-bd56-45b1-8e9a-f7ab9778154a',2);


INSERT INTO public.orders (id,user_id,cart_id,payment,delievery,"comments",status,total) VALUES
	 ('7179d9fb-0c44-4b8b-a56d-729f2abf582d','9c074dae-3595-4b59-b40f-c5f8196d4abc','91321d03-7452-4856-b93e-2b282ea9a5e4','{"pay":"0"}','{"comment":"s","address":"s","lastName":"s","firstName":"s"}','s','inProgress',0);


INSERT INTO public.users (id,"name","password",email) VALUES
	 ('9c074dae-3595-4b59-b40f-c5f8196d4abc','maxim','maxim','maxim@gmail.com');