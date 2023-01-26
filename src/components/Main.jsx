import axios from "axios";
import React, { useEffect, useState } from "react";
import {format as prettyFormat} from 'pretty-format';
import { Outlet } from "react-router";

const Main = () => {
  
  return (
    <main className="py-10 px-6">
      <div className="max-w-5xl w-11/12 m-auto">
        <Outlet />
      </div>
    </main>
  );
};

export default Main;
