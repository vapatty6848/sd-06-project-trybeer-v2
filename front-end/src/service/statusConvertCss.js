export default (status) => {
  switch (status) {
  case 'Entregue': return 'greenStatus';
  case 'Preparando': return 'yellowStatus';
  case 'Pendente': return 'redStatus';
  default: return '';
  }
};
