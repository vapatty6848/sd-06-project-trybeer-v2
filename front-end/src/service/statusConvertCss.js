export default (status) => {
  switch (status) {
  case 'Entregue': return 'greenStatus';
  case 'Preparando': return 'Preparando';
  case 'Pendente': return 'redStatus';
  default: return '';
  }
};
