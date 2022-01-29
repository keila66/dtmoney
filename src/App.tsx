import { GlobalStyle } from "./styles/global";
import { Header } from "./components/Header";
import { Dashboard } from "./components/Dashboard";
import { TransactionModal } from "./components/TransactionModal";
import { useState } from "react";
import { TransactionsProvider } from "./hooks/useTransactions";

export function App() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <TransactionsProvider>
      <Header onClick={handleOpenModal} />
      <GlobalStyle />
      <TransactionModal open={isModalOpen} onClose={handleCloseModal} />
      <Dashboard />
    </TransactionsProvider>
  );
}
