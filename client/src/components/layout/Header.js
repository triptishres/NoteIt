import React from "react";
import { Link } from "react-router-dom";


export default function Header() {
  return (
    <header id="header">
      <Link to="/">
        <h1 className="title">NoteIt</h1>
      </Link>
    </header>
  );
}