import React from "react";
import "./not-found.scss";

type Props = {};

export default function NotFound({}: Props) {
  return (
    <div className="not-found">
      <p>Page you requested does not exist</p>
    </div>
  );
}
