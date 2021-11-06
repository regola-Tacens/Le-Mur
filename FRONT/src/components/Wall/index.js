import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Redirect } from 'react-router';
import docs from 'src/data/element';
import user from 'src/data/user';
import { emptyForm } from 'src/actions/element.js'
import { changePanel, toggleEye, displayMode, redirectPDF } from 'src/actions/wall.js'
import { updateContents } from "src/actions/textEdit";
import Docs from './docs';
import AddDocForm from './addDoc';
import InfoDocForm from './infoDoc';
import ChangeWallForm from './changeWall';
import InfoWallForm from './infoWall';

import './style.scss';

const Wall = () => {
  // pour passer les infos du mur depuis la page Walls
  const location = useLocation();
  const { wallTitle, wallId } = location.state;

  const dispatch = useDispatch();
  const { panel, displaysquare, toPDF } = useSelector((state) => state.wall);

  const slidePanel = () => {
    document.querySelector('.main').classList.add('on');
  }

  const closePanel = () => {
    document.querySelector('.main').classList.remove('on');
    setTimeout(() => {
      dispatch(emptyForm({nameF: '', descriptionF: '', typeF : '', linkF: [], srcF: '', currentLinkF: ''}));
    },500);
  }

  const displayPanel = (e) => {
    dispatch(changePanel(e.target.getAttribute('panel')));
    slidePanel();
  }

  useEffect(() => {
    document.addEventListener('click', (e) => {
      if(!e.target.parentNode.parentNode.classList.contains('doc')) dispatch(toggleEye(-1));
    });
  },[]);

  const displaySquare = (e) => {
    dispatch(displayMode());
  }

  const editPdf = () => {
    let contents='';
    docs.forEach((doc) => {
      contents += `<h2 style="font-size:32px;text-align:center;font-family: Montserrat,sans-serif;font-weight:bold;">${doc.name}</h2>
        ${doc.type == 'image' ? `<img src="${doc.src}" width="200"/>` : `<p>${doc.src}</p>`}
        <p style="font-size:24px;">${doc.description}</p>
        <p style="font-size:24px;font-weight:bold;">Liens :</p>
        <ul>
       `;
      doc.link.forEach((link) => {
        contents += `<li><a href="${link}" style="font-size:24px;color:blue;text-decorations:none;">${link}</a></li>
        `;
      });
      contents += `</ul>
      `;
      // if (doc.type == 'image') {
      //   contentDelta.ops.push(
      //     { insert: { image: doc.src}, attributes: { width: '100', height: '200' }}
      //   );
      // };
    });
    dispatch(updateContents(contents));
    dispatch(redirectPDF());
  }
  

  const wallDoc = docs;
  const currentUser = 1;

  return (
    <div className="wall">
      {toPDF && <Redirect to="/PDF" />}
      <div className="sub-header">
        <h1>{ wallTitle }</h1>
      </div>
      <div className="main">
        <div className="dashboard">
          <div className="close-panel" onClick={closePanel}></div>
          <div className="fade-elem"></div>
          {panel == 'infoWallPanel' && <InfoWallForm />}
          {panel == 'changeWallPanel' && <ChangeWallForm />}
          {panel == 'infoDocPanel' && <InfoDocForm />}
          {panel == 'addDocPanel' && <AddDocForm />}
        </div>
        <div className="menu-bar">
          <div className="icon info" panel="infoWallPanel" onClick={displayPanel}></div>
          <div className="icon add" panel="addDocPanel" onClick={displayPanel}></div>
          <div className="icon add" onClick={displaySquare}></div>
          <div className="icon add" onClick={editPdf}></div>
        </div>
        <div className={displaysquare ? "board-wrapper square" : "board-wrapper"}>
          <Docs docs={wallDoc} user={currentUser} getAction="infoDocPanel" getInfo={displayPanel} />
        </div>
      </div>
    </div>
  )
};
export default Wall;
