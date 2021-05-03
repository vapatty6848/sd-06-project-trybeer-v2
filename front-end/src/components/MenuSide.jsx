import React from 'react'; import { useHistory, Redirect } from 'react-router-dom';
import './MenuSide.css';
import { GiHamburgerMenu } from 'react-icons/gi';

import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {

    zIndex: 99,
    marginRight: theme.spacing(2),
  },
}));

function MenuSide() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  // Open Hamburguer
  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // Material-Iu
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);


  const route = useHistory(); const user = JSON.parse(localStorage.getItem('user')); try {
    let modifyId = '-my-';
    let urlRoute = '';
    let isClient = true;
    if (user.role && user.role === 'administrator') {
      urlRoute = '/admin'; modifyId = '-'; isClient = false;
    }
    return (
      <div>
        <Button
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          onClick={handleToggle}
          className="top-btn"
        >
          <i data-testid="top-hamburguer" className="top-hamburguer">
            <GiHamburgerMenu />
          </i>
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={
                {
                  transformOrigin: placement === 'bottom'
                    ? 'center top' : 'center bottom'
                }
              }
            >
              <Paper>

                  <MenuList
                    autoFocusItem={open}
                    id="menu-list-grow"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem
                      className="side-btn"
                      data-testid="side-menu-item-products"
                      type="button"
                      onClick={() => route.push('/products')}>
                      {isClient && (<> Produtos </>)}
                    </MenuItem>
                    <MenuItem
                      className="side-btn"
                      data-testid={`side-menu-item${modifyId}orders`}
                      type="button"
                      onClick={() => route.push(`${urlRoute}/orders`)}
                    >
                      {isClient ? 'Meus Pedidos' : 'Pedidos'}
                    </MenuItem>
                    <MenuItem
                      className="side-btn"
                      data-testid={`side-menu-item${modifyId}profile`}
                      type="button"
                      onClick={() => route.push(`${urlRoute}/profile`)}
                    >
                      {isClient ? 'Meu Perfil' : 'Perfil'}
                    </MenuItem>
                    <MenuItem
                      className="side-btn"
                      data-testid={isClient ? 'side-menu-chat' : 'side-menu-item-chat'}
                      type="button"
                      onClick={() => route.push(isClient ? '/chat' : '/admin/chats')}
                    >
                      {isClient ? 'Conversar com a loja' : 'Conversas'}
                    </MenuItem>
                    <MenuItem
                      className="side-btn"
                      data-testid="side-menu-item-logout"
                      type="button"
                      onClick={() => {
                        localStorage.clear();
                        route.push('/login');
                      }}
                    >
                      Sair
                  </MenuItem>
                  </MenuList>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    );
  } catch (err) {
    return <Redirect to="/login" />;
  }
}

export default MenuSide;
