--
-- PostgreSQL database dump
--

\restrict fxZk1fee9FWQd5yRWHWIVDZJoLAo1AkUKbnauH8ZtArGtWj0jQqTRvhHPxdDITk

-- Dumped from database version 17.10 (Debian 17.10-1.pgdg13+1)
-- Dumped by pg_dump version 17.10 (Debian 17.10-1.pgdg13+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.categories (
    category_id text NOT NULL,
    category_name text NOT NULL,
    user_id text,
    status text NOT NULL
);


ALTER TABLE public.categories OWNER TO admin;

--
-- Name: meal_categories; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.meal_categories (
    meal_id text NOT NULL,
    category_id text NOT NULL
);


ALTER TABLE public.meal_categories OWNER TO admin;

--
-- Name: meal_types; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.meal_types (
    meal_id text NOT NULL,
    type_id text NOT NULL
);


ALTER TABLE public.meal_types OWNER TO admin;

--
-- Name: meals; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.meals (
    meal_id text NOT NULL,
    user_id text NOT NULL,
    meal_name text NOT NULL,
    meal_date text NOT NULL
);


ALTER TABLE public.meals OWNER TO admin;

--
-- Name: types; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.types (
    type_id text NOT NULL,
    user_id text,
    type_name text NOT NULL,
    status text NOT NULL
);


ALTER TABLE public.types OWNER TO admin;

--
-- Name: users; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.users (
    user_id text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    username text NOT NULL
);


ALTER TABLE public.users OWNER TO admin;

--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.categories (category_id, category_name, user_id, status) FROM stdin;
1	Chicken	\N	DEFAULT
2	Beef	\N	DEFAULT
3	Pork	\N	DEFAULT
4	Fish	\N	DEFAULT
5	Vegetable	\N	DEFAULT
6	Rice	\N	DEFAULT
7	Bread	\N	DEFAULT
8	Pasta	01a19879-86cd-7569-b0ee-0513707c2a8d	ACTIVE
9	Wheels	01a01ae9-ec74-70fe-8b98-a465e36ccd68	ACTIVE
\.


--
-- Data for Name: meal_categories; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.meal_categories (meal_id, category_id) FROM stdin;
01a1ba6a-5bc9-720d-9c5c-c962776a5544	5
\.


--
-- Data for Name: meal_types; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.meal_types (meal_id, type_id) FROM stdin;
01a1ba6a-5bc9-720d-9c5c-c962776a5544	3
\.


--
-- Data for Name: meals; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.meals (meal_id, user_id, meal_name, meal_date) FROM stdin;
01a1ba6a-5bc9-720d-9c5c-c962776a5544	01a04706-b5c1-705d-8d6e-470b64acd0cd	Adobo	2026-11-20
\.


--
-- Data for Name: types; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.types (type_id, user_id, type_name, status) FROM stdin;
1	\N	Breakfast	DEFAULT
2	\N	Lunch	DEFAULT
3	\N	Dinner	DEFAULT
4	\N	Snack	DEFAULT
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.users (user_id, email, password, created_at, username) FROM stdin;
01a01ae9-ec74-70fe-8b98-a465e36ccd68	g@slu.edu.ph	$2b$10$1Hi0TpHAK2rVP6FfJEfIdu9i5NyEM/m/fGV2Rth.t6wcinoPWsXtu	2026-08-19 16:45:33.17424+00	c0mgUi5V
01a01b27-62a2-7727-9a56-a1060e1395ba	tester@a.com	$2b$10$RYaGnghtqZBWfjo03y09aOZba1Xe14ohbuskcTlZ5JMAQVARDQMFG	2026-08-19 17:52:41.124189+00	7QJV8vXZ
01a02378-a6a0-774e-8b1c-dc593082980d	g123@slu.edu.ph	$2b$10$xd1AsZ2wUdwcpRa52Q128.DdUoFYJQmGUWY8EIUtpiqglfvIcyN2G	2026-08-21 08:38:24.674149+00	wcPjQ9iQ
01a04706-b5c1-705d-8d6e-470b64acd0cd	aaaaaaaaaaaaaa@slu.edu.ph	$2b$10$pHTD2XXcQyE4tNzJ4Ce/cOlRfC1tc8XyReRLgJnaOL.d23sBYxZUC	2026-08-28 06:20:17.218814+00	ynGtMXMc
01a19879-86cd-7569-b0ee-0513707c2a8d	67@a.com	$2b$10$qmqVsxHpAu05WZQsbKYn6u.GOStFwtR8XOzFcOzdLYhY219YItHre	2026-11-01 18:57:43.63005+00	fNnAuxoN
\.


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (category_id);


--
-- Name: meal_categories meal_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.meal_categories
    ADD CONSTRAINT meal_categories_pkey PRIMARY KEY (meal_id, category_id);


--
-- Name: meal_types meal_types_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.meal_types
    ADD CONSTRAINT meal_types_pkey PRIMARY KEY (meal_id, type_id);


--
-- Name: meals meals_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.meals
    ADD CONSTRAINT meals_pkey PRIMARY KEY (meal_id);


--
-- Name: types types_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.types
    ADD CONSTRAINT types_pkey PRIMARY KEY (type_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: categories categories_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- Name: meal_categories meal_categories_meal_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.meal_categories
    ADD CONSTRAINT meal_categories_meal_id_fkey FOREIGN KEY (meal_id) REFERENCES public.meals(meal_id) ON DELETE CASCADE;


--
-- Name: meal_types meal_types_meal_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.meal_types
    ADD CONSTRAINT meal_types_meal_id_fkey FOREIGN KEY (meal_id) REFERENCES public.meals(meal_id) ON DELETE CASCADE;


--
-- Name: meals meals_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.meals
    ADD CONSTRAINT meals_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- Name: types types_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.types
    ADD CONSTRAINT types_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict fxZk1fee9FWQd5yRWHWIVDZJoLAo1AkUKbnauH8ZtArGtWj0jQqTRvhHPxdDITk

