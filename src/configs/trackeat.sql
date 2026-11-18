--
-- PostgreSQL database dump
--

\restrict i4xoJcwUIY9odDw1WmKZdyXpbgXK4a3qP5mH0Xhut1h3psjX269qApvjalXx8Bf

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

\unrestrict i4xoJcwUIY9odDw1WmKZdyXpbgXK4a3qP5mH0Xhut1h3psjX269qApvjalXx8Bf

