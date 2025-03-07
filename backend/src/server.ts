import express, { Request, Response } from "express";
import { query } from "./database";
import { Transaction } from "../../dt-money/src/@types/transactions.d";
import cors from "cors";

// Criar o app do express
const app = express();

// middleware para transformar o corpo da requisição em JSON
app.use(express.json());

app.use(cors());

// porta que o servidor vai escutar
const PORT = 3001;

app.get("/", async (req: Request, res: Response) => {
  try {
    const result = await query<Transaction[]>(
      "SELECT * FROM public.transactions"
    );
    res.json(result);
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/transactions", async (req: Request, res: Response) => {
  try {
    const result = await query<Transaction>(
      "SELECT * FROM public.transactions ORDER BY created_at DESC"
    );

    const { description } = req.query;

    let transactions = result.rows;

    if (description) {
      transactions = result.rows.filter((transaction) => {
        return transaction.description
          .toLowerCase()
          .includes(description.toString().toLowerCase());
      });
    }

    res.json(transactions);
  } catch {
    res.status(500).json({ error: "Erro ao buscar transações" });
  }
});

app.get("/transactions/:id", async (req: Request, res: Response) => {
  try {
    const result = await query<Transaction>(
      "SELECT * FROM public.transactions WHERE id = $1",
      [req.params.id]
    );
    res.json(result.rows);
  } catch {
    res.status(500).json({ error: "Erro ao buscar transações pelo id" });
  }
});

app.post("/transactions", async (req: Request, res: Response) => {
  try {
    const { description, type, price, category } = req.body;
    const created_at = new Date();
    console.log(created_at);

    const result = await query<Transaction>(
      "INSERT INTO public.transactions (description, type, category, price, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [description, type, category, price, created_at]
    );

    res.json(result.rows);
  } catch {
    res.status(500).json({ error: "Erro ao cadastrar transações" });
  }
});

app.listen(PORT, () => console.log(`Executando na porta ${PORT}`));
