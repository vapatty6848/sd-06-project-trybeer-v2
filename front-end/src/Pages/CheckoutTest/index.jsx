// import React, { useContext, useState, useEffect, useMemo, useCallback } from 'react';
// import { useHistory } from 'react-router-dom';

// // import { FaStreetView } from 'react-icons/fa';
// // import { AiOutlineFieldNumber } from 'react-icons/ai';
// // import { registerOrder } from '../../Services/Apis';

// import MenuTop from '../../Components/MenuTop';
// import SideBar from '../../Components/SideBar';
// import Button from '../../Components/Button';

// import { GlobalContext } from '../../Contexts/GlobalContext';

// import S from './styles';
// // import Input from '../../Components/Input';

// // const mountData = (params) => {
// //   const { street, numberHouse } = params;
// //   const user = JSON.parse(localStorage.getItem('user'));
// //   const products = JSON.parse(localStorage.getItem('infosCheckout'));
// //   const orderValue = JSON.parse(localStorage.getItem('total'));
// //   const order = {
// //     email: user.email,
// //     orderValue,
// //     address: street,
// //     number: numberHouse,
// //     products,
// //     token: user.token,
// //   };
// //   return order;
// // };

// // const checkOutRedirect = async (setCheckOut, history, params) => {
// //   const time = 2000;
// //   const order = mountData(params);

// //   await registerOrder(order);
// //   setCheckOut(true);
// //   setTimeout(() => {
// //     history.push('/products');
// //   }, time);

// //   localStorage.removeItem('infosCheckout');
// //   localStorage.removeItem('total');
// // };

// const CheckoutTest = () => {
//   const [isDisabled, setIsDisabled] = useState(true);
//   const [valueTotal, setValueTotal] = useState(0);
//   const [street, setStreet] = useState('');
//   const [numberHouse, setNumberHouse] = useState('');
//   const [checkOut, setCheckOut] = useState(false);
//   const { setCartList, stateSideBar } = useContext(GlobalContext);
//   const history = useHistory();

//   // const cartListLocalStorage = JSON.parse(localStorage.getItem('infosCheckout'));

//   useEffect(() => {
//     const userToken = JSON.parse(localStorage.getItem('user'));

//     if (!userToken) history.push('/login');
//   }, [history]);

//   // useEffect(() => {
//   //   if (cartListLocalStorage) {
//   //     const prices = cartListLocalStorage.map((item) => item.price * item.quantity);

//   //     const total = prices.reduce((acc, cur) => acc + cur, 0);

//   //     setValueTotal(total);

//   //     if (total > 0 && street.length > 0 && numberHouse.length > 0) {
//   //       setIsDisabled(false);
//   //     } else {
//   //       setIsDisabled(true);
//   //     }
//   //   }
//   // }, [cartListLocalStorage, numberHouse.length, street.length]);

//   // const removeItem = useCallback((id) => {
//   //   const products = JSON.parse(localStorage.getItem('infosCheckout'));

//   //   const product = products.filter((item) => item.id !== id);

//   //   localStorage.setItem('infosCheckout', JSON.stringify(product));

//   //   setCartList(products);
//   // }, [setCartList]);

//   return (
//     <S.Container>
//       <MenuTop />

//       <SideBar />

//       <S.Content>
//         <div>
//           <h1>Produtos</h1>
//         </div>
//         <S.ContainerProducts>
//           <img src="./images/image-heineken.png" alt="Heineken 600ml" />
//           <span>2</span>
//           <span>R$ 4,40</span>
//           <span>(R$ 2,20 un)</span>
//           <button type="button">X</button>
//         </S.ContainerProducts>

//         <S.ContainerProducts>
//           <img src="./images/image-heineken.png" alt="Heineken 600ml" />
//           <span>2</span>
//           <span>R$ 4,40</span>
//           <span>(R$ 2,20 un)</span>
//           <button type="button">X</button>
//         </S.ContainerProducts>

//         <S.ContainerProducts>
//           <img src="./images/image-heineken.png" alt="Heineken 600ml" />
//           <span>2</span>
//           <span>R$ 4,40</span>
//           <span>(R$ 2,20 un)</span>
//           <button type="button">X</button>
//         </S.ContainerProducts>

//         <S.ContainerForm>
//           <h1>Form</h1>
//         </S.ContainerForm>
//       </S.Content>

//       <S.ContainerButton>
//         <Button
//           type="button"
//           color="green"
//           fontSize="20px"
//           width="100%"
//           heigth="40px"
//           botton="0"
//           position="fixed"
//           disabled={ isDisabled }
//           onClick={ () => {} }
//           dataTestid="checkout-finish-btn"
//         >
//           Finalizar Pedido
//         </Button>
//       </S.ContainerButton>
//     </S.Container>
//   );
// };

// export default CheckoutTest;
