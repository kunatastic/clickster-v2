import React from 'react';
import {useParams} from 'react-router-dom';

function Game() {
  let params = useParams();
  return <h1>Invoice {params.roomId}</h1>;
}

export default Game;
