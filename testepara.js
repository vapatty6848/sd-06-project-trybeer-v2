// Headers.js

const { string } = PropTypes;

Header.propTypes = {
  isAdmin: string.isRequired,
};

export default Header;

// ------------ Alteração ------------

const { bool } = PropTypes;

Header.propTypes = {
  isAdmin: bool.isRequired,
};

export default Header;



// ProductsProvider.js

ProductsProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ProductsProvider;

// ------------ Alteração ------------

ProductsProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ProductsProvider;



// UserProvider.js

UserProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default UserProvider;

// ------------ Alteração ------------

UserProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default UserProvider;



// Checkout.js

// acressentou na liha 121 
<tbody>
</tbody>

// Acrescentou no Checkout e nos outros:

// Order.js
// OrderDetails.js
// Products.js
// Profile.js

const user = JSON.parse(localStorage.getItem('user'));
const { role } = user;

  // e

<Header isAdmin={role === 'administrator'} />

// Login.js

// Linha 49
value={ email }

// Linha 57
value={ password }

// Lina 69
disabled={ false }

