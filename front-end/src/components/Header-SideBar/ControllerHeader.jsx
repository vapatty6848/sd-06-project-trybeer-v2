import React from 'react';
import SideBar from './SideBar';
import Header from './Header';
import '../../css/ControllerHeader.css';

function ControllerHeader() {
  // const [viewMenu, setViewMenu] = useState(false);

  return (
    <div className="controller-header">
      <button
        data-testid="top-hamburguer"
        type="button"
        onClick={ () => window.location.reload() }
        // setViewMenu(!viewMenu) }
      >
        ☰
      </button>
      <Header />
      <SideBar />
      {/* { viewMenu && <SideBar setViewMenu={ setViewMenu } /> } */}
    </div>
  );
}

export default ControllerHeader;
