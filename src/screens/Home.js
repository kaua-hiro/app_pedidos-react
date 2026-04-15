import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView } from 'react-native';
import { SectionPicker } from '../components/SectionPicker';
import { produtos, bebidas } from '../constants/data';
import { calcularTotal, formatarMoeda, gerarResumoPedido } from '../utils/businessRules';

export const Home = () => {
  const [produtoSelecionado, setProdutoSelecionado] = useState('Hambúrguer');
  const [bebidaSelecionada, setBebidaSelecionada] = useState('Refrigerante');

  const total = calcularTotal(produtos[produtoSelecionado].preco, bebidas[bebidaSelecionada].preco);

  const confirmarPedido = () => {
    const resumo = gerarResumoPedido(produtoSelecionado, bebidaSelecionada, total);
    if (typeof window !== 'undefined' && window.alert) {
      window.alert(`✅ Resumo do Pedido\n\n${resumo}`);
    } else {
      import('react-native').then(({ Alert }) => {
        Alert.alert("✅ Resumo do Pedido", resumo, [{ text: "OK" }]);
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Fast Food App</Text>

      <SectionPicker
        titulo="1. Escolha o Produto:"
        itens={produtos}
        selecionado={produtoSelecionado}
        setSelecionado={setProdutoSelecionado}
        estiloFundo="#ffe8e8"
        corBorda="#ff4d4d"
      />

      <SectionPicker
        titulo="2. Escolha a Bebida:"
        itens={bebidas}
        selecionado={bebidaSelecionada}
        setSelecionado={setBebidaSelecionada}
        estiloFundo="#e8f4ff"
        corBorda="#4da6ff"
      />

      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>Pedido: {produtoSelecionado} + {bebidaSelecionada}</Text>
        <Text style={styles.totalText}>Total: {formatarMoeda(total)}</Text>
      </View>

      <Button title="Confirmar pedido" color="#28a745" onPress={confirmarPedido} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#343a40',
  },
  summaryContainer: {
    backgroundColor: '#e8ffe8',
    padding: 15,
    borderRadius: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#28a745',
    marginBottom: 20,
  },
  summaryText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#212529',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
  }
});