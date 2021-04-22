const statusConvert = (status) => {
  switch (status) {
  case 'PENDING': return 'Pendente';
  case 'PREPARING': return 'Preparando';
  case 'DELIVERED': return 'Entregue';
  default: return '';
  }
};

export default statusConvert;
