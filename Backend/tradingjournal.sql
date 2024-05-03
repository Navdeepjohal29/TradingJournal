--
-- PostgreSQL database dump
--

-- Dumped from database version 14.7
-- Dumped by pg_dump version 14.7 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
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
-- Name: trades; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.trades (
    ticker character varying(100),
    action character varying(255),
    result character varying(255),
    amount numeric,
    trade_execute_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    id integer NOT NULL
);


ALTER TABLE public.trades OWNER TO postgres;

--
-- Name: trades_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.trades_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.trades_id_seq OWNER TO postgres;

--
-- Name: trades_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.trades_id_seq OWNED BY public.trades.id;


--
-- Name: user_info; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_info (
    name character varying(32),
    email character varying(64),
    password character varying(32),
    phone character varying(32)
);


ALTER TABLE public.user_info OWNER TO postgres;

--
-- Name: trades id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trades ALTER COLUMN id SET DEFAULT nextval('public.trades_id_seq'::regclass);


--
-- Data for Name: trades; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.trades (ticker, action, result, amount, trade_execute_date, id) FROM stdin;
tyu	Call	Loss	60	2024-03-13 15:19:02.996047-07	1
new	Put	Profit	300	2024-03-14 13:07:48.679992-07	2
tyest	Put	Profit	20	2024-03-14 16:07:44.050342-07	3
new	Call	Loss	30	2024-03-14 16:08:20.919804-07	4
tesc	Put	Profit	3	2024-03-14 16:08:34.548336-07	5
zs	Put	Loss	11	2024-03-21 13:35:14.890869-07	6
yu	Put	Loss	78	2024-03-21 13:37:42.550487-07	7
ert	Call	Profit	45	2024-03-25 13:38:21.492962-07	9
er	Put	Profit	40	2024-03-25 13:38:36.646741-07	10
er	Put	Profit	40	2024-03-25 13:38:49.103392-07	11
new trade	Call	Loss	200	2024-03-25 13:39:46.505686-07	12
tyuv	Call	Loss	30	2024-03-25 13:40:53.368947-07	13
opp	Call	Profit	100	2024-03-25 15:55:54.243353-07	14
newtrade	Put	Loss	100	2024-03-26 13:02:23.142892-07	17
yuv	Call	Profit	100	2024-03-26 13:17:49.950443-07	18
test	Put	Profit	100	2024-03-26 13:18:59.859646-07	19
22	Call	Loss	20	2024-03-26 13:24:59.396226-07	20
test	Put	Profit	23	2024-03-26 13:45:27.913267-07	21
yuvn	Call	Profit	20	2024-03-26 13:46:29.763918-07	22
PS	CALL	PROFIT	100	2024-03-22 00:00:00-07	24
aa	Put	Loss	50	2024-03-15 00:00:00-07	25
iou	Put	Profit	100	2024-04-03 00:00:00-07	31
new	Call	Loss	20	2024-04-02 00:00:00-07	32
\.


--
-- Data for Name: user_info; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_info (name, email, password, phone) FROM stdin;
navdeep	nkaur@gmail.com	Navdeep@123	778-707-3375
\.


--
-- Name: trades_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.trades_id_seq', 32, true);


--
-- Name: trades trades_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trades
    ADD CONSTRAINT trades_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

