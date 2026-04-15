export const calcularTotal = (precoProduto, precoBebida) => {
  return precoProduto + precoBebida;
};

export const formatarMoeda = (valor) => {
  return `R$ ${valor.toFixed(2).replace('.', ',')}`;
};

export const gerarResumoPedido = (produto, bebida, total) => {
  return `Pedido: ${produto} + ${bebida}\nTotal: ${formatarMoeda(total)}`;
};