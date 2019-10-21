import React from 'react';
import { useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';
import { signOut } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.svg';

import { Container, Content, Profile } from './styles';

export default function Header() {
  const dispatch = useDispatch();
  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="Detetive" />
          <strong> NCVJ Admin </strong>
          {/* <Link to="/home">Home</Link> */}
        </nav>

        <aside>
          <Profile>
            <div>
              <button type="button" onClick={handleSignOut}>
                Sair
              </button>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
