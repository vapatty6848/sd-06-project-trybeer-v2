import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaWeixin } from 'react-icons/fa';
import { GiBeerBottle } from 'react-icons/gi';
import { MdBorderColor } from 'react-icons/md';
import { BsFillPersonFill } from 'react-icons/bs';
import { IconContext } from 'react-icons';
import TrybeerContext from '../context/TrybeerContext';
import './SideBarMenu.scss';

const SidebarMenuADM = () => {
  const { eraseLocalStorage, isVisible, setVisibility } = useContext(TrybeerContext);

  return (
    <div>
      {
        isVisible && (
          <IconContext.Provider value={{size: "2em", className: "icons"}}>
            <div className="side-menu-container">
              <div className="side-menu-main-options">
                <Link to="/products">
                  <button
                    data-testid="side-menu-item-products"
                    type="button"
                    onClick={ setVisibility }
                  >
                    Produtos
                    <GiBeerBottle />
                  </button>
                </Link>
                <Link to="/admin/orders">
                  <button
                    data-testid="side-menu-item-orders"
                    type="button"
                    onClick={ setVisibility }
                  >
                    Pedidos
                    <MdBorderColor />
                  </button>
                </Link>
                <Link to="/admin/profile">
                  <button
                    data-testid="side-menu-item-profile"
                    type="button"
                    onClick={ setVisibility }
                  >
                    Perfil
                    <BsFillPersonFill />
                  </button>
                </Link>
                <Link to="/admin/chats">
                  <button
                    data-testid="side-menu-item-chat"
                    type="button"
                    onClick={ setVisibility }
                  >
                    Conversas
                    <FaWeixin />
                  </button>
                </Link>

              </div>
              <div>
                <Link to="/login">
                  <button
                    data-testid="side-menu-item-logout"
                    type="button"
                    onClick={ () => {
                      setVisibility();
                      eraseLocalStorage();
                    } }
                  >
                    Sair
                  </button>
                </Link>
              </div>
            </div>
          </IconContext.Provider>)
      }
    </div>
  );
};

export default SidebarMenuADM;
