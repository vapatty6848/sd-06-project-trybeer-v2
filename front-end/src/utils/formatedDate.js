const formatedDate = (date) => {
  const separetedDate = date.replace('T', '-').split('-');
  return (`${separetedDate[2]}/${separetedDate[1]}`);
};

export default formatedDate;
