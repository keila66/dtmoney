import React, { FormEvent, useState } from "react";
import Modal from "react-modal";
import closeImg from "../../assets/close.svg";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import { useTransactions } from "../../hooks/useTransactions";
import { Container, RadioBox, TransactionTypeContainer } from "./styles";

interface TransactionModalProps {
  open: boolean;
  onClose: () => void;
}

Modal.setAppElement("#root");

export function TransactionModal({ open, onClose }: TransactionModalProps) {
  const [type, setType] = useState<string>("deposit");
  const [title, setTitle] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [category, setCategory] = useState<string>("");
  const { createTransaction } = useTransactions();

  async function handleCreateTransaction(event: FormEvent) {
    event.preventDefault();
    await createTransaction({
      title,
      amount,
      category,
      type,
    });

    onClose();
    setTitle("");
    setAmount(0);
    setType("");
    setCategory("");
  }

  return (
    <Modal
      isOpen={open}
      onRequestClose={onClose}
      overlayClassName={"react-modal-overlay"}
      className={"react-modal-content"}
    >
      <button type={"button"} onClick={onClose} className={"react-modal-close"}>
        <img src={closeImg} alt="Fechar modal" />
      </button>
      <Container onSubmit={handleCreateTransaction}>
        <h2>Cadastrar transação</h2>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <input
          type="number"
          placeholder="Valor"
          value={amount}
          onChange={(event) => setAmount(Number(event.target.value))}
        />
        <TransactionTypeContainer>
          <RadioBox
            type={"button"}
            onClick={() => {
              setType("deposit");
            }}
            isActive={type === "deposit"}
            activeColor="green"
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>
          <RadioBox
            type={"button"}
            onClick={() => {
              setType("withdraw");
            }}
            isActive={type === "withdraw"}
            activeColor="red"
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>
        <input
          type="text"
          placeholder="Categoria"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        />
        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}
